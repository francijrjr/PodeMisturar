import React from "react";
import MisturaCard from "./MisturaCard";

interface MisturaListItem {
  chave: string;
  substancias: string[];
  risco: string;
  descricao: string;
}

interface ListaMisturasProps {
  misturas: MisturaListItem[];
  filtroRisco: string;
  onFiltroChange: (filtro: string) => void;
  onMisturaClick: (chave: string) => void;
}

export default function ListaMisturas({
  misturas,
  filtroRisco,
  onFiltroChange,
  onMisturaClick,
}: ListaMisturasProps) {
  const misturasFiltradas = misturas.filter((m) => {
    if (filtroRisco === "todos") return true;
    return m.risco.toLowerCase().includes(filtroRisco);
  });

  const filtros = [
    { id: "todos", label: "Todas", color: "from-gray-500 to-gray-600" },
    { id: "nenhum", label: "Seguras", color: "from-green-500 to-emerald-500" },
    { id: "baixo", label: "Baixo Risco", color: "from-blue-500 to-cyan-500" },
    {
      id: "moderado",
      label: "Moderado",
      color: "from-yellow-500 to-amber-500",
    },
    { id: "alto", label: "Alto Risco", color: "from-orange-500 to-red-500" },
    { id: "extremo", label: "Extremo", color: "from-red-600 to-rose-600" },
    { id: "letal", label: "Letal", color: "from-red-700 to-rose-700" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-white to-indigo-50 p-4 sm:p-6 rounded-3xl shadow-xl border-2 border-indigo-100">
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
            Filtrar por nível de risco:
          </label>
          <div className="flex flex-wrap gap-2">
            {filtros.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => onFiltroChange(filtro.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl font-bold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-102 active:scale-98 text-sm ${
                  filtroRisco === filtro.id
                    ? `bg-gradient-to-r ${filtro.color} text-white`
                    : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300"
                }`}
                aria-pressed={filtroRisco === filtro.id}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t-2 border-indigo-200 gap-3">
          <p className="text-sm font-bold text-gray-700">
            Mostrando:{" "}
            <span className="text-indigo-600 text-lg">
              {misturasFiltradas.length}
            </span>{" "}
            {filtroRisco !== "todos" && (
              <span className="text-gray-500">
                de {misturas.length} misturas
              </span>
            )}
          </p>
          {filtroRisco !== "todos" && (
            <button
              onClick={() => onFiltroChange("todos")}
              className="text-sm text-indigo-600 hover:underline font-bold hover:scale-102 transition-transform duration-200 ease-in-out"
            >
              Limpar filtro
            </button>
          )}
        </div>
      </div>

      {misturasFiltradas.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {misturasFiltradas.map((m, i) => (
            <MisturaCard
              key={i}
              chave={m.chave}
              substancias={m.substancias}
              risco={m.risco}
              descricao={m.descricao}
              onClick={() => onMisturaClick(m.chave)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-white to-indigo-50 rounded-3xl border-3 border-dashed border-indigo-300">
          <p className="text-gray-600 text-lg font-semibold">
            Nenhuma mistura encontrada com este filtro
          </p>
        </div>
      )}
    </div>
  );
}
