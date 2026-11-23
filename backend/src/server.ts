
import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Paradoxon API funcionando",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Paradoxon API: http://localhost:${PORT}`);
});
