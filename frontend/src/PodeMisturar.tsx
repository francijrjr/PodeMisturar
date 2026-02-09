import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Tabs, { TabType } from "./components/Tabs";
import SearchForm from "./components/SearchForm";
import ResultadoMistura from "./components/ResultadoMistura";
import ErrorMessage from "./components/ErrorMessage";
import ListaMisturas from "./components/ListaMisturas";
import EstatisticasPanel from "./components/EstatisticasPanel";
import Toast, { ToastType } from "./components/Toast";
import {
  ResultSkeleton,
  CardSkeleton,
  StatsSkeleton,
} from "./components/LoadingSkeleton";

type MisturaDetalhes = {
  chave?: string;
  descricao: string;
  efeito: string;
  risco: string;
  aplicacao: string;
  alerta: string;
};

type Estatisticas = {
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
};

type MisturaListItem = {
  chave: string;
  substancias: string[];
  risco: string;
  descricao: string;
};

export default function PodeMisturar() {
  const [mistura, setMistura] = useState("");
  const [resultado, setResultado] = useState<MisturaDetalhes | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [historico, setHistorico] = useState<string[]>([]);
  const [aba, setAba] = useState<TabType>("verificar");
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [misturas, setMisturas] = useState<MisturaListItem[]>([]);
  const [filtroRisco, setFiltroRisco] = useState<string>("todos");
  const [buscaSubstancia, setBuscaSubstancia] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [loadingMisturas, setLoadingMisturas] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const historicoSalvo = localStorage.getItem("historico-misturas");
    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo));
    }
  }, []);

  useEffect(() => {
    if (aba === "listar") {
      carregarMisturas();
    } else if (aba === "estatisticas") {
      carregarEstatisticas();
    }
  }, [aba]);

  async function verificarMistura(misturaParam?: string) {
    const misturaAtual = misturaParam || mistura;
    const substancias = misturaAtual
      .toLowerCase()
      .trim()
      .split("+")
      .filter((s) => s.length > 0);

    if (substancias.length < 2) {
      setErro("Digite pelo menos duas substâncias separadas por '+'");
      setResultado(null);
      return;
    }

    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      const entrada = substancias.sort().join("+");
      const res = await fetch(`/api/misturas/${entrada}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar mistura");
      }

      setResultado(data);
      const novoHistorico = [
        entrada,
        ...historico.filter((h) => h !== entrada),
      ].slice(0, 5);
      setHistorico(novoHistorico);
      localStorage.setItem("historico-misturas", JSON.stringify(novoHistorico));
    } catch (err) {
      setResultado(null);
      setErro(
        err instanceof Error
          ? err.message
          : "Não tenho informações sobre essa mistura. Evite testar sem pesquisar!",
      );
    } finally {
      setLoading(false);
    }
  }

  async function carregarMisturas() {
    setLoadingMisturas(true);
    try {
      const res = await fetch("/api/misturas");
      const data = await res.json();
      setMisturas(data.misturas || []);
    } catch (err) {
      console.error("Erro ao carregar misturas:", err);
      showToast("Erro ao carregar misturas", "error");
    } finally {
      setLoadingMisturas(false);
    }
  }

  async function carregarEstatisticas() {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/estatisticas");
      const data = await res.json();
      setEstatisticas(data);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
      showToast("Erro ao carregar estatísticas", "error");
    } finally {
      setLoadingStats(false);
    }
  }

  async function buscarPorSubstancia() {
    if (!buscaSubstancia.trim()) {
      setErro("Digite o nome de uma substância");
      showToast("Digite o nome de uma substância", "warning");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      const res = await fetch(
        `/api/substancia/${buscaSubstancia.toLowerCase().trim()}`,
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Substância não encontrada");
      }

      setMisturas(data.misturas || []);
      setAba("listar");
      showToast(
        `Encontradas ${data.misturas.length} misturas com "${buscaSubstancia}"`,
        "success",
      );
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao buscar substância");
      showToast(
        err instanceof Error ? err.message : "Erro ao buscar substância",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  function limparHistorico() {
    setHistorico([]);
    localStorage.removeItem("historico-misturas");
    showToast("Histórico limpo", "info");
  }

  function handleMisturaClick(chave: string) {
    setMistura(chave);
    setAba("verificar");
    verificarMistura(chave);
  }

  async function buscarMisturaAleatoria() {
    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      const res = await fetch("/api/random");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao buscar mistura aleatória");
      }

      setResultado(data);
      setMistura(data.chave || "");
      showToast("✨ Mistura aleatória encontrada!", "success");

      const novoHistorico = [
        data.chave,
        ...historico.filter((h) => h !== data.chave),
      ].slice(0, 5);
      setHistorico(novoHistorico);
      localStorage.setItem("historico-misturas", JSON.stringify(novoHistorico));
    } catch (err) {
      setErro(
        err instanceof Error ? err.message : "Erro ao buscar mistura aleatória",
      );
      showToast(
        err instanceof Error ? err.message : "Erro ao buscar mistura aleatória",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  function showToast(message: string, type: ToastType) {
    setToast({ message, type });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-12">
        <Header />

        <Tabs abaAtiva={aba} onChangeAba={setAba} />

        <div className="mt-6">
          {aba === "verificar" && (
            <div className="space-y-6">
              <SearchForm
                mistura={mistura}
                buscaSubstancia={buscaSubstancia}
                historico={historico}
                loading={loading}
                onMisturaChange={setMistura}
                onBuscaSubstanciaChange={setBuscaSubstancia}
                onVerificar={verificarMistura}
                onBuscarSubstancia={buscarPorSubstancia}
                onSelecionarHistorico={setMistura}
                onLimparHistorico={limparHistorico}
                onMisturaAleatoria={buscarMisturaAleatoria}
              />

              {erro && <ErrorMessage message={erro} />}
              {loading && <ResultSkeleton />}
              {!loading && resultado && (
                <ResultadoMistura resultado={resultado} />
              )}
            </div>
          )}

          {aba === "listar" && (
            <>
              {loadingMisturas ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <ListaMisturas
                  misturas={misturas}
                  filtroRisco={filtroRisco}
                  onFiltroChange={setFiltroRisco}
                  onMisturaClick={handleMisturaClick}
                />
              )}
            </>
          )}

          {aba === "estatisticas" && (
            <>
              {loadingStats ? (
                <StatsSkeleton />
              ) : (
                estatisticas && (
                  <EstatisticasPanel estatisticas={estatisticas} />
                )
              )}
            </>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
