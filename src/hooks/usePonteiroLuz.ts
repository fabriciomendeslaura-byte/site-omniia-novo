import { useEffect, useRef } from 'react'

/**
 * usePonteiroLuz — faz uma luz suave seguir o cursor dentro de um elemento.
 *
 * É o "movimento no mouse" que o site pede. O efeito visual em si é CSS: o
 * elemento desenha um gradiente radial na posição `--mouse-x` / `--mouse-y`.
 * Este hook só mantém essas duas variáveis atualizadas.
 *
 * TRÊS DECISÕES DE PERFORMANCE (importantes)
 *
 * 1. NÃO usa `useState`. Guardar a posição do mouse em estado dispararia um
 *    re-render do React a cada pixel movido — dezenas por segundo, à toa.
 *    Escrevemos direto no DOM via `ref`, que o React nem precisa saber.
 *
 * 2. `requestAnimationFrame` limita a escrita a uma vez por quadro (~60/s).
 *    O evento `mousemove` dispara mais rápido que a tela atualiza; escrever
 *    mais de uma vez por quadro é trabalho jogado fora.
 *
 * 3. `{ passive: true }` promete ao navegador que não vamos chamar
 *    `preventDefault()`. Com isso ele libera a rolagem sem esperar nosso
 *    código rodar — sem essa flag, a página trava enquanto rola.
 */
export function usePonteiroLuz<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    // Efeito decorativo: quem pediu menos movimento simplesmente não recebe.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Em telas de toque não existe cursor pairando — instalar o listener seria
    // gastar bateria à toa.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let quadroAgendado = 0
    let x = 0
    let y = 0

    const escrever = () => {
      quadroAgendado = 0
      elemento.style.setProperty('--mouse-x', `${x}px`)
      elemento.style.setProperty('--mouse-y', `${y}px`)
    }

    const aoMover = (evento: PointerEvent) => {
      // getBoundingClientRect dá a posição do elemento na tela; subtraindo,
      // convertemos a coordenada da janela para coordenada interna do elemento.
      const area = elemento.getBoundingClientRect()
      x = evento.clientX - area.left
      y = evento.clientY - area.top

      // Só agenda se ainda não houver um quadro pendente (o throttle).
      quadroAgendado ||= requestAnimationFrame(escrever)
    }

    const aoSair = () => {
      elemento.style.removeProperty('--mouse-x')
      elemento.style.removeProperty('--mouse-y')
    }

    elemento.addEventListener('pointermove', aoMover, { passive: true })
    elemento.addEventListener('pointerleave', aoSair, { passive: true })

    // Limpeza obrigatória: listener que sobrevive ao componente segura o
    // elemento na memória e continua rodando em página que nem existe mais.
    return () => {
      elemento.removeEventListener('pointermove', aoMover)
      elemento.removeEventListener('pointerleave', aoSair)
      if (quadroAgendado) cancelAnimationFrame(quadroAgendado)
    }
  }, [])

  return ref
}
