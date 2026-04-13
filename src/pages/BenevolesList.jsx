import { useEffect, useState } from 'react';
import { Avatar, Divider, message, Table, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { listUsers } from '../api/users';

const BenevolesList = () => {
  const [benevoles, setBenevoles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await listUsers('BENEVOLE');
        setBenevoles(response.data.users);
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
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        <Avatar
          src={avatar ? `http://localhost:3000/uploads/${avatar}` : undefined}
          icon={!avatar && <UserOutlined />}
        />
      )
    },
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
      title: 'Compétences',
      key: 'competences',
      render: (_, record) =>
        Array.isArray(record.competences) ? record.competences.join(', ') : '-'
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color="purple">{role}</Tag>
    }
  ];

  return (
    <div>
      <h3>Liste des bénévoles</h3>
      <Divider />
      <Table rowKey="_id" columns={columns} dataSource={benevoles} />
    </div>
  );
};

export default BenevolesList;