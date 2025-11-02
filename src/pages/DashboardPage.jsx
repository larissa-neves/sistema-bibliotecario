import Dashboard from "@/components/Dashboard"
import React from "react"

export default function PaginaEstatisticas() {
  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="mb-8 font-roboto pb-6 border-b border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Estatísticas
          </h1>
          <p className="text-muted-foreground">
            Visão geral e análise do acervo
          </p>
        </div>
      </div>

      <Dashboard />
    </div>
  )
}

