import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Avatar, Button, Card, Descriptions, Divider, Tag } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h4>My Profile</h4>
            <Divider />
            <Card style={{ maxWidth: 600 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <Avatar
                        src={user?.avatar ? `http://localhost:3000/uploads/${user.avatar}` : undefined}
                        icon={!user?.avatar && <UserOutlined />}
                        size={80}
                    />
                    <div>
                        <h3>{user?.firstName} {user?.lastName}</h3>
                        <Tag color={user.role === 'ADMIN' ? "geekblue" : "green"}>{user.role}</Tag>
                    </div>
                </div>
                <Descriptions column={1} bordered>
                 <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>                    <Descriptions.Item label='First Name'>{user.firstName}</Descriptions.Item>
                    <Descriptions.Item label='Last Name'>{user.lastName}</Descriptions.Item>
                    <Descriptions.Item label='Date of Birth'>
                        {user.dob ? new Date(user.dob).toLocaleDateString() : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label='Role'>
                        <Tag color={user.role === 'ADMINISTRATEUR' ? "geekblue" : "green"}>{user.role}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label='Creation Date'>
                        {new Date(user.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                </Descriptions>
                <div style={{marginTop: 16}}>
                    <Link to='/change-password'>
                        <Button icon={<LockOutlined />}>Change Password</Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Profile