import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/layout/SidebarMenu";
import Topbar from "../components/layout/Topbar";

const { Sider, Header, Content } = Layout;

function AdminLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} theme="light">
        <div style={{ textAlign: "center", padding: 20, fontWeight: 700 }}>
          SOLIDARITY ADMIN
        </div>
        <SidebarMenu />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px" }}>
          <Topbar />
        </Header>

        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;