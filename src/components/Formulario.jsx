import React from "react";
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
import { Textarea } from "@/components/ui/textarea"

const DialogHead = () => {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Cadastrar Novo Livro</DialogTitle>
        <DialogDescription>
          Preencha todos os campos obrigatórios
        </DialogDescription>
      </DialogHeader>
    </div>
  );
};

const ButtonNewBook = () => {
  return (
    <div className="mb-6 flex justify-end">
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" />
          Novo Livro
        </Button>
      </DialogTrigger>
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Cadastrar Livro</Button>
      </DialogFooter>
    </div>
  )
}

const FormAddBook = () => {
  return (
    <div>
      <DialogContent>
        <DialogHead />

        <div div className="grid gap-4 font-extralight">
          <div className="grid gap-3">
            <Label htmlFor="titulo-1">Título *</Label>
            <Input id="titulo-1" name="titulo" required placeholder="Digite o título do livro"/>
          </div>
          <div className="grid gap-3">
              <Label htmlFor="autor-1">Autor *</Label>
              <Input id="autor-1" name="autor" required placeholder="Digite o nome do autor"/>
          </div>
          <div className="grid gap-3">
              <Label htmlFor="anopubli-1">Ano de Publicação *</Label>
              <Input id="anopubli-1" name="anopubli" required placeholder="Ex: 2024"/>
          </div>
          <div className="grid gap-3">
              <Label htmlFor="isbn-1">ISBN *</Label>
              <Input id="isbn-1" name="isbn" required placeholder="Ex: 978-8535911664"/>
          </div>
          <div className="grid gap-3">
              <Label htmlFor="descricao-1">Descrição *</Label>
              <Textarea id="descricao-1" name="descricao" required placeholder="Digite uma breve descrição do livro" rows={4}/>
          </div>
        </div>

        <Footer />
      </DialogContent>
    </div>
  );
};

const FormNewBook = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div >
        <Dialog>
          <form>
            <ButtonNewBook />
            <FormAddBook />
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default FormNewBook;