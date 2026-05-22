import { useMemo } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useReports } from "../hooks/useReports";
import { downloadFinanceReport } from "../utils/exportFinanceReport";
import { notifyError, notifySuccess } from "../utils/notifications";

export const Reports = () => {
  const { data: summary, isLoading: loadingSummary } = useReports();
  const { data: dashboard, isLoading: loadingDashboard } = useDashboard();

  const monthlyRows = useMemo(() => dashboard?.financeByMonth || [], [dashboard]);

  const handleDownload = async () => {
    if (!summary || !dashboard) {
      await notifyError("No hay datos suficientes para exportar.");
      return;
    }

    downloadFinanceReport(summary, monthlyRows);
    await notifySuccess("Reporte descargado", "Se generó el archivo Excel.");
  };

  if (loadingSummary || loadingDashboard) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-zinc-400">
        Cargando reportes...
      </div>
    );
  }

  if (!summary) {
    return <div className="text-white">No hay datos disponibles.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-400/80">
              Reportes
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Resumen financiero
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
              Descarga tus informes en Excel y compártelos fácilmente.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            Descargar Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <p className="text-sm text-zinc-400">Ingresos</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            ${summary.totalIncome}
          </p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <p className="text-sm text-zinc-400">Gastos</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            ${summary.totalExpense}
          </p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
          <p className="text-sm text-zinc-400">Balance</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            ${summary.balance}
          </p>
        </div>
      </div>
    </div>
  );
};
