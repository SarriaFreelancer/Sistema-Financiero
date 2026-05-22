import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Income } from "./pages/Income";
import { Reports } from "./pages/Reports";
import { Categories } from "./pages/Categories";

const queryClient = new QueryClient();

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/expenses": "Gastos",
  "/income": "Ingresos",
  "/reports": "Reportes",
  "/categories": "Categorías",
};

function MainNavigation() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        Cargando sistema...
      </div>
    );
  }

  if (!user) {
    return authScreen === "login" ? (
      <Login onNavigateToRegister={() => setAuthScreen("register")} />
    ) : (
      <Register onNavigateToLogin={() => setAuthScreen("login")} />
    );
  }

  const pageTitle = pageTitles[location.pathname] ?? "Sistema";

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-white hover:bg-white/10 md:hidden"
                aria-label="Abrir menú"
              >
                ☰
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-blue-400/80">
                  Finance System
                </p>
                <h1 className="text-xl font-semibold text-white sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 sm:block">
              {user.name}
            </div>
          </header>

          <div className="mx-auto w-full max-w-7xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <MainNavigation />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
