import { useCallback, useEffect, useState } from 'react'

/**
 * useConsentimentoCookies — o consentimento de cookies exigido pela LGPD.
 *
 * O QUE A LEI PEDE (Lei 13.709/2018)
 * • Consentimento LIVRE, INFORMADO e INEQUÍVOCO antes de tratar o dado.
 * • Recusar precisa ser tão fácil quanto aceitar — banner só com "Aceitar",
 *   ou com o "Recusar" escondido, não vale como consentimento livre.
 * • Nada de rastreamento antes do "sim". Carregar o pixel e pedir permissão
 *   depois é exatamente o que a lei proíbe.
 * • A pessoa pode mudar de ideia depois, e revogar tem que ser possível.
 *
 * ⚠️ POR QUE ISTO IMPORTA AQUI E AGORA
 * O site hoje não tem rastreador nenhum. Mas o plano é rodar Facebook Ads —
 * e o pixel do Meta é cookie de marketing. No dia em que ele entrar, a
 * estrutura de consentimento já vai estar pronta e correta, em vez de ser
 * remendada depois (que é quando a multa acontece).
 */

/** Chave no navegador. Versionada: mudando a política, o `-v1` vira `-v2` e
 *  todo mundo é perguntado de novo — consentimento antigo não vale para
 *  finalidade nova. */
const CHAVE = 'omniia-consentimento-v1'

export type Consentimento = 'aceito' | 'recusado' | null

/** Lê a escolha salva. Em navegador anônimo ou com storage bloqueado, o
 *  acesso lança exceção — por isso o try/catch. Sem ele, a página inteira
 *  quebraria para esses visitantes. */
function lerEscolha(): Consentimento {
  try {
    const salvo = localStorage.getItem(CHAVE)
    return salvo === 'aceito' || salvo === 'recusado' ? salvo : null
  } catch {
    return null
  }
}

export function useConsentimentoCookies() {
  const [escolha, setEscolha] = useState<Consentimento>(null)
  const [carregado, setCarregado] = useState(false)

  /**
   * A leitura acontece em `useEffect`, e não no estado inicial, de propósito:
   * o primeiro render precisa ser igual para todo mundo. Ler o storage direto
   * no `useState` faria a tela piscar o banner antes de descobrir que a pessoa
   * já tinha respondido.
   */
  useEffect(() => {
    setEscolha(lerEscolha())
    setCarregado(true)
  }, [])

  const registrar = useCallback((nova: Exclude<Consentimento, null>) => {
    setEscolha(nova)
    try {
      localStorage.setItem(CHAVE, nova)
    } catch {
      // Storage bloqueado: a escolha vale para esta visita e o banner volta na
      // próxima. Perguntar de novo é o comportamento correto — o que não pode
      // é assumir "sim" sem ter onde registrar o "sim".
    }
  }, [])

  /** Permite revogar depois (exigência da lei): volta o banner. */
  const revogar = useCallback(() => {
    setEscolha(null)
    try {
      localStorage.removeItem(CHAVE)
    } catch {
      /* mesmo caso acima */
    }
  }, [])

  return {
    escolha,
    /** Só mostra o banner depois de saber a resposta — evita o piscar. */
    mostrarBanner: carregado && escolha === null,
    /** Use isto para decidir se pode carregar pixel, analytics e afins. */
    podeRastrear: escolha === 'aceito',
    registrar,
    revogar,
  }
}
