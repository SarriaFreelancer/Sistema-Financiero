import { Router } from "express";

import {
  getIncomes,
  createIncome
} from "../controllers/incomeController";

const router = Router();

router.get("/", getIncomes);
router.post("/", createIncome);

export default router;