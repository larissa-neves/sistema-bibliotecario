import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Pencil, Trash2, Plus, X } from "lucide-react";
import { Label } from "@radix-ui/react-menubar";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";

const FormNewBook = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? { ...formData, id: editingBook.id } : book
        )
      );
    } else {
      const newBook = {
        ...formData,
        id: Date.now(),
      };
      setBooks([...books, newBook]); 
      console.log(books)
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      year: "",
      isbn: "",
      description: "",
    });
    setEditingBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <Dialog>
        <div className="mb-6 flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Novo Livro
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Livro</DialogTitle>
            <DialogDescription>
              Preencha todos os campos obrigatórios
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 font-extralight">
              <div className="grid gap-3">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Digite o título do livro"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome do autor"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="year">Ano de Publicação *</Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 2024"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 978-8535911664"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Digite uma breve descrição do livro"
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Cadastrar Livro</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormNewBook;