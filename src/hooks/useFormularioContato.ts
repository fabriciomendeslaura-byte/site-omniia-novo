import { useCallback, useState } from 'react'

/**
 * useFormularioContato — toda a lógica do formulário de diagnóstico.
 *
 * POR QUE A LÓGICA MORA AQUI E NÃO NO COMPONENTE
 * O componente `Contato` cuida da APARÊNCIA: quais campos aparecem e como.
 * Este hook cuida do COMPORTAMENTO: o que é válido, o que é enviado, o que
 * fazer quando dá erro. Separados, cada um cabe na cabeça de uma vez — e a
 * validação pode ser testada sem renderizar tela nenhuma.
 * É a Responsabilidade Única (SRP) aplicada a um formulário.
 */

/** Endereço padrão do webhook do n8n. Usado quando não há configuração válida. */
const URL_WEBHOOK_PADRAO = 'https://webhook.omniiabr.com/webhook/Formulario'

/**
 * O endereço do webhook que recebe o formulário.
 *
 * ⚠️ POR QUE NÃO USAMOS `??` AQUI (bug real, corrigido em 08/09/2026)
 *
 * A primeira versão era:
 *   import.meta.env['VITE_WEBHOOK_CONTATO'] ?? URL_WEBHOOK_PADRAO
 *
 * O `??` (nullish coalescing) só substitui `null` e `undefined`. String VAZIA
 * é um valor válido para ele:
 *   ""        ??  'padrao'   →  ""        ← o padrão NÃO entra
 *   undefined ??  'padrao'   →  'padrao'
 *
 * Em desenvolvimento não existe `.env`, então a variável é `undefined` e o
 * padrão entrava: funcionava. Em produção a variável existia VAZIA, o `??`
 * manteve o vazio, e o `fetch('')` passou a postar na própria página.
 * Resultado: formulário funcionando local e quebrado no ar — o pior tipo de
 * bug, porque não aparece em nenhum teste da máquina do desenvolvedor.
 *
 * A checagem abaixo é explícita de propósito: `.trim()` também derruba o caso
 * de a variável vir com espaço em branco, que `||` sozinho deixaria passar.
 */
const urlConfigurada = import.meta.env['VITE_WEBHOOK_CONTATO']?.trim()
const URL_WEBHOOK = urlConfigurada ? urlConfigurada : URL_WEBHOOK_PADRAO

/**
 * Os campos do formulário.
 *
 * `armadilha` é o honeypot — um campo invisível para gente e visível para robô.
 * Robô de spam preenche tudo que encontra no HTML; pessoa nenhuma vê o campo.
 * Se vier preenchido, o envio é descartado em silêncio: fingir sucesso evita
 * que o robô perceba a detecção e tente outro caminho.
 */
export interface DadosContato {
  nome: string
  email: string
  whatsapp: string
  empresa: string
  site: string
  faturamento: string
  /** Volume de leads por dia — junto com o faturamento, dimensiona o projeto. */
  leads: string
  interesse: string
  mensagem: string
  /** Consentimento explícito da LGPD. Nunca pode vir marcado por padrão. */
  consentimento: boolean
  armadilha: string
}

export type CamposContato = keyof DadosContato
export type ErrosContato = Partial<Record<CamposContato, string>>
export type SituacaoEnvio = 'parado' | 'enviando' | 'sucesso' | 'erro'

const DADOS_VAZIOS: DadosContato = {
  nome: '',
  email: '',
  whatsapp: '',
  empresa: '',
  site: '',
  faturamento: '',
  leads: '',
  interesse: '',
  mensagem: '',
  consentimento: false,
  armadilha: '',
}

/**
 * Validação.
 *
 * ⚠️ Isto é conveniência para o usuário, NÃO segurança.
 * Qualquer pessoa desativa o JavaScript e posta direto no webhook. A validação
 * que protege de verdade é a do outro lado, no n8n. Regra que vale sempre:
 * nunca confie em dado vindo do cliente.
 */
