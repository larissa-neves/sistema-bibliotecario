import React from 'react'
import PaginaInicial  from './pages/InitialPage'
import PaginaBibliotecas from './pages/BibliotecasPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from './components/MenuBar'
import PaginaEstatisticas from './pages/DashboardPage';

const App = () => {

  return (
    <Router>
      <div className="min-h-screen w-full bg-white font-roboto">
        <MenuBar />
        
        <Routes>
          <Route path="/acervo" element={<PaginaInicial />} />
          <Route path="/bibliotecas" element={<PaginaBibliotecas />} />
          <Route path="/estatisticas" element={<PaginaEstatisticas />} />
          <Route path="/" element={<PaginaInicial />} /> {/* rota padrão */}
        </Routes>
      </div>
    </Router>
  )
}

export default App

