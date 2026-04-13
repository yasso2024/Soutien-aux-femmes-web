import { Card, Col, Row, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/admin";

const { Title } = Typography;

export default function StatisticsAdmin() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFemmes: 0,
    totalBenevoles: 0,
    totalAssociations: 0,
    totalDonateurs: 0,
    totalDemandes: 0,
    demandesEnAttente: 0,
    demandesValidees: 0,
    demandesRefusees: 0,
    totalDons: 0,
    donsConfirmes: 0,
    totalLogs: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDashboardStats();
        setStats(response.data?.stats || {});
      } catch (error) {
        console.warn("Route /admin/dashboard-stats non disponible");
      }
    }

    fetchData();
  }, []);

  const cards = [
    ["Utilisateurs", stats.totalUsers],
    ["Femmes", stats.totalFemmes],
    ["Bénévoles", stats.totalBenevoles],
    ["Associations", stats.totalAssociations],
    ["Donateurs", stats.totalDonateurs],
    ["Demandes", stats.totalDemandes],
    ["Demandes en attente", stats.demandesEnAttente],
    ["Demandes validées", stats.demandesValidees],
    ["Demandes refusées", stats.demandesRefusees],
    ["Dons", stats.totalDons],
    ["Dons confirmés", stats.donsConfirmes],
    ["Logs", stats.totalLogs],
  ];

  return (
    <div>
      <Title level={3}>Dashboard Admin</Title>
      <Row gutter={[16, 16]}>
        {cards.map(([title, value]) => (
          <Col xs={24} md={8} lg={6} key={title}>
            <Card>
              <Statistic title={title} value={value ?? 0} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}