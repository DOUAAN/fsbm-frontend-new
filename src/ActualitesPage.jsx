import { useState } from "react";
import actu1 from "./assets/clubhelios.PNG";
import actu2 from "./assets/ctrlart_fsbm.PNG";
import actu3 from "./assets/aidev_community.PNG";
import actu4 from "./assets/CiK.PNG";
 
// ── données statiques (à remplacer par un fetch API plus tard) ──
const ACTUALITES = [
  {
    id: 1,
    titre: "Exposition sur la Sîra du Prophète à la FSBM – Club Helios",
    resume: "Le Club Helios FSBM a organisé une exposition sur la Sîra du Prophète (paix et salut sur lui). L’événement a permis aux visiteurs de découvrir des informations inspirantes dans une ambiance d’échange et de partage.",
    image: actu1,
    categorie: "Campus",
    date: "15/5/2026",
  },
  {
    id: 2,
    titre: "Victoire du club CtrlArt-FSBM à la compétition DIGI'ART",
    resume: "Le club CtrlArt-FSBM annonce la victoire de Mouhssine Lamsiah (Capsule Audiovisuelle) et Abdelbasset Tassine (Design Graphique) lors de DIGI'ART.",
    image: actu2,
    categorie: "Conférence",
    date: "20/11/2026",
  },
  {
    id: 3,
    titre: "Workshop She Builds AI – From Idea to Real Project",
    resume: "Le workshop She Builds AI a rassemblé des jeunes femmes motivées pour apprendre, collaborer et construire leur premier projet en intelligence artificielle.",
    image: actu3,
    categorie: "Workshops",
    date: "17/4/2026",
  },
  {
    id: 4,
    titre: "Caravane médicale et actions de sensibilisation en milieu scolaire",
    resume: "Le club CIK, en collaboration avec la Fondation Al Ayadi Al Bayda, a organisé une caravane médicale en milieu scolaire comprenant des examens médicaux.",
    image: actu4,
    categorie: "Caravane",
    date: "18/4/2026",
  },
  {
    id: 5,
    titre: "Forum des Entreprises & Recrutement FSBM 2025",
    resume: "Plus de 30 entreprises présentes au forum annuel de recrutement. Une opportunité unique pour les étudiants en fin de cursus de rencontrer des recruteurs.",
    image: null,
    categorie: "Campus",
    date: "05/11/2025",
  },
  {
    id: 6,
    titre: "Lancement officiel de la plateforme CLUB-FSBM",
    resume: "La FSBM lance officiellement CLUB-FSBM, une plateforme numérique dédiée à la gestion et la promotion des clubs estudiantins de la faculté.",
    image: null,
    categorie: "Campus",
    date: "01/11/2025",
  },
  {
    id: 7,
    titre: "Conférence internationale sur l'Intelligence Artificielle",
    resume: "La FSBM accueille une conférence internationale réunissant des chercheurs et experts en IA de plusieurs pays africains et européens.",
    image: null,
    categorie: "Recherche",
    date: "28/10/2025",
  },
  {
    id: 8,
    titre: "Résultats des examens du semestre S1 2025-2026",
    resume: "Les résultats des examens du premier semestre sont désormais disponibles sur l'espace étudiant. Consultez vos notes en ligne.",
    image: null,
    categorie: "Campus",
    date: "22/10/2025",
  },
  {
    id: 9,
    titre: "Tournoi sportif inter-clubs FSBM – Édition 2025",
    resume: "Le club sportif organise le tournoi annuel inter-clubs. Football, basketball et volleyball au programme pour cette édition exceptionnelle.",
    image: null,
    categorie: "Sport",
    date: "15/10/2025",
  },
];
 
const CATEGORIES = ["Toutes", "Formation", "Conférence", "Caravane", "Sport","Workshops"];
const PER_PAGE = 6;
 
const categorieColor = {
  Formation: "#e07b20",
  Conférence: "#2a5ba5",
  Caravane: "#16a34a",
  Sport: "#dc2626",
  Workshops: "#7c3aed",
};
 
