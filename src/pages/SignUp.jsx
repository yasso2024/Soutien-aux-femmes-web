import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography
} from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signUpUser } from "../api/auth";
import femmeImage from "../assets/femme.jpg";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;

const REGIONS = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba",
  "Le Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid",
  "Gabès", "Médenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"
];

function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/login";
  const roleFromUrl = searchParams.get("role") || "FEMME MALADE";

  async function onFinish(values) {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        telephone: values.telephone,
        region: values.region,
        role: values.role || roleFromUrl,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : undefined
      };

      const response = await signUpUser(payload);
      message.success(response.data?.message || "Inscription réussie");
      navigate(redirect);
    } catch (error) {
      message.error(
        error.response?.data?.message || error.message || "Erreur lors de l'inscription"
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #fff1f6 0%, #ffffff 45%, #fff7fb 100%)",
        padding: "32px 16px"
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "calc(100vh - 64px)" }}>
        <Col xs={24} lg={20} xl={18}>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 25px 70px rgba(233, 30, 99, 0.12)",
              border: "1px solid #f7d7e5"
            }}
          >
            <Row gutter={0}>
              <Col xs={0} md={11} lg={12}>
                <div
                  style={{
                    minHeight: 760,
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(rgba(36, 12, 28, 0.18), rgba(36, 12, 28, 0.35)), url(${femmeImage}) center/cover no-repeat`
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(247,7,139,0.16) 100%)"
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
                      color: "#fff"
                    }}
                  >
                    <Title level={3} style={{ color: "#fff", marginBottom: 10 }}>
                      Ensemble, plus fortes
                    </Title>

                    <Paragraph
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        marginBottom: 0,
                        fontSize: 15
                      }}
                    >
                      Une plateforme pour connecter les femmes malades, les bénévoles,
                      les associations et les donateurs autour d’un même objectif :
                      l’entraide et la solidarité.
                    </Paragraph>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={13} lg={12}>
                <div
                  style={{
                    padding: "38px 34px",
                    minHeight: 760,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#ffffff"
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
                        fontSize: 13
                      }}
                    >
                      Courage Rose
                    </Text>
                  </div>

                  <Title level={2} style={{ marginBottom: 8, color: "#1f1f1f" }}>
                    Créer un compte
                  </Title>

                  <Paragraph style={{ color: "#666", marginBottom: 22, fontSize: 15 }}>
                    Rejoignez la plateforme solidaire dédiée aux femmes atteintes du cancer du sein en Tunisie.
                  </Paragraph>

                  <Divider style={{ margin: "0 0 24px 0" }} />

                  <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ role: roleFromUrl }}
                    autoComplete="on"
                  >
                    <Row gutter={14}>
                      <Col span={12}>
                        <Form.Item
                          label="Prénom"
                          name="firstName"
                          rules={[{ required: true, message: "Prénom requis" }]}
                        >
                          <Input
                            size="large"
                            placeholder="Votre prénom"
                            style={{ borderRadius: 12 }}
                            autoComplete="given-name"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Nom"
                          name="lastName"
                          rules={[{ required: true, message: "Nom requis" }]}
                        >
                          <Input
                            size="large"
                            placeholder="Votre nom"
                            style={{ borderRadius: 12 }}
                            autoComplete="family-name"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Email requis" },
                        { type: "email", message: "Email invalide" }
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="exemple@email.com"
                        style={{ borderRadius: 12 }}
                        autoComplete="email"
                      />
                    </Form.Item>

                    <Row gutter={14}>
                      <Col span={12}>
                        <Form.Item label="Téléphone" name="telephone">
                          <Input
                            size="large"
                            placeholder="Téléphone"
                            style={{ borderRadius: 12 }}
                            autoComplete="tel"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item label="Date de naissance" name="dob">
                          <DatePicker
                            size="large"
                            style={{ width: "100%" }}
                            format="YYYY-MM-DD"
                            placeholder="Choisir une date"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={14}>
                      <Col span={12}>
                        <Form.Item label="Région" name="region">
                          <Select
                            size="large"
                            allowClear
                            placeholder="Choisir une région"
                            style={{ width: "100%" }}
                            options={REGIONS.map((region) => ({
                              value: region,
                              label: region
                            }))}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label="Rôle"
                          name="role"
                          rules={[{ required: true, message: "Rôle requis" }]}
                        >
                          <Select
                            size="large"
                            style={{ width: "100%" }}
                            options={[
                              { value: "FEMME MALADE", label: "Femme malade" },
                              { value: "BENEVOLE", label: "Bénévole" },
                              { value: "DONTEUR", label: "Donateur" },
                              { value: "ASSOCIATION", label: "Association" }
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={14}>
                      <Col span={12}>
                        <Form.Item
                          label="Mot de passe"
                          name="password"
                          rules={[
                            { required: true, message: "Mot de passe requis" },
                            { min: 8, message: "Minimum 8 caractères" }
                          ]}
                        >
                          <Input.Password
                            size="large"
                            placeholder="********"
                            style={{ borderRadius: 12 }}
                            autoComplete="new-password"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
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
                              }
                            })
                          ]}
                        >
                          <Input.Password
                            size="large"
                            placeholder="********"
                            style={{ borderRadius: 12 }}
                            autoComplete="new-password"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
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
                          boxShadow: "0 10px 24px rgba(247, 7, 139, 0.25)"
                        }}
                      >
                        Créer mon compte
                      </Button>

                      <div style={{ textAlign: "center" }}>
                        <Text style={{ color: "#666" }}>
                          Déjà un compte ?{" "}
                          <Link to="/login" style={{ fontWeight: 600 }}>
                            Se connecter
                          </Link>
                        </Text>
                      </div>
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

export default SignUp;