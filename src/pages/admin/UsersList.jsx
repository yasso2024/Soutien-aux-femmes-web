import { App, Space, Table, Tag, Button, Avatar, Card, Input, Typography } from "antd";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import EditUserDrawer from "../../components/EditUserDrawer";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { listUsers } from "../../api/users";

const { Title, Text } = Typography;
const INDIGO = "#4F46E5";

const roleColor = {
  ADMINISTRATEUR: "#3B82F6",
  BENEVOLE: "#8B5CF6",
  FEMME_BENEFICIAIRE: "#f7078b",
  DONATEUR: "#F59E0B",
  ASSOCIATION: "#0F9488",
};

const UsersList = () => {
  const { message } = App.useApp();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      title: "Utilisateur",
      key: "user",
      render: (_, r) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar
            size={36}
            src={r.avatar ? "http://localhost:3000/uploads/" + r.avatar : undefined}
            icon={!r.avatar && <UserOutlined />}
            style={{ background: INDIGO + "22", color: INDIGO, flexShrink: 0 }}
          />
          <div>
            <Text strong style={{ display: "block", fontSize: 13 }}>
              {r.firstName} {r.lastName}
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {r.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Rôle",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag
          style={{
            borderRadius: 6,
            background: (roleColor[text] ?? "#888") + "18",
            color: roleColor[text] ?? "#888",
            borderColor: (roleColor[text] ?? "#888") + "50",
          }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Date d'inscription",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) =>
        text ? format(new Date(text), "dd/MM/yyyy HH:mm") : "-",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            Details
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setSelectedUser(record);
              setOpenEdit(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await listUsers();
        setUsers(Array.isArray(response.data?.users) ? response.data.users : []);
      } catch (error) {
        message.error(error.message || "Something went wrong");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [refresh, message]);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #3F3BA0 100%)",
          borderRadius: 20,
          padding: "24px 32px",
          marginBottom: 24,
          boxShadow: "0 8px 32px #4F46E540",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Avatar
          size={56}
          icon={<UserOutlined />}
          style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)" }}
        />
        <div>
          <Title level={4} style={{ color: "#fff", margin: 0 }}>
            Gestion des utilisateurs
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
            {users.length} utilisateur{users.length !== 1 ? "s" : ""}
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
            placeholder="Rechercher par nom, email ou rôle…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 420, borderRadius: 8 }}
            allowClear
          />
        </div>
        <Table
          rowKey={(record) => record._id || record.id || record.email}
          columns={columns}
          dataSource={filtered}
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          size="small"
          style={{ padding: "0 8px" }}
        />
      </Card>

      <EditUserDrawer
        open={openEdit}
        setOpen={setOpenEdit}
        userDetails={selectedUser}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default UsersList;