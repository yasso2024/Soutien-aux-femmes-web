import {
  Drawer,
  Divider,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  App,
  Avatar,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { uploadFile } from "../api/files";
import { updateUser } from "../api/users";

const EditUserDrawer = ({ open, setOpen, userDetails, refresh, setRefresh }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (open && userDetails) {
      form.setFieldsValue({
        ...userDetails,
        dob: userDetails.dob ? dayjs(userDetails.dob) : null,
      });

      setAvatar(userDetails.avatar || null);
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  }, [open, userDetails, form]);

  const beforeUpload = (file) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    return false;
  };

  async function onFinish(values) {
    try {
      if (!userDetails) return;

      let avatarFilename = avatar;

      if (avatarFile) {
        const uploadRes = await uploadFile(avatarFile);
        avatarFilename = uploadRes?.data?.file?.filename || avatar;
      }

     const payload = {
  ...values,
  dob: values.dob ? values.dob.format("YYYY-MM-DD") : undefined,
  avatar: avatarFilename,
};

      const response = await updateUser(userDetails._id || userDetails.id, payload);

      message.success(response?.data?.message || "User updated successfully");
      setOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      message.error(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    }
  }

  return (
    <Drawer
      title="Modifier l'utilisateur"
      open={open}
      onClose={() => setOpen(false)}
      size="large"
      destroyOnClose
      forceRender
    >
      <Divider />

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <Avatar
          size={80}
          src={
            avatarPreview ||
            (avatar ? `http://localhost:3000/uploads/${avatar}` : undefined)
          }
          icon={!avatarPreview && !avatar && <UserOutlined />}
        />

        <Upload beforeUpload={beforeUpload} showUploadList={false} accept="image/*">
          <Button icon={<CameraOutlined />}>
            {avatarPreview ? "Change Picture" : "Ajouter une photo de profil"}
          </Button>
        </Upload>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Prénom"
          name="firstName"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastName"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date de naissance" name="dob">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Type de compte"
          name="role"
          rules={[{ required: true, message: "Account type is required" }]}
        >
          <Select
            options={[
              { value: "ADMINISTRATEUR", label: "Administrateur" },
              { value: "BENEVOLE", label: "Bénévole" },
              { value: "FEMME MALADE", label: "Femme malade" },
              { value: "ASSOCIATION", label: "Association" },
              { value: "DONTEUR", label: "Donateur" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
         Modifier
        </Button>
      </Form>
    </Drawer>
  );
};

export default EditUserDrawer;