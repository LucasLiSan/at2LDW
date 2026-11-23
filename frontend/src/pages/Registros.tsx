
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

export function Registros() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Registros</h2>
          <p className="text-muted-foreground">
            Gerenciamento dos dados da API
          </p>
        </div>

        <Button disabled>
          <Plus className="mr-2 size-4" />
          Novo registro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de registros</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="py-8 text-center text-muted-foreground">
            Aguardando conexão com a API da AT1.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
