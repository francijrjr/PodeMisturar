import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bg: "from-green-500 to-emerald-500",
      border: "border-green-600",
    },
    error: {
      icon: XCircle,
      bg: "from-red-500 to-rose-500",
      border: "border-red-600",
    },
    info: {
      icon: Info,
      bg: "from-blue-500 to-cyan-500",
      border: "border-blue-600",
    },
    warning: {
      icon: AlertTriangle,
      bg: "from-yellow-500 to-amber-500",
      border: "border-yellow-600",
    },
  };

  const { icon: Icon, bg, border } = config[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 bg-gradient-to-r ${bg} text-white px-6 py-4 rounded-xl shadow-2xl border-2 ${border} min-w-[320px] max-w-md animate-in slide-in-from-top-4 fade-in`}
      role="alert"
      aria-live="polite"
    >
      <Icon size={24} className="flex-shrink-0" />
      <p className="flex-1 font-medium text-sm leading-relaxed">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
        aria-label="Fechar notificação"
      >
        <X size={18} />
      </button>
    </div>
  );
}
