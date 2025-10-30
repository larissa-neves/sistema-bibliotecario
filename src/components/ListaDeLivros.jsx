import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, Trash, SquarePen } from "lucide-react";
import { Button } from "./ui/button";

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
        <div className="overflow-x-auto">
          <Table className="border border-double rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Título</TableHead>
                <TableHead className="min-w-[120px]">Autor</TableHead>
                <TableHead className="w-[80px]">Ano</TableHead>
                <TableHead className="w-[140px]">ISBN</TableHead>
                <TableHead className="min-w-[300px] max-w-[500px]">Descrição</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium align-top">{book.title}</TableCell>
                  <TableCell className="align-top">{book.author}</TableCell>
                  <TableCell className="align-top">{book.year}</TableCell>
                  <TableCell className="font-mono text-sm align-top">{book.isbn}</TableCell>
                  <TableCell className="max-w-[500px] align-top">
                    <div className="whitespace-normal break-words text-sm leading-relaxed">
                      {book.description}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex gap-1">
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

export default ListaDeLivros;