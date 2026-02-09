import React from "react";
import { XCircle, AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  type?: "error" | "warning";
}

export default function ErrorMessage({
  message,
  type = "error",
}: ErrorMessageProps) {
  const isError = type === "error";

  return (
    <div
      className={`rounded-2xl border-3 p-4 sm:p-5 flex items-start gap-3 sm:gap-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 ${
        isError
          ? "border-red-500 bg-gradient-to-br from-red-50 to-rose-50"
          : "border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-2 bg-white rounded-lg shadow-md flex-shrink-0">
        {isError ? (
          <XCircle className="text-red-500" size={22} />
        ) : (
          <AlertTriangle className="text-yellow-500" size={22} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 mb-1 text-sm sm:text-base uppercase tracking-wide">
          {isError ? "Erro" : "Atenção"}
        </p>
        <p
          className={`leading-relaxed text-sm break-words font-medium ${isError ? "text-red-800" : "text-yellow-800"}`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
