import { App, Avatar, Button, Card, Input, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { CheckOutlined, CloseOutlined, FileProtectOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { listPropositionsAide, updateStatutProposition } from "../../api/propositions";

const { Title, Text } = Typography;
const TEAL = "#0F9488";

const statutColor = {
  PROPOSEE: "orange",
  ACCEPTEE: "green",
  REFUSEE: "red",
};

const typeColor = {
  FINANCIERE: "#3B82F6",
  MATERIELLE: "#8B5CF6",
  ACCOMPAGNEMENT: "#0F9488",
  LOGEMENT: "#F59E0B",
};

function PropositionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    listPropositionsAide()
      .then((res) => {
        const propositions = res.data?.propositions ?? res.data ?? [];
        setData(Array.isArray(propositions) ? propositions : []);
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const changeStatut = async (id, statut) => {
    setLoadingId(id + statut);
    try {
      await updateStatutProposition(id, statut);
      setData((prev) => prev.map((p) => (p._id === id ? { ...p, statut } : p)));
      message.success(statut === "ACCEPTEE" ? "Proposition acceptée" : "Proposition refusée");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = data.filter((p) => {
    const q = search.toLowerCase();
    const org = (
      p.association?.nomOrganisation ||
      `${p.association?.firstName ?? ""} ${p.association?.lastName ?? ""}`
    ).toLowerCase();
    return (
      org.includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.demande?.titre?.toLowerCase().includes(q) ||
      p.statut?.toLowerCase().includes(q)
    );
  });

  const enAttente = data.filter((p) => p.statut === "PROPOSEE").length;

  const columns = [
    {
      title: "Association",
      key: "association",
      render: (_, r) =>
        r.association ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar
              size={36}
              style={{ background: TEAL + "22", color: TEAL, flexShrink: 0, fontWeight: 700 }}
            >
              {(r.association.nomOrganisation || r.association.firstName)?.[0]}
            </Avatar>
            <div>
              <Text strong style={{ display: "block", fontSize: 13 }}>
                {r.association.nomOrganisation ||
                  `${r.association.firstName} ${r.association.lastName}`}
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {r.association.email}
              </Text>
            </div>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Demande concernée",
      key: "demande",
      render: (_, r) =>
        r.demande ? (
          <div>
            <Tag
              style={{
                borderRadius: 6,
                background: (typeColor[r.demande.type] ?? "#888") + "18",
                color: typeColor[r.demande.type] ?? "#888",
                borderColor: (typeColor[r.demande.type] ?? "#888") + "50",
              }}
            >
              {r.demande.type}
            </Tag>
            <Text style={{ marginLeft: 6, fontSize: 12 }}>{r.demande.titre}</Text>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Date",
      dataIndex: "dateProposition",
      render: (v) => (v ? new Date(v).toLocaleDateString("fr-FR") : "—"),
      sorter: (a, b) => new Date(a.dateProposition) - new Date(b.dateProposition),
      defaultSortOrder: "descend",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      render: (v) => (
        <Tag color={statutColor[v] || "default"} style={{ borderRadius: 6 }}>
          {v}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => {
        const pending = r.statut === "PROPOSEE";
        return (
          <Space size={6}>
            <Popconfirm
              title="Accepter cette proposition ?"
              onConfirm={() => changeStatut(r._id, "ACCEPTEE")}
              okText="Oui"
              cancelText="Non"
              disabled={!pending}
            >
              <Button
                size="small"
                icon={<CheckOutlined />}
                style={{ color: "#10B981", borderColor: "#10B981" }}
                loading={loadingId === r._id + "ACCEPTEE"}
                disabled={!pending}
              >
                Accepter
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Refuser cette proposition ?"
              onConfirm={() => changeStatut(r._id, "REFUSEE")}
              okText="Oui"
              cancelText="Non"
              disabled={!pending}
            >
              <Button
                size="small"
                danger
                icon={<CloseOutlined />}
                loading={loadingId === r._id + "REFUSEE"}
                disabled={!pending}
              >
                Refuser
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0F9488 0%, #0D7A6E 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #0F948840",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={56}
          icon={<FileProtectOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Propositions d'aide des associations
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} proposition{data.length !== 1 ? "s" : ""} au total
            {enAttente > 0 && ` · ${enAttente} en attente de décision`}
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
            placeholder="Rechercher par association, description ou statut…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 420, borderRadius: 8 }}
            allowClear
          />
        </div>
        <Table
          rowKey={(r) => r._id || r.id}
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

export default PropositionsList;
