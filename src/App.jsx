import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import ActualitesPage from "./ActualitesPage";
import ActualiteDetail from "./ActualiteDetail";
import LoginPage from "./LoginPage";
import DashboardAdmin from "./DashboardAdmin";
import DashboardSuperAdmin from "./DashboardSuperAdmin";
import ContactPage from "./ContactPage";
import Clubspage from "./Clubspage";
import ClubDetail from "./ClubDetail";

export default function App() {
  const [utilisateur, setUtilisateur] = useState(null);

  const handleLogin = (user) => {
    setUtilisateur(user);
  };

  const handleLogout = () => {
    setUtilisateur(null);
    localStorage.removeItem("token");
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/actualites" element={<ActualitesPage />} />
      <Route path="/actualites/:id" element={<ActualiteDetail />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/dashboard" element={<DashboardAdmin utilisateur={utilisateur} onLogout={handleLogout} />} />
      <Route path="/dashboard-admin" element={<DashboardSuperAdmin utilisateur={utilisateur} onLogout={handleLogout} />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/clubs" element={<Clubspage />} />
      <Route path="/clubs/:id" element={<ClubDetail />} />
    </Routes>
  );
}
