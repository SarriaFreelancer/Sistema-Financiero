import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/client";

export const Login = ({ onNavigateToRegister }: { onNavigateToRegister: () => void }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userData = await authApi.login({ email, password });
      login(userData); // Guarda en Context y LocalStorage
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-850 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">Iniciar Sesión</h2>
          <p className="text-zinc-400 text-sm mt-2">Ingresa a tu panel de control financiero</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Correo Electrónico</label>
            <input
              type="email"
              required
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Contraseña</label>
            <input
              type="password"
              required
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium p-3 rounded-lg shadow-md transition-colors text-sm mt-2"
          >
            {loading ? "Verificando..." : "Entrar al Sistema"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-zinc-400">
            ¿No tienes cuenta?{" "}
            <button 
              onClick={onNavigateToRegister} 
              className="text-blue-500 hover:underline font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};