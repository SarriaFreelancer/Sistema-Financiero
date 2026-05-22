import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
}

export const FinanceComparisonChart = ({ data }: Props) => {
  // 🔥 calcular balance real
  const chartData = data.map((item) => ({
    ...item,
    balance: item.income - item.expense,
  }));

  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(d.income, d.expense, Math.abs(d.balance)))
  );

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-xl">
      <h2 className="mb-2 text-lg font-semibold text-white">
        Ingresos vs Gastos
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />

          {/* permite ver negativos correctamente */}
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            domain={[-maxValue, maxValue]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F3F4F6",
            }}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                income: "Ingresos",
                expense: "Gastos",
                balance: "Balance",
              };

              return [`$${value}`, labels[name] || name];
            }}
          />

          <Legend />

          {/* 🔵 INGRESOS */}
          <Area
            type="monotone"
            dataKey="income"
            name="Ingresos"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            strokeWidth={2}
          />

          {/* 🔴 GASTOS */}
          <Area
            type="monotone"
            dataKey="expense"
            name="Gastos"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.3}
            strokeWidth={2}
          />

          {/* 🟢 BALANCE (clave para ver diferencia real) */}
          <Area
            type="monotone"
            dataKey="balance"
            name="Balance"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.2}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
