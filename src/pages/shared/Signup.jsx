import { Button, Card, Form, Input, Select, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../api/auth";
import signupImage from "../../assets/signup.png";

function Signup() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  async function onFinish(values) {
    try {
      const response = await signUpUser(values);
      message.success(response.data?.message || "Compte créé avec succès");
      navigate("/login");
    } catch (error) {
      message.error(error.message || "Erreur lors de l'inscription");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 20,
          width: "100%",
          maxWidth: 980,
          flexWrap: "nowrap",
        }}
      >
        <Card bodyStyle={{ padding: 0 }} style={{ flex: 1, overflow: "hidden" }}>
          <img
            src={signupImage}
            alt="Illustration d'inscription"
            style={{ width: "100%", height: "100%", minHeight: 700, objectFit: "cover" }}
          />
        </Card>

        <Card title="Créer un compte" style={{ flex: 1 }}>
          <Form layout="vertical" onFinish={onFinish} initialValues={{ role: "USER" }}>
            <Form.Item
              label="Prénom"
              name="firstName"
              rules={[{ required: true, message: "Prénom requis" }]}
            >
              <Input autoComplete="given-name" />
            </Form.Item>

            <Form.Item
              label="Nom"
              name="lastName"
              rules={[{ required: true, message: "Nom requis" }]}
            >
              <Input autoComplete="family-name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email requis" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Téléphone"
              name="telephone"
              rules={[{ required: true, message: "Téléphone requis" }]}
            >
              <Input autoComplete="tel" />
            </Form.Item>

            <Form.Item
              label="Région"
              name="region"
              rules={[{ required: true, message: "Région requise" }]}
            >
              <Input autoComplete="address-level1" />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: "Mot de passe requis" },
                { min: 8, message: "8 caractères minimum" },
                { max: 32, message: "32 caractères maximum" },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              label="Confirmer le mot de passe"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirmation requise" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les mots de passe ne correspondent pas")
                    );
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              label="Rôle"
              name="role"
              rules={[{ required: true, message: "Rôle requis" }]}
            >
              <Select
                options={[
                  { label: "Utilisateur", value: "USER" },
                  { label: "Administrateur", value: "ADMINISTRATEUR" },
                ]}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              S'inscrire
            </Button>

            <div style={{ marginTop: 12 }}>
              <Link to="/login">Déjà un compte ?</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Signup;