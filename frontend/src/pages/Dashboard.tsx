
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Database,
  Activity,
  Server,
  ArrowUpRight,
} from "lucide-react";

export function Dashboard() {
  const indicadores = [
    {
      titulo: "Registros",
      valor: "—",
      descricao: "Aguardando integração com a API",
      icon: Database,
    },
    {
      titulo: "Operações",
      valor: "CRUD",
      descricao: "Gerenciamento completo",
      icon: Activity,
    },
    {
      titulo: "Backend",
      valor: "Pendente",
      descricao: "API REST da AT1",
      icon: Server,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
          PXN / SYS / 001
        </p>

        <h2 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
          Dashboard<span className="text-accent">.</span>
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Visão geral e gerenciamento do sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {indicadores.map(
          ({ titulo, valor, descricao, icon: Icon }) => (
            <Card key={titulo} className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {titulo}
                </CardTitle>
                <Icon className="size-5 text-accent" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">
                  {valor}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {descricao}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl bg-[#392A4D] p-8 text-[#D9D0BF] md:p-12">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B6A7A0]">
            Paradoxon / Philosophy
          </p>

          <h3 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            A perfeição encerra.
            <br />
            <span className="italic text-[#E7A1C8]">
              A criação continua.
            </span>
          </h3>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#D9D0BF]/80">
            Cada sistema representa uma etapa de um
            processo contínuo de investigação,
            desenvolvimento e evolução.
          </p>

          <a
            href="https://lucaslisan.github.io/paradoxon/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F2C3DE] hover:underline"
          >
            Explorar o ecossistema
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-20 size-80 rounded-full border-[45px] border-[#B13C82]/25"
        />
      </div>
    </div>
  );
}
