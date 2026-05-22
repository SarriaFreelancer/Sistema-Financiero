import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { clientId, type } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const categories = await prisma.category.findMany({
      where: {
        clientId: Number(clientId),
        ...(typeof type === "string" ? { type } : {}),
      },
    });

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, type, clientId } = req.body;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in body" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        type,
        clientId: Number(clientId)
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, type, clientId } = req.body;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in body" });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
        clientId: Number(clientId),
      },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        type,
      },
    });

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.params.id);
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "clientId is required in query params" });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
        clientId: Number(clientId),
      },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting category" });
  }
};
