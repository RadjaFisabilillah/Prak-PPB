import express from "express";
import { ReportController } from "../controllers/reportController.js";

const router = express.Router();

// Route for getting the total number of medications
router.get("/total", ReportController.getTotalMedications);

export default router;
