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
import { Plus, CheckCircle2 } from "lucide-react";
import { Label } from "@radix-ui/react-menubar";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "@/components/ui/textarea";
import ListaDeLivros from "./ListaDeLivros";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

const STORAGE_KEY = "biblioteca_livros";

const FormNewBook = () => {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem(STORAGE_KEY);
      return savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
      console.error("Erro ao carregar livros do localStorage:", error);
      return [];
    }
  });
  const [editingBook, setEditingBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
  const [bookToDelete, setBookToDelete] = useState(null); 
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    description: "",
  });

  const saveToLocalStorage = (updatedBooks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error("Erro ao salvar livros no localStorage:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedBooks;

    if (editingBook) {
      updatedBooks = books.map((book) =>
        book.id === editingBook.id ? { ...formData, id: editingBook.id } : book
      );
      setAlertMessage("Livro editado com sucesso!");
    } else {
      const newBook = {
        ...formData,
        id: Date.now(),
      };
      updatedBooks = [...books, newBook];
      setAlertMessage("Livro cadastrado com sucesso!");
    }

    setBooks(updatedBooks);
    saveToLocalStorage(updatedBooks);
    resetForm();
    setIsDialogOpen(false);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      isbn: book.isbn,
      description: book.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setBookToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      const updatedBooks = books.filter((book) => book.id !== bookToDelete);
      setBooks(updatedBooks);
      saveToLocalStorage(updatedBooks);

      setAlertMessage("Livro excluído com sucesso!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    setIsDeleteDialogOpen(false);
    setBookToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setBookToDelete(null);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDialogChange = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      {showAlert && (
        <Alert className="mb-6 border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este livro? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Cadastrar Livro</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <ListaDeLivros
          id={books.id}
          books={books}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default FormNewBook;
