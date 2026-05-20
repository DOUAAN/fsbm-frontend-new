import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./assets/LOGO.png";
 
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    setLoading(true);
    setErreur("");
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        motDePasse,
      });
      const { token, utilisateur } = res.data;
      localStorage.setItem("token", token);
      onLogin(utilisateur);
      navigate("/dashboard");
    } catch (err) {
      setErreur("Email ou mot de passe incorrect !");
    }
    setLoading(false);
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };
 
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f4f9", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
 
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
          <button onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "1px solid #dde6f0", color: "#0d2d5e", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#eef4ff"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour à l'accueil
          </button>
        </div>
      </header>
 
      {/* ===== FORM ===== */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>
 
          {/* Card */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 32px rgba(13,45,94,0.12)", overflow: "hidden" }}>
 
            {/* Card header bleu */}
            <div style={{ backgroundColor: "#0d2d5e", padding: "32px 40px 28px", textAlign: "center" }}>
              <img src={logo} alt="Logo" style={{ height: "52px", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: "16px" }} />
              <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: "900", margin: "0 0 6px 0" }}>Espace Connexion</h2>
              <p style={{ color: "#a8c4e8", fontSize: "13px", margin: 0 }}>Accédez à votre espace CLUB-FSBM</p>
            </div>
 
            {/* Card body */}
            <div style={{ padding: "36px 40px" }}>
 
              {/* Erreur */}
              {erreur && (
                <div style={{ backgroundColor: "#fff0f0", border: "1px solid #fcc", color: "#c0392b", fontSize: "13px", padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {erreur}
                </div>
              )}
 
              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1a2a4a", marginBottom: "8px" }}>
                  Adresse Email
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8a9fba" }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
                  </span>
                  <input
                    type="email"
                    placeholder="exemple@fsbm.ma"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%", border: "1px solid #dde6f0", padding: "11px 14px 11px 42px", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#1a2a4a", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                    onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"}
                  />
                </div>
              </div>
 
              {/* Mot de passe */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1a2a4a", marginBottom: "8px" }}>
                  Mot de passe
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#8a9fba" }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={motDePasse}
                    onChange={e => setMotDePasse(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ width: "100%", border: "1px solid #dde6f0", padding: "11px 42px 11px 42px", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#1a2a4a", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={e => e.currentTarget.style.borderColor = "#0d2d5e"}
                    onBlur={e => e.currentTarget.style.borderColor = "#dde6f0"}
                  />
                  <button onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "#8a9fba", padding: 0 }}>
                    {showPassword
                      ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>
 
              {/* Bouton */}
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{ width: "100%", backgroundColor: loading ? "#6a8fc0" : "#0d2d5e", color: "#ffffff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#1a4a8a"; }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#0d2d5e"; }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
                    Se connecter
                  </>
                )}
              </button>
            </div>
          </div>
 
          {/* Footer card */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#8a9fba", marginTop: "20px" }}>
            © {new Date().getFullYear()} Faculté des Sciences Ben M'Sik — CLUB-FSBM
          </p>
        </div>
      </div>
 
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}