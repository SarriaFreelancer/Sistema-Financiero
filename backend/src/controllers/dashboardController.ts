import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const targetClientId = Number(clientId);

    // Traer solo lo correspondiente a este cliente específico
    const incomes = await prisma.income.findMany({ where: { clientId: targetClientId } });
    const expenses = await prisma.expense.findMany({ where: { clientId: targetClientId } });

    const totalIncome = incomes.reduce((acc, item) => acc + (item.amount || 0), 0);
    const totalExpenses = expenses.reduce((acc, item) => acc + (item.amount || 0), 0);
    const balance = totalIncome - totalExpenses;

    // Nota: Quitamos el conteo global de clientes ya que este dashboard ahora es específico de uno solo.

    const incomeByMonth: Record<number, number> = {};
    const expenseByMonth: Record<number, number> = {};

    incomes.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();
      incomeByMonth[month] = (incomeByMonth[month] || 0) + (item.amount || 0);
    });

    expenses.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();
      expenseByMonth[month] = (expenseByMonth[month] || 0) + (item.amount || 0);
    });

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const months = Array.from(
      new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])
    ).map(Number).sort((a, b) => a - b);

    const financeByMonth = months.map((m) => ({
      date: monthNames[m],
      income: incomeByMonth[m] || 0,
      expense: expenseByMonth[m] || 0,
    }));

    res.json({
      balance,
      income: totalIncome,
      expenses: totalExpenses,
      financeByMonth,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard error" });
  }
};