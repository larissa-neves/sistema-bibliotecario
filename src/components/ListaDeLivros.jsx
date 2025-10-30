import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Pencil, Trash, Plus, X, SquarePen } from "lucide-react";
import { Button } from "./ui/button";

const ListaDeLivros = ({ id, books = [], onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          Livros Cadastrados
        </h2>
        <span className="text-sm text-muted-foreground">
          Total: {books.length} {books.length === 1 ? "livro" : "livros"}
        </span>
      </div>

      {books.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="py-16 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-base font-medium">
              Nenhum livro cadastrado
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Clique em "Novo Livro" para adicionar o primeiro registro
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table className="border border-double rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(book)}
                    title="Editar livro"
                  >
                    <SquarePen className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(book.id)}
                    title="Deletar livro"
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ListaDeLivros;
