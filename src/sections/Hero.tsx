import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { PainelCodigo } from '@/components/ui/PainelCodigo'
import { usePonteiroLuz } from '@/hooks/usePonteiroLuz'
import { HERO, linkWhatsApp } from '@/content/site'
import css from './Hero.module.css'

/**
 * Hero — a primeira tela.
 *
 * É a seção que decide se o visitante fica. Três segundos para responder
 * "o que é isso e por que me interessa".
 *
 * A composição segue o design system: título grande em peso baixo, tracking
 * apertado, UM botão colorido, e o painel de código no lugar onde a referência
 * põe o screenshot do produto — porque aqui o produto é a engenharia.
 */
export function Hero() {
  // A luz que segue o cursor. Nenhum estado do React envolvido: o hook escreve
  // direto no DOM, então mover o mouse não re-renderiza nada.
  const refLuz = usePonteiroLuz<HTMLElement>()

  return (
    <section id="topo" ref={refLuz} className={css.hero}>
      {/* Camadas de fundo, do mais fundo para o mais próximo. `aria-hidden`
          porque são puramente visuais — o leitor de tela não deve anunciá-las.

          A ORDEM IMPORTA:
          1. grade           — as linhas, sempre visíveis
          2. gradeIluminada  — as MESMAS linhas, bem mais fortes, aparecendo
                               só onde o cursor está (é o "spotlight")
          3. luz             — o brilho azul difuso que segue o mouse
          4. chao            — o degradê que apoia o conteúdo embaixo */}
      <div className={css.grade} aria-hidden="true" />
      <div className={css.gradeIluminada} aria-hidden="true" />
      <div className={css.luz} aria-hidden="true" />
      <div className={css.chao} aria-hidden="true" />

      <Container className={css.conteudo}>
        <div className={css.texto}>
          <Reveal>
            <p className={css.etiqueta}>
              <span className={css.pontoEtiqueta} />
              {HERO.etiqueta}
            </p>
          </Reveal>

          {/* Um <h1> por página. É o título que o Google lê como assunto
              principal e o leitor de tela anuncia primeiro. */}
          <Reveal atraso={70}>
            <h1 className={css.titulo}>
              {HERO.tituloLinhas.map((linha) => (
                <span key={linha} className={css.tituloLinha}>
                  {linha}
                </span>
              ))}
              <span className={css.tituloDestaque}>{HERO.tituloDestaque}</span>
            </h1>
          </Reveal>

          <Reveal atraso={140}>
            <p className={css.subtitulo}>{HERO.subtitulo}</p>
          </Reveal>

          <Reveal atraso={210}>
            <div className={css.botoes}>
              {/* O ÚNICO botão colorido desta tela. */}
              <Button href="#contato" variante="primario">
                {HERO.ctaPrimario}
              </Button>
              <Button href={linkWhatsApp()} target="_blank" variante="secundario">
                {HERO.ctaSecundario}
              </Button>
            </div>
          </Reveal>

          <Reveal atraso={280}>
            <ul className={css.garantias} role="list">
              {HERO.garantias.map((garantia) => (
                <li key={garantia} className={css.garantia}>
                  {garantia}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* O painel entra por último e com atraso maior: o olho lê o texto
            primeiro, depois é conduzido para a demonstração. */}
        <Reveal atraso={200} className={css.colunaPainel}>
          <PainelCodigo />
        </Reveal>
      </Container>
    </section>
  )
}
