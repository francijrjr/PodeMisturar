import React from "react";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface MisturaDetalhes {
  chave?: string;
  descricao: string;
  efeito: string;
  risco: string;
  aplicacao: string;
  alerta: string;
}

interface ResultadoMisturaProps {
  resultado: MisturaDetalhes;
}

function getRiscoIcon(risco: string) {
  const riscoLower = risco.toLowerCase();
  if (riscoLower.includes("nenhum"))
    return <CheckCircle className="text-green-500" size={28} />;
  if (riscoLower.includes("baixo"))
    return <Info className="text-blue-500" size={28} />;
  if (riscoLower.includes("moderado"))
    return <AlertTriangle className="text-yellow-500" size={28} />;
  if (
    riscoLower.includes("alto") ||
    riscoLower.includes("extremo") ||
    riscoLower.includes("letal")
  ) {
    return <XCircle className="text-red-500" size={28} />;
  }
  return <Info className="text-gray-500" size={28} />;
}

function getRiscoColor(risco: string) {
  const riscoLower = risco.toLowerCase();
  if (riscoLower.includes("nenhum"))
    return "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50";
  if (riscoLower.includes("baixo"))
    return "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50";
  if (riscoLower.includes("moderado"))
    return "border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50";
  if (
    riscoLower.includes("alto") ||
    riscoLower.includes("extremo") ||
    riscoLower.includes("letal")
  ) {
    return "border-red-500 bg-gradient-to-br from-red-50 to-rose-50";
  }
  return "border-gray-300 bg-white";
}

export default function ResultadoMistura({ resultado }: ResultadoMisturaProps) {
  return (
    <div
      className={`rounded-3xl border-3 shadow-2xl overflow-hidden ${getRiscoColor(resultado.risco)} animate-in fade-in slide-in-from-bottom-4 duration-500`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-300">
          <div className="p-3 bg-white rounded-2xl shadow-lg">
            {getRiscoIcon(resultado.risco)}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {resultado.chave?.split("+").join(" + ")}
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              Resultado da verificação
            </p>
          </div>
        </div>

        <div className="space-y-4 text-gray-800">
          <div className="bg-white/60 p-5 rounded-2xl border border-gray-200">
            <strong className="text-indigo-700 text-sm uppercase tracking-wider font-bold">
              Descrição
            </strong>
            <p className="mt-2 leading-relaxed text-gray-700">
              {resultado.descricao}
            </p>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-gray-200">
            <strong className="text-blue-700 text-sm uppercase tracking-wider font-bold">
              Efeito
            </strong>
            <p className="mt-2 leading-relaxed text-gray-700">
              {resultado.efeito}
            </p>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-gray-200">
            <strong className="text-orange-700 text-sm uppercase tracking-wider font-bold">
              Nível de Risco
            </strong>
            <p className="mt-2 leading-relaxed font-bold text-gray-900">
              {resultado.risco}
            </p>
          </div>

          <div className="bg-white/60 p-5 rounded-2xl border border-gray-200">
            <strong className="text-green-700 text-sm uppercase tracking-wider font-bold">
              Aplicação
            </strong>
            <p className="mt-2 leading-relaxed text-gray-700">
              {resultado.aplicacao}
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-5 rounded-2xl border-l-4 border-red-600 shadow-lg">
            <strong className="text-red-700 text-sm uppercase tracking-wider flex items-center gap-2 font-bold">
              Alerta Importante
            </strong>
            <p className="mt-2 leading-relaxed text-red-900 font-semibold">
              {resultado.alerta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
