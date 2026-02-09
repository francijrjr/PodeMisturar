import React from "react";
import { Search, Loader2, Trash2, Shuffle } from "lucide-react";

interface SearchFormProps {
  mistura: string;
  buscaSubstancia: string;
  historico: string[];
  loading: boolean;
  onMisturaChange: (value: string) => void;
  onBuscaSubstanciaChange: (value: string) => void;
  onVerificar: () => void;
  onBuscarSubstancia: () => void;
  onSelecionarHistorico: (item: string) => void;
  onLimparHistorico: () => void;
  onMisturaAleatoria: () => void;
}

export default function SearchForm({
  mistura,
  buscaSubstancia,
  historico,
  loading,
  onMisturaChange,
  onBuscaSubstanciaChange,
  onVerificar,
  onBuscarSubstancia,
  onSelecionarHistorico,
  onLimparHistorico,
  onMisturaAleatoria,
}: SearchFormProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-indigo-100 transition-all duration-300 ease-in-out hover:shadow-3xl hover:border-indigo-200">
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          Verificar Mistura
        </label>
        <p className="mb-4 text-gray-700 text-sm leading-relaxed">
          Digite duas ou mais substâncias separadas por '+'. Ex:{" "}
          <code className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-mono text-xs font-semibold">
            alcool+vinagre
          </code>
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md bg-gray-50 focus:bg-white"
            value={mistura}
            onChange={(e) => onMisturaChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && onVerificar()}
            placeholder="ex: alcool+vinagre"
            disabled={loading}
            aria-label="Digite as substâncias"
          />
          <div className="flex gap-2">
            <button
              className="flex-1 sm:flex-none px-6 sm:px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
              onClick={onVerificar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="hidden sm:inline">Verificando...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span className="hidden sm:inline">Verificar</span>
                </>
              )}
            </button>
            <button
              className="px-4 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out font-bold shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
              onClick={onMisturaAleatoria}
              disabled={loading}
              title="Mistura Aleatória"
              aria-label="Buscar mistura aleatória"
            >
              <Shuffle size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t-2 border-gray-200">
        <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          Buscar por Substância
        </label>
        <p className="mb-3 text-sm text-gray-700 leading-relaxed">
          Encontre todas as misturas que contêm uma substância específica:
        </p>
        <div className="flex gap-3">
          <input
            className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out bg-gray-50 focus:bg-white"
            value={buscaSubstancia}
            onChange={(e) => onBuscaSubstanciaChange(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !loading && onBuscarSubstancia()
            }
            placeholder="ex: vinagre"
            disabled={loading}
          />
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:scale-102 active:scale-98 font-bold"
            onClick={onBuscarSubstancia}
            disabled={loading}
            aria-label="Buscar substância"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {historico.length > 0 && (
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Histórico recente:
            </p>
            <button
              onClick={onLimparHistorico}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 ease-in-out font-semibold"
            >
              <Trash2 size={14} /> Limpar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {historico.map((h, i) => (
              <button
                key={i}
                onClick={() => onSelecionarHistorico(h)}
                className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 ease-in-out font-semibold shadow-md hover:shadow-lg hover:scale-102 active:scale-98 border border-indigo-200"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
