import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(), // Añadida validación de email real
  phone: z.string()
});

export const getClients = async (_req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' } // Opcional: ordenar los últimos creados primero
    });
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting clients" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const parsed = clientSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const client = await prisma.client.create({
      data: parsed.data
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating client" });
  }
};