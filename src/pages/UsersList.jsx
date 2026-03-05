import { Divider, message, Space, Table, Tag, Button, Avatar } from 'antd'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import EditUserDrawer from '../components/EditUserDrawer';
import { UserOutlined } from '@ant-design/icons';
import { listUsers } from '../api/users';


// email, firstName, lastName, dob, role, createdAt
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: 'avatar',
      render: (avatar) => (
        <Avatar 
          src={avatar ? "http://localhost:3000/uploads/" + avatar : undefined}
          icon={!avatar && <UserOutlined />}
        />
      )
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: text => format(text, 'yyyy-MM-dd HH:mm')
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Account Type",
      dataIndex: "role",
      key: 'role',
      render: text => <Tag color={text === "User" ? "geekblue" : "green"}>{text}</Tag>
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type='link' size='small'>Details</Button>
          {/* <Button type='primary' size='small' onClick={() => {
            navigate("/user/edit/"+record._id);
          }}>Edit</Button> */}
          <EditUserDrawer userDetails={record} refresh={refresh} setRefresh={setRefresh}/>
        </Space>
      )
    }
  ]

  useEffect(() => {

    async function fetchData() {
      try {
        const response = await listUsers()

        setUsers(response.data.users);
      } catch (error) {
        message.error(error.message || "Something went wrong")
      }
    }

    fetchData();
  }, [refresh])

  return (
    <div>
      <h4>
        Users List
      </h4>
      <Divider />
      <Table columns={columns} dataSource={users} scroll={{ x: 'max-content' }} />
    </div>
  )
}

export default UsersList