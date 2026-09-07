import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import css from './Reveal.module.css'

/**
 * Reveal — revela o conteúdo com um deslize suave quando ele entra na tela.
 *
 * Existe para o resto do site não precisar saber NADA sobre IntersectionObserver.
 * Quem monta uma seção escreve `<Reveal>` e pronto; a mecânica fica escondida
 * aqui dentro. É encapsulamento: o componente expõe o QUE ele faz e esconde o COMO.
 */

interface RevealProps {
  children: ReactNode
  /**
   * Atraso em milissegundos antes de começar.
   * Usado para escalonar (efeito cascata): 0, 70, 140, 210...
   * O olho lê uma sequência como intencional; tudo junto parece um "pisca".
   */
  atraso?: number
  /**
   * Classe extra do consumidor, para posicionamento no layout.
   * O `| undefined` é exigido por `exactOptionalPropertyTypes` — ver Container.
   */
  className?: string | undefined
}

export function Reveal({ children, atraso = 0, className }: RevealProps) {
  const { ref, visivel } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={[css.base, visivel ? css.visivel : '', className].filter(Boolean).join(' ')}
      // Atraso vai por variável CSS, não por `transition-delay` inline:
      // assim a folha de estilo continua dona da animação e o JS só informa
      // "quando". Separação de responsabilidades entre CSS e JS.
      style={atraso ? ({ '--atraso': `${atraso}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
