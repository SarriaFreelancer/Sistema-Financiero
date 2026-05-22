import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryForm } from "../components/CategoryForm";
import { Modal } from "../components/Modal";
import { useCategories, type Category } from "../hooks/useCategories";
import { api } from "../api/client";
import { useCurrentClientId } from "../hooks/useCurrentClientId";
import { confirmAction, notifyError, notifySuccess } from "../utils/notifications";

type EditState = {
  open: boolean;
  category: Category | null;
};

export const Categories = () => {
  const queryClient = useQueryClient();
  const clientId = useCurrentClientId();
  const [createOpen, setCreateOpen] = useState(false);
  const [editState, setEditState] = useState<EditState>({
    open: false,
    category: null,
  });

  const {
    data: expenseCategories = [],
    isLoading: loadingExpenses,
  } = useCategories("expense");
  const {
    data: incomeCategories = [],
    isLoading: loadingIncomes,
  } = useCategories("income");

  const handleDelete = async (category: Category) => {
    if (!clientId) {
      await notifyError("No hay una sesión activa.");
      return;
    }

    const confirmed = await confirmAction(
      "Eliminar categoría",
      `¿Quieres eliminar la categoría "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/categories/${category.id}`, {
        params: {
          clientId,
        },
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      await notifySuccess("Categoría eliminada");
    } catch (error) {
      console.error(error);
      await notifyError("No se pudo eliminar la categoría");
    }
  };

  const renderCategoryList = (
    title: string,
    items: Category[],
    loading: boolean,
    badgeClass: string
  ) => (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>
          {items.length} categorías
        </span>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-400">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-zinc-400">Todavía no hay categorías.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200"
            >
              <div>
                <p className="font-medium text-white">{category.name}</p>
                <p className="text-xs text-zinc-500">ID #{category.id}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditState({ open: true, category })}
                  className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(category)}
                  className="rounded-md border border-rose-500/40 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="space-y-5 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categorías</h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nueva categoría
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {renderCategoryList(
          "Categorías de gastos",
          expenseCategories,
          loadingExpenses,
          "bg-rose-500/15 text-rose-300"
        )}

        {renderCategoryList(
          "Categorías de ingresos",
          incomeCategories,
          loadingIncomes,
          "bg-emerald-500/15 text-emerald-300"
        )}
      </div>

      <Modal open={createOpen} title="Nueva categoría" onClose={() => setCreateOpen(false)}>
        <CategoryForm onSuccess={() => setCreateOpen(false)} />
      </Modal>

      <Modal
        open={editState.open}
        title="Editar categoría"
        onClose={() => setEditState({ open: false, category: null })}
      >
        <CategoryForm
          category={editState.category}
          onSuccess={() => setEditState({ open: false, category: null })}
        />
      </Modal>
    </div>
  );
};
