
import { z } from "zod";

export const projetoSchema = z.object({
  nome: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres.").max(120),

  descricao: z.string().trim().max(2000).nullable().optional(),

  status: z.enum([
    "PLANEJAMENTO",
    "EM_ANDAMENTO",
    "CONCLUIDO",
    "CANCELADO",
  ]),

  prioridade: z.enum([
    "BAIXA",
    "MEDIA",
    "ALTA",
    "URGENTE",
  ]),

  responsavel: z.string().trim().min(2, "Informe o responsável.").max(100),

  dataInicio: z.iso.datetime({ offset: true }).nullable().optional(),

  prazo: z.iso.datetime({ offset: true }).nullable().optional(),
}).refine(
  (data) =>
    !data.dataInicio ||
    !data.prazo ||
    new Date(data.prazo) >= new Date(data.dataInicio),
  {
    message: "O prazo não pode ser anterior à data de início.",
    path: ["prazo"],
  }
);

export const atualizarProjetoSchema = projetoSchema.safeExtend({
  nome: projetoSchema.shape.nome.optional(),
  status: projetoSchema.shape.status.optional(),
  prioridade: projetoSchema.shape.prioridade.optional(),
  responsavel: projetoSchema.shape.responsavel.optional(),
});

export type CriarProjetoInput = z.infer<typeof projetoSchema>;
export type AtualizarProjetoInput = z.infer<typeof atualizarProjetoSchema>;
