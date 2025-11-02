import FormNewLibrary from "@/components/FormularioBibliotecas";
import React from "react";

export default function PaginaBibliotecas() {
  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-8 font-roboto pb-6 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gerenciamento de Bibliotecas
          </h1>
          <p className="text-muted-foreground">
            Cadastre, edite e gerencie as bibliotecas cadastradas
          </p>
        </div>
      </div>
      <FormNewLibrary />
    </div>
  );
}
