import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Space,
  Divider,
  Carousel,
  Badge,
 Statistic,
} from "antd";
import {
  HeartOutlined,
  GiftOutlined,
  TeamOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80";

const sliderImages = [
  "https://img.freepik.com/vecteurs-libre/sensibilisation-au-cancer-du-sein-hope-pink-bright_1057-27838.jpg?semt=ais_hybrid&w=740&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDPt2Fr74Qa-STrWHHa1oUACj9qMeAT2Dvg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXChi9uqxwvCAH87mFYah-otPsIbX_MV2Fg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgk6HCF9-0AzwRlfTlcik7Jx2TE1hX7xU_BQ&s",
];

const heroStyle = {
  background: "linear-gradient(135deg, #ffe4ec, #ffe0f0, #fff0f6)",
  borderRadius: "24px",
  padding: "40px",
  marginBottom: "24px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  border: "1px solid rgba(196, 29, 127, 0.1)",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "16px",
  display: "block",
};

const sliderImageStyle = {
  width: "100%",
  height: "450px",
  objectFit: "cover",
  borderRadius: "24px",
  display: "block",
};

const cardStyle = {
  borderRadius: 20,
  height: "100%",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  border: "1px solid rgba(196, 29, 127, 0.1)",
  cursor: "pointer",
};

const sectionCardStyle = {
  borderRadius: 20,
  height: "100%",
  background: "white",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  border: "1px solid rgba(196, 29, 127, 0.1)",
};

const statsValueStyles = {
  content: {
    color: "#c41d7f",
  },
};

const handleImageError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMAGE) {
    e.currentTarget.src = FALLBACK_IMAGE;
  }
};

const DonateurPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "24px", background: "#fff9fc", minHeight: "100vh" }}>
      <div
        style={{
          background: "linear-gradient(90deg, #ff69b4, #ff1493, #c41d7f)",
          padding: "12px",
          textAlign: "center",
          borderRadius: "12px",
          marginBottom: "24px",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        🎗️ Ensemble pour sensibiliser, soutenir et agir
      </div>

      <div style={{ marginBottom: "32px" }}>
        <Carousel autoplay dots>
          {sliderImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Soutien cancer du sein - Image ${index + 1}`}
                style={sliderImageStyle}
                loading={index === 0 ? "eager" : "lazy"}
                onError={handleImageError}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div style={heroStyle}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={14}>
            <Badge.Ribbon text="Octobre Rose" color="#c41d7f">
              <Title level={2} style={{ color: "#c41d7f", marginBottom: 12 }}>
                Ensemble contre le cancer du sein
              </Title>
            </Badge.Ribbon>

            <Paragraph
              style={{
                fontSize: "16px",
                lineHeight: "1.6",
                marginTop: 16,
              }}
            >
              Rejoignez notre communauté solidaire pour soutenir les femmes et
              hommes touchés par le cancer du sein. Chaque geste compte dans
              cette lutte.
            </Paragraph>

            <div
              style={{
                background: "#fff0f6",
                padding: "16px",
                borderRadius: "16px",
                margin: "20px 0",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Statistic
                    title="Bénéficiaires aidés"
                    value={124}
                    prefix={<UserOutlined />}
                    styles={statsValueStyles}
                  />
                </Col>

                <Col xs={24} sm={8}>
                  <Statistic
                    title="Dons collectés"
                    value={45800}
                    prefix={<DollarOutlined />}
                    suffix="DH"
                    styles={statsValueStyles}
                  />
                </Col>

                <Col xs={24} sm={8}>
                  <Statistic
                    title="Donateurs"
                    value={89}
                    prefix={<TeamOutlined />}
                    styles={statsValueStyles}
                  />
                </Col>
              </Row>
            </div>

            <Paragraph
              style={{
                lineHeight: "1.6",
                background: "#fff",
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <Text strong style={{ color: "#c41d7f" }}>
                Comment ça marche ?
              </Text>
              <br />
              <strong>1.</strong> Une personne atteinte de cancer fait une
              demande d'aide.
              <br />
              <strong>2.</strong> Un donateur propose un soutien financier ou
              matériel.
              <br />
              <strong>3.</strong> La demande est traitée et l'aide est
              acheminée.
            </Paragraph>

            <Space wrap size="middle" style={{ marginTop: 16 }}>
              <Button
                type="primary"
                icon={<GiftOutlined />}
                size="large"
                onClick={() => navigate("/dons/add")}
                style={{
                  borderRadius: "12px",
                  height: "48px",
                  background: "#c41d7f",
                  borderColor: "#c41d7f",
                }}
              >
                Faire un don 💝
              </Button>

              <Button
                icon={<HeartOutlined />}
                size="large"
                onClick={() => navigate("/demandes/add")}
                style={{
                  borderRadius: "12px",
                  height: "48px",
                  borderColor: "#c41d7f",
                  color: "#c41d7f",
                }}
              >
                Demander de l'aide
              </Button>

              <Button
                icon={<FileTextOutlined />}
                size="large"
                onClick={() => navigate("/dons")}
                style={{ borderRadius: "12px", height: "48px" }}
              >
                Voir les dons
              </Button>

              <Button
                icon={<UnorderedListOutlined />}
                size="large"
                onClick={() => navigate("/demandes")}
                style={{ borderRadius: "12px", height: "48px" }}
              >
                Voir les demandes
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={10}>
            <img
              src="src/assets/courage-rose.png"
              alt="Soutien cancer du sein"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "24px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                display: "block",
              }}
              loading="lazy"
              onError={handleImageError}
            />
          </Col>
        </Row>
      </div>

      <Divider
        titlePlacement="left"
        style={{ fontSize: "24px", fontWeight: "600", color: "#c41d7f" }}
      >
        🎗️ Notre mission
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card variant="borderless" style={sectionCardStyle}>
            <Space align="start">
              <CheckCircleOutlined
                style={{ fontSize: 28, color: "#c41d7f", marginTop: 4 }}
              />
              <div>
                <Title level={4}>Soutien direct</Title>
                <Paragraph>
                  Nous mettons en relation les personnes ayant besoin d'aide
                  avec des donateurs prêts à agir rapidement.
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="borderless" style={sectionCardStyle}>
            <Space align="start">
              <HeartOutlined
                style={{ fontSize: 28, color: "#c41d7f", marginTop: 4 }}
              />
              <div>
                <Title level={4}>Solidarité humaine</Title>
                <Paragraph>
                  Chaque don contribue à redonner espoir, dignité et réconfort
                  aux patientes et à leurs proches.
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="borderless" style={sectionCardStyle}>
            <Space align="start">
              <RiseOutlined
                style={{ fontSize: 28, color: "#c41d7f", marginTop: 4 }}
              />
              <div>
                <Title level={4}>Impact durable</Title>
                <Paragraph>
                  Votre engagement aide à financer les soins, le transport,
                  l'accompagnement et les besoins essentiels.
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider
        titlePlacement="left"
        style={{
          marginTop: 40,
          fontSize: "24px",
          fontWeight: "600",
          color: "#c41d7f",
        }}
      >
        💗 Pourquoi donner ?
      </Divider>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card variant="borderless" style={cardStyle} hoverable>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
              alt="Aide médicale"
              style={imageStyle}
              loading="lazy"
              onError={handleImageError}
            />
            <Title level={4} style={{ marginTop: 16, textAlign: "center" }}>
              Financer les soins
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
              Vos dons aident à couvrir les traitements, examens médicaux et
              médicaments indispensables.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="borderless" style={cardStyle} hoverable>
            <img
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80"
              alt="Soutien aux patientes"
              style={imageStyle}
              loading="lazy"
              onError={handleImageError}
            />
            <Title level={4} style={{ marginTop: 16, textAlign: "center" }}>
              Soutien psychologique
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
              Votre générosité offre un accompagnement psychologique essentiel
              aux patientes et à leurs familles.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card variant="borderless" style={cardStyle} hoverable>
            <img
              src="src/assets/courage.jpeg"
              alt="Espoir"
              style={imageStyle}
              loading="lazy"
              onError={handleImageError}
            />
            <Title level={4} style={{ marginTop: 16, textAlign: "center" }}>
              Donner de l'espoir
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
              Derrière chaque don se cache un message d'espoir. Vous faites la
              différence dans la vie de quelqu'un.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <div
        style={{
          marginTop: 48,
          padding: "40px",
          background: "linear-gradient(135deg, #fff0f6, #ffe4ec)",
          borderRadius: "24px",
          textAlign: "center",
        }}
      >
        <HeartOutlined
          style={{ fontSize: 48, color: "#c41d7f", marginBottom: 16 }}
        />
        <Title level={3} style={{ color: "#c41d7f" }}>
          Ensemble, nous sommes plus forts
        </Title>
        <Paragraph style={{ fontSize: "16px" }}>
          Rejoignez notre mouvement solidaire et aidez-nous à faire reculer le
          cancer du sein. Chaque geste compte, chaque don sauve des vies.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          icon={<HeartOutlined />}
          onClick={() => navigate("/dons/add")}
          style={{
            background: "#c41d7f",
            borderColor: "#c41d7f",
            marginTop: 16,
            borderRadius: "12px",
            height: "48px",
          }}
        >
          Je fais un don maintenant
        </Button>
      </div>
    </div>
  );
};

export default DonateurPage;