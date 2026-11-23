
import { prisma } from "../lib/prisma.js";
import type {
  CriarProjetoInput,
  AtualizarProjetoInput,
} from "../schemas/projeto.schema.js";

function prepararDados(
  dados: CriarProjetoInput | AtualizarProjetoInput
) {
  return {
    ...dados,
    ...(dados.dataInicio !== undefined && {
      dataInicio: dados.dataInicio
        ? new Date(dados.dataInicio)
        : null,
    }),
    ...(dados.prazo !== undefined && {
      prazo: dados.prazo
        ? new Date(dados.prazo)
        : null,
    }),
  };
}

export const projetoService = {
  listar() {
    return prisma.projeto.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  buscarPorId(id: string) {
    return prisma.projeto.findUnique({
      where: { id },
    });
  },

  criar(dados: CriarProjetoInput) {
    return prisma.projeto.create({
      data: prepararDados(dados),
    });
  },

  atualizar(id: string, dados: AtualizarProjetoInput) {
    return prisma.projeto.update({
      where: { id },
      data: prepararDados(dados),
    });
  },

  excluir(id: string) {
    return prisma.projeto.delete({
      where: { id },
    });
  },

  async estatisticas() {
    const [total, porStatus] = await Promise.all([
      prisma.projeto.count(),
      prisma.projeto.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

    return {
      total,
      porStatus: Object.fromEntries(
        porStatus.map((item) => [
          item.status,
          item._count._all,
        ])
      ),
    };
  },
};
