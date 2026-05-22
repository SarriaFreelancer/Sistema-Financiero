import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getReportSummary = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const targetClientId = Number(clientId);

    const income = await prisma.income.findMany({ where: { clientId: targetClientId } });
    const expense = await prisma.expense.findMany({ where: { clientId: targetClientId } });

    const totalIncome = income.reduce((a, b) => a + b.amount, 0);
    const totalExpense = expense.reduce((a, b) => a + b.amount, 0);
    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating report" });
  }
};