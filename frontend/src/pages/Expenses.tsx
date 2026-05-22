import { useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { TransactionTable } from "../components/TransactionTable";
import { useExpenses } from "../hooks/useExpenses";
import { Modal } from "../components/Modal";

export const Expenses = () => {
  const { data } = useExpenses();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gastos</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nuevo gasto
        </button>
      </div>

      <TransactionTable data={data || []} />

      <Modal open={open} title="Nuevo gasto" onClose={() => setOpen(false)}>
        <ExpenseForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
};
