import React from "react";
import FormNewBook from "@/components/Formulario";
import Dashboard from "@/components/Dashboard";

export default function PaginaInicial() {
  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-8 font-roboto pb-6 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerenciamento de Acervo
          </h1>
          <p className="text-muted-foreground">
            Cadastre, edite e gerencie os novos livros da biblioteca
          </p>
        </div>
      </div>

      <Dashboard />
      <FormNewBook />
    </div>
  );
}
