import { useContext, useEffect, useState } from 'react';
import { Button, Divider, message, Space, Table, Tag } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import { confirmerDon, deleteDon, listDons } from '../api/dons';

const DonsList = () => {
  const [dons, setDons] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const params = {};

        if (user?.role === 'DONTEUR') {
          params.donateur = user._id;
        }

        const response = await listDons(params);
        setDons(response.data.dons);
      } catch (error) {
        message.error(error.message || 'Erreur lors du chargement des dons');
      }
    }

    fetchData();
  }, [refresh, user]);

  const handleConfirm = async (id) => {
    try {
      const response = await confirmerDon(id);
      message.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      message.error(error.message || 'Erreur lors de la confirmation');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDon(id);
      message.success(response.data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      message.error(error.message || 'Erreur lors de la suppression');
    }
  };

  const columns = [
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant'
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
      render: (text) => (
        <Tag color={text === 'CONFIRME' ? 'green' : 'orange'}>{text}</Tag>
      )
    },
    {
      title: 'Donateur',
      key: 'donateur',
      render: (_, record) =>
        record.donateur
          ? `${record.donateur.firstName} ${record.donateur.lastName}`
          : '-'
    },
    {
      title: 'Demande financée',
      key: 'demande',
      render: (_, record) => record.demande?.titre || '-'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {user?.role === 'ADMINISTRATEUR' && record.statut !== 'CONFIRME' && (
            <Button size="small" onClick={() => handleConfirm(record._id)}>
              Confirmer
            </Button>
          )}

          {(user?.role === 'ADMINISTRATEUR' || user?.role === 'DONTEUR') && (
            <Button size="small" danger onClick={() => handleDelete(record._id)}>
              Supprimer
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div>
      <h3>Liste des dons</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={dons} />
    </div>
  );
};

export default DonsList;