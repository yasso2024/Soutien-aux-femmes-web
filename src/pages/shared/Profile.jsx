import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Avatar, Button, Card, Descriptions, Divider, Tag } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h4>Mon Profil</h4>
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
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Prénom">{user?.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Nom de famille">{user?.lastName}</Descriptions.Item>
                    <Descriptions.Item label="Date de naissance">
                        {user?.dob ? new Date(user.dob).toLocaleDateString() : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Rôle">
                        <Tag color={user?.role === 'ADMINISTRATEUR' ? "geekblue" : "green"}>{user?.role}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Date de création">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                    </Descriptions.Item>
                </Descriptions>
                <div style={{marginTop: 16}}>
                    <Link to='/change-password'>
                        <Button icon={<LockOutlined />}>Changer le mot de passe</Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Profile