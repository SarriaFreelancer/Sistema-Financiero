type Props = {
  data: any[];
};

export const TransactionTable = ({ data }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-white">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.25em] text-zinc-400">
            <tr>
              <th className="px-4 py-4">Título</th>
              <th className="px-4 py-4">Monto</th>
              <th className="px-4 py-4">Fecha</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-sm text-zinc-400" colSpan={3}>
                  No hay registros aún.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-white/5">
                  <td className="px-4 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-4 py-4 text-zinc-200">${item.amount}</td>
                  <td className="px-4 py-4 text-zinc-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
