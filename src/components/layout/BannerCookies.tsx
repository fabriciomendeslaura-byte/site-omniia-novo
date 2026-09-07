import { useConsentimentoCookies } from '@/hooks/useConsentimentoCookies'
import css from './BannerCookies.module.css'

/**
 * BannerCookies — o pedido de consentimento da LGPD.
 *
 * DECISÕES QUE FAZEM ELE SER LEGAL (e não só bonito)
 * • "Recusar" tem o MESMO peso visual de "Aceitar". Banner com recusa
 *   escondida, cinza ou em letra menor não é consentimento livre — é o padrão
 *   escuro que a autoridade de proteção de dados considera irregular.
 * • Nenhum rastreador carrega antes da resposta. Quem responde "recusar"
 *   continua navegando normalmente: o site funciona sem cookie de marketing.
 * • O texto diz a FINALIDADE. Consentimento genérico ("aceito cookies") não
 *   atende a lei; a pessoa precisa saber para quê.
 * • Dá para mudar de ideia depois, pelo link no rodapé.
 *
 * Como aparece só uma vez por visitante, ele fica no fim do documento e não
 * bloqueia a leitura do conteúdo.
 */
export function BannerCookies() {
  const { mostrarBanner, registrar } = useConsentimentoCookies()

  if (!mostrarBanner) return null

  return (
    // role="dialog" + aria-label: o leitor de tela anuncia que apareceu uma
    // caixa pedindo decisão, em vez de ler um texto solto no fim da página.
    <div className={css.banner} role="dialog" aria-label="Aviso de cookies" aria-live="polite">
      <div className={css.conteudo}>
        <p className={css.texto}>
          <strong className={css.titulo}>Cookies e privacidade.</strong> Usamos apenas os
          cookies necessários para o site funcionar. Com a sua autorização, usamos também
          cookies de medição, para entender como as páginas são usadas e melhorar o
          atendimento. Você pode mudar essa escolha quando quiser.{' '}
          <a href="#privacidade" className={css.link}>
            Ver a Política de Privacidade
          </a>
        </p>

        {/* As duas ações lado a lado, com o mesmo tamanho. A ordem coloca
            "Recusar" primeiro de propósito: ninguém aperta sem ler. */}
        <div className={css.acoes}>
          <button type="button" className={css.botaoRecusar} onClick={() => registrar('recusado')}>
            Recusar
          </button>
          <button type="button" className={css.botaoAceitar} onClick={() => registrar('aceito')}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
