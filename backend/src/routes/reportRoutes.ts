import { Router } from "express";
import { getReportSummary } from "../controllers/reporteController";

const router = Router();

router.get("/", getReportSummary);

export default router;
