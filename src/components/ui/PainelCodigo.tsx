import { ARQUIVO_HERO, CODIGO_HERO, RODAPE_HERO } from '@/content/codigoHero'
import css from './PainelCodigo.module.css'

/**
 * PainelCodigo — a "janela de editor" do topo da página.
 *
 * Não é enfeite: é a prova visual de que quem faz o site programa. E o código
 * mostrado descreve exatamente o que a empresa entrega — lead entra, IA
 * qualifica, CRM move, reunião marcada.
 *
 * Renderiza a partir dos dados de `content/codigoHero.ts`. Nada de HTML
 * montado como string, então não existe superfície para XSS aqui.
 */
export function PainelCodigo() {
  return (
    // `aria-hidden`: para quem usa leitor de tela, ouvir código linha a linha
    // seria ruído. A informação real já está no título e no texto ao lado.
    <div className={css.painel} aria-hidden="true">
      {/* Barra de título, no estilo de um editor de verdade */}
      <div className={css.barra}>
        <span className={css.pontos}>
          <i />
          <i />
          <i />
        </span>
        <span className={css.arquivo}>{ARQUIVO_HERO}</span>
      </div>

      <pre className={css.codigo}>
        <code>
          {CODIGO_HERO.map((linha, iLinha) => (
            // A chave é o índice porque a lista é estática: nunca reordena,
            // nunca é filtrada. Em lista dinâmica, índice como chave causa bug.
            <span key={iLinha} className={css.linha}>
              <span className={css.numero}>{iLinha + 1}</span>
              <span className={css.conteudo}>
                {linha.map((token, iToken) => (
                  <span key={iToken} className={css[token.tipo]}>
                    {token.t}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>

      {/* Rodapé com o resultado — fecha a história que o código começou.
          O texto vem do content/: frase de site é conteúdo, não componente. */}
      <div className={css.rodape}>
        <span className={css.pulso} />
        <span>{RODAPE_HERO}</span>
      </div>
    </div>
  )
}
