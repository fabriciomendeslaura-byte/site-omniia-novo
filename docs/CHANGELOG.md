# Changelog — Novo site OMNI.IA

Registro legível do que mudou e quando. Não repete o que o `git log` cobre:
aqui fica a versão que um humano lê para lembrar do projeto.

---

## 08/09/2026 — 🚀 Site completo e no ar em `omniiabr.tech`

### Adicionado

**Seções**
- **Serviços** — 6 blocos alternando texto e visual, com desenhos em CSS/SVG puro
  (painel de sistema, frota de agentes, celular, wireframe, fluxo em SVG, camadas)
- **Engenharia** — a seção de PROVA: 4 pilares de prática técnica, em 2×2 com bordas
  compartilhadas. Substitui a prova social que a empresa ainda não tem
- **Processo** — 3 passos ligados por linha, com o primeiro gratuito
- **FAQ** — accordion em `<details>` nativo (acessível, funciona sem JS, indexável)
- **Contato** — formulário com validação, honeypot e consentimento LGPD
- **Rodapé** — contato, navegação e Política de Privacidade completa

**LGPD**
- Banner de cookies com **"Recusar" do mesmo peso visual** que "Aceitar"
- Nenhum rastreador carrega antes do consentimento (`podeRastrear`)
- Consentimento obrigatório no formulário, nunca pré-marcado
- Política em 9 blocos, em linguagem que se entende
- Revogação possível pelo rodapé

**Segurança e publicação**
- `vercel.json` — CSP, HSTS, X-Frame-Options, Permissions-Policy e cache
- `robots.txt` liberando GPTBot, ClaudeBot e PerplexityBot
- `sitemap.xml` e **`llms.txt`** (descrição da empresa para IAs citarem)
- Repositório no GitHub + deploy automático na Vercel

### Corrigido

- 🔴 **Formulário não enviava em produção.** `VITE_WEBHOOK_CONTATO` chegava VAZIA no
  build, e o operador `??` não substitui string vazia — só `null`/`undefined`. A URL
  virava `''` e o `fetch` postava na própria página. Em desenvolvimento a variável era
  `undefined`, o padrão entrava e tudo funcionava: o bug **só existia no ar**
- **Menu mobile nascia aberto.** O atributo `hidden` vem da folha do navegador (baixa
  especificidade) e perdia para `.menuMobile { display: flex }`. Resolvido na raiz com
  `[hidden] { display: none !important }`
- **Dropdown invisível no tema escuro.** As `<option>` herdavam o texto branco, mas o
  fundo da lista é desenhado pelo sistema operacional (branco). Resolvido com
  `color-scheme: dark`, que corrige todos os controles nativos de uma vez
- Removidas imagens não referenciadas do build (136 KB → 96 KB)

### Descoberto

- 🔴 **O workflow "SRD FORMULARIO" estava DESATIVADO** — comprovado com requisição real
  (HTTP 404). O formulário do site antigo não entregava lead nenhum. Ativado pelo Fabricio

### Decidido

- **Ordem dos serviços é argumento:** Software → Agentes de IA → Aplicativos → Sites →
  Automações → Infra. Começar por agentes faria concluir "agência de automação"
- **Agentes de IA são uma FROTA**, um por função da empresa — nunca só atendimento
- **Tela de sucesso sem botão de WhatsApp**: a automação já inicia a conversa
- **Sem mencionar "IA" na tela de sucesso**: dispara o "vou falar com robô" e o lead
  entra na conversa na defensiva
- **"Em instantes entramos em contato"**, não "já entramos": nunca dar como feito o que
  a pessoa ainda não pode conferir

### Verificado

- `tsc --noEmit` sem erros · build passando
- **75 KB de JS · 8 KB de CSS** comprimidos
- Domínio `omniiabr.tech` servindo o site novo, com HTTPS, HSTS e CSP ativos
- Formulário enviando de ponta a ponta: navegador → CSP → CORS → n8n → WhatsApp

---

## 07/09/2026 — Fundação + primeira tela

### Adicionado

**Documentação**
- `BRIEFING-NOVO-SITE.md` — conteúdo extraído do site atual, design system e direção criativa
- `ESTADO-ATUAL.md` — ponto de retomada
- `decisoes-tecnicas.md` — as decisões de arquitetura com o motivo de cada uma
- `marca/` — logo original azul + versões brancas tratadas + favicon

**Projeto**
- React 19 + Vite 8 + TypeScript 7, com verificação de tipos estrita
  (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Alias `@/` apontando para `src/`
- CSS Modules para escopo de estilo

**Design system**
- `styles/tokens.css` — tokens do estilo "midnight precision instrument" mais a
  camada semântica da OMNI.IA (`--color-action`, `--color-text-*`, `--ease-out`)
- `styles/reset.css` e `styles/global.css`

**Conteúdo**
- `content/site.ts` — empresa, navegação, hero e os 6 serviços, extraídos do site atual
- `content/codigoHero.ts` — o código do painel do topo, descrito como dado

**Componentes**
- `Container` — largura máxima e respiro lateral fluido
- `Button` — 3 variantes, com `rel="noopener noreferrer"` automático
- `Reveal` — entrada ao rolar, com atraso escalonado
- `PainelCodigo` — janela de editor mostrando o fluxo do agente
- `Nav` — barra fixa, fundo ao rolar, menu mobile acessível
- `Hero` — primeira tela, com grade, luz do cursor e chão em degradê

**Hooks**
- `useReveal` — IntersectionObserver **único compartilhado** entre todos os elementos
- `usePonteiroLuz` — luz que segue o cursor, sem re-render do React

### Decidido
- Cor de ação **`#2B7FFF`** (azul da marca clareado) — `#004AAD` fica institucional
- Logo branca com **wordmark sólido**
- Stack **React + Vite**, deploy previsto na Vercel

### Corrigido
- Logos geradas no Gemini vinham com o quadriculado de transparência **desenhado
  como pixels** e em JPEG (sem canal alpha). Tratadas por script: máscara de
  luminância com rampa 170→240, recorte e exportação em PNG com transparência real
- `tsconfig.json`: a opção `baseUrl` foi **removida no TypeScript 7** — os caminhos
  do `paths` passaram a exigir `./` na frente

### Verificado
- `tsc --noEmit` sem erros
- `npm run build` passando — 200 KB de JS (63 KB gzip) e 12,9 KB de CSS (3,8 KB gzip)
