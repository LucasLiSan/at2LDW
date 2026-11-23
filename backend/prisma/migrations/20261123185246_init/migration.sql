-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PLANEJAMENTO',
    "prioridade" TEXT NOT NULL DEFAULT 'MEDIA',
    "responsavel" TEXT NOT NULL,
    "dataInicio" DATETIME,
    "prazo" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
