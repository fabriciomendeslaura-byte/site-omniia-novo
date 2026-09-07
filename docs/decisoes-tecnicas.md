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

## ADR-008 — `??` versus `||` em variável de ambiente

**Data:** 08/09/2026 · **Status:** aceita — **nasceu de um bug real em produção**

**Contexto.** A URL do webhook vinha assim:
```ts
import.meta.env['VITE_WEBHOOK_CONTATO'] ?? URL_PADRAO
```
O formulário funcionava na máquina do desenvolvedor e **falhava em produção**.

**A causa.** Na Vercel a variável existia, mas **vazia**. E o `??` (*nullish
coalescing*) só substitui `null` e `undefined` — string vazia é valor válido para ele:

| Expressão | Resultado |
|---|---|
| `undefined ?? 'padrao'` | `'padrao'` ✅ |
| `"" ?? 'padrao'` | `""` ❌ |

A URL virava `''`, e o `fetch('')` postava na própria página. Em desenvolvimento não
existe `.env`, então a variável era `undefined` e o padrão entrava: **o bug era
invisível localmente**.

**Decisão.** Checagem explícita com `trim()`:
```ts
const urlConfigurada = import.meta.env['VITE_WEBHOOK_CONTATO']?.trim()
const URL_WEBHOOK = urlConfigurada ? urlConfigurada : URL_WEBHOOK_PADRAO
```

**A regra que fica.** `??` serve quando `0`, `false` ou `''` são respostas **legítimas**
(`quantidade ?? 10` — zero é zero). Para **configuração**, string vazia significa
"não configurado", e aí o certo é `||` ou checagem explícita.

**Abrimos mão de:** nada. `??` era a escolha errada para este caso.

**Lição maior:** bug que só aparece em produção é o mais caro que existe, porque nenhum
teste local o pega. Sempre que houver diferença entre ambientes, **inspecione o artefato
publicado** — foi ler o bundle da Vercel que revelou a variável vazia.

---

## ADR-009 — Especificidade: `hidden` perdendo para uma classe

**Data:** 08/09/2026 · **Status:** aceita — **bug real, corrigido na causa**

**Contexto.** O menu do celular **nascia aberto**. O JSX usava `hidden={!menuAberto}`,
que deveria escondê-lo.

**A causa.** O `display: none` do atributo `hidden` vem da folha padrão do navegador —
o degrau mais fraco da especificidade. A regra `.menuMobile { display: flex }` é uma
**classe**, degrau acima. A classe vencia e o menu aparecia.

```
estilo inline  >  #id  >  .classe  >  elemento/atributo padrão
```

**Decisão.** Uma regra global no reset:
```css
[hidden] { display: none !important; }
```

**Motivo.** Consertar só `.menuMobile[hidden]` resolveria hoje e o mesmo bug voltaria no
próximo componente com `hidden`. Este é um dos poucos usos legítimos de `!important`:
a regra não é decoração, é uma **garantia** — "escondido é escondido". `!important` para
vencer briga de estilo é gambiarra; para blindar uma invariante do sistema, é a
ferramenta certa.

---

## ADR-010 — `color-scheme: dark` para controles nativos

**Data:** 08/09/2026 · **Status:** aceita — **bug real**

**Contexto.** O `<select>` abria com a lista de fundo branco e as opções invisíveis.

**A causa.** As `<option>` **herdam** a cor branca definida no select, mas o fundo da
lista aberta **não é desenhado pelo CSS** — é o sistema operacional que desenha, e ele
usa branco. Texto branco sobre fundo branco.

**Decisão.** `color-scheme: dark` no `:root`.

**Motivo.** Vários elementos são renderizados pelo sistema e ignoram nosso
`background-color`: a lista do `<select>`, a barra de rolagem, o seletor de data, o menu
de contexto. Essa declaração avisa "a página é escura" e o sistema entrega a versão
escura de **todos** eles. Uma linha resolve a categoria inteira, em vez de um remendo
por componente.

Mantida uma segunda camada (`.entrada option { … }`) porque alguns navegadores no
Windows ainda teimam.

---

## ADR-011 — Prova técnica no lugar de prova social

**Data:** 08/09/2026 · **Status:** aceita

**Contexto.** Toda página de serviço tem uma seção de credibilidade, e o padrão do
mercado é logo de cliente, depoimento e "+200 projetos entregues". A OMNI.IA está em
pré-lançamento e **não tem cliente pagante**.

**Decisão.** Criar a seção **Engenharia**: quatro pilares descrevendo como o software é
construído por dentro (segurança validada no servidor, código que outro dev entende,
monitoramento com alerta, sem aprisionamento do cliente).

**Motivo.** Prova social diz *"outros confiaram"*; prova técnica diz *"olha como é feito
por dentro"*. Para comprador desconfiado ou tecnicamente informado, a segunda costuma
pesar mais — e é a **única honesta** nesta fase. Inventar depoimento é mentira que uma
ligação derruba, e queima a marca de forma irreversível.

**Abrimos mão de:** o atalho emocional que prova social dá.

---

## ADR-012 — Copy: nunca dar como feito o que não dá para conferir

**Data:** 08/09/2026 · **Status:** aceita

**Contexto.** A tela de sucesso dizia *"Já te chamamos no WhatsApp"*. A automação leva
alguns instantes para processar.

**Decisão.** Trocar para *"Em instantes entramos em contato"*, e **não mencionar IA**.

**Motivo.** Afirmar que a mensagem já foi enviada faz a pessoa abrir o WhatsApp, não
achar nada e concluir que o site mentiu — no **primeiro contato**, quando a confiança
ainda está sendo construída. Promessa de futuro imediato cria a expectativa certa e se
cumpre na frente dela.

Sobre a IA: o site inteiro vende agentes, mas anunciar "nossa IA vai te chamar" logo
antes da conversa dispara o *"vou falar com robô"*, e o lead entra na defensiva. Quem
contrata quer sentir que a **empresa** está cuidando do caso dele. A tecnologia
impressiona no resto da página; ali, só atrapalha.

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
