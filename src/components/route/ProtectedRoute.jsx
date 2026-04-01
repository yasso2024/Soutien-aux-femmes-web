import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { AuthContext } from "../../contexts/AuthContext";

function ProtectedRoute({ children, roles = [] }) {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spin style={{ margin: 40 }} />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;