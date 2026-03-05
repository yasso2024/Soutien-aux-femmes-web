import {Divider, Form, Input, Button, DatePicker, Select, message, Upload, Avatar} from 'antd'
import {UserOutlined, CameraOutlined} from "@ant-design/icons";
import { useState } from 'react';
import { uplaodFile } from '../api/files';

const AddUser = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const beforeUpload = (file) => {
    setAvatarFile(file);

    setAvatarPreview(URL.createObjectURL(file));
    return false;
  }

  async function onFinish(values) {
    try {
      let avatarFilename = null;
      // upload file
      if (avatarFile) {
        const uploadRes = await  uplaodFile(avatarFile);

        avatarFilename = uploadRes.data.file.filename;
      }
      
      const response= await  createUser(values, avatarFilename);


      message.success(response.data.message);
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  }
  return (
    <div>
      <h4>Create New User</h4>
      <Divider />
      <div style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 24}}>
        <Avatar 
          size={80}
          src={avatarPreview || undefined}
          icon={!avatarPreview && <UserOutlined />}
        />
        <Upload beforeUpload={beforeUpload} showUploadList={false} accept={"image/*"}>
          <Button icon={<CameraOutlined />}>
            {avatarPreview ? 'Change Picture' : "Add Profile Picture"}
          </Button>
        </Upload>
      </div>
      <Form onFinish={onFinish}>
        <Form.Item 
          label='Email'
          name='email'
          rules={[{required: true, message: "Email is required"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{required: true, message: "First Name is required"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{required: true, message: "Last Name is required"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name='password'
          rules={[
            {required: true, message: "Password is required"},
            {min: 8, message:"Password must be 8 chars mininum"}
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name='confirmPassword'
          rules={[
            {required: true, message: "Confirm Password is required"},
            {min: 8, message:"Confirm Password must be 8 chars mininum"}
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='Date Of Birth'
          name='dob'
        >
          <DatePicker style={{width: "100%"}} />
        </Form.Item>
      <Form.Item
  label='Account Type'
  name='role'
  rules={[{ required: true, message: "Account type is required" }]}
>
  <Select
    options={[
      { value: "USER", label: "User" },
      { value: "FEMME MALADE", label: "Femme Malade" },
      { value: "ADMINISTRATEUR", label: "Administrateur" },
      { value: "BENEVOLE", label: "Bénévole" },
      { value: "DONTEUR", label: "Donateur" },
      { value: "ASSOCIATION", label: "Association" },
    ]}
  />
</Form.Item>
        <Button type='primary' htmlType='submit'>
          Create
        </Button>
      </Form>
    </div>
  )
}
// email, firstName, lastName, password, confirmPassword, dob, role
export default AddUser