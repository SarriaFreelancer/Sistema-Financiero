import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { useCurrentClientId } from "./useCurrentClientId";

export const useFinanceChart = () => {
  const clientId = useCurrentClientId();

  return useQuery({
    queryKey: ["finance-chart", clientId],
    queryFn: async () => {
      const [incomeRes, expenseRes] = await Promise.all([
        api.get("/income", { params: { clientId } }),
        api.get("/expenses", { params: { clientId } }),
      ]);

      const incomes = incomeRes.data;
      const expenses = expenseRes.data;

      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const incomeByMonth: Record<number, number> = {};
      const expenseByMonth: Record<number, number> = {};

      incomes.forEach((i: any) => {
        const m = new Date(i.createdAt).getMonth();
        incomeByMonth[m] = (incomeByMonth[m] || 0) + i.amount;
      });

      expenses.forEach((e: any) => {
        const m = new Date(e.createdAt).getMonth();
        expenseByMonth[m] = (expenseByMonth[m] || 0) + e.amount;
      });

      return months.map((name, index) => ({
        date: name,
        income: incomeByMonth[index] || 0,
        expense: expenseByMonth[index] || 0,
      }));
    },
    enabled: !!clientId,
  });
};
