# Briefing — Novo site OMNI.IA

**Criado em:** 07/09/2026
**Objetivo:** reunir tudo que é necessário para construir o novo site, sem depender de memória.

**A fórmula em uma linha:**
> **Conteúdo/oferta** da OMNI.IA (extraído do site atual) **+ design** do estilo
> *"midnight precision instrument"* (Linear) **= site novo, premium, de software house.**

---

## 1. Direção do novo site (o que o Fabricio pediu)

| Requisito | Como se traduz na prática |
|---|---|
| **Parecer uma equipe de programadores / software house profissional** | O site fala como quem **constrói software**, não como quem "vende automação". Vocabulário de engenharia: arquitetura, infraestrutura, integração, observabilidade. |
| **Totalmente minimalista** | Uma ideia por tela. Muito espaço vazio. Nenhum ornamento decorativo. Densidade baixa de informação. |
| **Com movimento** | Reações ao **scroll** (elementos entram conforme a página desce) e ao **mouse**. O movimento é o que separa "site bonito" de "site premium". |
| **Premium, fora da caixa** | O detalhe fino é o que entrega o premium: tracking apertado, borda de 0,5px, timing das animações. Não é efeito chamativo — é acabamento. |
| **Design de código** | Código como **elemento visual**: blocos de snippet, janela de terminal, chaves de JSON, nomes de arquivo em fonte monoespaçada. É o que prova visualmente que quem fez o site programa. |
| **Totalmente explicativo** | Cada serviço explica **o que é, como funciona e o que o cliente ganha** — em linguagem clara. Nada de frase de efeito solta sem explicação embaixo. |
| **Usar o design system enviado** | Paleta, tipografia, raios e espaçamentos vêm de `tokens.css`. Sem inventar valores novos. |

### O que a empresa vende (a lista que o site precisa deixar óbvia)

**Agentes de IA · Software personalizado · Automações · Sites** — vendidos por uma
**equipe de programação**, não por uma agência de marketing.

### 🔧 Adaptação consciente do sistema: a fonte monoespaçada

O estilo original **restringe** a fonte mono a "IDs de tarefa e atalhos de teclado" e proíbe
usá-la em título ou texto de marketing.

**A gente vai ampliar esse uso de propósito** — porque o pedido é justamente passar a imagem de
software house, e código é a prova visual disso. A regra adaptada:

- ✅ **Pode:** blocos de código, terminal, nomes de arquivo, chaves de API/JSON, rótulos técnicos,
  numeração de etapas (`01` `02` `03`), badges de stack
- ❌ **Continua proibido:** título de seção e texto corrido em mono (mata a legibilidade e some
  com o ar premium)
- **Cor do código:** cinza da escala (`#8a8f98` / `#d0d6e0`). **Nada de syntax highlight colorido
  de editor** — quebraria a regra da "lanterna única". No máximo, um destaque em `#e4f222` numa
  palavra-chave por bloco.

> 💡 **O porquê:** um design system não é lei — é um conjunto de decisões com motivo. Quando o
> motivo do projeto muda (aqui: "provar que somos programadores"), a regra pode ser adaptada
> **conscientemente**, registrando o porquê. O que não se pode é quebrar por descuido.

⚠️ **Tensão a administrar:** o estilo-base é **silencioso** (ele proíbe gradiente decorativo,
sombra, cor solta) e o pedido é **"com movimento"**. A conciliação: o sistema define **como as
coisas parecem paradas**; o movimento é **nossa camada por cima** — e ele é sutil, nunca festivo.
O estilo original **não documenta motion**, então essa parte é decisão nossa (ver §5).

---

## 2. O que a OMNI.IA vende — conteúdo real do site atual

> Extraído de `https://www.omniiabr.tech` em 07/09/2026 (bundle React `index-CVQgcEeE.js`).
> **Este é o conteúdo a reaproveitar.** O texto já é bom; o que muda é a roupa e o tom.

### Posicionamento e headline atual

- **Title / SEO:** `OMNI.IA - Automação Inteligente para Seu Negócio`
- **Meta description:** *"Transforme seu negócio com automação inteligente, agentes de IA, CRM
  integrado e infraestrutura VPS dedicada. Qualificação de leads, banco de dados e integrações completas."*
- **Headline do hero:** *"Sua empresa operando com **Inteligência Artificial.**"*
- **Reforço:** *"Não criamos apenas Agentes de IA. Criamos uma estrutura para o crescimento da sua empresa."*
- **Tagline curta:** *"Automações, agentes de IA, sistemas e sites para empresas que querem parar
  de fazer no braço."*
