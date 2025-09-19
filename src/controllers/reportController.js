import { ReportModel } from "../models/reportModel.js";

export const ReportController = {
  async getTotalMedications(req, res) {
    try {
      const result = await ReportModel.getTotalMedications();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
