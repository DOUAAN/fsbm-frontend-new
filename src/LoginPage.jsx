import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#f6f1fc] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/Logo-FSBM.PNG" alt="Club FSBM" className="h-12" />
          <span className="font-bold text-xl">
            <span className="text-black">CLUB-</span>
            <span className="text-[#6600FF]">FSBM</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Bienvenue !</h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Connectez-vous à votre espace
        </p>

        {erreur && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {erreur}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="exemple@fsbm.ma"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:border-[#6600FF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:border-[#6600FF]"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#6600FF] text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-[#6600FF] hover:underline">
            ← Retour à l'accueil
          </a>
        </div>

      </div>
    </div>
  );
}