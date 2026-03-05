import {UserOutlined,HomeOutlined,ClockCircleOutlined,CalendarOutlined,ShopOutlined,FileSearchOutlined,HeartOutlined,CustomerServiceOutlined,QuestionCircleOutlined,LogoutOutlined,} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const { Sider, Header, Content } = Layout;

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
  const { user } = useContext(AuthContext);

  const items = [
    getItem("Home", "home", <HomeOutlined />, "/"),
    getItem("Users", "user", <UserOutlined />, null, [
      getItem("Add", "user1", null, "/user/add"),
      getItem("List", "user2", null, "/user/list"),
    ]),
    getItem("Événements", "events", <CalendarOutlined />, "/events"),

    getItem("Boutique", "shop", <ShopOutlined />, "/shop"),

    getItem("Nos enquêtes", "surveys", <FileSearchOutlined />, "/surveys"),

    getItem("Être un proche aidant", "helper", <HeartOutlined />, "/helper"),

    getItem("Aide", "help", <CustomerServiceOutlined />, "/help"),

    getItem("FAQ", "faq", <QuestionCircleOutlined />, "/faq"),
    getItem("Logs", "logs", <ClockCircleOutlined />, "/logs/list"),
  ];
  const dropdownItmes = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
      {
        type: "divider", // suparasion par deus buton
      },
      { key: "logout", 
        icon: <LogoutOutlined />, 
        label: "Logout" },
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
          mode="vertical"
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
            menu={dropdownItmes} trigger={["click"]} placement="bottomRigth">
            <Avatar
              src={user?.avatar? `http://localhost:3000/uploads/${user.avatar}`: undefined}
              icon={!user?.avatar && <UserOutlined />}
              size={38}
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
