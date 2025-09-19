import dotenv from "dotenv";
dotenv.config(); // <-- HARUS DIJALANKAN PERTAMA KALI

import express from "express";
import medicationRoutes from "./routes/medicationRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import reportRoutes from "./routes/reportRoutes.js"; // <-- Impor rute baru

const app = express();
app.use(express.json());

// routes
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/reports", reportRoutes); // <-- Gunakan rute baru

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
