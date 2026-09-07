import type { ElementType, ReactNode } from 'react'
import css from './Container.module.css'

/**
 * Container — segura o conteúdo na largura máxima e centraliza.
 *
 * Existe para a largura de 1200px ficar definida em UM lugar. Sem ele, cada
 * seção repetiria `max-width` e `padding`, e no dia em que a medida mudasse
 * seria preciso caçar em todos os arquivos — e um sempre escapa. DRY.
 *
 * `as` permite escolher a tag (`section`, `header`, `footer`) sem perder a
 * semântica do HTML. Uma página feita só de `<div>` é invisível para leitor
 * de tela e pior indexada pelo Google.
 */

interface ContainerProps {
  children: ReactNode
  as?: ElementType
  /**
   * O `| undefined` explícito é exigido por `exactOptionalPropertyTypes`:
   * com essa opção ligada, "a prop pode faltar" e "a prop pode valer undefined"
   * passam a ser coisas diferentes. E precisamos das duas, porque uma classe
   * vinda de CSS Module é `string | undefined` (o TypeScript não garante que
   * ela exista de fato no arquivo .css).
   */
  className?: string | undefined
  id?: string | undefined
}

export function Container({ children, as: Tag = 'div', className, id }: ContainerProps) {
  return (
    <Tag id={id} className={[css.container, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
