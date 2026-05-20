import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/LOGO.png";
import actu1 from "./assets/clubhelios.PNG";
import actu2 from "./assets/ctrlart_fsbm.PNG";
import actu3 from "./assets/aidev_community.PNG";
import actu4 from "./assets/CiK.PNG";
import actu5 from "./assets/Sang.PNG";
import doyenImg from "./assets/doyen.PNG";
import doyen from "./assets/doyen.PNG";
import Radid from "./assets/Radid.PNG";
import Najih from "./assets/Najih.jpeg";

 
const actualites = [
  { id: 1, titre: "Exposition sur la Sîra du Prophète à la FSBM – Club Helios", resume: "Le Club Helios FSBM a organisé une exposition sur la Sîra du Prophète (paix et salut sur lui). L’événement a permis aux visiteurs de découvrir des informations inspirantes dans une ambiance d’échange et de partage.", image: actu1 },
  { id: 2, titre: "Victoire du club CtrlArt-FSBM à la compétition DIGI'ART", resume: "Le club CtrlArt-FSBM annonce la victoire de Mouhssine Lamsiah (Capsule Audiovisuelle) et Abdelbasset Tassine (Design Graphique) lors de DIGI'ART organisé par l'Université Hassan II de Casablanca.", image: actu2 },
  { id: 3, titre: "Workshop She Builds AI – From Idea to Real Project", resume: "Le workshop She Builds AI a rassemblé des jeunes femmes motivées pour apprendre, collaborer et construire leur premier projet en intelligence artificielle, de l'analyse du problème jusqu'à l'évaluation du modèle.", image: actu3 },
  { id: 4, titre: "Caravane médicale et actions de sensibilisation en milieu scolaire", resume: "Le club CIK, en collaboration avec la Fondation Al Ayadi Al Bayda, a organisé une caravane médicale en milieu scolaire comprenant des examens médicaux et des activités de sensibilisation à l'école Ouled Cheikh.", image: actu4 },
  { id: 5, titre: "Journée de don de sang à la FSBM – Club CIK", resume: "Le club CIK FSBM a participé à la journée de don de sang organisée dans le cadre de la caravane universitaire à la Faculté des Sciences Ben M'Sik. Une initiative solidaire marquée par l’engagement et la générosité.", image: actu5 },
];
 
const equipe = [
  { nom: "Pr. Mordane Soumia", role: "Pôle des Affaires Pédagogiques, Estudiantines et de la Vie Universitaire", photo: doyen },
  { nom: "Pr. Radid Mohammed", role: "Pôle des Affaires Pédagogiques, Estudiantines et de la Vie Universitaire", photo: Radid },
  { nom: "Mr. Chaibi Said", role: "Chargé de la vie universitaire et de la communication", photo: null },
  { nom: "Mr. Najih Hassan", role: "Responsable Activités culturelles, sportives et Vie estudiantine", photo: Najih },
];
 
