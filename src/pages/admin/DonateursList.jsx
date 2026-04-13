import { App, Avatar, Card, Input, Table, Tag, Typography } from "antd";
import { GiftOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { listDonateurs } from "../../api/users";

const { Title, Text } = Typography;
const AMBER = "#F59E0B";

function DonateursList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    listDonateurs()
      .then((res) => setData(res.data?.users || res.data || []))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const filtered = data.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.region?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Donateur",
      key: "donateur",
      render: (_, u) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={38} icon={<GiftOutlined />} style={{ background: AMBER + "22", color: AMBER, flexShrink: 0 }} />
          <div>
            <Text strong style={{ display: "block", fontSize: 13 }}>{u.firstName} {u.lastName}</Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{u.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Téléphone",
      dataIndex: "telephone",
      render: (v) => v || <Text type="secondary">—</Text>,
    },
    {
      title: "Région",
      dataIndex: "region",
      render: (v) => v
        ? <Tag style={{ borderRadius: 6, background: AMBER + "18", color: AMBER, borderColor: AMBER + "50" }}>{v}</Tag>
        : <Text type="secondary">—</Text>,
    },
    {
      title: "Inscription",
      dataIndex: "createdAt",
      render: (v) => v ? new Date(v).toLocaleDateString("fr-FR") : <Text type="secondary">—</Text>,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{
        background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        borderRadius: 20, padding: "24px 32px", marginBottom: 24,
        boxShadow: "0 8px 32px #F59E0B40",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <Avatar size={56} icon={<GiftOutlined />} style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }} />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>Donateurs inscrits</Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} donateur{data.length !== 1 ? "s" : ""} enregistré{data.length !== 1 ? "s" : ""}
          </Text>
        </div>
      </div>

      <Card style={{ borderRadius: 16, border: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }} styles={{ body: { padding: 0 } }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            placeholder="Rechercher par nom, email ou région…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 380, borderRadius: 8 }} allowClear
          />
        </div>
        <Table
          rowKey={(r) => r._id || r.id} columns={columns} dataSource={filtered}
          loading={loading} pagination={{ pageSize: 10, showSizeChanger: false }}
          size="small" style={{ padding: "0 8px" }}
        />
      </Card>
    </div>
  );
}

export default DonateursList;