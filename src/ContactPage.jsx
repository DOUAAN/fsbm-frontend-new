import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/LOGO.png";

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.prenom || !form.nom || !form.email || !form.message) return;
    setSent(true);
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #dde6f0",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1a2a4a",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1a2a4a",
    marginBottom: "8px",
  };

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
          <a href="#" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="#" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.6 1.64.9a4.52 4.52 0 00-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 01-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.55 4.55 0 01-2.04.08 4.53 4.53 0 004.23 3.14A9.07 9.07 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85l-.01-.59A9.17 9.17 0 0023 3z"/></svg></a>
          <a href="#" style={{ color: "#cdd8ec" }}><svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
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
            <button onClick={() => navigate("/")}
              style={{ background: "transparent", border: "1px solid #dde6f0", color: "#0d2d5e", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Accueil
            </button>
            <button onClick={() => navigate("/login")}
              style={{ backgroundColor: "#0d2d5e", color: "#fff", border: "none", padding: "9px 22px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
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
          <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: "600" }}>Contactez-nous</span>
        </div>
        <h1 style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "900", margin: "0 0 12px 0" }}>
          Contactez-nous
        </h1>
        <p style={{ color: "#a8c4e8", fontSize: "16px", lineHeight: "1.7", margin: 0, maxWidth: "600px" }}>
          Besoin d'informations ? N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour répondre à vos questions.
        </p>
        <div style={{ width: "60px", height: "4px", backgroundColor: "#e07b20", borderRadius: "2px", marginTop: "20px" }} />
      </div>

      {/* ===== CONTENU ===== */}
      <div style={{ padding: "56px 8%", display: "grid", gridTemplateColumns: "1fr 380px", gap: "56px", maxWidth: "1280px", margin: "0 auto", boxSizing: "border-box" }}>

        {/* ===== FORMULAIRE ===== */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "40px", boxShadow: "0 4px 20px rgba(13,45,94,0.08)" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0d2d5e", margin: "0 0 32px 0" }}>
            Envoyez-nous un message
          </h3>

          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: "72px", height: "72px", backgroundColor: "#eef4ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="32" height="32" fill="none" stroke="#0d2d5e" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: "800", color: "#0d2d5e", margin: "0 0 10px 0" }}>Message envoyé !</h4>
              <p style={{ color: "#5a7a9a", fontSize: "15px", margin: "0 0 28px 0" }}>Nous vous répondrons dans les plus brefs délais.</p>
              <button onClick={() => setSent(false)}
                style={{ backgroundColor: "#0d2d5e", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              {/* Prénom + Nom */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input name="prenom" type="text" placeholder="Votre prénom" value={form.prenom} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                    onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"} />
                </div>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input name="nom" type="text" placeholder="Votre nom" value={form.nom} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                    onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Email</label>
                <input name="email" type="email" placeholder="votre.email@exemple.com" value={form.email} onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                  onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"} />
              </div>

              {/* Sujet */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Sujet</label>
                <input name="sujet" type="text" placeholder="Sujet de votre message" value={form.sujet} onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                  onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"} />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Message</label>
                <textarea name="message" placeholder="Votre message..." rows={6} value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                  onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"} />
              </div>

              <button onClick={handleSubmit}
                style={{ backgroundColor: "#0d2d5e", color: "#ffffff", border: "none", padding: "14px 32px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1a4a8a"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#0d2d5e"}
              >
                Envoyer le message
              </button>
            </>
          )}
        </div>

        {/* ===== INFOS CONTACT ===== */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {[
            {
              icon: <svg width="22" height="22" fill="none" stroke="#0d2d5e" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              titre: "Adresse",
              texte: "Faculté des Sciences Ben M'Sik, Boulevard Driss El Harti, Ben M'Sik, Casablanca, Maroc",
            },
            {
              icon: <svg width="22" height="22" fill="none" stroke="#0d2d5e" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.99 6.99l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
              titre: "Téléphone",
              texte: "(+212) 6 61 44 24 27",
            },
            {
              icon: <svg width="22" height="22" fill="none" stroke="#0d2d5e" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>,
              titre: "Email",
              texte: "fsbm.contact@univh2c.ma",
            },
            {
              icon: <svg width="22" height="22" fill="none" stroke="#0d2d5e" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              titre: "Horaires",
              texte: "Lundi – Vendredi : 8h30 – 16h30",
            },
          ].map((info, i) => (
            <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "10px", padding: "24px", boxShadow: "0 4px 16px rgba(13,45,94,0.07)", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", backgroundColor: "#eef4ff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {info.icon}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#0d2d5e", marginBottom: "6px" }}>{info.titre}</div>
                <div style={{ fontSize: "13.5px", color: "#5a7a9a", lineHeight: "1.6" }}>{info.texte}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}