import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import css from './Button.module.css'

/**
 * Button — o botão do site, em três pesos visuais.
 *
 * REGRA DE DESIGN QUE ESTE COMPONENTE PROTEGE:
 * a variante `primario` usa a única cor cromática do site. Só pode existir UM
 * por tela. Se aparecerem dois, a cor deixa de significar "a ação" e vira
 * decoração — que é exatamente o que o design system proíbe.
 *
 * Ele renderiza `<a>` quando recebe `href` e `<button>` quando recebe `onClick`.
 * Isso importa para acessibilidade: link navega (e abre em nova aba com o
 * meio-clique), botão executa. Trocar um pelo outro quebra o leitor de tela.
 */

type Variante = 'primario' | 'secundario' | 'fantasma'

interface PropsComuns {
  children: ReactNode
  variante?: Variante
  /** O `| undefined` é exigido por `exactOptionalPropertyTypes` — ver Container. */
  className?: string | undefined
}

type PropsLink = PropsComuns &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string }

type PropsBotao = PropsComuns &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined }

type ButtonProps = PropsLink | PropsBotao

export function Button({ children, variante = 'primario', className, ...resto }: ButtonProps) {
  const classes = [css.base, css[variante], className].filter(Boolean).join(' ')

  if ('href' in resto && resto.href !== undefined) {
    const { href, target, rel, ...atributosLink } = resto

    /**
     * SEGURANÇA — `rel="noopener noreferrer"` em todo link que abre nova aba.
     *
     * Sem `noopener`, a página aberta recebe uma referência à nossa via
     * `window.opener` e consegue nos redirecionar para um site falso enquanto o
     * usuário está na outra aba (ataque conhecido como "tabnabbing").
     * `noreferrer` ainda evita vazar de onde a pessoa veio.
     *
     * Fica embutido no componente de propósito: proteção que depende de alguém
     * lembrar de escrever, uma hora falha.
     */
     const relSeguro = target === '_blank' ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ') : rel

    return (
      <a href={href} target={target} rel={relSeguro} className={classes} {...atributosLink}>
        {children}
      </a>
    )
  }

  const { href: _ignorado, type, ...atributosBotao } = resto as PropsBotao

  // `type="button"` explícito: dentro de um <form>, o padrão do HTML é
  // "submit", e um botão qualquer acabaria enviando o formulário sem querer.
  return (
    <button type={type ?? 'button'} className={classes} {...atributosBotao}>
      {children}
    </button>
  )
}
