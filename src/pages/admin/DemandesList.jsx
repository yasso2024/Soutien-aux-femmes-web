import { App, Avatar, Button, Card, Input, Popconfirm, Space, Table, Tag, Typography } from "antd";
import { CheckOutlined, CloseOutlined, FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { listDemandes, updateStatutDemande } from "../../api/demandes";

const { Title, Text } = Typography;

const statutColor = {
  EN_ATTENTE: "orange",
  VALIDEE: "green",
  REFUSEE: "red",
  EN_COURS: "blue",
  TERMINEE: "default",
};

const typeColor = {
  FINANCIERE: "#3B82F6",
  MATERIELLE: "#8B5CF6",
  ACCOMPAGNEMENT: "#0F9488",
  LOGEMENT: "#F59E0B",
};

function DemandesList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    listDemandes()
      .then((res) => {
        const demandes = res.data?.demandes ?? res.data ?? [];
        setData(Array.isArray(demandes) ? demandes : []);
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const changeStatut = async (id, statut) => {
    setLoadingId(id + statut);
    try {
      await updateStatutDemande(id, statut);
      setData((prev) => prev.map((d) => (d._id === id ? { ...d, statut } : d)));
      message.success(
        statut === "VALIDEE" ? "Demande validée" : "Demande refusée"
      );
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = data.filter((d) => {
    const q = search.toLowerCase();
    const nom = `${d.femme?.firstName ?? ""} ${d.femme?.lastName ?? ""}`.toLowerCase();
    return (
      nom.includes(q) ||
      d.titre?.toLowerCase().includes(q) ||
      d.type?.toLowerCase().includes(q) ||
      d.statut?.toLowerCase().includes(q)
    );
  });

  const enAttente = data.filter((d) => d.statut === "EN_ATTENTE").length;

  const columns = [
    {
      title: "Bénéficiaire",
      key: "femme",
      render: (_, r) =>
        r.femme ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar
              size={36}
              style={{ background: "#f7078b18", color: "#f7078b", flexShrink: 0, fontWeight: 700 }}
            >
              {r.femme.firstName?.[0]}
            </Avatar>
            <div>
              <Text strong style={{ display: "block", fontSize: 13 }}>
                {r.femme.firstName} {r.femme.lastName}
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>{r.femme.email}</Text>
            </div>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Titre",
      dataIndex: "titre",
      ellipsis: true,
      render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text>,
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
      title: "Date",
      dataIndex: "dateCreation",
      render: (v) => (v ? new Date(v).toLocaleDateString("fr-FR") : "—"),
      sorter: (a, b) => new Date(a.dateCreation) - new Date(b.dateCreation),
      defaultSortOrder: "descend",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      render: (v) => (
        <Tag color={statutColor[v] || "default"} style={{ borderRadius: 6 }}>
          {v?.replace("_", " ")}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => {
        const pending = r.statut === "EN_ATTENTE";
        return (
          <Space size={6}>
            <Popconfirm
              title="Valider cette demande ?"
              onConfirm={() => changeStatut(r._id, "VALIDEE")}
              okText="Oui"
              cancelText="Non"
              disabled={!pending}
            >
              <Button
                size="small"
                icon={<CheckOutlined />}
                style={{ color: "#10B981", borderColor: "#10B981" }}
                loading={loadingId === r._id + "VALIDEE"}
                disabled={!pending}
              >
                Valider
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Refuser cette demande ?"
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
          background: "linear-gradient(135deg, #f7078b 0%, #B91C7C 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #f7078b40",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={56}
          icon={<FileTextOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Gestion des demandes d'aide
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} demande{data.length !== 1 ? "s" : ""} au total
            {enAttente > 0 && ` · ${enAttente} en attente de traitement`}
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
            placeholder="Rechercher par bénéficiaire, titre, type ou statut…"
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

export default DemandesList;
