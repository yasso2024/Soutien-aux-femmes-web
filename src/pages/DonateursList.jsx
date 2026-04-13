import { Divider, message, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { listUsers } from '../api/users';

const DonateursList = () => {
  const [donateurs, setDonateurs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listUsers('DONTEUR');
        setDonateurs(response.data.users);
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
      title: 'Téléphone',
      dataIndex: 'telephone',
      key: 'telephone'
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="gold">{role}</Tag>
    }
  ];

  return (
    <div>
      <h3>Liste des donateurs</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={donateurs} />
    </div>
  );
};

export default DonateursList;