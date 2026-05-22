import { useState } from "react";
import { TransactionTable } from "../components/TransactionTable";
import { useIncome } from "../hooks/useIncome";
import { IncomeForm } from "../components/IncomeForm";
import { Modal } from "../components/Modal";

export const Income = () => {
  const { data } = useIncome();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Ingresos</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nuevo ingreso
        </button>
      </div>

      <TransactionTable data={data || []} />

      <Modal open={open} title="Nuevo ingreso" onClose={() => setOpen(false)}>
        <IncomeForm onSuccess={() => setOpen(false)} />
      </Modal>
    </div>
  );
};
