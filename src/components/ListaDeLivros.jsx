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
import { BookOpen, Pencil, Trash2, Plus, X } from "lucide-react";

const ListaDeLivros = ({ books = [], onEdit, onDelete }) => {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ListaDeLivros;
