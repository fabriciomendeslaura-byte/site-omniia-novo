import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PERGUNTAS, SECAO_FAQ } from '@/content/site'
import css from './Faq.module.css'

/**
 * FAQ — as objeções que travam a decisão.
 *
 * Responde à última pergunta antes da conversão: "mas e se...?".
 *
 * POR QUE <details> E NÃO UM ACCORDION EM REACT
 * `<details>/<summary>` é HTML nativo: abre e fecha sem uma linha de
 * JavaScript, é acessível por padrão (teclado, leitor de tela, tudo pronto),
 * funciona mesmo se o JS falhar, e o conteúdo é indexado pelo Google mesmo
 * fechado. Um accordion feito à mão precisaria de estado, aria-expanded,
 * controle de foco e teclas — para entregar exatamente o mesmo resultado,
 * com mais código e mais chance de erro.
 *
 * A melhor biblioteca costuma ser a plataforma.
 */
export function Faq() {
  return (
    <Container as="section" id="faq" className={css.secao}>
      <header className={css.cabecalho}>
        <Reveal>
          <p className={css.etiqueta}>
            <span className={css.etiquetaBarra}>//</span>
            {SECAO_FAQ.etiqueta}
          </p>
        </Reveal>

        <Reveal atraso={70}>
          <h2 className={css.titulo}>
            {SECAO_FAQ.titulo}{' '}
            <span className={css.tituloDestaque}>{SECAO_FAQ.tituloDestaque}</span>
          </h2>
        </Reveal>
      </header>

      <div className={css.lista}>
        {PERGUNTAS.map((item, indice) => (
          <Reveal key={item.pergunta} atraso={indice * 50}>
            <details className={css.item}>
              <summary className={css.pergunta}>
                <span>{item.pergunta}</span>
                {/* O sinal de abrir/fechar. `aria-hidden` porque o próprio
                    <details> já anuncia o estado ao leitor de tela — o ícone
                    seria informação repetida. */}
                <span className={css.sinal} aria-hidden="true" />
              </summary>
              <p className={css.resposta}>{item.resposta}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
