
import type { Request, Response, NextFunction } from "express";
import { projetoService } from "../services/projeto.service.js";
import {
  projetoSchema,
  atualizarProjetoSchema,
} from "../schemas/projeto.schema.js";

export const projetoController = {
  async listar(_req: Request, res: Response, next: NextFunction) {
    try {
      const projetos = await projetoService.listar();
      res.status(200).json(projetos);
    } catch (error) {
      next(error);
    }
  },

  async buscar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const projeto = await projetoService.buscarPorId(id);

      if (!projeto) {
        res.status(404).json({
          message: "Projeto não encontrado.",
        });
        return;
      }

      res.status(200).json(projeto);
    } catch (error) {
      next(error);
    }
  },

  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const dados = projetoSchema.parse(req.body);
      const projeto = await projetoService.criar(dados);

      res.status(201).json(projeto);
    } catch (error) {
      next(error);
    }
  },

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const dados = atualizarProjetoSchema.parse(req.body);

      const projetoAtual = await projetoService.buscarPorId(id);

      if (!projetoAtual) {
        res.status(404).json({
          message: "Projeto não encontrado.",
        });
        return;
      }

      const projeto = await projetoService.atualizar(id, dados);
      res.status(200).json(projeto);
    } catch (error) {
      next(error);
    }
  },

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);

      const projeto = await projetoService.buscarPorId(id);

      if (!projeto) {
        res.status(404).json({
          message: "Projeto não encontrado.",
        });
        return;
      }

      await projetoService.excluir(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async estatisticas(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dados = await projetoService.estatisticas();
      res.status(200).json(dados);
    } catch (error) {
      next(error);
    }
  },
};
