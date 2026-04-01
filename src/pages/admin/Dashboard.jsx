import { App, Avatar, Card, Col, Progress, Row, Statistic, Typography } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
  GiftOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/admin";

const { Title, Text } = Typography;

const PINK = "#f7078b";

const CARDS = (s) => [
  {
    title: "Utilisateurs",
    value: s.totalUsers,
    icon: <UserOutlined />,
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    title: "Femmes malades",
    value: s.totalFemmes,
    icon: <UserOutlined />,
    color: PINK,
    bg: "#FFF0F7",
  },
  {
    title: "Bénévoles",
    value: s.totalBenevoles,
    icon: <TeamOutlined />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    title: "Associations",
    value: s.totalAssociations,
    icon: <TeamOutlined />,
    color: "#0F9488",
    bg: "#F0FDFA",
  },
  {
    title: "Donateurs",
    value: s.totalDonateurs,
    icon: <GiftOutlined />,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
  {
    title: "Total demandes",
    value: s.totalDemandes,
    icon: <FileTextOutlined />,
    color: "#64748B",
    bg: "#F8FAFC",
  },
  {
    title: "Total dons",
    value: s.totalDons,
    icon: <DollarOutlined />,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    title: "Logs système",
    value: s.totalLogs,
    icon: <CalendarOutlined />,
    color: "#6366F1",
    bg: "#EEF2FF",
  },
];

function StatCard({ title, value, icon, color, bg }) {
  return (
    <Card
      styles={{ body: { padding: 20 } }}
      style={{
        borderRadius: 14,
        border: "none",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Avatar
          size={48}
          icon={icon}
          style={{ background: bg, color, flexShrink: 0, fontSize: 20 }}
        />
        <div>
          <Text style={{ fontSize: 12, color: "#888", display: "block" }}>
            {title}
          </Text>
          <Statistic
            value={value ?? 0}
            styles={{ content: { color, fontWeight: 700, fontSize: 26, lineHeight: 1.2 } }}
          />
        </div>
      </div>
    </Card>
  );
}

function Dashboard() {
  const { message } = App.useApp();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data?.stats || {}))
      .catch(() => message.error("Impossible de charger les statistiques"))
      .finally(() => setLoading(false));
  }, [message]);

  const total = stats.totalDemandes || 1;
  const enAttentePct = Math.round(((stats.demandesEnAttente || 0) / total) * 100);
  const valideePct = Math.round(((stats.demandesValidees || 0) / total) * 100);
  const refuseePct = Math.round(((stats.demandesRefusees || 0) / total) * 100);

  const donsTotal = stats.totalDons || 1;
  const confirmesPct = Math.round(((stats.donsConfirmes || 0) / donsTotal) * 100);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${PINK} 0%, #B91C7C 100%)`,
          borderRadius: 20,
          padding: "28px 36px",
          marginBottom: 28,
          boxShadow: `0 8px 32px ${PINK}40`,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "3px solid rgba(255,255,255,0.6)",
          }}
        />
        <div>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>
            Tableau de bord Administration
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)" }}>
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </div>
      </div>

      {/* Stat cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 28 }}>
        {CARDS(stats).map((c) => (
          <Col xs={24} sm={12} lg={6} key={c.title}>
            <StatCard {...c} />
          </Col>
        ))}
      </Row>

      {/* Demandes breakdown + Dons */}
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <span style={{ fontWeight: 700 }}>
                <FileTextOutlined style={{ marginRight: 8, color: PINK }} />
                Suivi des demandes
              </span>
            }
            loading={loading}
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
            styles={{ body: { paddingTop: 24 } }}
          >
            <Row gutter={[16, 32]}>
              <Col span={8} style={{ textAlign: "center" }}>
                <ClockCircleOutlined style={{ fontSize: 28, color: "#F59E0B" }} />
                <Statistic
                  value={stats.demandesEnAttente ?? 0}
                  styles={{ content: { color: "#F59E0B", fontWeight: 700 } }}
                />
                <Text style={{ fontSize: 12, color: "#888" }}>En attente</Text>
                <Progress
                  percent={enAttentePct}
                  showInfo={false}
                  strokeColor="#F59E0B"
                  style={{ marginTop: 6 }}
                />
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                <CheckCircleOutlined style={{ fontSize: 28, color: "#10B981" }} />
                <Statistic
                  value={stats.demandesValidees ?? 0}
                  styles={{ content: { color: "#10B981", fontWeight: 700 } }}
                />
                <Text style={{ fontSize: 12, color: "#888" }}>Validées</Text>
                <Progress
                  percent={valideePct}
                  showInfo={false}
                  strokeColor="#10B981"
                  style={{ marginTop: 6 }}
                />
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                <CloseCircleOutlined style={{ fontSize: 28, color: "#EF4444" }} />
                <Statistic
                  value={stats.demandesRefusees ?? 0}
                  styles={{ content: { color: "#EF4444", fontWeight: 700 } }}
                />
                <Text style={{ fontSize: 12, color: "#888" }}>Refusées</Text>
                <Progress
                  percent={refuseePct}
                  showInfo={false}
                  strokeColor="#EF4444"
                  style={{ marginTop: 6 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <span style={{ fontWeight: 700 }}>
                <DollarOutlined style={{ marginRight: 8, color: "#10B981" }} />
                Dons
              </span>
            }
            loading={loading}
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              height: "100%",
            }}
            styles={{ body: { paddingTop: 24 } }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Progress
                type="circle"
                percent={confirmesPct}
                strokeColor="#10B981"
                size={110}
                format={() => (
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 22, color: "#10B981" }}>
                      {stats.donsConfirmes ?? 0}
                    </div>
                    <div style={{ fontSize: 11, color: "#888" }}>confirmés</div>
                  </div>
                )}
              />
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Card
                  styles={{ body: { padding: "12px 16px", textAlign: "center" } }}
                  style={{ borderRadius: 10, background: "#ECFDF5", border: "none" }}
                >
                  <Statistic
                    value={stats.donsConfirmes ?? 0}
                    styles={{ content: { color: "#10B981", fontWeight: 700, fontSize: 20 } }}
                  />
                  <Text style={{ fontSize: 11, color: "#888" }}>Confirmés</Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  styles={{ body: { padding: "12px 16px", textAlign: "center" } }}
                  style={{ borderRadius: 10, background: "#FFF7ED", border: "none" }}
                >
                  <Statistic
                    value={(stats.totalDons ?? 0) - (stats.donsConfirmes ?? 0)}
                    styles={{ content: { color: "#F59E0B", fontWeight: 700, fontSize: 20 } }}
                  />
                  <Text style={{ fontSize: 11, color: "#888" }}>En attente</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
