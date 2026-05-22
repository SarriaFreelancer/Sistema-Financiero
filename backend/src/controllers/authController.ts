import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const prisma = new PrismaClient();

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${derivedKey}`;
};

const verifyPassword = (password: string, storedPassword: string) => {
  const [salt, hash] = storedPassword.split(":");

  if (!salt || !hash) {
    return false;
  }

  const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  if (hash.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derivedKey, "hex"));
};

const stripPassword = (user: { password: string } & Record<string, unknown>) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "name, email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "This email is already registered" });
    }

    const password = hashPassword(parsed.data.password);

    const user = await prisma.$transaction(async (tx) => {
      const client = await tx.client.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: "",
        },
      });

      return tx.user.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          password,
          clientId: client.id,
        } as any,
      });
    });

    res.status(201).json(stripPassword(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user || !verifyPassword(parsed.data.password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(stripPassword(user));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};