- **Frase-imagem (a melhor do site):**
  > *"Você abre o painel de manhã e o dia já está organizado, sem ninguém ter passado a noite
  > atualizando planilha."*

### Os 6 serviços

| # | Serviço | Headline | Descrição |
|---|---|---|---|
| 1 | **Agentes de IA** | *"Agentes de IA que atendem sozinhos."* | Atendimento 24h em WhatsApp, Instagram e site ao mesmo tempo. Qualificação de leads, agendamento de reuniões, follow-ups. |
| 2 | **Automações** | *"Automatizamos o que consome o seu dia."* | *"Desenvolvemos automações personalizadas que conectam suas ferramentas, executam tarefas automaticamente e mantêm sua empresa funcionando com mais agilidade, organização e eficiência."* |
| 3 | **CRM Inteligente** | *"Montamos o CRM que se preenche sozinho."* | CRM preenchido automaticamente por WhatsApp, Instagram, formulário do site, Facebook Ads, Google Ads e chatbot. Pontuação automática de lead, histórico de conversas, painéis de métricas. |
| 4 | **Software Sob Medida** | *"Desenvolvemos softwares sob medida para sua empresa."* | *"Criamos soluções seguras, escaláveis e intuitivas, desenvolvidas para aumentar a produtividade, reduzir custos e acompanhar o crescimento do seu negócio."* |
| 5 | **Sites** | *"Criamos sites [...]"* | *"Muito mais do que uma vitrine online, desenvolvemos sites pensados para atrair clientes, gerar confiança e aumentar suas oportunidades de venda."* Projeto do zero, sem template · estruturado para o Google · rápido no celular e no 4G. |
| 6 | **Arquitetura VPS Privada** | *"Sua empresa merece uma infraestrutura exclusiva."* | *"Cada projeto é implantado em uma VPS exclusiva, onde toda a infraestrutura é organizada de forma independente para garantir segurança, desempenho e confiabilidade."* |

**Itens de apoio da VPS** (viram bullets ou badges):
`Servidor exclusivo, sem vizinho dividindo recursos` · `Tráfego criptografado com certificado SSL` ·
`Backup automático diário, em mais de um lugar` · `Monitoramento 24/7 com alerta antes de você notar` ·
`O código e os dados são seus` · `Não compartilhamos a operação dos nossos clientes.`

### Como funciona (o processo)

> *"Cada empresa possui desafios e processos únicos. Por isso, começamos com uma reunião estratégica
> para entender a operação do seu negócio e identificar gargalos e oportunidades."*
>
> *"Com esse diagnóstico, desenvolvemos uma estrutura personalizada com Inteligência Artificial,
> automações e integrações que trabalham juntas para otimizar seus processos."*
>
> *"Enquanto a tecnologia cuida da operação, sua equipe pode focar em decisões estratégicas e no
> crescimento do negócio."* → *"O resultado é uma operação mais organizada, produtiva e preparada para crescer."*

### FAQ (perguntas e respostas já escritas)

1. **Como funciona o processo de diagnóstico inicial?**
   *"Nosso diagnóstico começa com uma imersão técnica e de negócio. Analisamos seus fluxos de trabalho
   atuais, identificamos gargalos operacionais e mapeamos onde a IA pode gerar o maior ROI imediato.
   Entregamos um roteiro claro de implementação baseado em dados reais, não em suposições."*

2. **Como os Agentes de IA geram retorno de verdade?**
   *"A diferença para um chatbot comum está na qualificação. O agente faz as perguntas que o seu time
   faria, pontua cada lead pelos critérios que você definiu e separa quem está pronto para comprar de
   quem só está pesquisando. Sua equipe passa a falar com menos gente e fechar mais, o que derruba o
   custo de aquisição de cliente."*

3. **A integração com meus sistemas atuais é complexa?**
   *"Nossa engenharia cuida de tudo. Utilizamos APIs de alta performance para conectar WhatsApp, CRM,
   calendários e gateways de pagamento. A sincronização é nativa e roda em segundo plano, sem exigir
   esforço técnico da sua equipe."*

4. **Meus dados estarão seguros em uma VPS dedicada?**
   *"Sim. Não usamos nuvem compartilhada. Sua empresa recebe uma instância VPS própria, com os processos
   isolados dos de qualquer outro cliente, tráfego criptografado por certificado SSL e backup automático
   diário. Os dados e o acesso ficam no seu nome."*

5. **Vocês oferecem suporte técnico contínuo?**
   *"Sim. A entrega não termina no dia da instalação. Acompanhamos a operação, ajustamos o agente conforme
   aparecem perguntas novas dos seus clientes e enviamos relatórios de desempenho. Se algo parar às duas
   da manhã, o alerta chega pra gente, não pra você."*

