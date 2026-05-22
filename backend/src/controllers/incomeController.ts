import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const incomeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.coerce.number(),
  categoryId: z.coerce.number(),
  clientId: z.coerce.number() // <-- Agregado
});

export const getIncomes = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const incomes = await prisma.income.findMany({
      where: {
        clientId: Number(clientId) // <-- Filtrado por cliente
      },
      include: {
        category: true
      }
    });

    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting incomes" });
  }
};

export const createIncome = async (req: Request, res: Response) => {
  try {
    const parsed = incomeSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const income = await prisma.income.create({
      data: parsed.data
    });

    res.status(201).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating income" });
  }
};