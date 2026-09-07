import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { VisualServico } from '@/components/visuals/VisuaisServico'
import { SECAO_SERVICOS, SERVICOS } from '@/content/site'
import css from './Servicos.module.css'

/**
 * Serviços — o que a OMNI.IA constrói.
 *
 * Responde a segunda pergunta do visitante: "o que exatamente vocês entregam?".
 *
 * POR QUE BLOCOS ALTERNADOS, E NÃO UMA GRADE DE CARTÕES
 * Numa grade de três colunas o olho varre tudo em dois segundos e não lê nada —
 * e seis serviços viram seis retângulos iguais, o que faz o trabalho parecer
 * commodity. Alternando texto e visual, o olho faz zigue-zague e desacelera:
 * cada serviço ganha uma tela só sua. O design system também proíbe grade de
 * três colunas, pela mesma razão.
 */
export function Servicos() {
  return (
    <Container as="section" id="servicos" className={css.secao}>
      {/* Cabeçalho da seção */}
      <header className={css.cabecalho}>
        <Reveal>
          <p className={css.etiqueta}>
            <span className={css.etiquetaBarra}>//</span>
            {SECAO_SERVICOS.etiqueta}
          </p>
        </Reveal>

        <Reveal atraso={70}>
          <h2 className={css.titulo}>
            {SECAO_SERVICOS.titulo}{' '}
            <span className={css.tituloDestaque}>{SECAO_SERVICOS.tituloDestaque}</span>
          </h2>
        </Reveal>

        <Reveal atraso={140}>
          <p className={css.descricao}>{SECAO_SERVICOS.descricao}</p>
        </Reveal>
      </header>

      {/* Os seis blocos */}
      <div className={css.lista}>
        {SERVICOS.map((servico, indice) => {
          // Blocos ímpares invertem a ordem das colunas. O cálculo fica aqui,
          // e não no CSS com :nth-child, porque a informação "este bloco é
          // invertido" é do layout do componente — deixá-la no CSS esconderia
          // a regra de quem lê o JSX.
          const invertido = indice % 2 === 1

          return (
            <article
              key={servico.id}
              id={servico.id}
              className={[css.bloco, invertido ? css.blocoInvertido : ''].join(' ')}
            >
              {/* Coluna de texto */}
              <Reveal className={css.colunaTexto}>
                <div className={css.numeroLinha}>
                  <span className={css.numero}>{servico.codigo}</span>
                  <span className={css.tracoNumero} />
                  <span className={css.rotulo}>{servico.titulo}</span>
                </div>

                <h3 className={css.chamada}>{servico.chamada}</h3>
                <p className={css.descricaoServico}>{servico.descricao}</p>

                <ul className={css.itens} role="list">
                  {servico.itens.map((item) => (
                    <li key={item} className={css.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Coluna do visual. Entra com atraso: o olho lê o texto
                  primeiro e só então é levado ao desenho. */}
              <Reveal atraso={120} className={css.colunaVisual}>
                <VisualServico id={servico.id} />
              </Reveal>
            </article>
          )
        })}
      </div>
    </Container>
  )
}
