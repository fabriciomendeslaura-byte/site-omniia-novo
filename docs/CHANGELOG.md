# Changelog — Novo site OMNI.IA

Registro legível do que mudou e quando. Não repete o que o `git log` cobre:
aqui fica a versão que um humano lê para lembrar do projeto.

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
