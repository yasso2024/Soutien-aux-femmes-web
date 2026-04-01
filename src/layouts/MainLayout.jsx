import {
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ShopOutlined,
  FileSearchOutlined,
  HeartOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  SolutionOutlined,
  GiftOutlined,
  TeamOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { useContext, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const { Sider, Header, Content } = Layout;

const ROLES = {
  FEMME: "FEMME",
  DONATEUR: "DONATEUR",
  BENEVOLE: "BENEVOLE",
  ASSOCIATION: "ASSOCIATION",
  ADMIN: "ADMIN",
};

function getItem(label, key, icon, path, children) {
  return {
    key,
    icon,
    children,
    label: path ? <Link to={path}>{label}</Link> : label,
  };
}

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const common = [
    getItem("Accueil", "home", <HomeOutlined />, "/"),
    getItem("Événements", "events", <CalendarOutlined />, "/events"),
    getItem("Boutique", "shop", <ShopOutlined />, "/shop"),
    getItem("Nos enquêtes", "surveys", <FileSearchOutlined />, "/surveys"),
    getItem("Être un proche aidant", "helper", <HeartOutlined />, "/helper"),
    getItem("Aide", "help", <CustomerServiceOutlined />, "/help"),
    getItem("FAQ", "faq", <QuestionCircleOutlined />, "/faq"),
    getItem("Logs", "logs", <ClockCircleOutlined />, "/logs/list"),
  ];

  const items = useMemo(() => {
    if (!user) return common;

    switch (user.role) {
      case ROLES.FEMME:
      
      case ROLES.DONATEUR:
        return [
          ...common,
          getItem("Dons", "dons", <GiftOutlined />, null, [
            getItem("Effectuer un don", "dons-add", null, "/dons/add"),
            getItem("Mes dons", "dons-list", null, "/dons"),
          ]),
        ];

      case ROLES.BENEVOLE:
        return [
          ...common,
          getItem("Actions solidaires", "actions", <TeamOutlined />, "/actions"),
          getItem("Affectations", "affectations", <ProfileOutlined />, "/affectations"),
        ];

      case ROLES.ASSOCIATION:
        return [
          ...common,
          getItem("Actions solidaires", "actions", <TeamOutlined />, null, [
            getItem("Créer une action", "actions-add", null, "/actions/add"),
            getItem("Liste des actions", "actions-list", null, "/actions"),
          ]),
          getItem("Propositions", "propositions", <SolutionOutlined />, "/propositions"),
        ];

      case ROLES.ADMIN:
        return [
          ...common,
          getItem("Utilisateurs", "users", <UserOutlined />, null, [
            getItem("Ajouter", "users-add", null, "/user/add"),
            getItem("Liste", "users-list", null, "/user/list"),
          ]),
          getItem("Demandes", "admin-demandes", <HeartOutlined />, "/demandes"),
          getItem("Dons", "admin-dons", <GiftOutlined />, "/dons"),
          getItem("Actions", "admin-actions", <TeamOutlined />, "/actions"),
          getItem("Affectations", "admin-affectations", <ProfileOutlined />, "/affectations"),
        ];

      default:
        return common;
    }
  }, [user]);

  const dropdownItems = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: () => logout?.(),
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["home"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Dropdown
            menu={dropdownItems}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              src={
                user?.avatar
                  ? `http://localhost:3000/uploads/${user.avatar}`
                  : undefined
              }
              icon={!user?.avatar && <UserOutlined />}
              size={38}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              borderRadius: 14,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;