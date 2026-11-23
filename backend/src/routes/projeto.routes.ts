
import { Router } from "express";
import { projetoController } from "../controllers/projeto.controller.js";

export const projetoRoutes = Router();

projetoRoutes.get("/estatisticas", projetoController.estatisticas);
projetoRoutes.get("/", projetoController.listar);
projetoRoutes.get("/:id", projetoController.buscar);
projetoRoutes.post("/", projetoController.criar);
projetoRoutes.put("/:id", projetoController.atualizar);
projetoRoutes.delete("/:id", projetoController.excluir);
