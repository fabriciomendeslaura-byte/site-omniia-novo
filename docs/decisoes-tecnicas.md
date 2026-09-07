# Decisões técnicas (ADR)

> **ADR** = *Architecture Decision Record*. O `CHANGELOG` diz **o que** mudou;
> este arquivo diz **por que** foi feito assim. É o que impede alguém (inclusive
> nós daqui a seis meses) de "consertar" uma decisão que tinha motivo.
>
> Cada decisão registra: o **contexto**, a **escolha**, o **motivo** e o que a gente
> **abriu mão**. Toda decisão custa alguma coisa — quando o custo não está escrito,
> a decisão parece gratuita e é revertida sem pensar.

---

## ADR-001 — Cor de ação: azul da marca clareado (`#2B7FFF`)

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** O design system de referência exige **uma única cor cromática** por
tela, a do botão principal. A referência usa verde-limão `#e4f222`. A marca
OMNI.IA é azul `#004AAD` (a engrenagem da logo). Usar as duas colocaria duas
cores competindo e mataria a regra.

**Decisão.** `--color-action: #2B7FFF` nos botões · `--color-brand: #004AAD`
como cor institucional (logo, material externo) · texto do botão em `#08090a`.

**Motivo — medido, não achado:**

| Combinação | Contraste | Veredito |
|---|---|---|
| `#004AAD` sobre o fundo `#08090a` | **2,45:1** | Some no escuro |
| `#2B7FFF` sobre o fundo `#08090a` | **5,30:1** | Brilha |
| Texto **branco** sobre `#2B7FFF` | **3,76:1** | ❌ reprova no WCAG AA |
| Texto **`#08090a`** sobre `#2B7FFF` | **5,30:1** | ✅ passa |

O texto escuro no botão foi contraintuitivo, mas é o que o número mandou — e
acabou coincidindo com o padrão da própria referência.

**Abrimos mão de:** fidelidade exata ao azul da marca nos botões.

---

## ADR-002 — Duas camadas de tokens (primitivo + semântico)

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** Os tokens importados nomeiam a **cor** (`--color-acid-lime`). Se os
componentes usassem esses nomes, trocar a cor da marca exigiria caçar o nome
antigo em todo o projeto.

**Decisão.** Manter os primitivos e criar por cima uma camada **semântica**:
`--color-action`, `--color-text-body`, `--color-border`, `--ease-out`.
**Componente só consome o semântico.**

**Motivo.** O nome passa a descrever a *função*, não a aparência. Trocar a
identidade vira editar um punhado de linhas no `tokens.css`. É DRY aplicado ao
design, e deixa o código autoexplicativo: `var(--color-action)` diz o que aquilo
significa; `var(--color-acid-lime)` só diz que é esverdeado.

**Abrimos mão de:** uma pequena indireção a mais para descobrir o valor final.

---

## ADR-003 — Código colorido sem biblioteca de highlight

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** O painel do topo mostra código com sintaxe colorida. Havia três
caminhos.

**Decisão.** Descrever o código como **dados tipados** (`Token[][]` em
`content/codigoHero.ts`) e deixar o React renderizar `<span>` por pedaço.

**Motivo.**

| Caminho | Custo |
|---|---|
| Biblioteca de highlight | +40 KB no pacote, por um bloco decorativo |
| `dangerouslySetInnerHTML` | **Superfície de XSS** se o texto um dia vier de fora |
| Dados → React | 0 KB extra e **seguro por construção** |

O React escapa todo texto que renderiza — ele nunca interpreta string como HTML.
Segurança que não depende de ninguém lembrar de sanitizar.

**Abrimos mão de:** escrever o código como texto corrido. Editar o trecho exige
mexer na estrutura de tokens. Aceitável: é um bloco só e quase não muda.

---

## ADR-004 — Um IntersectionObserver compartilhado

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** Todo bloco do site anima ao entrar na tela. O caminho ingênuo é um
observer por elemento.

**Decisão.** Um observer único no módulo `useReveal`, com um `Map` ligando cada
elemento ao seu callback. O elemento deixa de ser observado assim que aparece.

**Motivo.** Com ~40 blocos animados seriam 40 observers fazendo o mesmo trabalho.
Mesmo raciocínio de *connection pool* em banco: recurso caro se reaproveita.
Parar de observar depois de revelar também evita a animação repetir quando o
usuário sobe e desce a página — o que irrita.

**Abrimos mão de:** poder reanimar um elemento que sai e volta à tela.

---

## ADR-005 — Movimento só em `opacity` e `transform`

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** O site foi pedido "com movimento", e movimento mal feito é a forma
mais rápida de um site parecer barato.

**Decisão.** Animar exclusivamente `opacity` e `transform`. Posição do mouse
escrita direto no DOM via `ref`, nunca em `useState`. `requestAnimationFrame`
limitando a uma escrita por quadro. Todo listener de rolagem/ponteiro com
`{ passive: true }`.

**Motivo.** `opacity` e `transform` o navegador resolve na GPU, sem recalcular o
layout. Animar `height`, `top` ou `margin` obriga a remedir a página a cada
quadro e derruba para ~20 fps. Guardar posição de mouse em estado dispararia
dezenas de re-renders por segundo à toa.

**Abrimos mão de:** alguns efeitos que exigiriam animar layout.

---

## ADR-006 — Ampliar o uso da fonte monoespaçada

**Data:** 07/09/2026 · **Status:** aceita — **desvio consciente do design system**

**Contexto.** O sistema de referência **restringe** a fonte mono a IDs de tarefa
e atalhos de teclado, e proíbe em texto de marketing. Mas o site precisa
transmitir "equipe de programadores", e código é a prova visual disso.

**Decisão.** Liberar a mono para blocos de código, terminal, nomes de arquivo,
numeração de etapas (`01`…`06`) e rótulos técnicos. **Continua proibida** em
título de seção e texto corrido. O código usa a escala de cinzas com **um único
destaque** na cor de ação.

**Motivo.** Um design system é um conjunto de decisões com motivo, não uma lei.
Quando o motivo do projeto muda, a regra pode ser adaptada — desde que
**conscientemente e registrada**. O que não se pode é quebrar por descuido.

**Abrimos mão de:** fidelidade total à referência.

---

## ADR-007 — TypeScript no modo mais estrito

**Data:** 07/09/2026 · **Status:** aceita

**Contexto.** É possível rodar TypeScript "de leve" e deixar buracos por onde
`undefined` passa até chegar em produção.

**Decisão.** Ligar `strict`, `noUnusedLocals`, `noUnusedParameters`,
`noUncheckedIndexedAccess` e `exactOptionalPropertyTypes`.

**Motivo.** Erro pego pelo compilador custa segundos; o mesmo erro em produção
custa um cliente. `noUncheckedIndexedAccess` já cobrou seu preço logo na
primeira verificação: acessar uma classe de CSS Module devolve
`string | undefined`, porque **o TypeScript não tem como garantir que aquela
classe existe no arquivo `.css`**. Estava certo — as interfaces é que eram
otimistas.

**Abrimos mão de:** escrever `| undefined` explícito em prop opcional que possa
receber valor de CSS Module. Custo pequeno, ganho grande.