export default function ActualitesPage() {
  const [page, setPage] = useState(1);
  const [categorie, setCategorie] = useState("Toutes");
 
  const filtered = categorie === "Toutes"
    ? ACTUALITES
    : ACTUALITES.filter(a => a.categorie === categorie);
 
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
 
  const handleCategorie = (cat) => { setCategorie(cat); setPage(1); };
 
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f8fafd", minHeight: "100vh" }}>
 
      {/* ── HEADER PAGE ── */}
      <div style={{ backgroundColor: "#0d2d5e", padding: "56px 8% 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ color: "#a8c4e8", fontSize: "13px", cursor: "pointer" }}
            onClick={() => window.history.back()}>
            Accueil
          </span>
          <span style={{ color: "#a8c4e8" }}>›</span>
          <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: "600" }}>Actualités</span>
        </div>
        <h1 style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", margin: "0 0 8px 0" }}>
          Actualités & Annonces
        </h1>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#e07b20", borderRadius: "2px" }} />
      </div>
 
      {/* ── FILTRES CATÉGORIES ── */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "0 8%", display: "flex", gap: "4px", overflowX: "auto" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategorie(cat)}
            style={{
              padding: "14px 18px",
              border: "none",
              borderBottom: categorie === cat ? "3px solid #0d2d5e" : "3px solid transparent",
              backgroundColor: "transparent",
              color: categorie === cat ? "#0d2d5e" : "#5a7a9a",
              fontWeight: categorie === cat ? "700" : "500",
              fontSize: "14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => { if (categorie !== cat) e.currentTarget.style.color = "#0d2d5e"; }}
            onMouseLeave={e => { if (categorie !== cat) e.currentTarget.style.color = "#5a7a9a"; }}
          >
            {cat}
          </button>
        ))}
      </div>
 
      {/* ── GRILLE CARDS ── */}
      <div style={{ padding: "48px 8%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {paginated.map((actu) => (
            <div key={actu.id}
              style={{ backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 2px 12px rgba(13,45,94,0.08)", overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,45,94,0.16)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,45,94,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Image ou placeholder */}
              <div style={{ height: "190px", backgroundColor: "#dde8f7", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                {actu.image ? (
                  <img src={actu.image} alt={actu.titre} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#eef4ff" }}>
                    <div style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", color: "#b8cde0", lineHeight: 1, textAlign: "center" }}>Actualités</div>
                    <div style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "900", color: "#a0bcd8", lineHeight: 1, textAlign: "center" }}>FSBM</div>
                  </div>
                )}
              </div>
 
              {/* Contenu card */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {/* Badge + date */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ backgroundColor: categorieColor[actu.categorie] || "#e07b20", color: "#fff", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                    {actu.categorie}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#8a9fba", fontSize: "12px" }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {actu.date}
                  </span>
                </div>
 
                {/* Titre */}
                <h3 style={{ color: "#0d2d5e", fontSize: "16px", fontWeight: "800", lineHeight: "1.4", margin: 0 }}>
                  {actu.titre}
                </h3>
 
                {/* Résumé */}
                <p style={{ color: "#5a7a9a", fontSize: "13.5px", lineHeight: "1.6", margin: 0, flex: 1 }}>
                  {actu.resume.length > 120 ? actu.resume.substring(0, 120) + "..." : actu.resume}
                </p>
 
                {/* Lire plus */}
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#0d2d5e", fontWeight: "700", fontSize: "13px", textDecoration: "none", marginTop: "4px", transition: "gap 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                  onMouseLeave={e => e.currentTarget.style.gap = "5px"}
                >
                  Lire Plus
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
 
        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "48px" }}>
            {/* Previous */}
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: "8px 16px", border: "1px solid #dde6f0", borderRadius: "6px", backgroundColor: "#fff", color: page === 1 ? "#b0c4de" : "#0d2d5e", fontWeight: "600", fontSize: "13px", cursor: page === 1 ? "not-allowed" : "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => { if (page !== 1) e.currentTarget.style.backgroundColor = "#eef4ff"; }}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
            >
              ‹ Previous
            </button>
 
            {/* Numéros */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ width: "36px", height: "36px", border: "1px solid", borderColor: page === n ? "#0d2d5e" : "#dde6f0", borderRadius: "6px", backgroundColor: page === n ? "#0d2d5e" : "#fff", color: page === n ? "#fff" : "#0d2d5e", fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { if (page !== n) { e.currentTarget.style.backgroundColor = "#eef4ff"; } }}
                onMouseLeave={e => { if (page !== n) { e.currentTarget.style.backgroundColor = "#fff"; } }}
              >
                {n}
              </button>
            ))}
 
            {/* Next */}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: "8px 16px", border: "1px solid #dde6f0", borderRadius: "6px", backgroundColor: "#fff", color: page === totalPages ? "#b0c4de" : "#0d2d5e", fontWeight: "600", fontSize: "13px", cursor: page === totalPages ? "not-allowed" : "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => { if (page !== totalPages) e.currentTarget.style.backgroundColor = "#eef4ff"; }}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
 
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}