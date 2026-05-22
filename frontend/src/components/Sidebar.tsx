import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
    isActive
      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
      : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
  ].join(" ");

export const Sidebar = ({ open = true, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
  };

  return (
    <>
      {open && onClose ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-white/5 bg-zinc-950/95 px-4 py-5 shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 md:border-r md:border-white/5 md:bg-zinc-950/80",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-400/80">
              Finance System
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">Control Panel</h1>
          </div>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 p-2 text-zinc-300 hover:bg-white/5 md:hidden"
            >
              ✕
            </button>
          ) : null}
        </div>

        <div className="mb-6 rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Sesión activa
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{user?.name}</p>
          <p className="text-xs text-zinc-400">{user?.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink to="/" className={navLinkClass} onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink to="/expenses" className={navLinkClass} onClick={onClose}>
            Gastos
          </NavLink>
          <NavLink to="/income" className={navLinkClass} onClick={onClose}>
            Ingresos
          </NavLink>
          <NavLink to="/reports" className={navLinkClass} onClick={onClose}>
            Reportes
          </NavLink>
          <NavLink to="/categories" className={navLinkClass} onClick={onClose}>
            Categorías
          </NavLink>
        </nav>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-500/20"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};
