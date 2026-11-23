
import type {
  Request,
  Response,
  NextFunction,
} from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Dados inválidos.",
      errors: error.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensagem: issue.message,
      })),
    });
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    res.status(404).json({
      message: "Registro não encontrado.",
    });
    return;
  }

  console.error("Erro na API:", error);

  res.status(500).json({
    message: "Erro interno do servidor.",
  });
}
