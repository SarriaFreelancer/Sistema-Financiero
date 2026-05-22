import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "../hooks/useCurrentClientId";
import { notifyError, notifySuccess } from "../utils/notifications";

type CategoryFormProps = {
  onSuccess?: () => void;
  category?: {
    id: number;
    name: string;
    type: string;
  } | null;
};

export const CategoryForm = ({ onSuccess, category }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const clientId = useCurrentClientId();
  const [name, setName] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type === "income" ? "income" : "expense");
    } else {
      setName("");
      setType("expense");
    }
  }, [category]);

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      await notifyError("No hay una sesión activa.");
      return;
    }

    try {
      if (isEditing && category) {
        await api.put(`/categories/${category.id}`, {
          name,
          type,
          clientId,
        });
        await notifySuccess("Categoría actualizada");
      } else {
        await api.post("/categories", {
          name,
          type,
          clientId,
        });
        await notifySuccess("Categoría creada");
      }

      invalidateCategories();
      onSuccess?.();
    } catch (error) {
      console.log(error);
      await notifyError(
        isEditing ? "Error actualizando categoría" : "Error creando categoría"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre categoría"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as "expense" | "income")}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
      >
        {isEditing ? "Guardar cambios" : "Guardar categoría"}
      </button>
    </form>
  );
};
