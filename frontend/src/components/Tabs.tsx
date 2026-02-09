import React from "react";
import { Search, List, TrendingUp } from "lucide-react";

export type TabType = "verificar" | "listar" | "estatisticas";

interface TabsProps {
  abaAtiva: TabType;
  onChangeAba: (aba: TabType) => void;
}

export default function Tabs({ abaAtiva, onChangeAba }: TabsProps) {
  const tabs = [
    { id: "verificar" as TabType, label: "Verificar", icon: Search },
    { id: "listar" as TabType, label: "Lista Completa", icon: List },
    { id: "estatisticas" as TabType, label: "Estatísticas", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-8 p-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = abaAtiva === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeAba(tab.id)}
            className={`
              flex-1 min-w-[120px] px-4 sm:px-6 py-3 rounded-xl font-bold transition-all duration-300 ease-in-out whitespace-nowrap
              ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl scale-102"
                  : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
              }
            `}
          >
            <Icon className="inline mr-2" size={18} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
