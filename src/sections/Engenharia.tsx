import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PILARES, SECAO_ENGENHARIA } from '@/content/site'
import css from './Engenharia.module.css'

/**
 * Engenharia — a seção de prova.
 *
 * Responde à terceira pergunta do visitante: "vocês sabem mesmo fazer?".
 *
 * É o lugar onde a maioria dos sites coloca logo de cliente e depoimento.
 * Como a OMNI.IA ainda não tem cliente pagante, e inventar prova social é
 * mentira que uma ligação derruba, aqui a prova é TÉCNICA: como o software é
 * construído por dentro. Ver o comentário de SECAO_ENGENHARIA no content.
 */
export function Engenharia() {
  return (
    // A seção tem fundo próprio, um degrau acima do canvas. É o que a separa
    // visualmente sem precisar de borda ou título gritado: o olho percebe
    // "mudou de assunto" pela superfície, não por um divisor.
    <section id="engenharia" className={css.faixa}>
      <Container>
        <header className={css.cabecalho}>
          <Reveal>
            <p className={css.etiqueta}>
              <span className={css.etiquetaBarra}>//</span>
              {SECAO_ENGENHARIA.etiqueta}
            </p>
          </Reveal>

          <Reveal atraso={70}>
            <h2 className={css.titulo}>
              {SECAO_ENGENHARIA.titulo}{' '}
              <span className={css.tituloDestaque}>{SECAO_ENGENHARIA.tituloDestaque}</span>
            </h2>
          </Reveal>

          <Reveal atraso={140}>
            <p className={css.descricao}>{SECAO_ENGENHARIA.descricao}</p>
          </Reveal>
        </header>

        {/* Os quatro pilares, em 2x2.
            Duas colunas e não três: o design system proíbe grade de três,
            porque ela transforma qualquer conteúdo em cartõezinhos iguais. */}
        <div className={css.pilares}>
          {PILARES.map((pilar, indice) => (
            // O atraso escalonado faz os quatro entrarem em sequência,
            // não todos de uma vez — leitura em cascata, não em flash.
            <Reveal key={pilar.codigo} atraso={indice * 70}>
              <article className={css.pilar}>
                <span className={css.pilarCodigo}>{pilar.codigo}</span>
                <h3 className={css.pilarTitulo}>{pilar.titulo}</h3>
                <p className={css.pilarDescricao}>{pilar.descricao}</p>
                {/* O marcador técnico em mono: é a linha que quem entende lê
                    para conferir se a gente sabe do que está falando. */}
                <p className={css.pilarMarcador}>{pilar.marcador}</p>
              </article>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  )
}
