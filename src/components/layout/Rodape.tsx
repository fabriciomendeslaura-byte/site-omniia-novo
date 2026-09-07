import { Container } from './Container'
import { useConsentimentoCookies } from '@/hooks/useConsentimentoCookies'
import { EMPRESA, NAVEGACAO, PRIVACIDADE, linkWhatsApp } from '@/content/site'
import css from './Rodape.module.css'

/**
 * Rodapé — contato, navegação e a política de privacidade.
 *
 * A política fica aqui dentro, num <details>, em vez de numa página separada.
 * Motivo: o site é de página única. Uma rota só para a política exigiria um
 * roteador inteiro, e o texto ficaria fora do índice do Google junto com o
 * resto. Aqui ele está no mesmo documento, acessível pelo link `#privacidade`
 * do banner e do formulário.
 */
export function Rodape() {
  // O link de revogar consentimento é exigência da LGPD: quem aceitou precisa
  // conseguir voltar atrás com a mesma facilidade com que aceitou.
  const { escolha, revogar } = useConsentimentoCookies()

  const anoAtual = new Date().getFullYear()

  return (
    <footer className={css.rodape}>
      <Container>
        {/* Faixa principal: marca, navegação e contato */}
        <div className={css.topo}>
          <div className={css.marca}>
            <img
              src="/logo-omni.png"
              alt={EMPRESA.nome}
              width={232}
              height={273}
              className={css.logo}
              loading="lazy"
              decoding="async"
            />
            <p className={css.assinatura}>
              Software sob medida, agentes de IA, automações e sites para empresas que
              querem parar de fazer no braço.
            </p>
            <p className={css.local}>{EMPRESA.local}</p>
          </div>

          <nav className={css.colunas} aria-label="Rodapé">
            <div className={css.coluna}>
              <h2 className={css.colunaTitulo}>Navegar</h2>
              {NAVEGACAO.map((item) => (
                <a key={item.href} href={item.href} className={css.colunaLink}>
                  {item.rotulo}
                </a>
              ))}
            </div>

            <div className={css.coluna}>
              <h2 className={css.colunaTitulo}>Falar com a gente</h2>
              {/* `mailto:` abre o programa de e-mail do visitante já com o
                  destinatário preenchido — um clique a menos que copiar
                  e colar o endereço. */}
              <a href={`mailto:${EMPRESA.email}`} className={css.colunaLink}>
                {EMPRESA.email}
              </a>
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className={css.colunaLink}
              >
                WhatsApp {EMPRESA.whatsappExibicao}
              </a>
              <a
                href={EMPRESA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={css.colunaLink}
              >
                Instagram @omniiabr
              </a>
              <a href="#contato" className={css.colunaLink}>
                Diagnóstico gratuito
              </a>
            </div>
          </nav>
        </div>

        {/* Política de privacidade */}
        <details id="privacidade" className={css.privacidade}>
          <summary className={css.privacidadeTitulo}>
            <span>{PRIVACIDADE.titulo}</span>
            <span className={css.sinal} aria-hidden="true" />
          </summary>

          <div className={css.privacidadeCorpo}>
            {PRIVACIDADE.blocos.map((bloco) => (
              <section key={bloco.titulo} className={css.blocoPrivacidade}>
                <h3 className={css.blocoTitulo}>{bloco.titulo}</h3>
                <p className={css.blocoTexto}>{bloco.texto}</p>
              </section>
            ))}
          </div>
        </details>

        {/* Linha final */}
        <div className={css.base}>
          <p className={css.copyright}>
            © {anoAtual} {EMPRESA.razao}. Todos os direitos reservados.
          </p>

          <div className={css.baseLinks}>
            <a href="#privacidade" className={css.baseLink}>
              Privacidade
            </a>
            {/* Só aparece para quem já respondeu — não faz sentido oferecer
                "rever" a quem ainda nem foi perguntado. */}
            {escolha !== null && (
              <button type="button" className={css.baseLink} onClick={revogar}>
                Rever cookies
              </button>
            )}
          </div>
        </div>
      </Container>
    </footer>
  )
}
