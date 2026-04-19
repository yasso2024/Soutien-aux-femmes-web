import { App, Avatar, Button, Card, Input, Popconfirm, Table, Tag, Typography } from "antd";
import { CheckOutlined, DollarOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { confirmerDon, listDons, refuserDon } from "../../api/dons";

const { Title, Text } = Typography;
const GREEN = "#10B981";

const statutColor = { EN_ATTENTE: "orange", CONFIRME: "green", REFUSE: "red" };
const typeColor = { FINANCIER: "#3B82F6", MATERIEL: "#8B5CF6" };

function DonsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const { message } = App.useApp();

  useEffect(() => {
    listDons()
      .then((res) => setData(res.data?.dons || res.data || []))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [message]);

  const handleConfirm = async (id) => {
    setLoadingId(id);
    try {
      await confirmerDon(id);
      setData((prev) =>
        prev.map((d) => (d._id === id ? { ...d, statut: "CONFIRME" } : d))
      );
      message.success("Don confirmé");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleRefuse = async (id) => {
    setLoadingId(id);
    try {
      await refuserDon(id);
      setData((prev) =>
        prev.map((d) => (d._id === id ? { ...d, statut: "REFUSE" } : d))
      );
      message.success("Don refusé");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = data.filter((d) => {
    const q = search.toLowerCase();
    const nom = `${d.donateur?.firstName ?? ""} ${d.donateur?.lastName ?? ""}`.toLowerCase();
    return (
      nom.includes(q) ||
      d.type?.toLowerCase().includes(q) ||
      d.statut?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Donateur",
      key: "donateur",
      render: (_, r) =>
        r.donateur ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar
              size={36}
              style={{ background: "#F59E0B22", color: "#F59E0B", flexShrink: 0, fontWeight: 700 }}
            >
              {r.donateur.firstName?.[0]}
            </Avatar>
            <div>
              <Text strong style={{ display: "block", fontSize: 13 }}>
                {r.donateur.firstName} {r.donateur.lastName}
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>{r.donateur.email}</Text>
            </div>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Montant",
      dataIndex: "montant",
      render: (v, r) =>
        r.type === "FINANCIER" ? (
          <Text strong style={{ color: GREEN }}>
            {v != null ? new Intl.NumberFormat("fr-FR").format(v) + " TND" : "—"}
          </Text>
        ) : (
          <Text type="secondary">Matériel</Text>
        ),
      sorter: (a, b) => (a.montant ?? 0) - (b.montant ?? 0),
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
      title: "Demande liée",
      key: "demande",
      render: (_, r) =>
        r.demande ? (
          <div>
            <Tag color="pink" style={{ borderRadius: 6 }}>{r.demande.type}</Tag>
            <Text style={{ fontSize: 12 }}>{r.demande.titre}</Text>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Date",
      dataIndex: "dateDon",
      render: (v) => (v ? new Date(v).toLocaleDateString("fr-FR") : "—"),
      sorter: (a, b) => new Date(a.dateDon) - new Date(b.dateDon),
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
      title: "Action",
      key: "action",
      render: (_, r) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Popconfirm
            title="Confirmer ce don ?"
            onConfirm={() => handleConfirm(r._id)}
            okText="Oui"
            cancelText="Non"
            disabled={r.statut !== "EN_ATTENTE"}
          >
            <Button
              size="small"
              icon={<CheckOutlined />}
              style={{ color: GREEN, borderColor: GREEN }}
              loading={loadingId === r._id}
              disabled={r.statut !== "EN_ATTENTE"}
            >
              Confirmer
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Refuser ce don ?"
            onConfirm={() => handleRefuse(r._id)}
            okText="Oui"
            cancelText="Non"
            disabled={r.statut !== "EN_ATTENTE"}
          >
            <Button
              size="small"
              danger
              icon={<CloseOutlined />}
              loading={loadingId === r._id}
              disabled={r.statut !== "EN_ATTENTE"}
            >
              Refuser
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #10B98140",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={56}
          icon={<DollarOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Gestion des dons
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {data.length} don{data.length !== 1 ? "s" : ""} enregistré{data.length !== 1 ? "s" : ""}
            {" · "}
            {data.filter((d) => d.statut === "EN_ATTENTE").length} en attente de confirmation
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
            placeholder="Rechercher par donateur, type ou statut…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 380, borderRadius: 8 }}
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

export default DonsList;
