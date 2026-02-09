# Pode Misturar - Aplicação de Verificação de Misturas Químicas

Uma aplicação web moderna e interativa para verificar a segurança de misturas entre diferentes substâncias. Desenvolvida com **React + TypeScript + Tailwind CSS** no frontend e **Node.js + Express** no backend.
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)

## Funcionalidades

### Verificação de Misturas

- Digite duas ou mais substâncias separadas por `+`
- Receba informações detalhadas sobre:
  - Descrição da mistura
  - Efeitos químicos
  - Nível de risco
  - Aplicações práticas
  - Alertas de segurança

### Interface Moderna

- **Design Profissional**: Gradientes indigo/purple/pink com visual clean e moderno
- **100% Responsivo**: Mobile-first, funciona perfeitamente em qualquer dispositivo
- **Cores Baseadas em Risco**: Indicadores visuais claros (verde, azul, amarelo, vermelho)
- **Ícones Intuitivos**: Feedback visual instantâneo do nível de perigo
- **Micro-interações**: Animações suaves e transições elegantes (200-300ms)
- **Acessibilidade**: WCAG AA - ARIA labels, navegação por teclado, foco visível

### Recursos Avançados

- **Três Abas Principais**:
  - **Verificar**: Busca individual ou por substância
  - **Lista Completa**: Navegue por todas as misturas com filtros por risco
  - **Estatísticas**: Visualize dados agregados e distribuição de riscos

- **Histórico de Pesquisas**: Últimas 5 buscas salvas localmente
- **Busca por Substância**: Encontre todas as misturas contendo um ingrediente específico
- **Filtros Dinâmicos**: Filtre misturas por nível de risco (nenhum, baixo, moderado, alto, extremo, letal)
- **Mistura Aleatória**: 🎲 Botão para descobrir misturas interessantes aleatoriamente
- **Sistema de Notificações**: Toast notifications com 4 tipos (success, error, info, warning)
- **Loading States**: Skeletons animados durante carregamento de dados
- **Validação Inteligente**: Verifica entrada antes de enviar ao servidor

### Backend Robusto

- **11 Endpoints REST**:
  - `GET /` - Informações da API
  - `GET /health` - Health check com timestamp
  - `GET /api/misturas` - Lista todas as misturas cadastradas
  - `GET /api/misturas/:entrada` - Verifica mistura específica (com sugestões se não encontrada)
  - `GET /api/substancia/:nome` - Busca misturas por substância
  - `GET /api/estatisticas` - Retorna estatísticas agregadas
  - `GET /api/random` - Retorna mistura aleatória
  - `GET /api/random-por-risco/:nivel` - Mistura aleatória filtrada por risco
  - `GET /api/categorias` - Misturas agrupadas por categoria de risco
  - `GET /api/busca` - Busca avançada com múltiplos filtros

- **Melhorias**:
  - 97 misturas no banco de dados (expandido em 45%)
  - Logging de todas as requisições
  - Tratamento de erros global
  - Validação de entrada
  - Sugestões de misturas similares em caso de erro 404
  - Mensagens de erro descritivas
  - CORS configurado

## Requisitos

- **Node.js** 18+ e npm
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Instalação e Execução

### Backend (API)

```bash
cd backend
npm install
npm run start
```

O servidor estará disponível em `http://localhost:3001`

