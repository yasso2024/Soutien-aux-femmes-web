import { App, Avatar, Card, Input, Table, Tag, Typography } from "antd";
import { BankOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { listAssociations } from "../../api/users";

const { Title, Text } = Typography;
const TEAL = "#0F9488";

function AssociationsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    listAssociations()
      .then((res) => setData(res.data?.users || res.data || []))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const filtered = data.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.nomOrganisation?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.adresse?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Organisation",
      key: "org",
      render: (_, u) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={38} icon={<BankOutlined />} style={{ background: TEAL + "22", color: TEAL, flexShrink: 0 }} />
          <div>
            <Text strong style={{ display: "block", fontSize: 13 }}>
              {u.nomOrganisation || `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "—"}
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>{u.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Responsable",
      key: "responsable",
      render: (_, u) => (
        <Text style={{ fontSize: 13 }}>{u.firstName} {u.lastName}</Text>
      ),
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      render: (v) => v
        ? <Tag style={{ borderRadius: 6, background: TEAL + "12", color: TEAL, borderColor: TEAL + "40" }}>{v}</Tag>
        : <Text type="secondary">—</Text>,
    },
    {
      title: "Téléphone",
      dataIndex: "telephone",
      render: (v) => v || <Text type="secondary">—</Text>,
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
        background: "linear-gradient(135deg, #0F9488 0%, #0D7A6E 100%)",
        borderRadius: 20, padding: "24px 32px", marginBottom: 24,
        boxShadow: "0 8px 32px #0F948840",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <Avatar size={56} icon={<BankOutlined />} style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }} />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>Associations partenaires</Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} association{data.length !== 1 ? "s" : ""} enregistrée{data.length !== 1 ? "s" : ""}
          </Text>
        </div>
      </div>

      <Card style={{ borderRadius: 16, border: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }} styles={{ body: { padding: 0 } }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            placeholder="Rechercher par organisation, email ou adresse…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 400, borderRadius: 8 }} allowClear
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

export default AssociationsList;