function validar(dados: DadosContato): ErrosContato {
  const erros: ErrosContato = {}

  if (dados.nome.trim().length < 2) {
    erros.nome = 'Digite seu nome completo'
  } else if (dados.nome.trim().length > 120) {
    erros.nome = 'Nome muito longo'
  }

  // Proposital: não valida e-mail com expressão regular complicada. As grandes
  // erram casos válidos e reprovam gente de verdade. "Tem @ e um ponto depois"
  // já filtra erro de digitação — o resto é o e-mail de confirmação que resolve.
  const email = dados.email.trim()
  if (!email) {
    erros.email = 'Digite seu e-mail'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    erros.email = 'E-mail inválido'
  } else if (email.length > 160) {
    erros.email = 'E-mail muito longo'
  }

  // Só os dígitos importam: a pessoa pode digitar com parênteses, traço ou nada.
  const digitos = dados.whatsapp.replace(/\D/g, '')
  if (!digitos) {
    erros.whatsapp = 'Digite seu WhatsApp'
  } else if (digitos.length < 10 || digitos.length > 13) {
    erros.whatsapp = 'Número incompleto'
  }

  if (dados.empresa.trim().length < 2) {
    erros.empresa = 'Digite o nome da empresa'
  }

  if (!dados.interesse) {
    erros.interesse = 'Escolha uma opção'
  }

  if (dados.mensagem.trim().length < 10) {
    erros.mensagem = 'Conte um pouco mais sobre a operação'
  } else if (dados.mensagem.length > 2000) {
    erros.mensagem = 'Mensagem muito longa (máximo 2000 caracteres)'
  }

  // Sem consentimento não existe base legal para tratar o dado. É requisito
  // da LGPD, não preferência nossa — por isso bloqueia o envio.
  if (!dados.consentimento) {
    erros.consentimento = 'Precisamos da sua autorização para entrar em contato'
  }

  return erros
}

export function useFormularioContato() {
  const [dados, setDados] = useState<DadosContato>(DADOS_VAZIOS)
  const [erros, setErros] = useState<ErrosContato>({})
  const [situacao, setSituacao] = useState<SituacaoEnvio>('parado')

  /** Atualiza um campo e limpa o erro dele, se houver. */
  const alterar = useCallback(<C extends CamposContato>(campo: C, valor: DadosContato[C]) => {
    setDados((atual) => ({ ...atual, [campo]: valor }))

    // Some com o erro assim que a pessoa começa a corrigir. Manter a mensagem
    // vermelha enquanto ela digita é punir quem já está consertando.
    setErros((atuais) => {
      if (!atuais[campo]) return atuais
      const novos = { ...atuais }
      delete novos[campo]
      return novos
    })
  }, [])

  const enviar = useCallback(
    async (evento: React.FormEvent) => {
      evento.preventDefault()

      // Robô preencheu a armadilha: finge que deu certo e não envia nada.
      if (dados.armadilha) {
        setSituacao('sucesso')
        return
      }

      const encontrados = validar(dados)
      if (Object.keys(encontrados).length > 0) {
        setErros(encontrados)
        return
      }

      setSituacao('enviando')

      try {
        // A armadilha não vai junto: é controle interno, não dado do lead.
        const { armadilha: _armadilha, ...conteudo } = dados

        const resposta = await fetch(URL_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...conteudo,
            origem: 'site-omniiabr',
            enviadoEm: new Date().toISOString(),
          }),
        })

        // fetch NÃO rejeita em erro 4xx/5xx — só em falha de rede. Sem checar
        // `ok`, um 500 do servidor passaria como sucesso e o lead se perderia
        // achando que foi enviado. É a pegadinha mais comum do fetch.
        if (!resposta.ok) throw new Error(`Webhook respondeu ${resposta.status}`)

        setSituacao('sucesso')
        setDados(DADOS_VAZIOS)
      } catch {
        // O erro técnico não vai para a tela: mensagem de sistema não ajuda o
        // usuário e ainda expõe detalhe da infraestrutura para quem procura.
        setSituacao('erro')
      }
    },
    [dados],
  )

  return { dados, erros, situacao, alterar, enviar }
}
