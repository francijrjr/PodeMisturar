import React from "react";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface MisturaCardProps {
  chave: string;
  substancias: string[];
  risco: string;
  descricao: string;
  onClick: () => void;
}

function getRiscoIcon(risco: string) {
  const riscoLower = risco.toLowerCase();
  if (riscoLower.includes("nenhum"))
    return <CheckCircle className="text-green-500" size={20} />;
  if (riscoLower.includes("baixo"))
    return <Info className="text-blue-500" size={20} />;
  if (riscoLower.includes("moderado"))
    return <AlertTriangle className="text-yellow-500" size={20} />;
  if (
    riscoLower.includes("alto") ||
    riscoLower.includes("extremo") ||
    riscoLower.includes("letal")
  ) {
    return <XCircle className="text-red-500" size={20} />;
  }
  return <Info className="text-gray-500" size={20} />;
}

function getRiscoColor(risco: string) {
  const riscoLower = risco.toLowerCase();
  if (riscoLower.includes("nenhum"))
    return "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 hover:border-green-600";
  if (riscoLower.includes("baixo"))
    return "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-600";
  if (riscoLower.includes("moderado"))
    return "border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 hover:border-yellow-600";
  if (
    riscoLower.includes("alto") ||
    riscoLower.includes("extremo") ||
    riscoLower.includes("letal")
  ) {
    return "border-red-500 bg-gradient-to-br from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 hover:border-red-600";
  }
  return "border-gray-300 bg-white hover:bg-gray-50";
}

export default function MisturaCard({
  substancias,
  risco,
  descricao,
  onClick,
}: MisturaCardProps) {
  return (
    <div
      className={`rounded-2xl border-3 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-102 active:scale-98 ${getRiscoColor(risco)}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label={`Ver detalhes da mistura ${substancias.join(" mais ")}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-1 flex-shrink-0">{getRiscoIcon(risco)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-lg text-gray-900 leading-tight break-words">
            {substancias.join(" + ")}
          </h3>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-3 line-clamp-2 font-medium">
        {descricao}
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/70 text-gray-800 border border-gray-300">
          Risco: {risco.split("(")[0].trim()}
        </span>
        <span className="text-xs text-indigo-600 font-bold">Ver mais →</span>
      </div>
    </div>
  );
}
