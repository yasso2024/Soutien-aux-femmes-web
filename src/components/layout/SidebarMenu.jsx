import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  GiftOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Home" },
    { key: "/user/list", icon: <UserOutlined />, label: "Users" },
    { key: "/femmes", icon: <UserOutlined />, label: "Femmes" },
    { key: "/benevoles", icon: <TeamOutlined />, label: "Bénévoles" },
    { key: "/associations", icon: <TeamOutlined />, label: "Associations" },
    { key: "/donateurs", icon: <GiftOutlined />, label: "Donateurs" },
    { key: "/demandes", icon: <FileTextOutlined />, label: "Demandes" },
    { key: "/propositions-aide", icon: <FileTextOutlined />, label: "Propositions d'aide" },
    { key: "/dons", icon: <GiftOutlined />, label: "Dons" },
    { key: "/affectations", icon: <FileTextOutlined />, label: "Affectations" },
    { key: "/events", icon: <CalendarOutlined />, label: "Events" },
    { key: "/actions-solidaires", icon: <TeamOutlined />, label: "Actions solidaires" },
    { key: "/logs/list", icon: <FileTextOutlined />, label: "Logs" },
    { key: "/profile", icon: <UserOutlined />, label: "Profile" },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={({ key }) => navigate(key)}
      style={{ height: "100%" }}
    />
  );
}

export default SidebarMenu;