6. **Quanto custa implementar a estrutura da OMNI.IA?**
   *"Depende do tamanho do projeto: quantos canais o agente vai atender, quantas integrações são necessárias
   e se entra sistema sob medida. Por isso o orçamento sai depois do diagnóstico, quando já sabemos o que
   precisa ser construído. O diagnóstico é gratuito e sem compromisso."*

7. **Em quanto tempo o agente responde?** — *(pergunta existe no site; a resposta não foi recuperada do
   bundle — **preencher**)*

- Chamada da seção: *"As perguntas que mais recebem de quem está avaliando trabalhar com a gente."*
- Fecho: *"Ficou alguma dúvida que não está aqui?"*

### Conversão — CTAs e formulário

**Textos de CTA já usados:**
`Quero meu diagnóstico gratuito` · `Solicitar diagnóstico gratuito` · `Falar com especialista` ·
`Falar com a Laura no WhatsApp` · `Diagnóstico gratuito`

**Chamada do formulário:**
> *"Conte sua operação e nossa equipe retorna com um diagnóstico do que dá para automatizar — sem compromisso."*
> Apoio: `Resposta em 24h úteis` · `Sem compromisso` · *"Nossa equipe retorna com seu diagnóstico em até 24h úteis."*

**Campos:** Nome completo · E-mail corporativo · Telefone · Nome da empresa · Website ou LinkedIn ·
Contexto da empresa · **Faturamento mensal** (`Até R$ 50k` / `R$ 50k – R$ 200k` / `R$ 200k – R$ 500k` /
`Acima de R$ 500k`) · **Volume de leads diários** (`Até 10` / … / `Acima de 100`).

> 💡 **Isso é qualificação embutida no formulário** — os dois selects existem para separar quem tem
> orçamento de quem não tem, antes da conversa. Manter no site novo.

**Integração:** `POST https://webhook.omniiabr.com/webhook/Formulario` (n8n) · possui **honeypot**
anti-spam (*"Honeypot acionado — envio ignorado."*) · validação de todos os campos com mensagens
próprias · sucesso = `✓ Solicitação enviada!`
⚠️ O domínio do webhook **precisa estar no `connect-src` da CSP**, senão o navegador bloqueia o envio
antes de sair da máquina.

### Contato e rodapé

- **WhatsApp:** `+55 (21) 99427-7725` → `https://wa.me/5521994277725`
  Mensagem pré-preenchida: *"Olá! Gostaria de agendar uma consultoria gratuita."*
- **Instagram:** `https://www.instagram.com/omniiabr/` (@omniiabr)
- **Localização:** `Rio de Janeiro · atendemos todo o Brasil`
- **Assinatura:** `OMNI.IA Tecnologia`

### ⚠️ Cuidados de honestidade (regra firme)

- Os números `248 leads · 112 em atendimento · 32 reuniões agendadas` que aparecem no site são de um
  **mockup ilustrativo de CRM**, não métrica real. Se forem para o site novo, precisam continuar
  claramente identificados como exemplo de interface.
- **Não existe depoimento nem logo de cliente** — a operação está em pré-lançamento com **zero clientes
  pagantes**. **Não inventar prova social.** Se a seção for necessária, usar prova **técnica**
  (arquitetura, stack, o que foi construído), não prova social falsa.

---

## 2.1 A marca — logo e cor

**Arquivos disponíveis** (pasta `marca/`):

| Arquivo | Tamanho | Uso |
|---|---|---|
| `logo-omni-branca.png` | 773×525 | **A do site** — logo completa, branca, transparente |
| `logo-omni-simbolo.png` | 613×613 | Só a engrenagem — favicon, menu mobile |
| `logo-omni.png` | 232×273 | Original azul, baixada do site atual |
| `favicon.ico` | 73×74 | Favicon atual |
| `originais/*.jfif` | 1024×1024 | Saídas cruas do Gemini (antes do tratamento) |

**Como a logo é:** engrenagem com traços de circuito saindo dela + wordmark **OMNI.IA** e
subtítulo **TECNOLOGIA**.

✅ **Resolvido em 07/09/2026:** as versões brancas foram geradas no Gemini a partir da original.
O Gemini entregou o quadriculado de transparência **desenhado como pixels** (erro comum) e em JPEG,
sem canal alpha. Foi tratado por script: máscara de luminância com rampa 170→240 para preservar o
antialiasing, recorte da moldura vazia e exportação em PNG com transparência real. **Testado sobre
`#08090a` — limpo, sem halo.**

