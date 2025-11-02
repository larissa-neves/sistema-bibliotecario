import React from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BookOpen, Library, FileText, TrendingUp } from "lucide-react";


const Acervo = () => {
  return (
    <>
      <MenubarTrigger className="px-4 py-2 font-semibold text-gray-3 hover:bg-gray-100 transition-colors">
        <Link
          to="/acervo"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="w-4 h-4" />
          Acervo
        </Link>
      </MenubarTrigger>
    </>
  );
};

const Relatorios = () => {
  return (
    <>
      <MenubarTrigger className="px-4 py-2 font-semibold text-gray-3 hover:bg-gray-100 transition-colors">
        <Link
          to="/bibliotecas"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Bibliotecas
        </Link>
      </MenubarTrigger>
    </>
  );
};

const Estatisticas = () => {
  return (
    <>
      <MenubarTrigger className="px-4 py-2 font-semibold text-gray-3 hover:bg-gray-100 transition-colors">
        <Link
          to="/estatisticas"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          Estatísticas
        </Link>
      </MenubarTrigger>
    </>
  );
};

const Title = () => {
  return (
    <div className="flex items-center justify-between h-16 ">
      <div className="flex items-center gap-2">
        <Library className="w-6 h-6 text-primary" />
        <span className="text-xl font-black text-foreground">
          Sistema Bibliotecário
        </span>
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="flex items-end gap-4 ml-auto">
      <MenubarMenu>
        <Acervo />
        <Relatorios />
        <Estatisticas />
      </MenubarMenu>
    </div>
  );
};

const MenuBar = () => {
  return (
    <div>
      <Menubar className="p-7 bg-white border-b">
        <Title />
        <Menu />
      </Menubar>
    </div>
  );
};

export default MenuBar;
