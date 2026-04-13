import { Button, Form, Input, Card, App } from "antd";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../api/auth";
import loginImage from "../../assets/login.jpg";

function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  async function onFinish(values) {
    try {
      setLoading(true);

      const response = await loginUser(values);

      if (!response?.data?.token) {
        throw new Error("Aucun token reçu depuis le serveur");
      }

      const token = response.data.token;

      localStorage.setItem("auth-token", token);
      setToken(token);

      message.success(response.data.message || "Connexion réussie");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login error:", error);
      message.error(error.message || "Échec de connexion");
    } finally {
      setLoading(false);
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
          flexDirection: "row",
        }}
      >
        <Card
          bodyStyle={{ padding: 0 }}
          style={{ flex: 1, maxWidth: "100%", overflow: "hidden" }}
        >
          <img
            src={loginImage}
            alt="Illustration de connexion"
            style={{ width: "100%", height: "100%", minHeight: 560, objectFit: "cover" }}
          />
        </Card>

        <Card title="Connexion" style={{ flex: 1, maxWidth: "100%" }}>
          <p style={{ marginTop: -4, marginBottom: 16, color: "#666" }}>
            Connectez-vous pour acceder a votre espace
          </p>

          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email obligatoire" },
                { type: "email", message: "Email invalide" },
              ]}
            >
              <Input autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[
                { required: true, message: "Mot de passe obligatoire" },
                { min: 8, message: "Minimum 8 caractères" },
                { max: 32, message: "Maximum 32 caractères" },
              ]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link to="/signup">Créer un compte</Link>
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;