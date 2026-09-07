# Estado atual — onde paramos

**Atualizado:** 07/09/2026
**Status:** ✅ Etapas 1 e 2 concluídas e **aprovadas pelo Fabricio**

> 📌 **Leia este arquivo primeiro ao retomar.** Ele diz onde paramos, o que já
> está decidido e qual é o próximo passo — sem precisar reler a conversa.

---

## Como voltar a rodar (2 comandos)

```bash
cd "c:/Users/Point Gamer/OneDrive/Área de Trabalho/NOVO SITE OMNI.IA"
npm run dev
```

Abre em **http://localhost:5173**

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o site em desenvolvimento, com atualização automática |
| `npm run typecheck` | Confere os tipos. **Precisa terminar sem nenhuma saída** |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o build final |

---

## O que já está pronto

| Etapa | Entrega | Status |
|---|---|---|
| 1 | Projeto React + Vite + TypeScript, tokens, fontes, logo | ✅ |
| 2 | **Nav + Hero** com movimento e painel de código | ✅ **aprovado** |
| 3 | Seções de serviços (os 6) | ⬜ **próximo passo** |
| 4 | Como funciona · Infraestrutura VPS · FAQ | ⬜ |
| 5 | Formulário + integração com o webhook n8n | ⬜ |
| 6 | Movimento fino, responsivo, performance, deploy | ⬜ |

**Verificado em 07/09/2026:** `tsc --noEmit` sem erros · build passando ·
200 KB de JS (63 KB comprimido) · 12,9 KB de CSS (3,8 KB comprimido).

---

## Decisões já fechadas (não reabrir sem motivo)

| Assunto | Decisão | Por quê |
|---|---|---|
| **Cor de ação** | `#2B7FFF` · texto do botão `#08090a` | Azul da marca clareado. Medido: 5,30:1 contra o fundo (o `#004AAD` dá só 2,45:1 e some no escuro) |
| **Cor institucional** | `#004AAD` | Fica na logo e em material externo. **Nunca em botão.** |
| **Logo** | Versão branca sólida | Wordmark sólido lê melhor em tamanho pequeno |
| **Stack** | React + Vite + TypeScript · Vercel | Mesma stack que o Fabricio já usa |
| **Estilo** | CSS Modules | Escopo isolado sem dependência extra |
| **Posicionamento** | Software house, não agência de automação | Pedido explícito: "visão de equipe de programadores" |

---

## Próximo passo — Etapa 3

Construir a seção de serviços com os 6 blocos que já estão prontos em
`src/content/site.ts` (constante `SERVICOS`):

`01` Agentes de IA · `02` Automações · `03` CRM Inteligente ·
`04` Software Sob Medida · `05` Sites · `06` Arquitetura VPS Privada

**Diretrizes que valem para essa seção:**
- Blocos alternados texto/visual — **nunca grade de 3 colunas** (o design system proíbe)
- 96px entre seções
- O código `01`…`06` em fonte monoespaçada (é o "design de código")
- Reaproveitar `<Reveal>` para a entrada; **não criar outro mecanismo de animação**

---

## Pendências abertas

| # | Item | Observação |
|---|---|---|
| 1 | **Resposta do FAQ 7** | *"Em quanto tempo o agente responde?"* — o texto não foi recuperado do site atual. **Perguntar ao Fabricio.** |
| 2 | **Prints reais do produto** | CRM, WhatsApp com a Laura, dashboard, fluxo do n8n. O design system proíbe imagem genérica — precisa ser tela real |
| 3 | **`og-image.png`** | O `index.html` já aponta para ele; o arquivo ainda não existe |
| ~~4~~ | ~~Página vende o quê?~~ | ✅ **Decidido 07/09:** é o site da **empresa**, não do SaaS. Ver a regra abaixo. |
| 5 | **Logo em SVG** | Adiado. Os 773px cobrem o header até retina 2x |
| 6 | **`vercel.json` com CSP** | Criar na etapa 6, antes do deploy. `connect-src` precisa listar `webhook.omniiabr.com` |

---

## 🎯 O que este site é — e o que ele NÃO é

**Decidido pelo Fabricio em 07/09/2026:**

> Este é o site da **empresa OMNI.IA** — criadora de software, aplicativos, sites
> e automação. **Não é o site do SaaS.**

| ✅ O site vende | ❌ O site NÃO é |
|---|---|
| Software sob medida | Página de venda do OmniZap |
| Aplicativos | Lugar de mostrar planos Start/Pro |
| Sites | Checkout ou trial self-service |
| Automação | Vitrine de um produto único |
| Agentes de IA | |

**Consequência prática:** nada de preço de plano, botão de assinar ou tabela
Start × Pro. O caminho de conversão é **um só**: diagnóstico gratuito → conversa →
orçamento por projeto. O OmniZap, se aparecer, é **exemplo do que a empresa
construiu** — nunca o produto sendo vendido na página.

> Isso é coerente com a decisão de 28/08 no cérebro: acima do Pro, a OMNI.IA
> vende **projeto sob medida**. Este site é a porta desse caminho.

⚠️ **Revisar na etapa 3:** o painel de código do hero mostra um fluxo de
qualificação de lead. Continua válido (agentes de IA é um dos serviços), mas
vale conferir se não está puxando demais para o lado do SaaS — talvez alternar
com um exemplo de software/app sob medida.

---

## ⚠️ Regras que não podem ser quebradas

- **Uma cor cromática por tela.** Só o botão primário usa `--color-action`
- **Nunca peso 700+.** O sistema para em 590
- **Separação por borda hairline, não por sombra**
- **Raio máximo de card: 12px**
- **Toda animação respeita `prefers-reduced-motion`**
- **Não inventar prova social** — a operação tem zero clientes pagantes

---

## Mapa dos arquivos

```
├── docs/
│   ├── ESTADO-ATUAL.md         ← este arquivo
│   ├── BRIEFING-NOVO-SITE.md   ← conteúdo, design system, direção
│   ├── CHANGELOG.md            ← o que mudou e quando
│   ├── decisoes-tecnicas.md    ← por que foi feito assim (ADR)
│   └── marca/                  ← logos
├── src/
│   ├── content/                ← TEXTO do site (mexer aqui para trocar frase)
│   ├── styles/tokens.css       ← fonte da verdade das cores e medidas
│   ├── components/layout/      ← Container, Nav
│   ├── components/ui/          ← Button, Reveal, PainelCodigo
│   ├── hooks/                  ← useReveal, usePonteiroLuz
│   └── sections/               ← Hero (e as próximas seções)
└── public/                     ← logos servidas pelo site
```
