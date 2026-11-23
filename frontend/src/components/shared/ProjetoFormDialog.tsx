
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { projetoService } from "@/services/projeto.service";
import { getApiErrorMessage } from "@/lib/api-error";

import {
  STATUS_LABELS,
  PRIORIDADE_LABELS,
} from "@/types/projeto";

import type {
  Projeto,
  ProjetoInput,
  StatusProjeto,
  PrioridadeProjeto,
} from "@/types/projeto";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projeto?: Projeto | null;
  onSuccess: () => void;
}

interface FormState {
  nome: string;
  descricao: string;
  responsavel: string;
  status: StatusProjeto;
  prioridade: PrioridadeProjeto;
  dataInicio: string;
  prazo: string;
}

const initialState: FormState = {
  nome: "",
  descricao: "",
  responsavel: "",
  status: "PLANEJAMENTO",
  prioridade: "MEDIA",
  dataInicio: "",
  prazo: "",
};

function toDateInput(value?: string | null) {
  return value ? value.slice(0, 10) : "";
}

function toApiDate(value: string) {
  return value
    ? new Date(`${value}T12:00:00`).toISOString()
    : null;
}

export function ProjetoFormDialog({
  open,
  onOpenChange,
  projeto,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<FormState>(initialState);
  const [saving, setSaving] = useState(false);

  const editing = Boolean(projeto);

  useEffect(() => {
    if (!open) return;

    if (projeto) {
      setForm({
        nome: projeto.nome,
        descricao: projeto.descricao ?? "",
        responsavel: projeto.responsavel,
        status: projeto.status,
        prioridade: projeto.prioridade,
        dataInicio: toDateInput(projeto.dataInicio),
        prazo: toDateInput(projeto.prazo),
      });
    } else {
      setForm(initialState);
    }
  }, [projeto, open]);

  function update<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (form.nome.trim().length < 3) {
      toast.error("Informe um nome com pelo menos 3 caracteres.");
      return;
    }

    if (form.responsavel.trim().length < 2) {
      toast.error("Informe o responsável pelo projeto.");
      return;
    }

    if (
      form.dataInicio &&
      form.prazo &&
      form.prazo < form.dataInicio
    ) {
      toast.error("O prazo não pode ser anterior à data de início.");
      return;
    }

    const dados: ProjetoInput = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim() || null,
      responsavel: form.responsavel.trim(),
      status: form.status,
      prioridade: form.prioridade,
      dataInicio: toApiDate(form.dataInicio),
      prazo: toApiDate(form.prazo),
    };

    try {
      setSaving(true);

      if (projeto) {
        await projetoService.atualizar(projeto.id, dados);
        toast.success("Projeto atualizado com sucesso.");
      } else {
        await projetoService.criar(dados);
        toast.success("Projeto cadastrado com sucesso.");
      }

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!saving) onOpenChange(value);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">
            {editing ? "Editar projeto" : "Novo projeto"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Atualize as informações do projeto."
              : "Preencha os dados para cadastrar um projeto."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do projeto *</Label>
            <Input
              id="nome"
              required
              minLength={3}
              maxLength={120}
              value={form.nome}
              onChange={(e) => update("nome", e.target.value)}
              placeholder="Ex.: Portal Institucional"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              rows={3}
              maxLength={2000}
              value={form.descricao}
              onChange={(e) => update("descricao", e.target.value)}
              placeholder="Descreva o objetivo do projeto..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsavel">Responsável *</Label>
            <Input
              id="responsavel"
              required
              minLength={2}
              maxLength={100}
              value={form.responsavel}
              onChange={(e) => update("responsavel", e.target.value)}
              placeholder="Nome do responsável"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as StatusProjeto)
                }
              >
                {Object.entries(STATUS_LABELS).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <select
                id="prioridade"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.prioridade}
                onChange={(e) =>
                  update(
                    "prioridade",
                    e.target.value as PrioridadeProjeto
                  )
                }
              >
                {Object.entries(PRIORIDADE_LABELS).map(
                  ([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={form.dataInicio}
                onChange={(e) =>
                  update("dataInicio", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prazo">Prazo</Label>
              <Input
                id="prazo"
                type="date"
                min={form.dataInicio || undefined}
                value={form.prazo}
                onChange={(e) => update("prazo", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={saving}>
              {saving && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {editing ? "Salvar alterações" : "Cadastrar projeto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
