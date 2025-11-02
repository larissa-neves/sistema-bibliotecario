import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Trash, SquarePen } from "lucide-react";
import { Button } from "./ui/button";

const ListaDeBibliotecas = ({ libraries = [], onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Bibliotecas Cadastradas
        </h2>
        <span className="text-sm text-muted-foreground">
          Total: {libraries.length}{" "}
          {libraries.length === 1 ? "biblioteca" : "bibliotecas"}
        </span>
      </div>

      {libraries.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-16 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-base font-medium">
              Nenhuma biblioteca cadastrada
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Clique em "Nova Biblioteca" para adicionar o primeiro registro
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table className="border border-double rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Nome</TableHead>
                <TableHead className="min-w-[200px]">Endereço</TableHead>
                <TableHead className="w-[120px]">Cidade</TableHead>
                <TableHead className="w-[60px]">UF</TableHead>
                <TableHead className="w-[140px]">Telefone</TableHead>
                <TableHead className="min-w-[180px]">E-mail</TableHead>
                <TableHead className="min-w-[250px] max-w-[400px]">
                  Descrição
                </TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {libraries.map((library) => (
                <TableRow key={library.id}>
                  <TableCell className="font-medium align-top">
                    {library.name}
                  </TableCell>
                  <TableCell className="align-top">{library.address}</TableCell>
                  <TableCell className="align-top">{library.city}</TableCell>
                  <TableCell className="align-top">{library.state}</TableCell>
                  <TableCell className="align-top">{library.phone}</TableCell>
                  <TableCell className="align-top">{library.email}</TableCell>
                  <TableCell className="max-w-[400px] align-top">
                    <div className="whitespace-normal break-words text-sm leading-relaxed">
                      {library.description || "-"}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(library)}
                        title="Editar biblioteca"
                      >
                        <SquarePen className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(library.id)}
                        title="Deletar biblioteca"
                      >
                        <Trash className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ListaDeBibliotecas;