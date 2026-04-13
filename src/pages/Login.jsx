import { Button, Col, Divider, Form, Input, message, Row, Typography } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/auth";
import loginImage from "../assets/login.jpg"; // change le chemin si nécessaire

const { Title, Paragraph, Text } = Typography;

function Login() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onFinish(values) {
    try {
      const response = await loginUser(values);

      setToken(response.data.token);
      message.success(response.data.message || "Connexion réussie");

      navigate("/");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Erreur lors de la connexion"
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #fff1f6 0%, #ffffff 45%, #fff7fb 100%)",
        padding: "32px 16px",
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "calc(100vh - 64px)" }}>
        <Col xs={24} lg={18} xl={16}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 25px 70px rgba(233, 30, 99, 0.12)",
              border: "1px solid #f7d7e5",
            }}
          >
            <Row gutter={0}>
              <Col xs={0} md={11} lg={12}>
                <div
                  style={{
                    minHeight: 600,
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(rgba(36, 12, 28, 0.18), rgba(36, 12, 28, 0.35)), url(${loginImage}) center/cover no-repeat`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(247,7,139,0.16) 100%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 36,
                      left: 28,
                      right: 28,
                      background: "rgba(255,255,255,0.14)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      borderRadius: 22,
                      padding: 24,
                      color: "#fff",
                    }}
                  >
                    <Title level={3} style={{ color: "#fff", marginBottom: 10 }}>
                      Bon retour
                    </Title>

                    <Paragraph
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        marginBottom: 0,
                        fontSize: 15,
                      }}
                    >
                      Connectez-vous à votre espace pour accéder à la plateforme.
                    </Paragraph>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={13} lg={12}>
                <div
                  style={{
                    padding: "38px 34px",
                    minHeight: 600,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div style={{ marginBottom: 18 }}>
                    <Text
                      style={{
                        display: "inline-block",
                        background: "#fff0f6",
                        color: "#d81b60",
                        padding: "6px 14px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      Courage Rose
                    </Text>
                  </div>

                  <Title level={2} style={{ marginBottom: 8, color: "#1f1f1f" }}>
                    Se connecter
                  </Title>

                  <Paragraph style={{ color: "#666", marginBottom: 22, fontSize: 15 }}>
                    Entrez vos informations pour accéder à votre compte.
                  </Paragraph>

                  <Divider style={{ margin: "0 0 24px 0" }} />

                  <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Email requis" },
                        { type: "email", message: "Email invalide" },
                      ]}
                    >
                      <Input
                       
                      />
                    </Form.Item>

                    <Form.Item
                      label="Mot de passe"
                      name="password"
                      rules={[{ required: true, message: "Mot de passe requis" }]}
                    >
                      <Input.Password
                        
                      />
                    </Form.Item>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        marginTop: 8,
                      }}
                    >
                      <Link to="/forgot-password" style={{ color: "#d81b60", fontWeight: 500 }}>
                        Mot de passe oublié ?
                      </Link>

                      <div style={{ textAlign: "center" }}>
                        <Text style={{ color: "#666" }}> Pas encore de compte ?{" "}
                          <Link to="/signup" style={{ fontWeight: 600 }}>  Créer un compte</Link> </Text> </div>

                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{
                          height: 48,
                          borderRadius: 12,
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #f7078b 0%, #d81b60 100%)",
                          border: "none",
                          boxShadow: "0 10px 24px rgba(247, 7, 139, 0.25)",
                        }}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;