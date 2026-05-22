type Props = {
  title: string;
  value: number;
  accent?: string;
};

export const DashboardCard = ({
  title,
  value,
  accent = "from-blue-500/20 to-cyan-500/10",
}: Props) => {
  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <h2 className="text-sm font-medium text-zinc-400">{title}</h2>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {formattedValue}
      </p>
    </div>
  );
};
