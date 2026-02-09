import React from "react";
import { TrendingUp, Shield, Database, Activity } from "lucide-react";

interface Estatisticas {
  total: number;
  porRisco: {
    baixo: number;
    moderado: number;
    alto: number;
    extremo: number;
    letal: number;
    nenhum: number;
  };
  substanciasUnicas: number;
}

interface EstatisticasPanelProps {
  estatisticas: Estatisticas;
}

export default function EstatisticasPanel({
  estatisticas,
}: EstatisticasPanelProps) {
  const misturasSeguras =
    estatisticas.porRisco.nenhum + estatisticas.porRisco.baixo;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-5 sm:p-6 rounded-3xl shadow-xl text-white transition-shadow duration-300 ease-in-out hover:shadow-2xl border-2 border-indigo-300">
          <div className="flex items-center justify-between mb-4">
            <Database size={32} className="opacity-90" />
            <div className="p-2 bg-white/20 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-sm opacity-95 mb-2 font-bold uppercase tracking-wide">
            Total de Misturas
          </p>
          <p className="text-4xl sm:text-5xl font-black">
            {estatisticas.total}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-5 sm:p-6 rounded-3xl shadow-xl text-white transition-shadow duration-300 ease-in-out hover:shadow-2xl border-2 border-blue-300">
          <div className="flex items-center justify-between mb-4">
            <Activity size={32} className="opacity-90" />
            <div className="p-2 bg-white/20 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-sm opacity-95 mb-2 font-bold uppercase tracking-wide">
            Substâncias Únicas
          </p>
          <p className="text-4xl sm:text-5xl font-black">
            {estatisticas.substanciasUnicas}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-5 sm:p-6 rounded-3xl shadow-xl text-white transition-shadow duration-300 ease-in-out hover:shadow-2xl sm:col-span-2 lg:col-span-1 border-2 border-green-300">
          <div className="flex items-center justify-between mb-4">
            <Shield size={32} className="opacity-90" />
            <div className="p-2 bg-white/20 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-sm opacity-95 mb-2 font-bold uppercase tracking-wide">
            Misturas Seguras
          </p>
          <p className="text-4xl sm:text-5xl font-black">{misturasSeguras}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-indigo-50 p-5 sm:p-8 rounded-3xl shadow-xl border-2 border-indigo-100">
        <h3 className="text-xl sm:text-2xl font-black mb-6 text-gray-900 flex items-center gap-3">
          <TrendingUp className="text-indigo-600 flex-shrink-0" />
          <span>Distribuição por Nível de Risco</span>
        </h3>
        <div className="space-y-4">
          {Object.entries(estatisticas.porRisco).map(([nivel, count]) => {
            const porcentagem = (count / estatisticas.total) * 100;
            const cores = {
              nenhum: "from-green-500 to-emerald-500",
              baixo: "from-blue-500 to-cyan-500",
              moderado: "from-yellow-500 to-amber-500",
              alto: "from-orange-500 to-red-500",
              extremo: "from-red-600 to-rose-600",
              letal: "from-red-700 to-rose-700",
            };

            return (
              <div key={nivel} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black capitalize text-gray-800 flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${cores[nivel as keyof typeof cores]}`}
                    ></span>
                    {nivel}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700">
                      {count} misturas
                    </span>
                    <span className="text-sm font-black text-indigo-600 min-w-[3rem] text-right">
                      {porcentagem.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="relative bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${cores[nivel as keyof typeof cores]} flex items-center justify-end px-3 transition-all duration-1000 ease-out group-hover:opacity-90`}
                    style={{ width: `${porcentagem}%` }}
                  >
                    {count > 0 && (
                      <span className="text-xs font-bold text-white drop-shadow">
                        {count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t-2 border-indigo-200">
          <p className="text-sm text-gray-700 mb-4 font-bold uppercase tracking-wider">
            Análise Geral
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">
                <strong>{misturasSeguras}</strong> misturas seguras (
                {((misturasSeguras / estatisticas.total) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="text-gray-800 font-medium">
                <strong>
                  {estatisticas.porRisco.alto +
                    estatisticas.porRisco.extremo +
                    estatisticas.porRisco.letal}
                </strong>{" "}
                misturas perigosas (
                {(
                  ((estatisticas.porRisco.alto +
                    estatisticas.porRisco.extremo +
                    estatisticas.porRisco.letal) /
                    estatisticas.total) *
                  100
                ).toFixed(1)}
                %)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
