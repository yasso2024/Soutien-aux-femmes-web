import {
  Divider,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  Avatar,
  App,
} from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useState } from "react";
import { uploadFile } from "../../api/files";
import { createUser } from "../../api/users";

const AddUser = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { message } = App.useApp();

  const beforeUpload = (file) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    return false;
  };

  async function onFinish(values) {
    try {
      let avatarFilename = null;

      if (avatarFile) {
        const uploadRes = await uploadFile(avatarFile);
        avatarFilename = uploadRes.data.file.filename;
      }

      const response = await createUser(values, avatarFilename);
      message.success(response.data.message || "Utilisateur créé");
    } catch (error) {
      message.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  }

  return (
    <div>
      <h4>Créer un nouvel utilisateur</h4>
      <Divider />

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <Avatar
          size={80}
          src={avatarPreview || undefined}
          icon={!avatarPreview && <UserOutlined />}
        />
        <Upload beforeUpload={beforeUpload} showUploadList={false} accept="image/*">
          <Button icon={<CameraOutlined />}>
            {avatarPreview ? "Change Picture" : "Ajouter une photo de profil"}
          </Button>
        </Upload>
      </div>

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Email invalid" },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          label="Prénom"
          name="firstName"
          rules={[{ required: true, message: "Prénom is required" }]}
        >
          <Input autoComplete="given-name" />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastName"
          rules={[{ required: true, message: "Nom is required" }]}
        >
          <Input autoComplete="family-name" />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            { required: true, message: "Mot de passe is required" },
            { min: 8, message: "Mot de passe must be 8 chars minimum" },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          label="Confirmer le mot de passe"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Confirm Password is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
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
          Créer
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;