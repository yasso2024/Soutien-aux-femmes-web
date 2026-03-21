import { useEffect, useState, useContext } from 'react';
import { Button, Divider, message, Space, Table, Tag } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import {listDemandes,updateStatutDemande,deleteDemande
} from '../api/demandes';

const colorByStatut = {
  EN_ATTENTE: 'orange',
  VALIDEE: 'green',
  REFUSEE: 'red',
  EN_COURS: 'blue',
  TERMINEE: 'purple'
};

const DemandesList = () => {
  const [demandes, setDemandes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const params = {};

        if (user?.role === 'FEMME MALADE') {
          params.femme = user._id;
        }

        const response = await listDemandes(params);
        setDemandes(response.data.demandes);
      } catch (error) {
        message.error(error.message || 'Erreur lors du chargement des demandes');
      }
    }

    fetchData();
  }, [refresh, user]);

  const handleStatus = async (id, statut) => {
    try {
      const response = await updateStatutDemande(id, statut);
      message.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      message.error(error.message || 'Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDemande(id);
      message.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      message.error(error.message || 'Erreur lors de la suppression');
    }
  };

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'titre',
      key: 'titre'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag color={colorByStatut[statut] || 'default'}>
          {statut}
        </Tag>
      )
    },
    {
      title: 'Femme',
      key: 'femme',
      render: (_, record) =>
        record.femme
          ? `${record.femme.firstName} ${record.femme.lastName}`
          : '-'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {user?.role === 'ADMINISTRATEUR' && (
            <>
              <Button
                size="small"
                onClick={() => handleStatus(record._id, 'VALIDEE')}
              >
                Valider
              </Button>

              <Button
                size="small"
                onClick={() => handleStatus(record._id, 'EN_COURS')}
              >
                En cours
              </Button>

              <Button
                size="small"
                onClick={() => handleStatus(record._id, 'TERMINEE')}
              >
                Terminée
              </Button>

              <Button
                size="small"
                danger
                onClick={() => handleStatus(record._id, 'REFUSEE')}
              >
                Refuser
              </Button>
            </>
          )}

          {(user?.role === 'ADMINISTRATEUR' || user?.role === 'FEMME MALADE') && (
            <Button
              size="small"
              danger
              onClick={() => handleDelete(record._id)}
            >
              Supprimer
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div>
      <h3>Liste des demandes</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={demandes} />
    </div>
  );
};

export default DemandesList;