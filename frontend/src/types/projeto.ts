
export type StatusProjeto =
  | "PLANEJAMENTO"
  | "EM_ANDAMENTO"
  | "CONCLUIDO"
  | "CANCELADO";

export type PrioridadeProjeto =
  | "BAIXA"
  | "MEDIA"
  | "ALTA"
  | "URGENTE";

export interface Projeto {
  id: string;
  nome: string;
  descricao: string | null;
  status: StatusProjeto;
  prioridade: PrioridadeProjeto;
  responsavel: string;
  dataInicio: string | null;
  prazo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjetoInput {
  nome: string;
  descricao?: string | null;
  status: StatusProjeto;
  prioridade: PrioridadeProjeto;
  responsavel: string;
  dataInicio?: string | null;
  prazo?: string | null;
}

export interface EstatisticasProjetos {
  total: number;
  porStatus: Record<string, number>;
}

export const STATUS_LABELS: Record<StatusProjeto, string> = {
  PLANEJAMENTO: "Planejamento",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export const PRIORIDADE_LABELS: Record<PrioridadeProjeto, string> = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
};
