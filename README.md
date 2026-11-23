# Paradoxon Workspace

**Gestão de projetos com React, TypeScript e API REST**

> A complexidade por trás. A simplicidade à frente.

O **Paradoxon Workspace** é uma aplicação web desenvolvida para a atividade avaliativa **AT2 de Laboratório de Desenvolvimento Web (LDW)**. O projeto reúne uma interface responsiva e uma API REST própria para gerenciar projetos, acompanhar seu andamento e consultar indicadores.

O sistema foi organizado em duas aplicações independentes: um **frontend** React e um **backend** Node.js, conectados por requisições HTTP.

## Funcionalidades

- **Cadastro de projetos** com nome, descrição, responsável, status, prioridade e datas.
- **Listagem e pesquisa** por nome, descrição ou responsável.
- **Edição** de projetos cadastrados.
- **Exclusão com confirmação**, evitando remoções acidentais.
- **Dashboard** com estatísticas obtidas diretamente da API.
- **Validação de dados** no backend e feedback de sucesso ou erro na interface.
- **Interface responsiva**, seguindo a identidade visual da Paradoxon.
- **Persistência de dados** em banco SQLite por meio do Prisma ORM.

## Tecnologias

| Frontend | Backend |
| --- | --- |
| React | Node.js |
| TypeScript | TypeScript |
| Vite | Express |
| Tailwind CSS v4 | Prisma ORM v6 |
| shadcn/ui (Base UI) | SQLite |
| React Router | Zod |
| Axios | CORS |
| Sonner | dotenv |
| Lucide React | tsx |

## Estrutura do projeto

```text
at2LDW/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

> A pasta `docs/`, caso esteja presente no backend, contém a especificação Swagger/OpenAPI.

## Pré-requisitos

- Node.js e npm instalados.
- Git (opcional, para clonar o repositório).

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/LucasLiSan/at2LDW.git
cd at2LDW
```

### 2. Configurar e iniciar o backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env` com o conteúdo:

```dotenv
DATABASE_URL="file:./dev.db"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

Prepare o banco e gere o Prisma Client:

```bash
npx prisma migrate deploy
npx prisma generate
```

Inicie a API:

```bash
npm run dev
```

A API estará disponível em **http://localhost:3000**. Verifique seu funcionamento em **http://localhost:3000/api/health**.

### 3. Configurar e iniciar o frontend

Abra **outro terminal**, a partir da raiz do repositório:

```bash
cd frontend
npm install
```

Crie `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:3000
```

Inicie a aplicação:

```bash
npm run dev
```

Abra **http://localhost:5173** no navegador. Mantenha o backend e o frontend em execução simultaneamente.

## API REST

Base URL: `http://localhost:3000`

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Verifica se a API está ativa |
| `GET` | `/api/projetos` | Lista os projetos |
| `GET` | `/api/projetos/:id` | Consulta um projeto por ID |
| `POST` | `/api/projetos` | Cria um projeto |
| `PUT` | `/api/projetos/:id` | Atualiza um projeto |
| `DELETE` | `/api/projetos/:id` | Exclui um projeto |
| `GET` | `/api/projetos/estatisticas` | Retorna indicadores por status |

### Exemplo de cadastro

**Requisição:** `POST /api/projetos`

```json
{
  "nome": "Portal Institucional Paradoxon",
  "descricao": "Desenvolvimento de um portal institucional responsivo.",
  "status": "EM_ANDAMENTO",
  "prioridade": "ALTA",
  "responsavel": "Equipe de Desenvolvimento",
  "dataInicio": "2026-11-23T12:00:00-03:00",
  "prazo": "2026-12-20T12:00:00-03:00"
}
```

**Status aceitos:** `PLANEJAMENTO`, `EM_ANDAMENTO`, `CONCLUIDO` e `CANCELADO`.

**Prioridades aceitas:** `BAIXA`, `MEDIA`, `ALTA` e `URGENTE`.

### Respostas HTTP

- `200 OK`: consulta ou atualização bem-sucedida.
- `201 Created`: projeto cadastrado.
- `204 No Content`: projeto excluído.
- `400 Bad Request`: dados inválidos.
- `404 Not Found`: recurso não encontrado.
- `500 Internal Server Error`: erro interno da API.

Se a documentação Swagger tiver sido configurada, ela poderá ser acessada em **http://localhost:3000/api/docs**.

## Arquitetura

O frontend utiliza **React Router** para navegação, **Axios** para comunicação HTTP e componentes **shadcn/ui** para a interface. O backend separa suas responsabilidades em:

1. **Routes:** definem os endpoints.
2. **Controllers:** recebem as requisições e enviam as respostas HTTP.
3. **Schemas (Zod):** validam os dados recebidos.
4. **Services:** executam as operações de negócio e persistência.
5. **Prisma + SQLite:** gerenciam o armazenamento dos projetos.
6. **Middlewares:** centralizam o tratamento de erros.

```text
Navegador
   │
   ▼
React + TypeScript
   │ Axios / HTTP
   ▼
Express REST API
   │
   ├── Routes → Controllers → Services
   │                  │
   │                  └── Zod
   ▼
Prisma ORM
   │
   ▼
SQLite
```

## Identidade visual

O projeto utiliza a identidade da **Paradoxon**, com tipografia **Cormorant Garamond** para títulos e **Manrope** para a interface.

| Cor | Hexadecimal |
| --- | --- |
| Grafite | `#17151D` |
| Violeta | `#392A4D` |
| Magenta | `#B13C82` |
| Cinza mineral | `#B6A7A0` |
| Marfim | `#D9D0BF` |

Site institucional: https://lucaslisan.github.io/paradoxon/

## Verificação de compilação

Para verificar a compilação do frontend e backend, execute em cada pasta:

```bash
npm run build
```

## Contexto acadêmico

Projeto desenvolvido como atividade avaliativa **AT2 — Laboratório de Desenvolvimento Web**, com foco na criação de uma SPA em React + TypeScript integrada a uma API REST, utilizando operações CRUD, componentes reutilizáveis, navegação, validações e tratamento de erros.

**Repositório:** https://github.com/LucasLiSan/at2LDW

---

**Paradoxon** — *A perfeição encerra. A criação continua.*
