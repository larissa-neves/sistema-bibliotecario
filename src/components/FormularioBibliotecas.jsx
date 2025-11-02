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
import ListaDeBibliotecas from "./ListaDeBibliotecas";
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

const STORAGE_KEY = "bibliotecas_cadastradas";

const FormNewLibrary = () => {
  const [libraries, setLibraries] = useState(() => {
    try {
      const savedLibraries = localStorage.getItem(STORAGE_KEY);
      return savedLibraries ? JSON.parse(savedLibraries) : [];
    } catch (error) {
      console.error("Erro ao carregar bibliotecas do localStorage:", error);
      return [];
    }
  });
  const [editingLibrary, setEditingLibrary] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [libraryToDelete, setLibraryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    description: "",
  });

  const saveToLocalStorage = (updatedLibraries) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLibraries));
    } catch (error) {
      console.error("Erro ao salvar bibliotecas no localStorage:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedLibraries;

    if (editingLibrary) {
      updatedLibraries = libraries.map((library) =>
        library.id === editingLibrary.id
          ? { ...formData, id: editingLibrary.id }
          : library
      );
      setAlertMessage("Biblioteca editada com sucesso!");
    } else {
      const newLibrary = {
        ...formData,
        id: Date.now(),
      };
      updatedLibraries = [...libraries, newLibrary];
      setAlertMessage("Biblioteca cadastrada com sucesso!");
    }

    setLibraries(updatedLibraries);
    saveToLocalStorage(updatedLibraries);
    resetForm();
    setIsDialogOpen(false);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleEdit = (library) => {
    setEditingLibrary(library);
    setFormData({
      name: library.name,
      address: library.address,
      city: library.city,
      state: library.state,
      phone: library.phone,
      email: library.email,
      description: library.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setLibraryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (libraryToDelete) {
      const updatedLibraries = libraries.filter(
        (library) => library.id !== libraryToDelete
      );
      setLibraries(updatedLibraries);
      saveToLocalStorage(updatedLibraries);

      setAlertMessage("Biblioteca excluída com sucesso!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    setIsDeleteDialogOpen(false);
    setLibraryToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setLibraryToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
      description: "",
    });
    setEditingLibrary(null);
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
              Tem certeza que deseja excluir esta biblioteca? Esta ação não
              pode ser desfeita.
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
              Nova Biblioteca
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLibrary ? "Editar Biblioteca" : "Cadastrar Nova Biblioteca"}
            </DialogTitle>
            <DialogDescription>
              Preencha todos os campos obrigatórios
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 font-extralight">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome da Biblioteca *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Digite o nome da biblioteca"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Endereço *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Digite o endereço completo"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Digite a cidade"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="state">Estado *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Ex: SP"
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Ex: (11) 98765-4321"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="exemplo@biblioteca.com"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Digite uma breve descrição da biblioteca"
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
              <Button type="submit">
                {editingLibrary ? "Salvar Alterações" : "Cadastrar Biblioteca"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <ListaDeBibliotecas
          libraries={libraries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default FormNewLibrary;