const chiffres = [
  { valeur: 6, label: "Scientifiques & Techniques", desc: "Clubs de sciences et de technologies", icon: (<svg width="36" height="36" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 3l-1 7H5l-2 11h18L19 10h-3L15 3H9z"/><path d="M9 10h6"/><circle cx="12" cy="17" r="2"/></svg>) },
  { valeur: 4, label: "Culturels & Artistiques", desc: "Clubs Culturels & Artistiques", icon: (<svg width="36" height="36" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>) },
  { valeur: 6, label: "Entrepreneuriaux & Compétences", desc: "Club d'Entrepreneuriat", icon: (<svg width="36" height="36" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
  { valeur: 3, label: "Humanitaires & Sociaux", desc: "Clubs d'Actions Humanitaires & Sociales", icon: (<svg width="36" height="36" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>) },
  { valeur: 4, label: "Sportifs & Santé", desc: "Clubs de Sport, Santé et Environnement", icon: (<svg width="36" height="36" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 9.17l4.24-4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M9.17 14.83l-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>) },
];
 
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
 
export default function HomePage() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
  const chiffresRef = useRef(null);
  const intervalRef = useRef(null);
 
  const navItems = [
    {
      label: "Accueil",
      dropdown: [
        { label: "Mot du Vice Doyen", id: "mot-du-doyen" },
        { label: "Organigramme", id: "organigramme" },
        { label: "Chiffres clés", id: "chiffres-cles" },
      ],
    },
    { label: "Actualités", path: "/actualites" },
    { label: "Nos Clubs", path: "/clubs" },
    { label: "Événements", id: "evenements" },
    { label: "Contactez-nous", path: "/contact" },
  ];
 
  const goToSlide = (index) => { setFade(false); setTimeout(() => { setCurrentSlide(index); setFade(true); }, 350); };
 
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrentSlide((prev) => (prev + 1) % actualites.length); setFade(true); }, 350);
    }, 7000);
  };
 
  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, []);
 
  useEffect(() => {
    const targets = [6, 4, 6, 3, 4];
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        targets.forEach((target, i) => {
          let start = 0;
          const step = Math.ceil(target / (1800 / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            setCounts((prev) => ({ ...prev, [i]: start }));
          }, 16);
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (chiffresRef.current) observer.observe(chiffresRef.current);
    return () => observer.disconnect();
  }, []);
 
  const handlePrev = () => { goToSlide((currentSlide - 1 + actualites.length) % actualites.length); startInterval(); };
  const handleNext = () => { goToSlide((currentSlide + 1) % actualites.length); startInterval(); };
  const slide = actualites[currentSlide];
 
  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.path) { navigate(item.path); }
    else if (!item.dropdown && item.id) { scrollTo(item.id); }
  };
 
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, padding: 0 }}>
 
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
          <span style={{ cursor: "pointer", fontWeight: "500" }}>Contact</span>
          <a href="https://www.facebook.com/FSBMUH2C" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="https://x.com/uh2c_fsbm" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.6 1.64.9a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 01-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.55 4.55 0 01-2.04.08 4.53 4.53 0 004.23 3.14A9.07 9.07 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85l-.01-.59A9.17 9.17 0 0023 3z"/></svg></a>
          <a href="https://www.linkedin.com/showcase/fsbmunivh2c/" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
        </div>
      </div>
 
      {/* ===== NAVBAR ===== */}
      <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={logo} alt="Logo" style={{ width: "150px", height: "60px", objectFit: "contain" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
              <span style={{ fontSize: "16px", fontWeight: "800", color: "#2a5ba5" }}>Découvrez les clubs</span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#9fc0f1" }}>de la Faculté des Sciences Ben M'Sik</span>
            </div>
          </div>
 
          <nav style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {navItems.map((item) => (
              <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href="#"
                  onClick={(e) => handleNavClick(e, item)}
                  style={{ color: "#1a2a4a", textDecoration: "none", padding: "8px 14px", borderRadius: "4px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", letterSpacing: "0.02em", transition: "color 0.2s, background 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#0d2d5e"; e.currentTarget.style.backgroundColor = "#eef4ff"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#1a2a4a"; e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {item.label}
                  {item.dropdown && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4l4 4 4-4" strokeLinecap="round"/>
                    </svg>
                  )}
                </a>
                {item.dropdown && activeDropdown === item.label && (
                  <div style={{ position: "absolute", top: "calc(100% + 2px)", left: "0", backgroundColor: "#ffffff", borderRadius: "6px", boxShadow: "0 8px 28px rgba(0,0,0,0.14)", minWidth: "260px", overflow: "hidden", border: "1px solid #dde6f0", animation: "dropFade 0.18s ease" }}>
                    {item.dropdown.map((sub, i) => (
                      <a key={sub.label} href="#"
                        onClick={(e) => { e.preventDefault(); scrollTo(sub.id); setActiveDropdown(null); }}
                        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 18px", color: "#1a2a4a", textDecoration: "none", fontSize: "13.5px", fontWeight: "500", borderBottom: i < item.dropdown.length - 1 ? "1px solid #f0f4f8" : "none", transition: "background 0.15s, color 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#eef4ff"; e.currentTarget.style.color = "#0d2d5e"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a2a4a"; }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0d2d5e", flexShrink: 0 }} />
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
 
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#0d2d5e",
              color: "#ffffff",
              border: "none",
              padding: "9px 22px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a4a8a"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d2d5e"}
          >
            Connexion
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
            style={{ display: "none", background: "transparent", border: "none", cursor: "pointer", color: "#0d2d5e", padding: "8px" }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
 
        {menuOpen && (
          <div style={{ backgroundColor: "#fff", borderTop: "1px solid #e2e8f0", padding: "8px 0" }}>
            {navItems.map((item) => (
              <div key={item.label}>
                <a href="#" onClick={(e) => { handleNavClick(e, item); setMenuOpen(false); }}
                  style={{ display: "block", padding: "12px 24px", color: "#1a2a4a", textDecoration: "none", fontSize: "14px", fontWeight: "600", borderBottom: "1px solid #f0f4f8" }}>
                  {item.label}
                </a>
                {item.dropdown && item.dropdown.map((sub) => (
                  <a key={sub.label} href="#" onClick={(e) => { e.preventDefault(); scrollTo(sub.id); setMenuOpen(false); }}
                    style={{ display: "block", padding: "10px 40px", color: "#5a7a9a", textDecoration: "none", fontSize: "13px", borderBottom: "1px solid #f5f8fc", backgroundColor: "#f8fafd" }}>
                    — {sub.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
      </header>
 
      {/* ===== SLIDER ===== */}
      <section id="actualites" style={{ position: "relative", backgroundColor: "#f0f4f9", overflow: "hidden", minHeight: "460px" }}>
        <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", textAlign: "center", userSelect: "none", pointerEvents: "none", zIndex: 1, lineHeight: 1 }}>
          <div style={{ color: "#cdd8ec", fontSize: "clamp(50px, 8vw, 110px)", fontWeight: "900", letterSpacing: "-2px" }}>Actualités</div>
          <div style={{ color: "#b8cde0", fontSize: "clamp(65px, 11vw, 140px)", fontWeight: "900", letterSpacing: "-4px", marginTop: "-10px" }}>FSBM</div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", minHeight: "460px", gap: "48px", position: "relative", zIndex: 2 }}>
          <div style={{ padding: "60px 0", opacity: fade ? 1 : 0, transform: fade ? "translateX(0)" : "translateX(-20px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
            <h2 style={{ color: "#0d2d5e", fontSize: "clamp(22px, 3vw, 40px)", fontWeight: "900", lineHeight: "1.25", margin: "0 0 16px 0" }}>{slide.titre}</h2>
            <p style={{ color: "#4a6080", fontSize: "16px", lineHeight: "1.7", margin: "0 0 32px 0" }}>{slide.resume}</p>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/actualites"); }}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "#0d2d5e", color: "#ffffff", padding: "13px 28px", borderRadius: "4px", textDecoration: "none", fontWeight: "700", fontSize: "14px", letterSpacing: "0.03em", transition: "background 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1a4a8a"; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#0d2d5e"; e.currentTarget.style.transform = "translateX(0)"; }}>
              Voir Plus →
            </a>
          </div>
          <div style={{ opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.35s ease, transform 0.35s ease", padding: "40px 0" }}>
            <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 50px rgba(13,45,94,0.18)", height: "300px" }}>
              <img src={slide.image} alt={slide.titre} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
        <button onClick={handlePrev} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, backgroundColor: "#fff", border: "1px solid #dde6f0", color: "#0d2d5e", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={handleNext} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10, backgroundColor: "#fff", border: "1px solid #dde6f0", color: "#0d2d5e", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div style={{ position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
          {actualites.map((_, i) => (
            <button key={i} onClick={() => { goToSlide(i); startInterval(); }}
              style={{ width: i === currentSlide ? "26px" : "9px", height: "9px", borderRadius: "5px", border: "none", backgroundColor: i === currentSlide ? "#0d2d5e" : "#b0c4de", cursor: "pointer", padding: 0, transition: "width 0.3s ease, background 0.3s ease" }} />
          ))}
        </div>
      </section>
 
      {/* ===== CHIFFRES CLÉS ===== */}
      <section id="chiffres-cles" ref={chiffresRef} style={{ backgroundColor: "#f8fafd", padding: "70px 4%" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "30px", fontWeight: "700", color: "#0d2d5e", margin: 0 }}>Nos Clubs par Domaine</h2>
          <div style={{ width: "50px", height: "5px", backgroundColor: "#0d2d5e", margin: "14px auto 0" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "stretch", flexWrap: "nowrap", gap: "0", overflowX: "auto" }}>
          {chiffres.map((c, i) => (
            <div key={i}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", flex: "1", minWidth: "160px", padding: "32px 16px", borderRight: i < chiffres.length - 1 ? "1px solid #dde8f7" : "none", backgroundColor: "#f8fafd", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f8fafd"}
            >
              <div style={{ width: "80px", height: "80px", backgroundColor: "#dde8f7", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
              <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: "900", color: "#0d2d5e", lineHeight: 1 }}>{counts[i]}</div>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#e07b20", letterSpacing: "0.06em", textAlign: "center", textTransform: "uppercase" }}>{c.label}</div>
              <div style={{ fontSize: "12px", color: "#5a7a9a", textAlign: "center", lineHeight: "1.5" }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ===== MOT DU VICE-DOYEN ===== */}
      <section id="mot-du-doyen" style={{ backgroundColor: "#ffffff", padding: "70px 8%" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0d2d5e", margin: 0 }}>Mot du Vice-Doyen chargé de la Vie Étudiante</h2>
          <div style={{ width: "80px", height: "5px", backgroundColor: "#0d2d5e", margin: "16px auto" }}></div>
        </div>
        <div style={{ display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1", minWidth: "280px", textAlign: "center" }}>
            <div style={{ width: "260px", height: "260px", borderRadius: "50%", overflow: "hidden", border: "10px solid #eef4ff", margin: "auto" }}>
              <img src={doyenImg} alt="Vice-Doyen FSBM" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ flex: "2", minWidth: "320px" }}>
            <h3 style={{ fontSize: "32px", fontWeight: "900", color: "#0d2d5e", marginBottom: "8px" }}>Pr. MORDANE SOUMIA</h3>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#888", letterSpacing: "1px", margin: "0 0 24px 0" }}>VICE-DOYENNE DE LA FSBM</p>
            <p style={{ fontSize: "17px", color: "#333", lineHeight: "1.9", margin: 0 }}>
              Les clubs étudiants représentent un pilier essentiel de la vie universitaire. Ils offrent aux étudiants une opportunité unique d'acquérir des compétences transversales : leadership, communication, esprit d'équipe, organisation et responsabilité. Ce plateforme vise à valoriser les différents clubs de notre faculté et à encourager davantage d'étudiants à rejoindre ces structures actives et enrichissantes.
            </p>
          </div>
        </div>
      </section>
 
      {/* ===== ORGANIGRAMME ===== */}
      <section id="organigramme" style={{ backgroundColor: "#f8fafd", padding: "70px 8%" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0d2d5e", margin: 0 }}>ORGANIGRAMME</h2>
          <div style={{ width: "80px", height: "5px", backgroundColor: "#0d2d5e", margin: "16px auto" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "48px" }}>
          {equipe.map((p, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "220px", textAlign: "center" }}>
              <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#dde8f7", border: "8px solid #eef4ff", marginBottom: "20px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.photo ? <img src={p.photo} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "52px", color: "#2a5ba5", fontWeight: "900" }}>{p.nom.charAt(0)}</span>}
              </div>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "#2a5ba5", fontStyle: "italic", marginBottom: "8px" }}>{p.nom}</div>
              <div style={{ fontSize: "13px", color: "#5a7a9a", fontStyle: "italic", lineHeight: "1.5" }}>{p.role}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ===== OBJECTIFS ===== */}
      <section id="objectifs" style={{ backgroundColor: "#ffffff", padding: "70px 8%" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#0d2d5e", margin: 0 }}>Objectifs des Clubs Étudiants</h2>
          <div style={{ width: "80px", height: "5px", backgroundColor: "#0d2d5e", margin: "16px auto" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "32px" }}>
          {[
            { title: "Développement Personnel", color: "#0d2d5e", bg: "#dde8f7", text: "Les clubs offrent aux étudiants l'occasion de renforcer leurs compétences transversales : communication, leadership, organisation et créativité.", icon: <svg width="28" height="28" fill="none" stroke="#0d2d5e" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
            { title: "Rayonnement Scientifique et Culturel", color: "#e07b20", bg: "#fde8ce", text: "À travers conférences, ateliers et projets innovants, les clubs contribuent à promouvoir le savoir scientifique, la culture et l'ouverture sur le monde.", icon: <svg width="28" height="28" fill="none" stroke="#e07b20" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 010 20"/></svg> },
            { title: "Animation de la Vie Universitaire", color: "#2a5ba5", bg: "#dde8f7", text: "Les activités des clubs enrichissent la vie étudiante par des événements artistiques, sportifs, culturels et sociaux, renforçant ainsi l'esprit de communauté à la FSBM.", icon: <svg width="28" height="28" fill="none" stroke="#2a5ba5" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          ].map((obj, i) => (
            <div key={i} style={{ flex: "1", minWidth: "260px", maxWidth: "340px", backgroundColor: "#f8fafd", borderRadius: "12px", padding: "36px 28px", borderTop: `5px solid ${obj.color}`, boxShadow: "0 4px 20px rgba(13,45,94,0.07)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,45,94,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,45,94,0.07)"; }}
            >
              <div style={{ width: "56px", height: "56px", backgroundColor: obj.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>{obj.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0d2d5e", margin: "0 0 14px 0" }}>{obj.title}</h3>
              <p style={{ fontSize: "15px", color: "#4a6080", lineHeight: "1.75", margin: 0 }}>{obj.text}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ===== FOOTER ===== */}
      <footer style={{ backgroundColor: "#0d2d5e", color: "#cdd8ec", padding: "60px 8% 0" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", justifyContent: "space-between", paddingBottom: "48px" }}>
          <div style={{ flex: "1", minWidth: "220px", maxWidth: "280px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>Portail Campus</h3>
            <img src={logo} alt="Logo FSBM" style={{ width: "130px", marginBottom: "16px", filter: "brightness(0) invert(1)" }} />
            <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#9fb8d8", margin: "0 0 20px 0" }}>La Faculté des Sciences Ben M'Sik accueille une communauté étudiante dynamique, animée par des clubs actifs qui enrichissent la vie universitaire.</p>
            <div style={{ display: "flex", gap: "14px" }}>
              {[
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>,
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.6 1.64.9a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 01-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.55 4.55 0 01-2.04.08 4.53 4.53 0 004.23 3.14A9.07 9.07 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85l-.01-.59A9.17 9.17 0 0023 3z"/>,
                <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>,
              ].map((icon, i) => (
                <a key={i} href="#" style={{ color: "#9fb8d8", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#e07b20"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9fb8d8"}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
                </a>
              ))}
            </div>
          </div>
 
          <div style={{ flex: "1", minWidth: "160px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>Liens Rapides</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[{ label: "Actualités", path: "/actualites" }, { label: "Nos Clubs", id: "nos-clubs" }, { label: "Événements", id: "evenements" }, { label: "Contactez-nous", id: "contact" }].map((item) => (
                <li key={item.label}>
                  <a href="#" onClick={(e) => { e.preventDefault(); item.path ? navigate(item.path) : scrollTo(item.id); }}
                    style={{ color: "#9fb8d8", textDecoration: "none", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#e07b20"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9fb8d8"}>
                    <span style={{ color: "#e07b20", fontSize: "10px" }}>▶</span>{item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          <div style={{ flex: "1", minWidth: "180px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>Notre Équipe</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {[{ nom: "Douaa Naggour", role: "Étudiante 3ème année Dev. Info." }, { nom: "Hania M'lissa", role: "Étudiante 3ème année Dev. Info." }].map((p) => (
                <li key={p.nom} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#1a4a8a", border: "2px solid #2a5ba5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "13px", fontWeight: "800", color: "#9fc0f1" }}>{p.nom.charAt(0)}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>{p.nom}</div>
                    <div style={{ fontSize: "11px", color: "#7a9bbf" }}>{p.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
 
          <div style={{ flex: "1", minWidth: "220px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: "#ffffff", marginBottom: "20px" }}>Contact</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#e07b20", flexShrink: 0, marginTop: "2px" }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <span style={{ fontSize: "14px", color: "#9fb8d8", lineHeight: "1.7" }}>Faculté des Sciences Ben M'Sik, Boulevard Driss El Harti, Casablanca, Maroc</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "#e07b20" }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></span>
                <span style={{ fontSize: "14px", color: "#9fb8d8" }}>(+212) 6 61 44 24 27</span>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "#e07b20" }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg></span>
                <span style={{ fontSize: "14px", color: "#9fb8d8" }}>fsbm.contact@univh2c.ma</span>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a4a8a", padding: "20px 0", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#5a7a9a" }}>© {new Date().getFullYear()} Faculté des Sciences Ben M'Sik — Réalisé par les étudiants de 3ème année Développement Informatique</p>
        </div>
      </footer>
 
      <style>{`
        @keyframes dropFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { nav { display: none !important; } .hamburger-btn { display: flex !important; } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}