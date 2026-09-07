# Integração do formulário — contrato de dados

**Atualizado:** 08/09/2026
**Quem faz o quê:** o **front** já está pronto e envia o JSON abaixo. O **workflow do n8n**
que recebe é responsabilidade do Fabricio.

---

## O que o site envia

**Método:** `POST`
**Content-Type:** `application/json`
**Destino:** definido pela variável `VITE_WEBHOOK_CONTATO`
(hoje com fallback para `https://webhook.omniiabr.com/webhook/Formulario`)

```json
{
  "nome": "Fabricio Mendes",
  "email": "fabricio@empresa.com.br",
  "whatsapp": "(21) 99427-7725",
  "empresa": "Omni.IA",
  "site": "omniiabr.tech",
  "faturamento": "R$ 50 mil a R$ 200 mil/mês",
  "interesse": "Software sob medida",
  "mensagem": "Hoje a gente monta relatório na mão toda segunda...",
  "consentimento": true,
  "origem": "site-omniiabr",
  "enviadoEm": "2026-09-08T18:42:11.503Z"
}
```

### Os campos, um por um

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `nome` | string | ✅ | 2 a 120 caracteres |
| `email` | string | ✅ | validado no formato básico |
| `whatsapp` | string | ✅ | **como a pessoa digitou** — máscara, parênteses e traço podem vir junto. Normalizar no n8n |
| `empresa` | string | ✅ | mínimo 2 caracteres |
| `site` | string | ❌ | pode vir string vazia `""` |
| `faturamento` | string | ❌ | uma das faixas fixas, ou `""` |
| `interesse` | string | ✅ | uma das opções fixas |
| `mensagem` | string | ✅ | 10 a 2000 caracteres |
| `consentimento` | boolean | ✅ | **sempre `true`** — sem ele o envio nem acontece |
| `origem` | string | ✅ | fixo `"site-omniiabr"` — serve para separar deste site de outras entradas |
| `enviadoEm` | string | ✅ | ISO 8601, gerado no navegador |

⚠️ **`enviadoEm` vem do relógio do visitante** e pode estar errado (fuso, data trocada).
Para registro confiável, use o horário do próprio n8n. Esse campo serve só como referência.

### Valores fixos

**`interesse`** — sempre um destes:
```
Software sob medida
Agentes de IA
Automações e integrações
Aplicativo
Site
Ainda não sei — quero entender
```

**`faturamento`** — um destes, ou vazio:
```
Até R$ 50 mil/mês
R$ 50 mil a R$ 200 mil/mês
R$ 200 mil a R$ 500 mil/mês
Acima de R$ 500 mil/mês
Prefiro não informar
```

---

## O que o site espera de volta

**Só o status HTTP.** O corpo da resposta é ignorado.

| Resposta | O que o site faz |
|---|---|
| `2xx` | Mostra a tela de sucesso e limpa o formulário |
| Qualquer outra | Mostra o erro e oferece o WhatsApp como alternativa |
| Sem resposta / timeout | Mesmo tratamento de erro |

> No n8n, o node **"Respond to Webhook"** precisa devolver 200 rapidamente.
> Se o workflow demorar (envio de e-mail, consulta a API), responda **primeiro** e
> processe depois — senão o visitante fica olhando "Enviando…" sem retorno.

---

## ⚠️ Segurança — o que precisa acontecer no n8n

O front valida os campos, mas **isso é conveniência, não proteção**: qualquer pessoa
desativa o JavaScript e posta direto no webhook. A validação que protege é a do servidor.

**No workflow, o mínimo:**

1. **Validar tudo de novo** — campos obrigatórios, tamanho máximo, formato do e-mail.
   Nunca confie em dado vindo do cliente.
2. **Limitar tamanho** — cortar `mensagem` em 2000 caracteres e os demais em 200.
   Sem limite, alguém posta 10 MB e entope a fila.
3. **Rejeitar sem `consentimento: true`** — sem ele não existe base legal para tratar o
   dado (LGPD). Se vier `false` ou ausente, descartar.
4. **Limite de requisições por IP** — sem isso, um robô envia mil leads falsos numa hora.
5. **Conferir `origem === "site-omniiabr"`** — não é segurança de verdade (dá para forjar),
   mas separa o tráfego legítimo do lixo genérico.

> **O que o site já faz:** honeypot (campo invisível — se vier preenchido, é robô e o
> envio é descartado no navegador) e o consentimento obrigatório.

---

## Como apontar para outro webhook

Criar um arquivo `.env` na raiz (ele **não** vai para o Git):

```bash
VITE_WEBHOOK_CONTATO=https://webhook.omniiabr.com/webhook/SeuWebhookAqui
```

Depois reiniciar o `npm run dev`. Em produção, a mesma variável entra nas
**Environment Variables** do projeto na Vercel.

⚠️ **Este endereço não é segredo.** O navegador precisa conhecê-lo para enviar o
formulário, então ele aparece no código final de qualquer jeito. Está em variável de
ambiente como **configuração** — para trocar sem mexer no código —, e não como proteção.
Quem protege o endpoint é o n8n.

---

## Teste rápido (sem abrir o site)

```bash
curl -X POST https://webhook.omniiabr.com/webhook/Formulario \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@teste.com","whatsapp":"21999999999","empresa":"Teste","site":"","faturamento":"","interesse":"Agentes de IA","mensagem":"Mensagem de teste com mais de dez caracteres","consentimento":true,"origem":"site-omniiabr","enviadoEm":"2026-09-08T18:00:00.000Z"}'
```

Se responder `200`, o front vai funcionar.
