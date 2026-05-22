import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "../hooks/useCurrentClientId";
import { notifyError, notifySuccess } from "../utils/notifications";

type Category = {
  id: number;
  name: string;
};

type ExpenseFormProps = {
  onSuccess?: () => void;
};

export const ExpenseForm = ({ onSuccess }: ExpenseFormProps) => {
  const queryClient = useQueryClient();
  const clientId = useCurrentClientId();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories", "expense", clientId],
    queryFn: async () => {
      const res = await api.get("/categories", {
        params: { type: "expense", clientId },
      });
      return res.data;
    },
    enabled: !!clientId,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return await api.post("/expenses", {
        title,
        amount: Number(amount),
        categoryId: Number(categoryId),
        clientId,
      });
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", clientId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", clientId] });
      queryClient.invalidateQueries({ queryKey: ["finance-chart", clientId] });

      await notifySuccess("Gasto guardado");
      setTitle("");
      setAmount("");
      setCategoryId("");
      onSuccess?.();
    },

    onError: async () => {
      await notifyError("No se pudo guardar el gasto");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) {
      void notifyError("No hay una sesión activa.");
      return;
    }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Guardar gasto
      </button>
    </form>
  );
};