### Frontend (Interface)

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
PodeMisturar/
├── backend/
│   ├── data/
│   │   └── misturas.json      # Base de dados de misturas
│   ├── server.js               # Servidor Express
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx           # Cabeçalho com ícone e gradiente
│   │   │   ├── Tabs.tsx             # Sistema de navegação por abas
│   │   │   ├── SearchForm.tsx       # Formulário de busca principal
│   │   │   ├── ResultadoMistura.tsx # Exibição detalhada de resultados
│   │   │   ├── ErrorMessage.tsx     # Componente de mensagens de erro
│   │   │   ├── ListaMisturas.tsx    # Lista completa com filtros
│   │   │   ├── MisturaCard.tsx      # Card individual de mistura
│   │   │   ├── EstatisticasPanel.tsx # Painel de estatísticas
│   │   │   ├── Toast.tsx            # Sistema de notificações
│   │   │   └── LoadingSkeleton.tsx  # Skeletons de carregamento
│   │   ├── App.tsx                  # Componente raiz
│   │   ├── PodeMisturar.tsx         # Componente principal
│   │   ├── main.tsx                 # Bootstrap React
│   │   └── index.css                # Estilos globais + Tailwind
│   ├── index.html
│   ├── vite.config.ts         # Configuração Vite
│   └── package.json
│
└── README.md
```

## Componentes React

### Componentes de Layout

- **Header** - Cabeçalho com ícone Beaker, gradiente e título
- **Tabs** - Navegação por 3 abas (Verificar, Lista Completa, Estatísticas)

### Componentes de Busca e Formulários

- **SearchForm** - Formulário principal com verificação de mistura, busca por substância, histórico e botão aleatório
- **ResultadoMistura** - Exibição detalhada de resultados com cores baseadas em risco

### Componentes de Listagem

- **ListaMisturas** - Lista com filtros por nível de risco e contador de resultados
- **MisturaCard** - Card individual clicável com preview da mistura
- **EstatisticasPanel** - 3 cards de métricas + gráfico de distribuição de riscos

### Componentes de Feedback

- **Toast** - Notificações temporárias (success, error, info, warning)
- **ErrorMessage** - Mensagens de erro com ícones e cores contextuais
- **LoadingSkeleton** - 3 variantes (CardSkeleton, ResultSkeleton, StatsSkeleton)

## API Endpoints

### `GET /`

Informações básicas da API

```json
{
  "name": "pode-misturar-api",
  "status": "ok",
  "version": "2.1.0"
}
```

### `GET /health`

Status de saúde do servidor

```json
{
  "status": "healthy",
  "timestamp": "2026-02-09T..."
}
```

### `GET /api/misturas`

Lista todas as misturas disponíveis

```json
{
  "total": 67,
  "misturas": [
    {
      "chave": "alcool+vinagre",
      "substancias": ["alcool", "vinagre"],
      "risco": "Baixo (não tóxico, mas irritante).",
      "descricao": "Mistura de álcool (etanol) e vinagre..."
    }
  ]
}
```

### `GET /api/misturas/:entrada`

Verifica uma mistura específica

- **Parâmetro**: `:entrada` - substâncias separadas por `+` (ex: `alcool+vinagre`)
- **Normalização**: Automática (minúsculas, sem espaços, ordem alfabética)

**Sucesso (200)**:

```json
{
  "chave": "alcool+vinagre",
  "descricao": "Mistura de álcool (etanol) e vinagre...",
  "efeito": "Formação de acetato de etila...",
  "risco": "Baixo (não tóxico, mas irritante).",
  "aplicacao": "Limpeza doméstica...",
  "alerta": "Evitar uso em superfícies sensíveis..."
}
```

**Não encontrado (404)**:

```json
{
  "error": "Mistura desconhecida. Evite testar sem pesquisar!",
  "entrada": "agua+ouro",
  "sugestoes": ["agua+acucar", "agua+oleo"]
}
```

### `GET /api/substancia/:nome`

Busca todas as misturas contendo uma substância

```json
{
  "substancia": "vinagre",
  "total": 3,
  "misturas": [
    { "chave": "alcool+vinagre", ... },
    { "chave": "bicarbonato+vinagre", ... },
    { "chave": "cloro+vinagre", ... }
  ]
}
```

### `GET /api/estatisticas`

Estatísticas do banco de dados

```json
{
  "total": 97,
  "porRisco": {
    "nenhum": 5,
    "baixo": 25,
    "moderado": 32,
    "alto": 28,
    "extremo": 5,
    "letal": 2
  },
  "substanciasUnicas": 145
}
```

### `GET /api/random`

Retorna uma mistura aleatória do banco de dados

```json
{
  "chave": "cafe+limao",
  "substancias": ["cafe", "limao"],
  "descricao": "Café (cafeína) + suco de limão (ácido cítrico).",
  "efeito": "Acidez aumentada, pode ajudar na digestão...",
  "risco": "Baixo (pode causar azia em pessoas sensíveis).",
  "aplicacao": "Bebida emagrecedora ou energética matinal.",
  "alerta": "Evite se tiver problemas gástricos."
}
```

### `GET /api/random-por-risco/:nivel`

Retorna uma mistura aleatória filtrada por nível de risco

- **Parâmetro**: `:nivel` - um dos valores: `nenhum`, `baixo`, `moderado`, `alto`, `extremo`, `letal`

```json
{
  "chave": "mel+canela",
  "substancias": ["mel", "canela"],
  "nivelFiltrado": "nenhum",
  "descricao": "Mel (açúcares naturais) + canela em pó...",
  "efeito": "Propriedades anti-inflamatórias e antimicrobianas...",
  "risco": "Nenhum (natural e seguro).",
  "aplicacao": "Remédio caseiro para resfriados...",
  "alerta": "Diabéticos devem moderar o mel."
}
```

### `GET /api/categorias`

Retorna todas as misturas agrupadas por categoria de risco

```json
{
  "categorias": {
    "nenhum": [
      { "chave": "mel+canela", ... },
      { "chave": "banana+leite", ... }
    ],
    "baixo": [...],
    "moderado": [...],
    "alto": [...],
    "extremo": [...],
    "letal": [...]
  },
  "totais": {
    "nenhum": 5,
    "baixo": 25,
    "moderado": 32,
    "alto": 28,
    "extremo": 5,
    "letal": 2
  }
}
```

### `GET /api/busca?q=&risco=&aplicacao=`

Busca avançada com múltiplos filtros (todos opcionais)

- **Query params**:
  - `q` - Texto livre para buscar em descricao, efeito, aplicacao
  - `risco` - Filtrar por nível de risco
  - `aplicacao` - Filtrar por tipo de aplicação

**Exemplo**: `/api/busca?q=limao&risco=baixo`

```json
{
  "filtros": {
    "q": "limao",
    "risco": "baixo",
    "aplicacao": null
  },
  "total": 2,
  "misturas": [
    { "chave": "bicarbonato+limao", ... },
    { "chave": "cafe+limao", ... }
  ]
}
```

## Recursos Visuais

### Indicadores de Risco

| Nível              | Cor      | Ícone         |
| ------------------ | -------- | ------------- |
| Nenhum             | Verde    | CheckCircle   |
| Baixo              | Azul     | Info          |
| Moderado           | Amarelo  | AlertTriangle |
| Alto/Extremo/Letal | Vermelho | XCircle       |

### Design System

- **Paleta Principal**: Gradientes indigo/purple/pink para elementos interativos
- **Backgrounds**: Branco com sutis gradientes coloridos (indigo-50, purple-50, pink-50)
- **Bordas**: Espessas (2-3px) com cores vibrantes para hierarquia visual
- **Tipografia**: Font weights bold/black para melhor legibilidade
- **Animações**: Transições suaves de 200-300ms com ease-in-out
- **Hovers**: Scale-102 (movimento sutil de 2%) para feedback tátil

## Segurança e Validação

- Validação de entrada no frontend e backend
- Sanitização de parâmetros
- Tratamento de erros robusto
- Mensagens de erro descritivas
- CORS habilitado para desenvolvimento

## Melhorias Implementadas

#### Backend

- ✨ **Banco de dados expandido**: Adicionadas 30 novas misturas (total: 97 misturas)
  - Misturas culinárias (café+limão, mel+canela, banana+leite)
  - Misturas medicinais (gengibre+mel, aloe+mel, cúrcuma+pimenta)
  - Experimentos químicos (iodo+amido, sulfato+bário, cloreto+prata)
  - Receitas caseiras (óleo+soda, óleo+alho, argila+vinagre)
  - E muito mais!

- **Novos endpoints REST**:
- `GET /api/random` - Retorna mistura aleatória
- `GET /api/random-por-risco/:nivel` - Mistura aleatória filtrada por risco
- `GET /api/categorias` - Misturas agrupadas por categoria de risco
- `GET /api/busca` - Busca avançada com múltiplos filtros (q, risco, aplicacao)

- Total de endpoints: **11 rotas disponíveis**

#### Frontend

- Interface completamente redesenhada com design profissional
- Sistema de abas (Verificar, Listar, Estatísticas)
- 10 componentes React modulares e reutilizáveis
- Busca por substância individual
- Botão de mistura aleatória com ícone Shuffle
- Sistema de notificações Toast (4 tipos: success, error, info, warning)
- Histórico de pesquisas com persistência (localStorage)
- Filtros dinâmicos por nível de risco
- Loading skeletons com animações (3 tipos: Card, Result, Stats)
- Cores dinâmicas baseadas no risco
- Acessibilidade WCAG AA (ARIA labels, navegação por teclado, foco visível)
- Design 100% responsivo mobile-first
- Micro-interações e animações suaves (hover:scale-102, duration-300)
- Gradientes indigo/purple/pink em vez de purple/pink

- TypeScript no frontend
- Tipos bem definidos
- Código modularizado
- Padrões consistentes

## Scripts Disponíveis

### Backend

```bash
npm run start
npm run dev
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Tecnologias Utilizadas

