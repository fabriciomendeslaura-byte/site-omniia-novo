import { useEffect, useRef, useState } from 'react'

/**
 * useReveal — avisa quando um elemento entra na tela, para animar a entrada.
 *
 * COMO FUNCIONA
 * Usa `IntersectionObserver`, a API do navegador que observa "este elemento
 * está visível?". A alternativa antiga era escutar o evento de scroll e medir a
 * posição a cada pixel rolado — isso roda centenas de vezes por segundo na
 * thread principal e trava a página. O observer roda fora dela e só avisa
 * quando o estado muda.
 *
 * POR QUE UM OBSERVER COMPARTILHADO
 * Cada `new IntersectionObserver()` custa memória. Um site com 40 blocos
 * animados criaria 40 observers fazendo o mesmo trabalho. Aqui existe UM só,
 * e um Map liga cada elemento ao seu callback.
 * (É o mesmo raciocínio de connection pool em banco: abrir conexão é caro,
 * então reaproveita-se uma.)
 */

/** Liga cada elemento observado à função que deve rodar quando ele aparecer. */
const inscritos = new Map<Element, () => void>()

let observador: IntersectionObserver | null = null

/**
 * Cria o observer sob demanda (lazy).
 *
 * Não pode ser criado na importação do módulo: em build com renderização no
 * servidor não existe `IntersectionObserver`, e o import quebraria antes de
 * qualquer componente rodar.
 */
function obterObservador(): IntersectionObserver {
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue

        inscritos.get(entrada.target)?.()

        // Revelou uma vez, não observa mais: a animação de entrada não deve
        // repetir quando o usuário sobe e desce a página — isso irrita.
        observador?.unobserve(entrada.target)
        inscritos.delete(entrada.target)
      }
    },
    {
      // rootMargin negativo embaixo: só dispara quando o elemento já subiu um
      // pouco na tela. Se disparasse no primeiro pixel, a animação aconteceria
      // fora do campo de visão e o usuário veria o elemento já parado.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.1,
    },
  )
  return observador
}

/** O usuário pediu menos animação no sistema operacional? */
function prefereMenosMovimento(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * @returns `ref` para colocar no elemento e `visivel` para trocar a classe CSS.
 *
 * @example
 * const { ref, visivel } = useReveal()
 * <div ref={ref} className={visivel ? css.dentro : css.fora}>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  // Já começa visível para quem pediu menos movimento: sem animação, o
  // conteúdo simplesmente está lá. Nunca esconder conteúdo de quem desligou
  // animação — senão a página fica em branco para essa pessoa.
  const [visivel, setVisivel] = useState(prefereMenosMovimento)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento || prefereMenosMovimento()) return

    const obs = obterObservador()
    inscritos.set(elemento, () => setVisivel(true))
    obs.observe(elemento)

    // Limpeza: se o componente sair da tela antes de ser revelado, precisamos
    // remover a inscrição. Sem isso, o Map segura uma referência ao elemento
    // removido e ele nunca é liberado da memória — vazamento clássico.
    return () => {
      obs.unobserve(elemento)
      inscritos.delete(elemento)
    }
  }, [])

  return { ref, visivel }
}
