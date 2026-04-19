import { Button, Space, Typography } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography.Title level={4} style={{ margin: 0 }}>
  Tableau de bord d'administration
      </Typography.Title>

      <Space>
        <span>{user?.nom || user?.name || user?.firstName || "Utilisateur"}</span>
        <Button onClick={() => navigate("/profile")}>Profil</Button>
        <Button
          danger
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Déconnexion
        </Button>
      </Space>
    </div>
  );
}

export default Topbar;