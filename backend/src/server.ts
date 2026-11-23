
import "dotenv/config";
import express from "express";
import cors from "cors";

import { projetoRoutes } from "./routes/projeto.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Paradoxon | API Docs",
    swaggerOptions: {
      docExpansion: "list",
      persistAuthorization: true,
    },
  })
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Paradoxon API funcionando",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/projetos", projetoRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "Rota não encontrada.",
  });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Paradoxon API: http://localhost:${PORT}`);
});
