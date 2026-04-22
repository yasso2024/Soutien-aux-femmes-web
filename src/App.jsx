import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";

// auth pages
import Login from "./pages/shared/Login";
import Signup from "./pages/shared/Signup";
import ForgotPassword from "./pages/shared/ForgotPassword";
import ResetPassword from "./pages/shared/ResetPassword";
import Profile from "./pages/shared/Profile";
import ChangePassword from "./pages/shared/ChangePassword";

// admin pages
import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./pages/admin/UsersList";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import FemmesList from "./pages/admin/FemmesList";
import BenevolesList from "./pages/admin/BenevolesList";
import AssociationsList from "./pages/admin/AssociationsList";
import DonateursList from "./pages/admin/DonateursList";
import DemandesList from "./pages/admin/DemandesList";
import PropositionsList from "./pages/admin/PropositionsList";
import DonsList from "./pages/admin/DonsList";
import AffectationsList from "./pages/admin/AffectationsList";
import Events from "./pages/admin/Events";
import LogsList from "./pages/admin/LogsList";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f7078b",
          colorInfo: "#f7078b",
        },
      }}
    >
      <AntdApp>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            <Route
              element={
                <ProtectedRoute roles={["ADMINISTRATEUR"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user/list" element={<UsersList />} />
              <Route path="/user/add" element={<AddUser />} />
              <Route path="/user/edit/:id" element={<EditUser />} />
              <Route path="/femmes" element={<FemmesList />} />
              <Route path="/benevoles" element={<BenevolesList />} />
              <Route path="/associations" element={<AssociationsList />} />
              <Route path="/donateurs" element={<DonateursList />} />
              <Route path="/demandes" element={<DemandesList />} />
              <Route path="/propositions-aide" element={<PropositionsList />} />
              <Route path="/dons" element={<DonsList />} />
              <Route path="/affectations" element={<AffectationsList />} />
              <Route path="/events" element={<Events />} />
              <Route path="/logs/list" element={<LogsList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;