### Frontend

- **React** 18.3 - Biblioteca UI
- **TypeScript** 5.6 - Tipagem estática
- **Vite** 5.4 - Build tool ultrarrápido
- **Tailwind CSS** 4.1 - Framework CSS utility-first
- **Lucide React** - Ícones modernos

### Backend

- **Node.js** - Runtime JavaScript
- **Express** 5.1 - Framework web minimalista
- **CORS** - Middleware para Cross-Origin Resource Sharing

## Troubleshooting

### Problemas Comuns

**Erro de CORS**

- Certifique-se de que o backend está rodando em `http://localhost:3001`
- O frontend usa proxy configurado no `vite.config.ts`

**404 na busca**

- Verifique a normalização: minúsculas, sem espaços, ordem alfabética
- Exemplo: `Álcool + Vinagre` → `alcool+vinagre`

**Estilos não aplicados**

- Confirme que `@import "tailwindcss"` está em `src/index.css`
- Verifique se o plugin Tailwind está em `vite.config.ts`
- Execute `npm run build` para verificar erros de compilação

**Performance lenta**

- Verifique se está usando o modo de desenvolvimento (`npm run dev`)
- Para produção, faça build com `npm run build` e sirva com `npm run preview`
- Limpe o cache do navegador (Ctrl+Shift+Delete)

## Licença

Este projeto é de código aberto para fins educacionais.

## Contribuindo

Sugestões de novas misturas ou melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Aviso Legal

Esta aplicação é **apenas para fins informativos e educacionais**. Nunca realize misturas químicas sem conhecimento adequado e equipamento de proteção. Sempre consulte profissionais qualificados antes de manusear substâncias químicas.

---

**Desenvolvido com amor para promover segurança e conhecimento químico**