⚠️ **O que ainda fica em aberto:**
1. **Continua raster, não vetor.** Para o header (~150px, mesmo em retina) os 773px sobram. Só vira
   problema se a logo aparecer grande. Vetorizar depois, se necessário.
2. **O wordmark mudou:** na original as letras eram **vazadas/outline**; na versão nova ficaram
   **sólidas e mais pesadas**. Diferença de identidade — precisa do aval do Fabricio.
3. **Não existe versão para fundo claro** — se precisar (e-mail, documento, camiseta), o branco some.

### A cor da marca

| Cor | Hex | Onde vive |
|---|---|---|
| **Azul OMNI** | `#004AAD` | A engrenagem da logo (4% dos pixels — é o único tom cromático) |
| **Branco** | `#ffffff` | Wordmark e traços de circuito |

### 🔴 O conflito que precisa ser resolvido

O design system manda usar **uma única cor de ação**: o verde-limão `#e4f222`.
A marca tem **azul `#004AAD`**. Se as duas aparecerem, o site tem **duas cores brigando** —
e a regra da "lanterna única" morre.

Pior: `#004AAD` é um azul **escuro**. Sobre o fundo `#08090a` ele tem contraste de ~2,2:1 —
ou seja, ele **não brilha no escuro**, que é justamente o trabalho que a cor de ação precisa fazer.
Como fundo de botão com texto branco ele funciona (~7,5:1), mas como "lanterna" ele falha.

**Três saídas** (decisão do Fabricio — ver §7):

| Opção | O que acontece |
|---|---|
| **A — Manter o limão** | Site igual à referência. Mas o limão não tem nada a ver com a marca, e a logo azul fica destoando na nav. |
| **B — Azul da marca, clareado (recomendado)** | Mantém `#004AAD` como cor institucional (logo) e deriva um azul **luminoso** para ação — ex.: `#2B7FFF`. Respeita a marca **e** a regra da lanterna. |
| **C — Só o `#004AAD`** | Mais fiel à marca, mas o botão principal fica apagado no fundo preto. Perde impacto. |

---

## 3. Identidade e stack atual (o que herda e o que muda)

| Item | Site atual | Site novo |
|---|---|---|
| Fontes | **Outfit** + **Nunito Sans** (Google Fonts) | **Inter Variable** (do design system) — ⚠️ decisão a confirmar |
| Stack | React + Vite (SPA, `<div id="root">`) | a definir — provável React + Vite/Next na Vercel |
| Idioma | `lang="pt-BR"` | manter |
| Segurança | CSP declarada no `<head>` | **manter** — e lembrar do `connect-src` do webhook |
| SEO/OG | title, description, og:image, twitter:card | manter e melhorar |
| Domínio | `omniiabr.tech` (site) | mesmo · ⚠️ o app é `omniiabr.com` — domínios diferentes |

---

## 4. O design system

Os valores estão em **`tokens.css`** (nesta mesma pasta) — é a fonte da verdade. Aqui ficam só as
**regras de uso**, que os tokens não conseguem expressar sozinhos.

### A alma do estilo

> *"Midnight precision instrument"* — um instrumento de precisão à meia-noite.

1. **O escuro é o material, não um tema.** `#08090a` não é "dark mode do site claro". Não existe versão clara.
2. **Uma única lanterna.** Só **um** elemento colorido por tela (o botão de ação). Todo o resto é cinza.
   A cor vira **sinal**, não decoração.
3. **Geometria no lugar de sombra.** Card não flutua com sombra — é definido por **borda de 0,5px**.
4. **Nada de negrito.** Peso máximo do sistema = **590**. Nunca 700. Hierarquia vem do **tamanho**.
5. **Letras apertadas.** `letter-spacing: -0.022em` em títulos de 48px+. É isso que dá o ar "caro".

### Referência rápida

```
Título principal ... #ffffff        Fundo da página ... #08090a
Texto corrido ...... #d0d6e0        Fundo do card ..... #0f1011
Texto apagado ...... #8a8f98        Borda hairline .... #23252a
Botão principal .... #e4f222 (fundo) + #08090a (texto) — UM por tela
Raios: botão/input 6px · card 12px · badge 4px · pill 9999px
Ritmo: seção 96px · card padding 24px · gap interno 8px · largura máx. 1200px
```

### ✅ Pode

- Inter Variable com `font-feature-settings: 'cv01' on, 'ss03' on, 'zero' on` *(define a identidade tipográfica)*
- Texto corrido a **16px / peso 400 / line-height 1.5**
- `letter-spacing: -0.022em` de 48px para cima
- Bordas hairline (`#23252a` ou `#383b3f`) no lugar de sombra
- Escada de superfície `#08090a → #0f1011 → #161718 → #23252a` para criar profundidade
- Gradiente **só** no "chão" atmosférico do hero: `linear-gradient(rgb(8,9,10) 10%, rgb(208,214,224) 100%)`

