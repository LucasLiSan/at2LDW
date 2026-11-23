
export const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Paradoxon Workspace API",
    version: "1.0.0",
    description:
      "API REST para gerenciamento de projetos da Paradoxon Workspace. " +
      "Desenvolvida com Node.js, Express, TypeScript, Prisma e SQLite.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local de desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Sistema",
      description: "Monitoramento da API",
    },
    {
      name: "Projetos",
      description: "Operações de gerenciamento de projetos",
    },
  ],
  components: {
    schemas: {
      ProjetoInput: {
        type: "object",
        required: [
          "nome",
          "status",
          "prioridade",
          "responsavel",
        ],
        properties: {
          nome: {
            type: "string",
            minLength: 3,
            maxLength: 120,
            example: "Portal Institucional Paradoxon",
          },
          descricao: {
            type: "string",
            nullable: true,
            maxLength: 2000,
            example: "Desenvolvimento do portal institucional.",
          },
          status: {
            type: "string",
            enum: [
              "PLANEJAMENTO",
              "EM_ANDAMENTO",
              "CONCLUIDO",
              "CANCELADO",
            ],
            example: "EM_ANDAMENTO",
          },
          prioridade: {
            type: "string",
            enum: ["BAIXA", "MEDIA", "ALTA", "URGENTE"],
            example: "ALTA",
          },
          responsavel: {
            type: "string",
            minLength: 2,
            maxLength: 100,
            example: "Equipe de Desenvolvimento",
          },
          dataInicio: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-11-23T12:00:00-03:00",
          },
          prazo: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-12-20T12:00:00-03:00",
          },
        },
      },
      Projeto: {
        allOf: [
          { $ref: "#/components/schemas/ProjetoInput" },
          {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid",
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
              },
            },
          },
        ],
      },
      Erro: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Projeto não encontrado.",
          },
        },
      },
      Estatisticas: {
        type: "object",
        properties: {
          total: {
            type: "integer",
            example: 5,
          },
          porStatus: {
            type: "object",
            additionalProperties: {
              type: "integer",
            },
            example: {
              PLANEJAMENTO: 2,
              EM_ANDAMENTO: 2,
              CONCLUIDO: 1,
            },
          },
        },
      },
    },
  },
  paths: {
    "/api/health": {
      get: {
        tags: ["Sistema"],
        summary: "Verificar a disponibilidade da API",
        responses: {
          "200": {
            description: "API funcionando",
          },
        },
      },
    },
    "/api/projetos": {
      get: {
        tags: ["Projetos"],
        summary: "Listar todos os projetos",
        responses: {
          "200": {
            description: "Lista de projetos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Projeto",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Projetos"],
        summary: "Cadastrar um projeto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProjetoInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Projeto criado",
          },
          "400": {
            description: "Dados inválidos",
          },
        },
      },
    },
    "/api/projetos/estatisticas": {
      get: {
        tags: ["Projetos"],
        summary: "Consultar estatísticas dos projetos",
        responses: {
          "200": {
            description: "Estatísticas dos projetos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Estatisticas",
                },
              },
            },
          },
        },
      },
    },
    "/api/projetos/{id}": {
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
          description: "Identificador do projeto",
        },
      ],
      get: {
        tags: ["Projetos"],
        summary: "Consultar um projeto por ID",
        responses: {
          "200": {
            description: "Projeto encontrado",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },
      put: {
        tags: ["Projetos"],
        summary: "Atualizar um projeto",
        description:
          "Atualiza os campos enviados. Campos omitidos são preservados.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProjetoInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Projeto atualizado",
          },
          "400": {
            description: "Dados inválidos",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },
      delete: {
        tags: ["Projetos"],
        summary: "Excluir um projeto",
        responses: {
          "204": {
            description: "Projeto excluído, sem conteúdo",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },
    },
  },
};
