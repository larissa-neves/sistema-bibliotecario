import React, { use } from 'react'
import { useState } from 'react'
import AcervoPage  from './pages/AcervoPage'
import BibliotecasPage from './pages/BibliotecasPage'
import ConfigPage from './pages/ConfigPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from './components/MenuBar'

const App = () => {

  return (
    <Router>
      <div className="min-h-screen w-full bg-white font-roboto">
        <MenuBar />
        
        <Routes>
          <Route path="/acervo" element={<AcervoPage />} />
          <Route path="/bibliotecas" element={<BibliotecasPage />} />
          <Route path="/configuracoes" element={<ConfigPage />} />
          <Route path="/" element={<AcervoPage />} /> {/* rota padrão */}
        </Routes>
      </div>
    </Router>
  )
}

export default App

