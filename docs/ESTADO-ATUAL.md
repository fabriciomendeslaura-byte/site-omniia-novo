# Estado atual — onde paramos

**Atualizado:** 08/09/2026
**Status:** site **completo** e no GitHub · aguardando a conexão do formulário

> 📌 **Leia este arquivo primeiro ao retomar.**

---

## 🔴 O que precisa de você (2 coisas)

### 1. O workflow do n8n está DESATIVADO

Testado em 08/09/2026 com uma requisição real:

```
POST https://webhook.omniiabr.com/webhook/Formulario
→ HTTP 404
→ "The requested webhook POST Formulario is not registered."
→ "The workflow must be active for a production URL to run successfully."
```

**Consequência:** o formulário do site **que está no ar hoje** não entrega nada.
Os leads que preencheram nesse período se perderam.

O workflow existe — **"SRD FORMULARIO"** (`N9SMx1MDiK85tceE`), criado em 27/10/2025 —
mas está com o botão de ativação desligado.

**O que fazer:**
- Abrir o workflow no n8n e **ativar**
- Conferir se o caminho do webhook continua `Formulario`
- Ajustar os campos: o formulário novo mudou (ver o contrato em `integracao-formulario.md`)

> Não ativei por conta própria de propósito: não consigo ler o que o workflow faz
> (o acesso via MCP está desligado nas configurações dele), e ativar às cegas poderia
> disparar e-mail ou mensagem para pessoas reais.

### 2. Liberar o acesso MCP no workflow (opcional)

Se quiser que eu ajuste o workflow daqui, é preciso ligar o acesso MCP nas
configurações dele. Hoje o n8n responde:
`"Workflow is not available in MCP. Enable MCP access in workflow settings."`

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
| 10 | **Formulário ligado ao n8n** | 🔴 **depende do item acima** |

**Verificado em 08/09/2026:** `tsc --noEmit` sem erros · build passando ·
**75 KB de JS** e **8 KB de CSS** comprimidos · todas as rotas públicas respondendo.

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
