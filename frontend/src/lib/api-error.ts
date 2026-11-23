
import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "A requisição demorou mais que o esperado.";
    }

    if (!error.response) {
      return "Não foi possível conectar ao servidor.";
    }

    const data: unknown = error.response.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }

    return `Erro HTTP ${error.response.status}.`;
  }

  return "Ocorreu um erro inesperado.";
}
