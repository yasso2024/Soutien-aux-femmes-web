import {
  App, Avatar, Button, Card, Form, Input, Modal,
  Popconfirm, Select, Space, Table, Tag, Typography,
} from "antd";
import {
  DeleteOutlined, PlusOutlined, SearchOutlined, TeamOutlined, CheckOutlined, CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  accepterAffectation, createAffectation, deleteAffectation, listActionsSolidaires, listAffectations, refuserAffectation,
} from "../../api/affectations";
import { listBenevoles } from "../../api/users";

const { Title, Text } = Typography;
const PURPLE = "#8B5CF6";

const statutColor = {
  EN_ATTENTE: "orange",
  ACCEPTEE: "green",
  TERMINEE: "default",
  REFUSEE: "red",
};

function AffectationsList() {
  const { message } = App.useApp();
  const [data, setData] = useState([]);
  const [benevoles, setBenevoles] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();

  const load = () =>
    listAffectations()
      .then((res) => setData(res.data?.affectations || []))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    listBenevoles()
      .then((res) => setBenevoles(res.data?.users || res.data || []))
      .catch(() => {});
    listActionsSolidaires()
      .then((res) => setActions(res.data?.actions || res.data || []))
      .catch(() => {});
  }, []);

  const filtered = data.filter((a) => {
    const q = search.toLowerCase();
    const nom = `${a.benevole?.firstName ?? ""} ${a.benevole?.lastName ?? ""}`.toLowerCase();
    const titre = (a.action?.titre ?? "").toLowerCase();
    return nom.includes(q) || titre.includes(q);
  });

  const handleCreate = async (values) => {
    setSaving(true);
    try {
      await createAffectation(values);
      message.success("Affectation créée avec succès");
      form.resetFields();
      setOpen(false);
      setLoading(true);
      load();
    } catch (err) {
      message.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAffectation(id);
      setData((prev) => prev.filter((a) => a._id !== id));
      message.success("Affectation supprimée");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleAccept = async (id) => {
    try {
      await accepterAffectation(id);
      setData((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut: "ACCEPTEE" } : a))
      );
      message.success("Affectation acceptée");
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleRefuse = async (id) => {
    try {
      await refuserAffectation(id);
      setData((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut: "REFUSEE" } : a))
      );
      message.success("Affectation refusée");
    } catch (err) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Bénévole",
      key: "benevole",
      render: (_, r) =>
        r.benevole ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar
              size={36}
              style={{ background: PURPLE + "22", color: PURPLE, flexShrink: 0 }}
            >
              {r.benevole.firstName?.[0]}
            </Avatar>
            <div>
              <Text strong style={{ display: "block", fontSize: 13 }}>
                {r.benevole.firstName} {r.benevole.lastName}
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {r.benevole.email}
              </Text>
            </div>
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Action solidaire",
      key: "action",
      render: (_, r) =>
        r.action ? (
          <div>
            <Text strong style={{ fontSize: 13 }}>{r.action.titre}</Text>
            {r.action.dateAction && (
              <Text type="secondary" style={{ display: "block", fontSize: 11 }}>
                {new Date(r.action.dateAction).toLocaleDateString("fr-FR")}
              </Text>
            )}
          </div>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Demande liée",
      key: "demande",
      render: (_, r) =>
        r.demande ? (
          <Space size={4}>
            <Tag color="pink">{r.demande.type}</Tag>
            <Text style={{ fontSize: 12 }}>{r.demande.titre}</Text>
          </Space>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Date affectation",
      dataIndex: "dateAffectation",
      render: (v) => (v ? new Date(v).toLocaleDateString("fr-FR") : "—"),
      sorter: (a, b) => new Date(a.dateAffectation) - new Date(b.dateAffectation),
      defaultSortOrder: "descend",
    },
    {
      title: "Statut",
      dataIndex: "statut",
      render: (v) => (
        <Tag color={statutColor[v] || "default"}>{v?.replace("_", " ")}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, r) => (
        <Space>
          <Popconfirm
            title="Accepter cette affectation ?"
            onConfirm={() => handleAccept(r._id)}
            okText="Oui"
            cancelText="Non"
            disabled={r.statut !== "EN_ATTENTE"}
          >
            <Button
              size="small"
              type="primary"
              icon={<CheckOutlined />}
              disabled={r.statut !== "EN_ATTENTE"}
            >
              Accepter
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Refuser cette affectation ?"
            onConfirm={() => handleRefuse(r._id)}
            okText="Oui"
            cancelText="Non"
            disabled={r.statut !== "EN_ATTENTE"}
          >
            <Button
              size="small"
              danger
              icon={<CloseOutlined />}
              disabled={r.statut !== "EN_ATTENTE"}
            >
              Refuser
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Supprimer cette affectation ?"
            onConfirm={() => handleDelete(r._id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #8B5CF640",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar
            size={56}
            icon={<TeamOutlined />}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "3px solid rgba(255,255,255,0.6)",
            }}
          />
          <div>
            <Title level={4} style={{ color: "#fff", margin: 0 }}>
              Affectations des bénévoles
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
              {data.length} affectation{data.length !== 1 ? "s" : ""} enregistrée{data.length !== 1 ? "s" : ""}
            </Text>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Nouvelle affectation
        </Button>
      </div>

      <Card
        style={{ borderRadius: 16, border: "none", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            placeholder="Rechercher par bénévole ou action solidaire…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 400, borderRadius: 8 }}
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

      {/* Create Modal */}
      <Modal
        title={
          <span style={{ fontWeight: 700 }}>
            <TeamOutlined style={{ marginRight: 8, color: PURPLE }} />
            Affecter un bénévole
          </span>
        }
        open={open}
        onCancel={() => { setOpen(false); form.resetFields(); }}
        onOk={() => form.submit()}
        okText="Créer"
        cancelText="Annuler"
        confirmLoading={saving}
        okButtonProps={{ style: { background: PURPLE, borderColor: PURPLE } }}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate} style={{ marginTop: 16 }}>
          <Form.Item
            name="benevole"
            label="Bénévole"
            rules={[{ required: true, message: "Sélectionner un bénévole" }]}
          >
            <Select
              showSearch
              placeholder="Choisir un bénévole"
              filterOption={(input, opt) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              options={benevoles.map((b) => ({
                value: b._id,
                label: `${b.firstName} ${b.lastName} — ${b.email}`,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="action"
            label="Action solidaire"
            rules={[{ required: true, message: "Sélectionner une action" }]}
          >
            <Select
              showSearch
              placeholder="Choisir une action solidaire"
              filterOption={(input, opt) =>
                opt.label.toLowerCase().includes(input.toLowerCase())
              }
              options={actions.map((a) => ({
                value: a._id,
                label: a.titre,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AffectationsList;
