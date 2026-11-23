
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  FolderKanban,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { ProjetoFormDialog } from "@/components/shared/ProjetoFormDialog";
import { projetoService } from "@/services/projeto.service";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  STATUS_LABELS,
  PRIORIDADE_LABELS,
} from "@/types/projeto";
import type { Projeto } from "@/types/projeto";

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(new Date(value));
}

export function Registros() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Projeto | null>(null);

  const [deleting, setDeleting] = useState<Projeto | null>(null);
  const [removing, setRemoving] = useState(false);

  const carregarProjetos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await projetoService.listar();
      setProjetos(dados);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarProjetos();
  }, [carregarProjetos]);

  const projetosFiltrados = useMemo(() => {
    const termo = search.toLocaleLowerCase("pt-BR").trim();

    return projetos.filter((projeto) =>
      [
        projeto.nome,
        projeto.descricao ?? "",
        projeto.responsavel,
      ].some((campo) =>
        campo.toLocaleLowerCase("pt-BR").includes(termo)
      )
    );
  }, [projetos, search]);

  function novoProjeto() {
    setEditing(null);
    setFormOpen(true);
  }

  function editarProjeto(projeto: Projeto) {
    setEditing(projeto);
    setFormOpen(true);
  }

  async function excluirProjeto() {
    if (!deleting) return;

    try {
      setRemoving(true);
      await projetoService.excluir(deleting.id);
      toast.success("Projeto excluído com sucesso.");
      setDeleting(null);
      await carregarProjetos();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-accent">
            PXN / WORKSPACE / 002
          </p>
          <h2 className="font-display text-5xl font-semibold">
            Projetos<span className="text-accent">.</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Gerencie o ciclo de vida dos seus projetos.
          </p>
        </div>

        <Button onClick={novoProjeto}>
          <Plus className="mr-2 size-4" />
          Novo projeto
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="size-5 text-accent" />
            Projetos cadastrados
          </CardTitle>
          <Badge variant="secondary">
            {projetos.length} registros
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Pesquisar projetos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              aria-label="Atualizar lista"
              disabled={loading}
              onClick={() => void carregarProjetos()}
            >
              <RefreshCw
                className={`size-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          {loading ? (
            <div className="space-y-3 py-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="space-y-3 py-12 text-center">
              <p role="alert" className="text-destructive">
                {error}
              </p>
              <Button
                variant="outline"
                onClick={() => void carregarProjetos()}
              >
                Tentar novamente
              </Button>
            </div>
          ) : projetosFiltrados.length === 0 ? (
            <div className="py-16 text-center">
              <FolderKanban className="mx-auto mb-4 size-10 text-muted-foreground" />
              <p className="font-medium">
                {search
                  ? "Nenhum projeto encontrado."
                  : "Nenhum projeto cadastrado."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {search
                  ? "Tente pesquisar por outro termo."
                  : "Cadastre seu primeiro projeto para começar."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead className="text-right">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projetosFiltrados.map((projeto) => (
                    <TableRow key={projeto.id}>
                      <TableCell>
                        <div className="max-w-64">
                          <p className="font-semibold">
                            {projeto.nome}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {projeto.descricao || "Sem descrição"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {STATUS_LABELS[projeto.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            projeto.prioridade === "URGENTE"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {PRIORIDADE_LABELS[projeto.prioridade]}
                        </Badge>
                      </TableCell>
                      <TableCell>{projeto.responsavel}</TableCell>
                      <TableCell>{formatDate(projeto.prazo)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Editar ${projeto.nome}`}
                            onClick={() => editarProjeto(projeto)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label={`Excluir ${projeto.nome}`}
                            onClick={() => setDeleting(projeto)}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ProjetoFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        projeto={editing}
        onSuccess={() => void carregarProjetos()}
      />

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => {
          if (!open && !removing) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Excluir projeto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              O projeto "{deleting?.nome}" será excluído
              permanentemente. Essa ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={removing}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={removing}
              onClick={(event) => {
                event.preventDefault();
                void excluirProjeto();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {removing && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Excluir projeto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
