import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ActualitesPage from "./ActualitesPage";
import LoginPage from "./LoginPage";
import DashboardAdmin from "./DashboardAdmin";
import ContactPage from "./ContactPage";
import Clubspage from "./Clubspage";
import ClubDetail from "./ClubDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/actualites" element={<ActualitesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardAdmin />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/clubs" element={<Clubspage />} />
      <Route path="/clubs/:id" element={<ClubDetail />} />
    </Routes>
  );
}
