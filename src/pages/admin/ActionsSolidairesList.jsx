import {
  App,
  Avatar,
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
  ThunderboltOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  listActionsSolidaires,
  changeActionStatut,
  deleteActionSolidaire,
} from "../../api/actionSolidaires";

const { Title, Text } = Typography;

const statutColor = {
  EN_ATTENTE: "orange",
  VALIDEE:    "green",
  REFUSEE:    "red",
  TERMINEE:   "default",
};

const statutLabel = {
  EN_ATTENTE: "En attente",
  VALIDEE:    "Validée",
  REFUSEE:    "Refusée",
  TERMINEE:   "Terminée",
};

function AdminActionsSolidaires() {
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch]     = useState("");
  const { message }             = App.useApp();

  useEffect(() => {
    listActionsSolidaires()
      .then((res) => {
        const actions = res.data?.actions ?? [];
        setData(Array.isArray(actions) ? actions : []);
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const changeStatut = async (id, statut) => {
    setLoadingId(id + statut);
    try {
      await changeActionStatut(id, statut);
      setData((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut } : a))
      );
      const labels = { VALIDEE: "validée", REFUSEE: "refusée", TERMINEE: "terminée" };
      message.success(`Action ${labels[statut] ?? "mise à jour"}`);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    setLoadingId(id + "DELETE");
    try {
      await deleteActionSolidaire(id);
      setData((prev) => prev.filter((a) => a._id !== id));
      message.success("Action supprimée");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = data.filter((a) => {
    const q = search.toLowerCase();
    const assoc = `${a.association?.firstName ?? ""} ${a.association?.lastName ?? ""}`.toLowerCase();
    return (
      a.titre?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.statut?.toLowerCase().includes(q) ||
      assoc.includes(q)
    );
  });

  const enAttente = data.filter((a) => a.statut === "EN_ATTENTE").length;

  const columns = [
    {
      title: "Titre",
      dataIndex: "titre",
      ellipsis: true,
      render: (v) => <Text strong style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      render: (v) => <Text type="secondary" style={{ fontSize: 12 }}>{v || "—"}</Text>,
    },
    {
      title: "Association",
      key: "association",
      render: (_, r) => {
        const name = r.association
          ? `${r.association.firstName ?? ""} ${r.association.lastName ?? ""}`.trim() ||
            r.association.nomOrganisation ||
            "—"
          : "—";
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar
              size={32}
              style={{ background: "#0F948818", color: "#0F9488", fontWeight: 700, flexShrink: 0 }}
            >
              {name[0]}
            </Avatar>
            <div>
              <Text strong style={{ fontSize: 12, display: "block" }}>{name}</Text>
              {r.association?.email && (
                <Text type="secondary" style={{ fontSize: 11 }}>{r.association.email}</Text>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "dateAction",
      render: (v) => (v ? new Date(v).toLocaleDateString("fr-FR") : "—"),
      sorter: (a, b) => new Date(a.dateAction) - new Date(b.dateAction),
      defaultSortOrder: "descend",
    },
    {
      title: "Bénévoles",
      key: "benevoles",
      render: (_, r) => (
        <Tag color="purple" style={{ borderRadius: 6 }}>
          {r.benevoles?.length ?? 0} bénévole{r.benevoles?.length !== 1 ? "s" : ""}
        </Tag>
      ),
    },
    {
      title: "Statut",
      dataIndex: "statut",
      filters: [
        { text: "En attente", value: "EN_ATTENTE" },
        { text: "Validée",    value: "VALIDEE" },
        { text: "Refusée",    value: "REFUSEE" },
        { text: "Terminée",   value: "TERMINEE" },
      ],
      onFilter: (value, record) => record.statut === value,
      render: (v) => (
        <Tag color={statutColor[v] || "default"} style={{ borderRadius: 6 }}>
          {statutLabel[v] ?? v}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, r) => {
        const pending  = r.statut === "EN_ATTENTE";
        const validee  = r.statut === "VALIDEE";
        return (
          <Space size={4} wrap>
            {/* Valider */}
            <Popconfirm
              title="Valider cette action ?"
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

            {/* Refuser */}
            <Popconfirm
              title="Refuser cette action ?"
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

            {/* Terminer */}
            <Popconfirm
              title="Marquer cette action comme terminée ?"
              onConfirm={() => changeStatut(r._id, "TERMINEE")}
              okText="Oui"
              cancelText="Non"
              disabled={!validee}
            >
              <Button
                size="small"
                icon={<ThunderboltOutlined />}
                style={
                  validee
                    ? { color: "#6366F1", borderColor: "#6366F1" }
                    : {}
                }
                loading={loadingId === r._id + "TERMINEE"}
                disabled={!validee}
              >
                Terminer
              </Button>
            </Popconfirm>

            {/* Supprimer */}
            <Popconfirm
              title="Supprimer définitivement cette action ?"
              onConfirm={() => handleDelete(r._id)}
              okText="Oui"
              cancelText="Non"
            >
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                loading={loadingId === r._id + "DELETE"}
              />
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
          background: "linear-gradient(135deg, #0F9488 0%, #065f46 100%)",
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
          icon={<SyncOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Gestion des actions solidaires
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {enAttente} action{enAttente !== 1 ? "s" : ""} en attente de validation
          </Text>
        </div>
      </div>

      {/* Search */}
      <Input
        prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
        placeholder="Rechercher par titre, association, statut…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 380, marginBottom: 16, borderRadius: 10 }}
        allowClear
      />

      {/* Table */}
      <Table
        rowKey="_id"
        dataSource={filtered}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: 900 }}
        size="small"
        style={{ borderRadius: 12, overflow: "hidden" }}
      />
    </div>
  );
}

export default AdminActionsSolidaires;
