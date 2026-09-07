import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { PASSOS, SECAO_PROCESSO } from '@/content/site'
import css from './Processo.module.css'

/**
 * Processo — os três passos até o projeto rodar.
 *
 * Responde à quarta pergunta do visitante: "como começa? dá trabalho?".
 *
 * O objetivo aqui não é informar, é REDUZIR MEDO. "Projeto sob medida" soa
 * caro, longo e arriscado — e o visitante trava não por falta de interesse,
 * mas por não saber o tamanho do compromisso que está assumindo.
 * Três passos, com o primeiro gratuito, transformam uma decisão grande
 * ("contratar um projeto") numa decisão pequena ("aceitar uma conversa").
 */
export function Processo() {
  return (
    <Container as="section" id="processo" className={css.secao}>
      <header className={css.cabecalho}>
        <Reveal>
          <p className={css.etiqueta}>
            <span className={css.etiquetaBarra}>//</span>
            {SECAO_PROCESSO.etiqueta}
          </p>
        </Reveal>

        <Reveal atraso={70}>
          <h2 className={css.titulo}>
            {SECAO_PROCESSO.titulo}{' '}
            <span className={css.tituloDestaque}>{SECAO_PROCESSO.tituloDestaque}</span>
          </h2>
        </Reveal>

        <Reveal atraso={140}>
          <p className={css.descricao}>{SECAO_PROCESSO.descricao}</p>
        </Reveal>
      </header>

      {/* <ol> e não <div>: a ordem dos passos é informação, não estilo.
          O leitor de tela anuncia "item 1 de 3", o que dá ao usuário cego a
          mesma noção de progresso que o vidente tem pelo número na tela. */}
      <ol className={css.passos} role="list">
        {PASSOS.map((passo, indice) => (
          <Reveal key={passo.codigo} atraso={indice * 90} className={css.passoWrapper}>
            <li className={css.passo}>
              <div className={css.passoTopo}>
                <span className={css.passoCodigo}>{passo.codigo}</span>
                {/* A linha que liga um passo ao próximo. Some no último —
                    linha saindo do fim sugere que falta uma etapa. */}
                {indice < PASSOS.length - 1 && <span className={css.passoLinha} />}
              </div>

              <h3 className={css.passoTitulo}>{passo.titulo}</h3>
              <p className={css.passoDuracao}>{passo.duracao}</p>
              <p className={css.passoDescricao}>{passo.descricao}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Container>
  )
}
