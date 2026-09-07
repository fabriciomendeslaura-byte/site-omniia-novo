# Segurança do site

**Atualizado:** 08/09/2026

Este documento explica **o que protege o quê** e por quê. Cada cabeçalho no
`vercel.json` fecha uma porta específica — sem saber qual, ninguém consegue mexer sem
quebrar algo.

---

## 1. Content-Security-Policy (CSP) — a mais importante

A CSP é uma **lista branca**: o navegador só carrega o que estiver autorizado, e bloqueia
o resto antes de executar. É a defesa mais forte contra **XSS** (código estranho rodando
na sua página), porque não depende de a gente ter escrito o código perfeitamente.

| Diretiva | O que faz |
|---|---|
| `default-src 'self'` | O padrão: só carrega coisa do próprio domínio |
| `script-src 'self'` | **Sem `unsafe-inline` e sem `unsafe-eval`.** Script injetado não roda, mesmo que alguém consiga inserir na página |
| `style-src 'self' 'unsafe-inline' fonts.googleapis.com` | O `unsafe-inline` é necessário: o React aplica estilo inline (o atraso da animação, a posição do mouse) |
| `font-src 'self' fonts.gstatic.com` | De onde vêm os arquivos de fonte |
| `img-src 'self' data:` | Imagens só nossas. `data:` permite SVG embutido |
| `connect-src 'self' webhook.omniiabr.com n8n.omniiabr.com` | ⚠️ **Para onde o site pode ENVIAR dados.** Se o webhook não estiver aqui, o navegador bloqueia o formulário antes de sair da máquina |
| `form-action 'self'` | Impede que um formulário seja redirecionado para outro servidor |
| `frame-ancestors 'none'` | Ninguém pode colocar o site dentro de um `<iframe>` — bloqueia *clickjacking* |
| `base-uri 'self'` | Impede alterar a base das URLs relativas da página |
| `object-src 'none'` | Sem Flash, sem applet, sem plugin antigo |
| `upgrade-insecure-requests` | Qualquer `http://` esquecido vira `https://` |

> 🔴 **Ao trocar o endereço do webhook, ATUALIZE o `connect-src`.**
> Este é o erro mais comum: o formulário para de funcionar, o console mostra erro de CSP
> e todo mundo procura bug no JavaScript. O bloqueio é do navegador, não do código.

---

## 2. Os outros cabeçalhos

| Cabeçalho | Protege de |
|---|---|
| **Strict-Transport-Security** | Força HTTPS por 2 anos. Impede o ataque de rebaixar a conexão para `http://` numa rede pública |
| **X-Content-Type-Options: nosniff** | Impede o navegador de "adivinhar" o tipo do arquivo. Sem isso, um arquivo enviado como texto pode ser executado como script |
| **X-Frame-Options: DENY** | A versão antiga do `frame-ancestors`, para navegador velho. Os dois juntos cobrem todo mundo |
| **Referrer-Policy** | Ao clicar num link externo, o outro site não recebe o caminho completo de onde a pessoa veio |
| **Permissions-Policy** | Desliga câmera, microfone, GPS e pagamento. O site não usa nada disso — e o que está desligado não pode ser abusado |
| **Cross-Origin-Opener-Policy** | Isola a janela do site de outras abas |

💡 **O princípio por trás de tudo: menor privilégio.** Não se libera o que não é usado.
Cada permissão aberta é uma porta a mais para alguém tentar.

---

## 3. Cache

| Caminho | Regra | Por quê |
|---|---|---|
| `/assets/*` | 1 ano, `immutable` | O Vite põe um código no nome do arquivo (`index-a3f9.js`). Mudou o conteúdo, muda o nome — então o arquivo antigo pode ser guardado para sempre sem risco |
| Imagens | 7 dias, revalidando | O nome não muda quando a logo é trocada, então o cache precisa ser mais curto |
| Resto (HTML) | Padrão da Vercel | O HTML precisa ser conferido sempre, senão o visitante fica preso numa versão antiga |

---

## 4. O que o site já faz por conta própria

- **Sem `dangerouslySetInnerHTML`** em lugar nenhum — o React escapa todo texto que renderiza
- **`rel="noopener noreferrer"`** automático em todo link de nova aba (dentro do componente `Button`, para ninguém esquecer)
- **Honeypot** no formulário (campo invisível — se vier preenchido, é robô)
- **Consentimento LGPD** obrigatório antes de enviar qualquer dado
- **Nenhum rastreador** carrega antes do consentimento de cookies
- **`.env` no `.gitignore`** — segredo em repositório é segredo vazado
- **Nenhuma chave ou senha no código** do front

---

## 5. ⚠️ O que NÃO está coberto aqui

**A validação do formulário no servidor.** O que o front valida é conveniência: qualquer
pessoa desativa o JavaScript e posta direto no webhook.

**Quem protege de verdade é o n8n.** Ver `integracao-formulario.md` §Segurança —
validação, limite de tamanho, limite de requisições por IP e rejeição sem consentimento.

---

## Como conferir depois do deploy

```bash
# Ver os cabeçalhos que estão realmente chegando
curl -sI https://omniiabr.tech | grep -iE "content-security|strict-transport|x-frame|x-content|referrer|permissions"
```

Ou usar o **https://securityheaders.com** — dá uma nota de A+ a F.
Com esta configuração, o esperado é **A** ou **A+**.
