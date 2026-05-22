import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const expenseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  categoryId: z.coerce.number(),
  clientId: z.coerce.number() // <-- Agregado
});

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        clientId: Number(clientId) // <-- Filtrado por cliente
      },
      include: {
        category: true
      }
    });

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting expenses" });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const parsed = expenseSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const expense = await prisma.expense.create({
      data: parsed.data
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating expense" });
  }
};