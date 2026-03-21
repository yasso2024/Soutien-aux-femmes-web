import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, DatePicker, Select, message, Avatar, Upload } from "antd";
import dayjs from "dayjs";
import { format } from "date-fns";
import axiosClient from '../utils/axiosClient'
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { uplaodFile } from "../api/files";

const EditUserDrawer = (props) => {
    const [open, setOpen] = useState(true);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const { userDetails, refresh, setRefresh } = props;

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            ...userDetails,
            ...(userDetails.dob && { dob: dayjs(userDetails.dob) })
        });

        setAvatar(userDetails.avatar);
    }, [form, userDetails])

    const beforeUpload = (file) => {
        setAvatarFile(file);

        setAvatarPreview(URL.createObjectURL(file));
        return false;
    }

    async function onFinish(values) {
        try {
            let avatarFilename = avatar;

            if (avatarFile) {
                 const uploadRes= await uplaodFile(avatarFile);
               

                avatarFilename = uploadRes.data.file.filename;
            }

            const payload = {
                ...values,
                dob: values.dob ? format(values.dob, "yyyy-MM-dd") : undefined,
                avatar: avatarFilename
            }

            const response = await axiosClient.put('/user/update/' + userDetails._id, payload);

            message.success(response.data.message);
            setRefresh(!refresh);
            onClose();
        } catch (error) {
            message.error(error.response.data.message);
        }
    }
    return (
        <>
            <Button type='primary' size='small' onClick={showDrawer}>
                Edit
            </Button>
            <Drawer
                title="Edit User"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                    <Avatar
                        size={80}
                        src={avatarPreview || (avatar ? `http://localhost:3000/uploads/${avatar}` : undefined)}
                        icon={!avatarPreview && !avatar && <UserOutlined />}
                    />
                    <Upload beforeUpload={beforeUpload} showUploadList={false} accept={"image/*"}>
                        <Button icon={<CameraOutlined />}>
                            {avatarPreview ? 'Change Picture' : "Add Profile Picture"}
                        </Button>
                    </Upload>
                </div>
                <Form onFinish={onFinish} form={form} layout="vertical">
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: "Email is required" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='First Name'
                        name='firstName'
                        rules={[{ required: true, message: "First Name is required" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Last Name'
                        name='lastName'
                        rules={[{ required: true, message: "Last Name is required" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Date Of Birth'
                        name='dob'
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label='Account Type'
                        name='role'
                        rules={[{
                            required: true, message: "Account type is required"
                        }]}
                    >
                        <Select
                            options={[
                                { value: 'USER', label: 'User' },
                { value: 'FEMME MALADE', label: 'Femme Malade' },
                { value: 'ADMINISTRATEUR', label: 'Administrateur' },
                { value: 'BENEVOLE', label: 'Bénévole' },
                { value: 'DONTEUR', label: 'Donateur' },
                { value: 'ASSOCIATION', label: 'Association' },
                            ]}
                        />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Edit
                    </Button>
                </Form>
            </Drawer>
        </>
    );
}

export default EditUserDrawer