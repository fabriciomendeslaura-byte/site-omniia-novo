/// <reference types="vite/client" />

/**
 * Declara os CSS Modules para o TypeScript.
 *
 * Sem isto, `import css from './Botao.module.css'` daria erro de tipo: o
 * TypeScript não sabe que o Vite transforma esse arquivo num objeto de classes.
 *
 * `Record<string, string>` diz: "é um objeto onde toda chave string devolve
 * uma string" — que é exatamente o formato de `{ base: 'Botao_base__x1y2' }`.
 */
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
