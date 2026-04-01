import { App, Table, Card, Input, Typography, Avatar, Tag } from "antd";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { listEvents } from "../../api/events";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const ORANGE = "#F97316";

const typeColor = {
  CONFERENCE: "#3B82F6",
  ATELIER: "#8B5CF6",
  REUNION: "#0F9488",
  FORMATION: "#F59E0B",
  SENSIBILISATION: "#EF4444",
};

function Events() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { message } = App.useApp();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await listEvents();
        setData(Array.isArray(response.data) ? response.data : response.data?.data || []);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [message]);

  const filtered = data.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.titre?.toLowerCase().includes(q) ||
      e.description?.toLowerCase().includes(q) ||
      e.lieu?.toLowerCase().includes(q) ||
      e.type?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Événement",
      key: "event",
      render: (_, r) => (
        <div>
          <Text strong style={{ display: "block", fontSize: 13 }}>
            {r.titre}
          </Text>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {r.description && r.description.substring(0, 60)}
            {r.description && r.description.length > 60 ? "..." : ""}
          </Text>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (v) => (
        <Tag
          style={{
            borderRadius: 6,
            background: (typeColor[v] ?? "#888") + "18",
            color: typeColor[v] ?? "#888",
            borderColor: (typeColor[v] ?? "#888") + "50",
          }}
        >
          {v}
        </Tag>
      ),
    },
    {
      title: "Lieu",
      dataIndex: "lieu",
      render: (v) => (
        <Text style={{ fontSize: 12 }}>{v || "—"}</Text>
      ),
    },
    {
      title: "Début",
      dataIndex: "dateDebut",
      render: (v) =>
        v ? format(new Date(v), "dd/MM/yyyy") : "—",
      sorter: (a, b) => new Date(a.dateDebut) - new Date(b.dateDebut),
      defaultSortOrder: "descend",
    },
    {
      title: "Fin",
      dataIndex: "dateFin",
      render: (v) =>
        v ? format(new Date(v), "dd/MM/yyyy") : "—",
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #E67E22 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #F9731640",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={56}
          icon={<CalendarOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Événements
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} événement{data.length !== 1 ? "s" : ""}
          </Text>
        </div>
      </div>

      <Card
        style={{ borderRadius: 16, border: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            placeholder="Rechercher par titre, lieu ou type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 420, borderRadius: 8 }}
            allowClear
          />
        </div>
        <Table
          rowKey={(record) => record._id || record.id}
          columns={columns}
          dataSource={filtered}
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          size="small"
          style={{ padding: "0 8px" }}
        />
      </Card>
    </div>
  );
}

export default Events;