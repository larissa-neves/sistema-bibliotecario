import React, { useState, useEffect } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const STORAGE_KEY = "biblioteca_livros";

const gerarCoresAzul = (quantidade) => {
  const cores = [];
  const baseHue = 210;

  for (let i = 0; i < quantidade; i++) {
    const lightness = 45 + (i * 35) / quantidade;
    const saturation = 100 - (i * 30) / quantidade;
    cores.push(`hsl(${baseHue}, ${saturation}%, ${lightness}%)`);
  }

  return cores;
};

const Dashboard = () => {
  const [chartDataAutor, setChartDataAutor] = useState([]);
  const [chartConfigAutor, setChartConfigAutor] = useState({});
  const [chartDataAno, setChartDataAno] = useState([]);
  const [chartConfigAno, setChartConfigAno] = useState({});

  useEffect(() => {
    carregarDashboard();
  }, []);

  const carregarDashboard = () => {
    try {
      const dados = localStorage.getItem(STORAGE_KEY);
      const books = dados ? JSON.parse(dados) : [];

      const autorCount = {};
      books.forEach((book) => {
        autorCount[book.author] = (autorCount[book.author] || 0) + 1;
      });

      const livrosPorAutor = Object.entries(autorCount)
        .map(([autor, quantidade]) => ({ autor, quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade);

      const coresAutor = gerarCoresAzul(livrosPorAutor.length);

      const dadosGraficoAutor = livrosPorAutor.map((item, index) => ({
        autor: item.autor,
        livros: item.quantidade,
        fill: coresAutor[index],
      }));

      const configAutor = {
        livros: {
          label: "Livros",
        },
      };

      livrosPorAutor.forEach((item, index) => {
        configAutor[item.autor] = {
          label: item.autor,
          color: coresAutor[index],
        };
      });

      setChartDataAutor(dadosGraficoAutor);
      setChartConfigAutor(configAutor);

      const anoCount = {};
      books.forEach((book) => {
        anoCount[book.year] = (anoCount[book.year] || 0) + 1;
      });

      const livrosPorAno = Object.entries(anoCount)
        .map(([ano, quantidade]) => ({ ano, quantidade }))
        .sort((a, b) => b.ano - a.ano);

      const coresAno = gerarCoresAzul(livrosPorAno.length);

      const dadosGraficoAno = livrosPorAno.map((item, index) => ({
        ano: item.ano,
        livros: item.quantidade,
        fill: coresAno[index],
      }));

      const configAno = {
        livros: {
          label: "Livros",
        },
      };

      livrosPorAno.forEach((item, index) => {
        configAno[item.ano] = {
          label: item.ano,
          color: coresAno[index],
        };
      });

      setChartDataAno(dadosGraficoAno);
      setChartConfigAno(configAno);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2">
            <CardTitle className="text-lg">Livros por Autor(a)</CardTitle>
            <CardDescription className="text-xs">
              Distribuição por autor
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-2">
            {chartDataAutor.length === 0 ? (
              <p className="text-muted-foreground text-xs text-center py-6">
                Nenhum dado disponível
              </p>
            ) : (
              <ChartContainer
                config={chartConfigAutor}
                className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[200px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="autor" hideLabel />}
                  />
                  <Pie data={chartDataAutor} dataKey="livros">
                    <LabelList
                      dataKey="livros"
                      className="fill-background"
                      stroke="none"
                      fontSize={10}
                    />
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="autor" />}
                    className="-translate-y-2 flex-wrap gap-1 text-xs"
                  />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-2">
            <CardTitle className="text-lg">Livros por Ano</CardTitle>
            <CardDescription className="text-xs">
              Distribuição por ano de publicação
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-2">
            {chartDataAno.length === 0 ? (
              <p className="text-muted-foreground text-xs text-center py-6">
                Nenhum dado disponível
              </p>
            ) : (
              <ChartContainer
                config={chartConfigAno}
                className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[200px]"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="ano" hideLabel />}
                  />
                  <Pie data={chartDataAno} dataKey="livros">
                    <LabelList
                      dataKey="livros"
                      className="fill-background"
                      stroke="none"
                      fontSize={10}
                    />
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="ano" />}
                    className="-translate-y-2 flex-wrap gap-1 text-xs"
                  />
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
