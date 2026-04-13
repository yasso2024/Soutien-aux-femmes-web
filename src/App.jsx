import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ConfigProvider } from "antd";

import { AuthContext } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import UsersList from "./pages/UsersList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import LogsList from "./pages/LogsList";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DemandesList from './pages/DemandesList';
import AddDemande from './pages/AddDemande';
import BenevolesList from './pages/BenevolesList';
import AssociationsList from './pages/AssociationsList';
import DonsList from './pages/DonsList';
import AddDon from './pages/AddDon';
import FemmesList from './pages/FemmesList';
import DonateursList from './pages/DonateursList';
import AffectationsList from './pages/AffectationsList';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f7078b",
          colorInfo: "#f7078b",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
<Route path="/inscription" element={<SignUp />} />
         
          {token ? (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="user/add" element={<AddUser />} />
              <Route path="user/edit/:id" element={<EditUser />} />
              <Route path="user/list" element={<UsersList />} />
              <Route path="logs/list" element={<LogsList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="demandes" element={<DemandesList />} />
              <Route path="demandes/add" element={<AddDemande />} />
              <Route path="dons" element={<DonsList />} />
              <Route path="dons/add" element={<AddDon />} />
              <Route path="femmes" element={<FemmesList />} />
              <Route path="benevoles" element={<BenevolesList />} />
              <Route path="associations" element={<AssociationsList />} />
              <Route path="donateurs" element={<DonateursList />} />
<Route path="affectations" element={<AffectationsList />} />
            </Route>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;