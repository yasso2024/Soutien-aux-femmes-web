import { Divider, message, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { listUsers } from '../api/users';

const FemmesList = () => {
  const [femmes, setFemmes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listUsers('FEMME MALADE');
        setFemmes(response.data.users);
      } catch (error) {
        message.error(error.message || 'Erreur de chargement');
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Nom',
      key: 'nom',
      render: (_, record) => `${record.firstName} ${record.lastName}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Région',
      dataIndex: 'region',
      key: 'region'
    },
    {
      title: 'Date diagnostic',
      dataIndex: 'dateDiagnostic',
      key: 'dateDiagnostic',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="magenta">{role}</Tag>
    }
  ];

  return (
    <div>
      <h3>Liste des femmes malades</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={femmes} />
    </div>
  );
};

export default FemmesList;