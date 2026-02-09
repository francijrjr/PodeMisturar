import React from "react";
import { Sparkles, Beaker } from "lucide-react";

export default function Header() {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-40"></div>
          <div className="relative p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-102 active:scale-98">
            <Beaker className="text-white" size={36} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl sm:text-5xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Pode Misturar?
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Verifique a segurança de misturas químicas de forma inteligente
          </p>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
    </div>
  );
}
