import { DashboardCard } from "../components/DashboardCard";
import { useDashboard } from "../hooks/useDashboard";
import { FinanceComparisonChart } from "../components/FinanceComparisonChart";
import { useFinanceChart } from "../hooks/useFinanceChart";
import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();
  const { data: chartData = [] } = useFinanceChart();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-400">
        Cargando tus finanzas...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-blue-400/80">
              Panel financiero
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Bienvenido de vuelta, {user?.name}
            </h2>
            <p className="max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Revisa tu balance, controla gastos e ingresos y descarga reportes
              listos para compartir.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[560px]">
            <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Balance
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                ${data?.balance || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Ingresos
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                ${data?.income || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Gastos
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                ${data?.expenses || 0}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard
          title="Balance Disponible"
          value={data?.balance || 0}
          accent="from-emerald-400/30 to-cyan-400/10"
        />
        <DashboardCard
          title="Ingresos Totales"
          value={data?.income || 0}
          accent="from-blue-400/30 to-indigo-400/10"
        />
        <DashboardCard
          title="Gastos Totales"
          value={data?.expenses || 0}
          accent="from-rose-400/30 to-orange-400/10"
        />
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Balance mensual</h3>
        <FinanceComparisonChart data={chartData} />
      </div>
    </div>
  );
};