### ❌ Não pode

- Peso **700+** (o sistema para em 590)
- Gradiente decorativo em botão, card ou texto
- Segunda cor de ação — o `#e4f222` é o **único** elemento cromático de UI
- Raio de **16px+** em card ou painel (12px é o teto)
- Sombra para separar card do fundo (usar borda)
- Cor cromática em texto corrido — corpo vive na escala `#d0d6e0 / #8a8f98 / #62666d`
- Fonte monoespaçada em título ou texto de marketing (só para dado técnico)

---

## 5. Movimento (camada nossa — o sistema original não define)

Regra que mantém o movimento **premium** e não **festivo**:

- **Entrada por scroll:** elementos sobem ~16–24px + fade, escalonados (*stagger*) de 60–80ms.
  Uma vez só — não repetir ao subir a página.
- **Curva:** `cubic-bezier(0.16, 1, 0.3, 1)` (desacelera no fim). Duração **300–600ms**.
- **Mouse:** reação sutil — brilho que segue o cursor na borda do card, ou paralaxe de poucos pixels.
  Nada de card que "pula".
- **Hover:** muda **borda** e **cor de texto**, não escala nem sombra colorida.
- **Sempre respeitar `prefers-reduced-motion: reduce`** — quem configurou o sistema para menos animação
  recebe a página estática. É acessibilidade, não opcional.

---

## 6. Estrutura de seções proposta

Ritmo de **96px** entre seções, container de **1200px**, uma ideia por tela:

1. **Nav fixa** — logo à esquerda · links à direita · CTA pill branca
2. **Hero** — headline 64–72px + subtexto + **um** CTA acid-lime
3. **Prova técnica** — a "frase do painel de manhã" + visual do produto em card 12px
4. **Serviços** — os 6, em blocos alternados texto/visual (nunca grid de 3 colunas)
5. **Como funciona** — os 3 passos do diagnóstico
6. **Infraestrutura VPS** — a seção mais "engenharia", com os bullets de segurança
7. **FAQ** — accordion
8. **Formulário** — com os dois selects de qualificação
9. **Rodapé** — contato, WhatsApp, Instagram, Rio de Janeiro

---

## 7. Decisões pendentes (antes de codar)

| # | Decisão | Observação |
|---|---|---|
| ~~1~~ | ~~Cor de ação~~ | ✅ **Decidido 07/09:** `#2B7FFF` (azul da marca clareado) · texto do botão `#08090a` · `#004AAD` fica institucional. Medido: 5,30:1 contra o canvas. |
| ~~1b~~ | ~~Logo em SVG~~ | ✅ **Adiado:** os 773px cobrem o header até retina 2x. Vetorizar só se a logo for usada grande. |
| ~~2~~ | ~~Wordmark sólido ou outline~~ | ✅ **Decidido 07/09:** fica o **sólido** (lê melhor em tamanho pequeno). |
| ~~3~~ | ~~Stack~~ | ✅ **Decidido 07/09:** **React + Vite**, deploy na Vercel. |
| ~~4~~ | ~~A página vende o quê?~~ | ✅ **Decidido 07/09:** site da **EMPRESA**, não do SaaS. Sem plano, sem preço, sem checkout. Vende software, apps, sites, automação e agentes de IA — conversão única: diagnóstico gratuito → orçamento por projeto. |
| 2 | **Fonte: Inter ou manter Outfit?** | O sistema pede Inter. Trocar muda a identidade atual do site. |
| 3 | **Stack** | React + Vite (como hoje) ou Next.js? Deploy na Vercel. |
| 4 | **Vende o quê nesta página?** | Serviço sob medida (diagnóstico → orçamento) e/ou o **OmniZap** self-service (R$ 197 / R$ 397)? Hoje o site só vende serviço. |
| 5 | **Resposta do FAQ 7** | *"Em quanto tempo o agente responde?"* — falta o texto. |

---

## Fontes desta informação

- **Design:** https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1 (estilo do Linear, extraído em 03/07/2026)
- **Conteúdo:** https://www.omniiabr.tech — bundle `index-CVQgcEeE.js`, lido em 07/09/2026
- **Negócio:** `C:\OmniIA-Cerebro` → `10-Omni-IA/identidade.md`, `40-Financeiro/planos-e-precos.md`,
  `60-Marketing/estrategia-de-venda/estrategia-gtm.md`
- **Tokens:** `./tokens.css`
