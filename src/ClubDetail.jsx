import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  "ctrlart.png": ctrlart, "sciences-tech.png": sciencesTech,
  "infinity-space.png": infinitySpace, "abc-junior.png": abcJunior,
  "soft-skills.png": soft, "Cik.png": CIK, "aidev.png": aidev,
  "robotique.png": robotique, "sante-sport.png": santeSport,
  "art-identite.png": artIdentite, "sante-env.png": santeEnv,
  "lions.png": lions, "helios.png": helios, "enactus.png": enactus,
  "qoran.png": qoran,
};

export default function ClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Modal rejoindre
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prenom: "", email: "", telephone: "", filiere: "", message: "" });
  const [formStatus, setFormStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  useEffect(() => {
    fetch(`http://localhost:8000/api/clubs/${id}`)
      .then(res => { if (!res.ok) { setNotFound(true); setLoading(false); return null; } return res.json(); })
      .then(data => { if (data) { setClub(data); setLoading(false); } })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  const handleJoindre = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("http://localhost:8000/api/demandes-adhesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, club_id: id }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const openModal = () => {
    setFormData({ nom: "", prenom: "", email: "", telephone: "", filiere: "", message: "" });
    setFormStatus(null);
    setShowModal(true);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8fafd" }}>
      <p style={{ color: "#8a9fba", fontSize: "16px" }}>Chargement...</p>
    </div>
  );

  if (notFound) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8fafd" }}>
      <p style={{ color: "#e07b20", fontSize: "20px", fontWeight: "700" }}>Club introuvable</p>
      <button onClick={() => navigate("/clubs")} style={{ marginTop: "16px", backgroundColor: "#0d2d5e", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "999px", cursor: "pointer", fontWeight: "700" }}>
        Retour aux clubs
      </button>
    </div>
  );

  const clubLogo = club.logo && LOGOS_MAP[club.logo] ? LOGOS_MAP[club.logo] : null;
  const membres = club.membres_bureau
    ? (typeof club.membres_bureau === "string" ? JSON.parse(club.membres_bureau) : club.membres_bureau)
    : [];

  const css = `
    *{box-sizing:border-box}body{margin:0}

    /* TOPBAR */
    .topbar{background:#1a2a4a;color:#cdd8ec;font-size:13px;padding:7px 8%;display:flex;justify-content:space-between;align-items:center}
    .topbar-left{display:flex;gap:24px;align-items:center}
    .topbar-right{display:flex;align-items:center;gap:16px}
    .topbar a{color:#cdd8ec;text-decoration:none}

    /* NAVBAR */
    .navbar{background:#ffffff;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,0.08)}
    .navbar-inner{max-width:1280px;margin:0 auto;padding:0 8%;display:flex;align-items:center;justify-content:space-between;height:72px}
    .brand{display:flex;align-items:center;gap:12px;cursor:pointer}
    .nav-actions{display:flex;gap:8px}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:9px 22px;border-radius:6px;border:none;background:#0d2d5e;color:white;font-size:13px;font-weight:700;cursor:pointer;transition:background .2s}
    .btn:hover{background:#1a4a8a}
    .btn-outline{background:transparent;border:1px solid #dde6f0;color:#0d2d5e}
    .btn-outline:hover{background:#eef4ff}
    .btn-ghost{background:#fff3e0;color:#a05a00;border:1px solid #f5c070}
    .btn-ghost:hover{background:#ffe0b2}

    /* HERO */
    .hero{background:linear-gradient(135deg,#0d2d5e 0%,#1a4a8a 60%,#0d2d5e 100%);padding:56px 8% 48px;display:grid;grid-template-columns:1.3fr .7fr;gap:40px;align-items:center}
    .breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:20px}
    .breadcrumb span{color:#a8c4e8;font-size:13px;cursor:pointer}
    .breadcrumb span:last-child{color:#fff;font-weight:600;cursor:default}
    .badge{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:13px;font-weight:600;margin-bottom:14px}
    .hero h1{margin:0 0 14px;font-size:clamp(26px,4vw,42px);line-height:1.1;color:#ffffff;font-weight:900}
    .hero p{margin:0 0 24px;color:#a8c4e8;font-size:16px;line-height:1.7}
    .hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px}
    .hero-btn{padding:11px 24px;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer;border:none;transition:all .2s}
    .hero-btn-primary{background:#e07b20;color:#fff}
    .hero-btn-primary:hover{background:#c96a10}
    .hero-btn-secondary{background:transparent;border:2px solid rgba(255,255,255,.4);color:#fff}
    .hero-btn-secondary:hover{background:rgba(255,255,255,.1)}
    .hero-meta{display:flex;gap:16px;flex-wrap:wrap}
    .hero-stat{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2)}
    .hero-stat .dot{width:10px;height:10px;border-radius:999px;background:#e07b20;box-shadow:0 0 0 4px rgba(224,123,32,.3);flex-shrink:0}
    .hero-stat strong{color:#fff;font-size:14px}
    .hero-stat small{color:#a8c4e8;font-size:11px;display:block}
    .visual-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:24px;padding:20px;backdrop-filter:blur(10px)}
    .visual-banner{height:200px;border-radius:18px;background:rgba(255,255,255,.95);display:grid;place-items:center;overflow:hidden}
    .visual-banner img{width:90%;height:90%;object-fit:contain}
    .visual-banner span{font-size:72px;font-weight:900;color:#0d2d5e}
    .visual-meta{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
    .mini{padding:12px;border-radius:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18)}
    .mini .cap{font-size:11px;color:#a8c4e8;margin-bottom:4px}
    .mini strong{display:block;font-size:13px;color:#fff;font-weight:700;word-break:break-all}

    /* SECTIONS */
    .section{padding:56px 8%}
    .section-alt{background:#f8fafd}
    .eyebrow{display:inline-block;margin-bottom:8px;color:#e07b20;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
    .section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:32px;flex-wrap:wrap}
    .section-head h2{margin:0;font-size:clamp(20px,3vw,28px);color:#0d2d5e;font-weight:900}
    .divider{width:60px;height:4px;background:#e07b20;border-radius:2px;margin-top:8px}

    /* ABOUT (fusionné) */
    .about-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:24px}
    .about-card{padding:28px;border-radius:18px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(13,45,94,.06)}
    .about-card p{color:#4a6a8a;line-height:1.8;font-size:15px;margin:0}
    .info-card{padding:24px;border-radius:18px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(13,45,94,.06)}
    .info-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0f4f8;font-size:14px}
    .info-row:last-child{border-bottom:none}
    .info-row span:first-child{color:#8a9fba;font-weight:600}
    .info-row span:last-child{color:#0d2d5e;font-weight:700;text-align:right;max-width:60%}
    .status-badge{background:#d1fae5;color:#065f46;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px}

    /* PRESIDENT */
    .president-block{display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:center;padding:32px;border-radius:20px;background:linear-gradient(135deg,#eef4ff,#fff3e0);border:1px solid #e2e8f0}
    .avatar{height:220px;border-radius:20px;background:linear-gradient(145deg,#0d2d5e,#1a4a8a);display:grid;place-items:center;position:relative;overflow:hidden}
    .avatar svg{width:88px;height:88px;stroke:white;fill:none;stroke-width:1.6;opacity:.9}
    .avatar:after{content:"Présidente";position:absolute;bottom:14px;left:0;right:0;text-align:center;color:rgba(255,255,255,.85);font-size:12px}
    .president-block h3{margin:0 0 8px;font-size:22px;color:#0d2d5e;font-weight:900}
    .contact-line{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0 18px}
    .contact-pill{display:inline-flex;align-items:center;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.9);font-size:13px;color:#0d2d5e;font-weight:600}
    blockquote{margin:0;padding:16px 20px;border-left:4px solid #e07b20;background:rgba(255,255,255,.7);border-radius:0 14px 14px 0;color:#4a6a8a;line-height:1.8;font-style:italic;font-size:15px}

    /* TEAM */
    .team-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
    .member{padding:20px 14px;border-radius:18px;background:#ffffff;border:1px solid #e2e8f0;text-align:center;transition:transform .2s,box-shadow .2s;box-shadow:0 2px 8px rgba(13,45,94,.06)}
    .member:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(13,45,94,.12)}
    .member-photo{width:80px;height:80px;margin:0 auto 12px;border-radius:999px;background:linear-gradient(145deg,#0d2d5e,#1a4a8a);display:grid;place-items:center}
    .member-photo svg{width:36px;height:36px;stroke:white;fill:none;stroke-width:1.8}
    .member .role{font-size:11px;color:#e07b20;font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em}
    .member .name{font-size:14px;font-weight:700;color:#0d2d5e;line-height:1.4}

    /* EVENTS */
    .events-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .event-card{border-radius:18px;overflow:hidden;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(13,45,94,.06);transition:transform .2s,box-shadow .2s}
    .event-card:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(13,45,94,.12)}
    .event-image{height:160px;background:linear-gradient(145deg,#0d2d5e,#1a4a8a);position:relative;display:grid;place-items:center}
    .event-image:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent 0 14px,rgba(255,255,255,.05) 14px 15px)}
    .event-image svg{width:48px;height:48px;stroke:rgba(255,255,255,.7);fill:none;stroke-width:1.5;position:relative;z-index:1}
    .event-card:nth-child(2) .event-image{background:linear-gradient(145deg,#1a4a8a,#e07b20)}
    .event-card:nth-child(3) .event-image{background:linear-gradient(145deg,#065f46,#1a4a8a)}
    .event-body{padding:18px}
    .event-body h3{margin:0 0 8px;font-size:16px;font-weight:700;color:#0d2d5e}
    .event-body p{margin:0 0 14px;color:#8a9fba;font-size:13px;line-height:1.6}
    .event-date{display:inline-block;margin-bottom:8px;font-size:12px;color:#e07b20;font-weight:600}

    /* CONTACT */
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .contact-card,.form-card{padding:24px;border-radius:18px;border:1px solid #e2e8f0;background:#ffffff;box-shadow:0 2px 8px rgba(13,45,94,.06)}
    .contact-stack{display:flex;flex-direction:column;margin-top:16px}
    .contact-item{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid #f0f4f8}
    .contact-item:last-child{border-bottom:none}
    .c-icon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:#eef4ff;flex-shrink:0}
    .c-icon svg{width:20px;height:20px;stroke:#0d2d5e;fill:none;stroke-width:1.8}
    .field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
    .field label{font-size:13px;font-weight:700;color:#0d2d5e}
    .field input,.field textarea{width:100%;border:1px solid #e2e8f0;border-radius:10px;padding:11px 14px;background:#f8fafd;color:#0d2d5e;font-family:inherit;font-size:14px;outline:none;transition:border .2s}
    .field input:focus,.field textarea:focus{border-color:#0d2d5e;background:#fff}
    .field textarea{min-height:110px;resize:vertical}

    /* MODAL */
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:grid;place-items:center;z-index:1000;padding:20px}
    .modal{background:#fff;border-radius:20px;padding:32px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
    .modal-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px}
    .modal-header h2{margin:0;color:#0d2d5e;font-size:20px;font-weight:900}
    .modal-close{background:none;border:none;font-size:24px;cursor:pointer;color:#8a9fba;line-height:1;padding:0}
    .modal-close:hover{color:#0d2d5e}
    .modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .success-box{text-align:center;padding:24px 0}
    .success-icon{font-size:52px;margin-bottom:12px}

    /* FOOTER */
    .footer{background:#0d2d5e;padding:32px 8%;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
    .footer-brand{display:flex;align-items:center;gap:12px}
    .footer-brand strong{color:#fff;font-size:15px}
    .footer-brand small{color:#a8c4e8;font-size:12px;display:block}
    .footer-links{display:flex;gap:16px;flex-wrap:wrap}
    .footer-links a{color:#a8c4e8;text-decoration:none;font-size:13px;transition:color .2s}
    .footer-links a:hover{color:#fff}
    .socials{display:flex;gap:8px}
    .socials a{width:38px;height:38px;border-radius:999px;border:1px solid rgba(255,255,255,.2);display:grid;place-items:center;background:rgba(255,255,255,.05);transition:background .2s}
    .socials a:hover{background:rgba(255,255,255,.15)}
    .socials svg{width:16px;height:16px;stroke:#fff;fill:none;stroke-width:1.8}

    @media(max-width:1024px){.team-grid{grid-template-columns:repeat(3,1fr)}.events-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:768px){.hero,.about-grid,.president-block,.contact-grid{grid-template-columns:1fr}.visual-meta{grid-template-columns:1fr}.team-grid{grid-template-columns:repeat(2,1fr)}.events-grid{grid-template-columns:1fr}.footer{flex-direction:column;align-items:flex-start}.modal-grid{grid-template-columns:1fr}}
    @media(max-width:480px){.team-grid{grid-template-columns:1fr}.hero h1{font-size:26px}}
  `;

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f8fafd", minHeight: "100vh" }}>
      <style>{css}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-left">
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
            fsbm.contact@univh2c.ma
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (+212) 6 61 44 24 27
          </span>
        </div>
        <div className="topbar-right">
          <a href="#"><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="#"><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="#cdd8ec" strokeWidth="2"/></svg></a>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" style={{ width: "150px", height: "60px", objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#2a5ba5" }}>CLUB-FSBM</div>
              <div style={{ fontSize: "12px", color: "#9fc0f1" }}>Faculté des Sciences Ben M'Sik</div>
            </div>
          </div>
          <div className="nav-actions">
            <button className="btn btn-outline" onClick={() => navigate("/clubs")}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Nos Clubs
            </button>
            <button className="btn" onClick={() => navigate("/login")}>Connexion</button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="breadcrumb">
            <span onClick={() => navigate("/")}>Accueil</span>
            <span style={{ cursor: "default" }}>›</span>
            <span onClick={() => navigate("/clubs")}>Nos Clubs</span>
            <span style={{ cursor: "default" }}>›</span>
            <span>{club.nom}</span>
          </div>
          <div className="badge">✦ {club.domaine}</div>
          <h1>{club.nom}</h1>
          <p>{club.description || "Un club actif au sein de la Faculté des Sciences Ben M'Sik."}</p>
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary" onClick={openModal}>
              Rejoindre le club
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={() => document.querySelector("#contact-section")?.scrollIntoView({ behavior: "smooth" })}>
              Nous contacter
            </button>
          </div>
          <div className="hero-meta">
            {club.nb_membres && (
              <div className="hero-stat">
                <span className="dot"></span>
                <div><strong>{club.nb_membres} membres</strong><small>Communauté engagée</small></div>
              </div>
            )}
            {club.anneeCreation && (
              <div className="hero-stat">
                <span className="dot"></span>
                <div><strong>Créé en {club.anneeCreation}</strong><small>FSBM • Vie universitaire</small></div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="visual-card">
            <div className="visual-banner">
              {clubLogo
                ? <img src={clubLogo} alt={club.nom} />
                : <span>{club.nom.charAt(0)}</span>
              }
            </div>
            <div className="visual-meta">
              {club.parrain && <div className="mini"><div className="cap">Professeur accompagnant</div><strong>{club.parrain}</strong></div>}
              {club.email && <div className="mini"><div className="cap">Email officiel</div><strong>{club.email}</strong></div>}
            </div>
          </div>
        </div>
      </div>

      {/* À PROPOS (fusionné — plus de répétition) */}
      <div className="section section-alt">
        <div className="section-head">
          <div>
            <span className="eyebrow">À propos</span>
            <h2>Notre mission et nos valeurs</h2>
            <div className="divider"></div>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <p>{club.description || "Informations sur ce club bientôt disponibles."}</p>
          </div>
          <div className="info-card">
            <div className="info-row"><span>Domaine</span><span>{club.domaine}</span></div>
            {club.categorie && <div className="info-row"><span>Catégorie</span><span>{club.categorie}</span></div>}
            <div className="info-row"><span>Année création</span><span>{club.anneeCreation || "—"}</span></div>
            <div className="info-row"><span>Membres</span><span>{club.nb_membres || "—"}</span></div>
            {club.nb_activites && <div className="info-row"><span>Activités/an</span><span>{club.nb_activites}</span></div>}
            {club.parrain && <div className="info-row"><span>Parrain</span><span>{club.parrain}</span></div>}
            <div className="info-row"><span>Statut</span><span className="status-badge">{club.statut}</span></div>
          </div>
        </div>
      </div>

      {/* MOT DU PRESIDENT */}
      {club.president_nom && (
        <div className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Mot du Président</span>
              <h2>Message de la présidence</h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="president-block">
            <div className="avatar">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.3-3.5 4-5 7-5s5.7 1.5 7 5"/></svg>
            </div>
            <div>
              <h3>{club.president_nom}</h3>
              <div className="contact-line">
                <span className="contact-pill">Président(e)</span>
                {club.president_email && <span className="contact-pill">{club.president_email}</span>}
              </div>
              {club.mot_president && <blockquote>"{club.mot_president}"</blockquote>}
            </div>
          </div>
        </div>
      )}

      {/* MEMBRES BUREAU */}
      {membres.length > 0 && (
        <div className="section section-alt">
          <div className="section-head">
            <div>
              <span className="eyebrow">Équipe du bureau</span>
              <h2>Les responsables du club</h2>
              <div className="divider"></div>
            </div>
          </div>
          <div className="team-grid">
            {club.president_nom && (
              <div className="member">
                <div className="member-photo"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.3-3.5 4-5 7-5s5.7 1.5 7 5"/></svg></div>
                <div className="role">Président(e)</div>
                <div className="name">{club.president_nom}</div>
              </div>
            )}
            {membres.map((m, i) => (
              <div key={i} className="member">
                <div className="member-photo"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c1.3-3.5 4-5 7-5s5.7 1.5 7 5"/></svg></div>
                <div className="role">{m.role}</div>
                <div className="name">{m.nom}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EVENEMENTS */}
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Activités & événements</span>
            <h2>Des actions qui font vivre la faculté</h2>
            <div className="divider"></div>
          </div>
          <button className="btn">Voir tous les événements</button>
        </div>
        <div className="events-grid">
          <div className="event-card">
            <div className="event-image">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div className="event-body">
              <span className="event-date">📅 Événements à venir</span>
              <h3>Conférences & Ateliers</h3>
              <p>Rencontres autour des valeurs éthiques, du savoir et du dialogue au sein du campus.</p>
              <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "8px 16px", borderRadius: "6px" }}>Voir plus</button>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="event-body">
              <span className="event-date">📅 Activités régulières</span>
              <h3>Actions solidaires</h3>
              <p>Initiatives tournées vers l'entraide, la générosité et l'engagement citoyen étudiant.</p>
              <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "8px 16px", borderRadius: "6px" }}>Voir plus</button>
            </div>
          </div>
          <div className="event-card">
            <div className="event-image">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div className="event-body">
              <span className="event-date">📅 Projets annuels</span>
              <h3>Partage culturel</h3>
              <p>Moments de cohésion qui renforcent le dialogue, l'écoute et la coopération entre étudiants.</p>
              <button className="btn btn-ghost" style={{ fontSize: "12px", padding: "8px 16px", borderRadius: "6px" }}>Voir plus</button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="section section-alt" id="contact-section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Écrivez-nous</h2>
            <div className="divider"></div>
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <strong style={{ color: "#0d2d5e", fontSize: "16px" }}>Informations de contact</strong>
            <div className="contact-stack">
              {club.email && (
                <div className="contact-item">
                  <div className="c-icon"><svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg></div>
                  <div><strong style={{ color: "#0d2d5e" }}>Email</strong><div style={{ color: "#8a9fba", fontSize: "13px" }}>{club.email}</div></div>
                </div>
              )}
              <div className="contact-item">
                <div className="c-icon"><svg viewBox="0 0 24 24"><path d="M12 21s-6-4.8-6-10a6 6 0 1 1 12 0c0 5.2-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/></svg></div>
                <div><strong style={{ color: "#0d2d5e" }}>Localisation</strong><div style={{ color: "#8a9fba", fontSize: "13px" }}>Faculté des Sciences Ben M'Sik</div></div>
              </div>
              <div className="contact-item">
                <div className="c-icon"><svg viewBox="0 0 24 24"><path d="M5 19h14"/><path d="M8 19V9l4-3 4 3v10"/></svg></div>
                <div><strong style={{ color: "#0d2d5e" }}>Domaine</strong><div style={{ color: "#8a9fba", fontSize: "13px" }}>{club.domaine}</div></div>
              </div>
            </div>
          </div>
          <div className="form-card">
            <strong style={{ color: "#0d2d5e", fontSize: "16px" }}>Envoyer un message</strong>
            <div style={{ marginTop: "16px" }}>
              <div className="field"><label>Nom</label><input placeholder="Votre nom" /></div>
              <div className="field"><label>Email</label><input placeholder="Votre email" /></div>
              <div className="field"><label>Message</label><textarea placeholder="Votre message"></textarea></div>
              <button className="btn" style={{ width: "100%" }}>Envoyer</button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="footer-brand">
          <img src={logo} alt="Logo" style={{ width: "120px", height: "48px", objectFit: "contain", filter: "brightness(0) invert(1)", cursor: "pointer" }} onClick={() => navigate("/")} />
          <div>
            <strong>{club.nom}</strong>
            <small>© FSBM — Tous droits réservés</small>
          </div>
        </div>
        <div className="footer-links">
          <a href="#" onClick={() => navigate("/")}>Accueil</a>
          <a href="#" onClick={() => navigate("/clubs")}>Nos Clubs</a>
          <a href="#contact-section">Contact</a>
        </div>
        <div className="socials">
          <a href="#"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v3H7v4h3v5h4v-5h3l1-4h-4V8c0-.6.4-1 1-1Z"/></svg></a>
          <a href="#"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="white" strokeWidth="2"/></svg></a>
          <a href="#"><svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg></a>
        </div>
      </div>

      {/* MODAL REJOINDRE LE CLUB */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rejoindre {club.nom}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <p style={{ color: "#8a9fba", fontSize: "14px", margin: "4px 0 20px" }}>
              Remplissez ce formulaire — le responsable du club examinera votre demande.
            </p>

            {formStatus === "success" ? (
              <div className="success-box">
                <div className="success-icon">✅</div>
                <p style={{ color: "#065f46", fontWeight: "700", fontSize: "17px", margin: "0 0 8px" }}>Demande envoyée avec succès !</p>
                <p style={{ color: "#8a9fba", fontSize: "14px", margin: "0 0 20px" }}>Le responsable du club vous contactera bientôt.</p>
                <button className="btn" onClick={() => { setShowModal(false); setFormStatus(null); }}>Fermer</button>
              </div>
            ) : (
              <form onSubmit={handleJoindre}>
                <div className="modal-grid">
                  <div className="field">
                    <label>Nom *</label>
                    <input required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} placeholder="Votre nom" />
                  </div>
                  <div className="field">
                    <label>Prénom *</label>
                    <input required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} placeholder="Votre prénom" />
                  </div>
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="votre@email.com" />
                </div>
                <div className="modal-grid">
                  <div className="field">
                    <label>Téléphone</label>
                    <input value={formData.telephone} onChange={e => setFormData({ ...formData, telephone: e.target.value })} placeholder="06XXXXXXXX" />
                  </div>
                  <div className="field">
                    <label>Filière</label>
                    <input value={formData.filiere} onChange={e => setFormData({ ...formData, filiere: e.target.value })} placeholder="Ex: Informatique" />
                  </div>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Pourquoi voulez-vous rejoindre ce club ?" />
                </div>
                {formStatus === "error" && (
                  <p style={{ color: "#e07b20", fontSize: "13px", margin: "-4px 0 12px" }}>⚠ Une erreur s'est produite. Réessayez.</p>
                )}
                <button type="submit" className="btn" style={{ width: "100%" }} disabled={formStatus === "loading"}>
                  {formStatus === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}