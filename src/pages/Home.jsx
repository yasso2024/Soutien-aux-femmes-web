import { Divider, Typography, Row, Col, Button } from "antd";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text } = Typography;

const HomePage = () => {
  const [hoveredVideo, setHoveredVideo] = useState(false);

  const statCardStyle = {
    background: "linear-gradient(135deg, #e91e63 0%, #c2185b 100%)",
    color: "white",
    borderRadius: 20,
    padding: "30px 20px",
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(233,30,99,0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    height: "100%",
  };

  const numberStyle = { fontSize: "42px", fontWeight: "bold", marginBottom: "5px" };
  const textStyle = { fontSize: "18px", opacity: 0.9 };

  // Données pour les acteurs solidaires
  const actors = [
    { title: "Association", img: "src/assets/association.jpg", description: "Soutien social et médical." },
    { title: "Bénévole", img: "src/assets/benevole.jpg", description: "Accompagnement moral et humain." },
    { title: "Donateur", img: "src/assets/donateur.jpg", description: "Soutien financier aux actions solidaires." },
  ];

  // Données pour les statistiques
  const stats = [
    { number: "+12 000", text: "Bénévoles" },
    { number: "+1 200", text: "Associations" },
    { number: "+8 500", text: "Femmes Aidées" },
  ];

  // Données pour les vidéos/messages
  const videos = [
    {
      title: "You're strong... we are with you.",
      subtitle: "آنت قوية.. ونحن معك",
      videoSrc: "src/assets/videos/video1.mp4",
      image: "src/assets/courage.jpeg",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* TOP BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        backgroundColor: "#f8f9fa",
        borderBottom: "2px solid #e91e63"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24
        }}>
          <img
            src="src/assets/courage-rose.png"
            alt="Courage Rose"
            style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "contain" }}
          />
          <Text strong style={{ color: "#e91e63", fontSize: "20px" }}>Courage Rose</Text>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{
        background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        padding: "20px 0",  // espace haut/bas
        marginBottom: "60px",
      }}>
        <div style={{ maxWidth: "800px" }}>
          <Title level={1} style={{ color: "white", fontSize: "48px", marginBottom: "20px" }}>
            Soutien aux femmes atteintes du cancer du sein en Tunisie.
          </Title>
        </div>
        <Button size="large" style={{
          backgroundColor: "#e91e63",
          borderColor: "#e91e63",
          color: "white",
          padding: "0 40px",
          height: "50px",
          fontSize: "18px",
          marginBottom: "10px"
        }}>Voir</Button>
      </div>

      <div style={{ padding: "0 40px 60px 40px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* SECTION FEMME MALADE */}
        <Row gutter={40} align="middle" style={{ marginBottom: "80px" }}>
          {/* Colonne texte */}
          <Col xs={24} md={12}>
            <div style={{
              padding: "40px",
              borderRadius: "30px",
              background: "linear-gradient(145deg, #fff0f6 0%, #ffffff 100%)",
              border: "2px solid #e91e63",
              boxShadow: "0 20px 40px rgba(233,30,99,0.1)"
            }}>
              <Title level={2} style={{ color: "#e91e63", marginBottom: "20px" }}>Femme malade</Title>
              <Paragraph style={{ fontSize: "18px", lineHeight: "1.6" }}>
                Plateforme numérique destinée à aider les femmes atteintes du cancer du sein en Tunisie.
              </Paragraph>
              <div style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "15px",
                border: "1px solid #e91e63"
              }}>
                <Text strong style={{ color: "#e91e63" }}>+8 500 femmes déjà accompagnées</Text>
              </div>
            </div>
          </Col>

          {/* Colonne image */}
          <Col xs={24} md={12}>
            <div style={{
              height: "400px",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(233,30,99,0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fce4ec"
            }}>
              <img
                src="src/assets/image1.jpeg"
                alt="Femme malade"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "30px" }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x400/e91e63/ffffff?text=Femme"; }}
              />
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#e91e63", opacity: 0.3 }} />

        {/* QUI SOMMES-NOUS */}
        <Row gutter={40} align="middle" style={{ margin: "80px 0" }}>
          <Col xs={24} md={12}>
            <Title level={2} style={{ color: "#e91e63" }}>Qui sommes-nous ?</Title>
            <Paragraph style={{ fontSize: "18px", lineHeight: "1.6" }}>
              Courage Rose accompagne les femmes atteintes du cancer du sein grâce à des bénévoles et partenaires engagés.
            </Paragraph>
            <Button type="primary" style={{ backgroundColor: "#e91e63", borderColor: "#e91e63", marginTop: "20px" }}>
              En savoir plus
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ height: "350px", borderRadius: "30px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                alt="Support"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#e91e63", opacity: 0.3 }} />

        {/* NOS ACTEURS SOLIDAIRES */}
        <Title level={2} style={{ textAlign: "center", color: "#e91e63", marginBottom: "50px" }}>Nos Acteurs Solidaires</Title>
        <Row gutter={[30, 30]} style={{ marginBottom: "80px" }}>
          {actors.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <div style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "2px solid #e91e63",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x200/e91e63/ffffff?text=" + item.title; }}
                  />
                </div>
                <div style={{ padding: "30px", textAlign: "center", flex: 1 }}>
                  <Title level={3} style={{ color: "#e91e63", marginBottom: "15px" }}>{item.title}</Title>
                  <Paragraph style={{ marginBottom: "25px", fontSize: "16px" }}>{item.description}</Paragraph>
                  <Button type="primary" icon={<SearchOutlined />} style={{
                    backgroundColor: "#e91e63",
                    borderColor: "#e91e63",
                    borderRadius: "25px",
                    padding: "0 25px"
                  }}>Rechercher</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Divider style={{ borderColor: "#e91e63", opacity: 0.3 }} />

        {/* STATISTIQUES */}
        <Row gutter={[30, 30]} justify="center" style={{ margin: "60px 0" }}>
          {stats.map((stat, idx) => (
            <Col xs={24} md={8} key={idx}>
              <div style={statCardStyle}
                   onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
                   onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={numberStyle}>{stat.number}</div>
                <div style={textStyle}>{stat.text}</div>
              </div>
            </Col>
          ))}
        </Row>

        <Divider style={{ borderColor: "#e91e63", opacity: 0.3 }} />

        {/* VIDÉOS ET MESSAGES */}
        <div style={{ margin: "60px 0" }}>
          <Title level={2} style={{ color: "#e91e63", marginBottom: "30px", textAlign: "center" }}>Nos vidéos</Title>
          {videos.map((item, index) => (
            <Row justify="center" gutter={[40, 40]} align="middle" key={index}>
              {/* Vidéo */}
              <Col xs={24} md={12} style={{ textAlign: "right" }}>
                <div style={{
                  display: "inline-block",
                  width: "70%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(233,30,99,0.2)",
                  backgroundColor: "#000"
                }}>
                  <video controls style={{ width: "100%", height: "auto", display: "block" }}>
                    <source src={item.videoSrc} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                </div>
              </Col>

              {/* Message */}
              <Col xs={24} md={12}>
                <div style={{
                  padding: "30px",
                  background: "linear-gradient(145deg, #fff0f6 0%, #ffffff 100%)",
                  borderRadius: "20px",
                  border: "2px solid #e91e63",
                  textAlign: "center",
                  boxShadow: "0 15px 30px rgba(233,30,99,0.15)",
                  width: "90%"
                }}>
                  <Title level={3} style={{ color: "#e91e63", marginBottom: "15px", fontSize: "24px" }}>
                    {item.title}
                  </Title>
                  <div style={{ width: "50px", height: "2px", background: "#e91e63", margin: "10px auto" }} />
                  <Title level={2} style={{ color: "#e91e63", fontSize: "30px", margin: "10px 0 0 0" }}>
                    {item.subtitle}
                  </Title>
                  <div style={{ marginTop: "20px" }}>
                    <img src={item.image} alt={item.title} style={{ width: "200px", borderRadius: "45px" }} />
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "60px", padding: "20px", textAlign: "center", borderTop: "2px solid #e91e63" }}>
          <Text type="secondary">© 2026 Courage Rose - 11:47</Text>
        </div>
      </div>
    </div>
  );
};

export default HomePage;