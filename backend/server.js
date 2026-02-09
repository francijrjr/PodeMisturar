const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const misturas = require("./data/misturas.json");

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get("/", (_req, res) => {
  res.send({ name: "pode-misturar-api", status: "ok", version: "2.1.0" });
});

app.get("/health", (_req, res) => {
  res.send({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/api/misturas", (_req, res) => {
  try {
    const listaMisturas = Object.keys(misturas).map(chave => {
      const [substancia1, substancia2] = chave.split("+");
      return {
        chave,
        substancias: [substancia1, substancia2],
        risco: misturas[chave].risco,
        descricao: misturas[chave].descricao
      };
    });
    res.json({ total: listaMisturas.length, misturas: listaMisturas });
  } catch (error) {
    console.error("Erro ao listar misturas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/api/substancia/:nome", (req, res) => {
  try {
    const nome = req.params.nome.toLowerCase().trim();
    
    if (!nome) {
      return res.status(400).json({ error: "Nome da substância é obrigatório" });
    }

    const misturasEncontradas = Object.keys(misturas)
      .filter(chave => chave.includes(nome))
      .map(chave => ({
        chave,
        substancias: chave.split("+"),
        ...misturas[chave]
      }));

    if (misturasEncontradas.length === 0) {
      return res.status(404).json({ 
        error: `Nenhuma mistura encontrada com "${nome}"`,
        sugestao: "Tente outra substância ou veja a lista completa em /api/misturas"
      });
    }

    res.json({ 
      substancia: nome,
      total: misturasEncontradas.length, 
      misturas: misturasEncontradas 
    });
  } catch (error) {
    console.error("Erro ao buscar substância:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/api/estatisticas", (_req, res) => {
  try {
    const riscos = { baixo: 0, moderado: 0, alto: 0, extremo: 0, letal: 0, nenhum: 0 };
    
    Object.values(misturas).forEach(mistura => {
      const risco = mistura.risco.toLowerCase();
      if (risco.includes("nenhum")) riscos.nenhum++;
      else if (risco.includes("baixo")) riscos.baixo++;
      else if (risco.includes("moderado")) riscos.moderado++;
      else if (risco.includes("extremo")) riscos.extremo++;
      else if (risco.includes("letal")) riscos.letal++;
      else if (risco.includes("alto")) riscos.alto++;
    });

    res.json({
      total: Object.keys(misturas).length,
      porRisco: riscos,
      substanciasUnicas: [...new Set(
        Object.keys(misturas).flatMap(chave => chave.split("+"))
      )].length
    });
  } catch (error) {
    console.error("Erro ao gerar estatísticas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Verificar mistura específica
app.get("/api/misturas/:entrada", (req, res) => {
  try {
    const entrada = req.params.entrada
      .toLowerCase()
      .replace(/\s+/g, "")
      .split("+")
      .filter(item => item.length > 0)
      .sort()
      .join("+");
    
    if (!entrada || entrada.split("+").length < 2) {
      return res.status(400).json({ 
        error: "É necessário informar pelo menos duas substâncias separadas por '+'"
      });
    }

    const resultado = misturas[entrada];
    
    if (resultado) {
      res.json({ chave: entrada, ...resultado });
    } else {
      const substancias = entrada.split("+");
      const sugestoes = Object.keys(misturas)
        .filter(chave => substancias.some(sub => chave.includes(sub)))
        .slice(0, 3);

      res.status(404).json({ 
        error: "Mistura desconhecida. Evite testar sem pesquisar!",
        entrada,
        sugestoes: sugestoes.length > 0 ? sugestoes : undefined
      });
    }
  } catch (error) {
    console.error("Erro ao verificar mistura:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Mistura aleatória
app.get("/api/random", (_req, res) => {
  try {
    const chaves = Object.keys(misturas);
    const chaveAleatoria = chaves[Math.floor(Math.random() * chaves.length)];
    
    res.json({
      chave: chaveAleatoria,
      substancias: chaveAleatoria.split("+"),
      ...misturas[chaveAleatoria]
    });
  } catch (error) {
    console.error("Erro ao buscar mistura aleatória:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Mistura aleatória por nível de risco
app.get("/api/random-por-risco/:nivel", (req, res) => {
  try {
    const nivel = req.params.nivel.toLowerCase();
    const niveisValidos = ["nenhum", "baixo", "moderado", "alto", "extremo", "letal"];
    
    if (!niveisValidos.includes(nivel)) {
      return res.status(400).json({ 
        error: "Nível de risco inválido",
        niveisValidos
      });
    }

    const misturasDoNivel = Object.keys(misturas)
      .filter(chave => misturas[chave].risco.toLowerCase().includes(nivel));
    
    if (misturasDoNivel.length === 0) {
      return res.status(404).json({ 
        error: `Nenhuma mistura encontrada com risco "${nivel}"`
      });
    }

    const chaveAleatoria = misturasDoNivel[Math.floor(Math.random() * misturasDoNivel.length)];
    
    res.json({
      chave: chaveAleatoria,
      substancias: chaveAleatoria.split("+"),
      nivelFiltrado: nivel,
      ...misturas[chaveAleatoria]
    });
  } catch (error) {
    console.error("Erro ao buscar mistura aleatória por risco:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Agrupar por categorias de risco
app.get("/api/categorias", (_req, res) => {
  try {
    const categorias = {
      nenhum: [],
      baixo: [],
      moderado: [],
      alto: [],
      extremo: [],
      letal: []
    };

    Object.keys(misturas).forEach(chave => {
      const mistura = misturas[chave];
      const risco = mistura.risco.toLowerCase();
      
      if (risco.includes("nenhum")) categorias.nenhum.push({ chave, ...mistura });
      else if (risco.includes("baixo")) categorias.baixo.push({ chave, ...mistura });
      else if (risco.includes("moderado")) categorias.moderado.push({ chave, ...mistura });
      else if (risco.includes("extremo")) categorias.extremo.push({ chave, ...mistura });
      else if (risco.includes("letal")) categorias.letal.push({ chave, ...mistura });
      else if (risco.includes("alto")) categorias.alto.push({ chave, ...mistura });
    });

    res.json({
      categorias,
      totais: {
        nenhum: categorias.nenhum.length,
        baixo: categorias.baixo.length,
        moderado: categorias.moderado.length,
        alto: categorias.alto.length,
        extremo: categorias.extremo.length,
        letal: categorias.letal.length
      }
    });
  } catch (error) {
    console.error("Erro ao agrupar categorias:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Busca avançada com múltiplos filtros
app.get("/api/busca", (req, res) => {
  try {
    const { q, risco, aplicacao } = req.query;
    let resultado = Object.keys(misturas).map(chave => ({
      chave,
      substancias: chave.split("+"),
      ...misturas[chave]
    }));

    // Filtro por texto (query)
    if (q) {
      const query = q.toLowerCase();
      resultado = resultado.filter(m => 
        m.chave.includes(query) ||
        m.descricao.toLowerCase().includes(query) ||
        m.efeito.toLowerCase().includes(query) ||
        m.aplicacao.toLowerCase().includes(query)
      );
    }

    // Filtro por nível de risco
    if (risco) {
      const riscoLower = risco.toLowerCase();
      resultado = resultado.filter(m => 
        m.risco.toLowerCase().includes(riscoLower)
      );
    }

    // Filtro por aplicação
    if (aplicacao) {
      const aplicacaoLower = aplicacao.toLowerCase();
      resultado = resultado.filter(m => 
        m.aplicacao.toLowerCase().includes(aplicacaoLower)
      );
    }

    res.json({
      filtros: { q, risco, aplicacao },
      total: resultado.length,
      misturas: resultado
    });
  } catch (error) {
    console.error("Erro na busca avançada:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.use((_req, res) => {
  res.status(404).json({ 
    error: "Rota não encontrada",
    endpoints: [
      "GET /",
      "GET /health", 
      "GET /api/misturas",
      "GET /api/misturas/:entrada",
      "GET /api/substancia/:nome",
      "GET /api/estatisticas",
      "GET /api/random",
      "GET /api/random-por-risco/:nivel",
      "GET /api/categorias",
      "GET /api/busca?q=&risco=&aplicacao="
    ]
  });
});

app.use((err, _req, res, _next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📊 ${Object.keys(misturas).length} misturas cadastradas`);
});