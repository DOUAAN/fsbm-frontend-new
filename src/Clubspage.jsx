import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/LOGO.png";

import ctrlart from "./assets/clubs/ctrlart.png";
import sciencesTech from "./assets/clubs/sciences-tech.png";
import infinitySpace from "./assets/clubs/infinity-space.png";
import abcJunior from "./assets/clubs/abc-junior.png";
import aidev from "./assets/clubs/aidev.png";
import robotique from "./assets/clubs/robotique.png";
import santeSport from "./assets/clubs/sante-sport.png";
import artIdentite from "./assets/clubs/art-identite.png";
import santeEnv from "./assets/clubs/sante-env.png";
import lions from "./assets/clubs/lions.png";
import helios from "./assets/clubs/helios.png";
import enactus from "./assets/clubs/enactus.png";
import qoran from "./assets/clubs/qoran.png";
import soft from "./assets/clubs/soft-skills.png";
import CIK from "./assets/clubs/Cik.png";

const LOGOS_MAP = {
  "ctrlart.png":        ctrlart,
  "sciences-tech.png":  sciencesTech,
  "infinity-space.png": infinitySpace,
  "abc-junior.png":     abcJunior,
  "soft-skills.png":    soft,
  "Cik.png":            CIK,
  "aidev.png":          aidev,
  "robotique.png":      robotique,
  "sante-sport.png":    santeSport,
  "art-identite.png":   artIdentite,
  "sante-env.png":      santeEnv,
  "lions.png":          lions,
  "helios.png":         helios,
  "enactus.png":        enactus,
  "qoran.png":          qoran,
};

const DOMAINES = ["Tous", "Scientifique", "Culturel", "Entrepreneuriat", "Humanitaire", "Sport"];

const domaineColor = {
  Scientifique:    { bg: "#dde8f7", text: "#2a5ba5" },
  Culturel:        { bg: "#fde8ce", text: "#e07b20" },
  Entrepreneuriat: { bg: "#d1fae5", text: "#065f46" },
  Humanitaire:     { bg: "#fce7f3", text: "#be185d" },
  Sport:           { bg: "#e0f2fe", text: "#0369a1" },
};

export default function ClubsPage() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domaine, setDomaine] = useState("Tous");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/clubs")
      .then(res => res.json())
      .then(data => {
        setClubs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  const filtered = clubs
    .filter(c => domaine === "Tous" || c.domaine === domaine)
    .filter(c => c.nom.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f8fafd", minHeight: "100vh" }}>

      {/* ===== TOP BAR ===== */}
      <div style={{ backgroundColor: "#1a2a4a", color: "#cdd8ec", fontSize: "13px", padding: "7px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
            fsbm.contact@univh2c.ma
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (+212) 6 61 44 24 27
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#" style={{ color: "#cdd8ec" }}>
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" style={{ color: "#cdd8ec" }}>
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.6 1.64.9a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 01-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.55 4.55 0 01-2.04.08 4.53 4.53 0 004.23 3.14A9.07 9.07 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85l-.01-.59A9.17 9.17 0 0023 3z"/></svg>
          </a>
          <a href="#" style={{ color: "#cdd8ec" }}>
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" style={{ width: "150px", height: "60px", objectFit: "contain" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
              <span style={{ fontSize: "16px", fontWeight: "800", color: "#2a5ba5" }}>Découvrez les clubs</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#9fc0f1" }}>de la Faculté des Sciences Ben M'Sik</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => navigate("/")}
              style={{ background: "transparent", border: "1px solid #dde6f0", color: "#0d2d5e", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Accueil
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{ backgroundColor: "#0d2d5e", color: "#fff", border: "none", padding: "9px 22px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a4a8a"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d2d5e"}
            >
              Connexion
            </button>
          </div>
        </div>
      </header>

      {/* ===== HEADER PAGE ===== */}
      <div style={{ backgroundColor: "#0d2d5e", padding: "56px 8% 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ color: "#a8c4e8", fontSize: "13px", cursor: "pointer" }} onClick={() => navigate("/")}>Accueil</span>
          <span style={{ color: "#a8c4e8" }}>›</span>
          <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: "600" }}>Nos Clubs</span>
        </div>
        <h1 style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", margin: "0 0 8px 0" }}>
          Nos Clubs Étudiants
        </h1>
        <p style={{ color: "#a8c4e8", fontSize: "16px", margin: "0 0 20px 0" }}>
          {clubs.length} clubs actifs à la Faculté des Sciences Ben M'Sik
        </p>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#e07b20", borderRadius: "2px" }} />
      </div>

      {/* ===== FILTRES + RECHERCHE ===== */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 8%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "4px", overflowX: "auto" }}>
          {DOMAINES.map(d => (
            <button
              key={d}
              onClick={() => setDomaine(d)}
              style={{ padding: "14px 18px", border: "none", borderBottom: domaine === d ? "3px solid #0d2d5e" : "3px solid transparent", backgroundColor: "transparent", color: domaine === d ? "#0d2d5e" : "#5a7a9a", fontWeight: domaine === d ? "700" : "500", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}
              onMouseEnter={e => { if (domaine !== d) e.currentTarget.style.color = "#0d2d5e"; }}
              onMouseLeave={e => { if (domaine !== d) e.currentTarget.style.color = "#5a7a9a"; }}
            >
              {d}
            </button>
          ))}
        </div>
        <div style={{ position: "relative", padding: "12px 0" }}>
          <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8a9fba" }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un club..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: "1px solid #dde6f0", borderRadius: "8px", padding: "9px 14px 9px 36px", fontSize: "13px", outline: "none", width: "220px", color: "#1a2a4a" }}
            onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
            onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"}
          />
        </div>
      </div>

      {/* ===== GRILLE CLUBS ===== */}
      <div style={{ padding: "48px 8%" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#8a9fba" }}>
            <p style={{ fontSize: "16px" }}>Chargement des clubs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#8a9fba" }}>
            <p style={{ fontSize: "16px" }}>Aucun club trouvé</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px" }}>
            {filtered.map((club) => (
              <div
                key={club.id}
                style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(13,45,94,0.08)", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,45,94,0.16)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,45,94,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#eef4ff", border: "3px solid #dde8f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {club.logo && LOGOS_MAP[club.logo] ? (
                    <img src={LOGOS_MAP[club.logo]} alt={club.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: "36px", fontWeight: "900", color: "#2a5ba5" }}>{club.nom.charAt(0)}</span>
                  )}
                </div>
                <span style={{ backgroundColor: domaineColor[club.domaine]?.bg || "#eef4ff", color: domaineColor[club.domaine]?.text || "#2a5ba5", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                  {club.domaine}
                </span>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0d2d5e", textAlign: "center", lineHeight: "1.4" }}>
                  {club.nom}
                </div>
                <button
                  onClick={() => navigate(`/clubs/${club.id}`)}
                  style={{ backgroundColor: "#0d2d5e", color: "#ffffff", border: "none", padding: "9px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer", width: "100%", marginTop: "auto" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a4a8a"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d2d5e"}
                >
                  Voir le club
                </button>
              </div>
            ))}
          </div>
        )}
        <p style={{ textAlign: "center", color: "#8a9fba", fontSize: "13px", marginTop: "32px" }}>
          {filtered.length} club{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 768px) {
          div[style*="minmax(200px"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}