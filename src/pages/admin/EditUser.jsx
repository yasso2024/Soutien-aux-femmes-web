import { Divider, Form, Input, Button, DatePicker, Select, message, Avatar, Upload } from 'antd'
import { format } from 'date-fns';
import dayjs from 'dayjs'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { uploadFile } from '../../api/files';
import { getUserById, updateUser } from '../../api/users';

const EditUser = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getById() {
      try {
        const response = await getUserById(id);

        form.setFieldsValue({
          ...response.data.user,
          ...(response.data.user.dob && { dob: dayjs(response.data.user.dob) })
        });

        setAvatar(response.data.user.avatar);
      } catch (error) {
        message.error(error.response.data.message);
      }
    }

    if (id) {
      // Call API And setFieldsValue;
      getById();
    }
  }, [id])

  const beforeUpload = (file) => {
    setAvatarFile(file);

    setAvatarPreview(URL.createObjectURL(file));
    return false;
  }

  async function onFinish(values) {
    try {
      let avatarFilename = avatar;

      if (avatarFile) {

        const uploadRes = await uploadFile(avatarFile);

        avatarFilename = uploadRes.data.file.filename;
      }
      
      const payload = {
        ...values,
        dob: values.dob ? format(values.dob, "yyyy-MM-dd") : undefined,
        avatar: avatarFilename
      }

      const response = await updateUser(id, payload);

      message.success(response.data.message);
      navigate('/user/list');
    } catch (error) {
      message.error(error.response.data.message);
    }
  }

  return (
    <div>
      <h4>Edit User</h4>
      <Divider />
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date Of Birth" name="dob">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Account Type"
          name="role"
          rules={[{ required: true, message: "Account type is required" }]}
        >
          <Select
            // ✅ نفس enum اللي عند backend
            options={[
              { value: "USER", label: "User" },
              { value: "VISITEUR", label: "Visiteur" },
              { value: "FEMME MALADE", label: "Femme Malade" },
              { value: "ADMINISTRATEUR", label: "Administrateur" },
              { value: "BENEVOLE", label: "Bénévole" },
              { value: "DONTEUR", label: "Donateur" },
              { value: "ASSOCIATION", label: "Association" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form>
    </div>
  )
}
// email, firstName, lastName, password, confirmPassword, dob, role
export default EditUser