# Estado atual — onde paramos

**Atualizado:** 08/09/2026
**Status:** 🟢 **NO AR em https://omniiabr.tech** — site completo e formulário funcionando

> 📌 **Leia este arquivo primeiro ao retomar.**

---

## ✅ Entregue

O site novo substituiu o antigo em `omniiabr.tech` em 08/09/2026.
Verificado em produção: bundle novo servido, HTTPS com HSTS, CSP e X-Frame-Options
ativos, redirect da raiz para `www`, e formulário entregando de ponta a ponta
(navegador → CSP → CORS → n8n → WhatsApp).

**Fluxo de conversão que está rodando:**
```
visitante preenche o formulário
  → n8n recebe (workflow "SRD FORMULARIO", ATIVO)
  → automação analisa os dados e o contexto da empresa
  → inicia a conversa no WhatsApp do lead em instantes
```

---

## ⚠️ Pendências

| # | Item | Impacto |
|---|---|---|
| 1 | **`og-image.png`** | O `index.html` aponta para ele, mas o arquivo não existe. Link compartilhado no WhatsApp/LinkedIn sai **sem imagem** |
| 2 | **Variável vazia na Vercel** | `VITE_WEBHOOK_CONTATO` está cadastrada **sem valor**. O código já está blindado (ADR-008), mas vale apagar ou preencher — variável vazia parada é armadilha |
| 3 | **Prints reais do produto** | CRM, dashboard, fluxo do n8n. Deixariam a seção de Engenharia mais forte |
| 4 | **Erro silencioso no n8n** | O webhook responde 200 **ao receber**, antes de processar. Se o workflow quebrar no meio, o site já disse "enviado" e ninguém é avisado. Ver `integracao-formulario.md` |
| 5 | **Acesso MCP no workflow** | Desligado. Ligar se quiser que eu ajuste o workflow daqui |
| 6 | **Logo em SVG** | Hoje é PNG de 232px. Suficiente para o header |

---

## O que está pronto

| Etapa | Entrega | Status |
|---|---|---|
| 1 | Fundação (React + Vite + TS, tokens, logo) | ✅ |
| 2 | Nav + Hero com movimento e painel de código | ✅ |
| 3 | Serviços — 6 blocos com visuais em CSS/SVG | ✅ |
| 4 | Engenharia — a prova técnica | ✅ |
| 5 | Processo · FAQ · Contato · Rodapé | ✅ |
| 6 | LGPD — banner de cookies e política | ✅ |
| 7 | Segurança — CSP e cabeçalhos no `vercel.json` | ✅ |
| 8 | SEO — robots, sitemap e `llms.txt` | ✅ |
| 9 | GitHub + Vercel | ✅ |
| 10 | Formulário ligado ao n8n | ✅ |
| 11 | **Domínio `omniiabr.tech` apontando para o site novo** | ✅ |

**Verificado em 08/09/2026:** `tsc --noEmit` sem erros · build passando ·
**75 KB de JS** e **8 KB de CSS** comprimidos · todas as rotas públicas respondendo ·
domínio servindo o bundle novo com todos os cabeçalhos de segurança.

> 💡 **Como o domínio foi virado:** ele já estava na Vercel, apontando para o projeto
> antigo. Bastou remover o domínio do projeto antigo e adicionar no novo — sem tocar em
> DNS. **O projeto antigo continua existindo**: é o plano de rollback. Não apagar.

---

## Repositório

**GitHub:** https://github.com/fabriciomendeslaura-byte/site-omniia-novo
**Vercel:** conectada ao repo — cada push publica sozinho

```bash
cd "c:/Users/Point Gamer/OneDrive/Área de Trabalho/NOVO SITE OMNI.IA"
npm run dev              # desenvolvimento
npm run dev -- --host    # acessível pelo celular na mesma rede
npm run typecheck        # precisa terminar SEM nenhuma saída
npm run build            # versão de produção
npm run preview          # serve o build final
```

---

## A página, seção por seção

A ordem **não é estética, é argumento** — cada seção responde uma pergunta:

```
Hero        → quem são vocês?
Serviços    → o que vocês entregam?         (6 blocos alternados)
Engenharia  → vocês sabem mesmo fazer?      (prova TÉCNICA, sem prova social)
Processo    → como começa? dá trabalho?     (3 passos, o 1º grátis)
FAQ         → mas e se...?                  (6 perguntas)
Contato     → ok, quero falar               (formulário + LGPD)
Rodapé      → contato e Política de Privacidade
```

---

## Decisões fechadas (não reabrir sem motivo)

| Assunto | Decisão |
|---|---|
| **Escopo** | Site da **EMPRESA**, não do SaaS. Sem plano, preço ou checkout |
| **Posicionamento** | Software house, não agência de automação |
| **Agentes de IA** | Uma **frota** — um agente por função (marketing, financeiro, atendimento), mais a configuração do assistente do empresário. Nunca só atendimento |
| **Cor de ação** | `#2B7FFF` · texto do botão `#08090a` · `#004AAD` institucional |
| **Logo** | A original do site no ar (azul + wordmark branco) |
| **Ordem dos serviços** | Software → **Agentes de IA** → Aplicativos → Sites → Automações → Infra |
| **Textos** | Reescritos com a skill `copywriting` |
| **Visuais** | Desenhados em CSS/SVG. **Nunca imagem genérica de IA** |
| **Stack** | React + Vite + TypeScript · CSS Modules · Vercel |

---

## Pendências menores

| # | Item | Observação |
|---|---|---|
| 1 | **`og-image.png`** | O `index.html` aponta para ele, mas o arquivo não existe. Sem ele, o link compartilhado no WhatsApp sai sem imagem |
| 2 | **Prints reais** | CRM, dashboard, fluxo do n8n. Deixariam a seção de Engenharia mais forte |
| 3 | **Domínio** | `omniiabr.tech` ainda aponta para o site antigo. Só virar depois de validar o novo |
| 4 | **Logo em SVG** | Hoje é PNG de 232px. Suficiente para o header; vetorizar só se for usada grande |

---

## ⚠️ Regras que não podem ser quebradas

- **Uma cor cromática por tela** — só o botão primário usa `--color-action`
- **Nunca peso 700+** — o sistema para em 590
- **Separação por borda hairline, nunca por sombra**
- **Raio máximo de card: 12px**
- **Toda animação respeita `prefers-reduced-motion`**
- **Não inventar prova social** — zero clientes pagantes, a prova é técnica
- **Trocou o webhook? Atualize o `connect-src` da CSP** no `vercel.json`, senão o
  navegador bloqueia o formulário e o erro aparece como se fosse bug de código

---

## Documentação

| Arquivo | O que tem |
|---|---|
| `ESTADO-ATUAL.md` | Este — ponto de retomada |
| `BRIEFING-NOVO-SITE.md` | Conteúdo, design system e direção |
| `integracao-formulario.md` | **Contrato de dados do formulário** (para o n8n) |
| `seguranca.md` | O que cada cabeçalho protege |
| `decisoes-tecnicas.md` | ADR — por que foi feito assim |
| `CHANGELOG.md` | O que mudou e quando |
| `marca/` | Logos e originais |
