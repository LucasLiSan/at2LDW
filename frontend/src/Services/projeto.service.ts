
import { api } from "@/services/api";
import type {
  Projeto,
  ProjetoInput,
  EstatisticasProjetos,
} from "@/types/projeto";

const BASE_URL = "/api/projetos";

export const projetoService = {
  async listar(): Promise<Projeto[]> {
    const { data } = await api.get<Projeto[]>(BASE_URL);
    return data;
  },

  async buscar(id: string): Promise<Projeto> {
    const { data } = await api.get<Projeto>(
      `${BASE_URL}/${id}`
    );
    return data;
  },

  async criar(dados: ProjetoInput): Promise<Projeto> {
    const { data } = await api.post<Projeto>(
      BASE_URL,
      dados
    );
    return data;
  },

  async atualizar(
    id: string,
    dados: ProjetoInput
  ): Promise<Projeto> {
    const { data } = await api.put<Projeto>(
      `${BASE_URL}/${id}`,
      dados
    );
    return data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },

  async estatisticas(): Promise<EstatisticasProjetos> {
    const { data } =
      await api.get<EstatisticasProjetos>(
        `${BASE_URL}/estatisticas`
      );

    return data;
  },
};
