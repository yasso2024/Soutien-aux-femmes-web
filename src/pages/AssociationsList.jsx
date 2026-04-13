import { Divider, message, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { listUsers } from '../api/users';

const AssociationsList = () => {
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listUsers('ASSOCIATION');
        setAssociations(response.data.users);
      } catch (error) {
        message.error(
          error.response?.data?.message || error.message || 'Erreur de chargement'
        );
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Organisation',
      dataIndex: 'nomOrganisation',
      key: 'nomOrganisation'
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Nom responsable',
      key: 'nom',
      render: (_, record) => `${record.firstName} ${record.lastName}`
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="cyan">{role}</Tag>
    }
  ];

  return (
    <div>
      <h3>Liste des associations</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={associations} />
    </div>
  );
};

export default AssociationsList;