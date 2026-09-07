import { useEffect, useState } from 'react'
import { Container } from './Container'
import { Button } from '@/components/ui/Button'
import { EMPRESA, NAVEGACAO, linkWhatsApp } from '@/content/site'
import css from './Nav.module.css'

/**
 * Nav — barra fixa do topo.
 *
 * Dois comportamentos:
 * 1. Fica transparente no topo e ganha fundo quando a página rola, para o texto
 *    da página não passar por baixo dela e virar sopa de letra.
 * 2. No celular, vira menu recolhível.
 */
export function Nav() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  /**
   * Detecta se a página saiu do topo.
   *
   * `{ passive: true }` promete que não vamos bloquear a rolagem — sem isso o
   * navegador precisa esperar nosso código antes de rolar, e a página engasga.
   *
   * `requestAnimationFrame` limita a uma verificação por quadro: o evento de
   * scroll dispara muito mais rápido que a tela atualiza.
   */
  useEffect(() => {
    let quadroAgendado = 0

    const verificar = () => {
      quadroAgendado = 0
      // Comparar com o estado anterior evita chamar setState a cada pixel:
      // só re-renderiza quando o valor realmente vira de false para true.
      setRolou((anterior) => {
        const agora = window.scrollY > 24
        return anterior === agora ? anterior : agora
      })
    }

    const aoRolar = () => {
      quadroAgendado ||= requestAnimationFrame(verificar)
    }

    verificar() // estado inicial: a página pode já abrir rolada (F5 no meio)
    window.addEventListener('scroll', aoRolar, { passive: true })

    return () => {
      window.removeEventListener('scroll', aoRolar)
      if (quadroAgendado) cancelAnimationFrame(quadroAgendado)
    }
  }, [])

  /**
   * Trava a rolagem do fundo enquanto o menu do celular está aberto.
   * Sem isso, o dedo rola a página atrás do menu — bug clássico de mobile.
   */
  useEffect(() => {
    if (!menuAberto) return
    const overflowOriginal = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflowOriginal
    }
  }, [menuAberto])

  /** Fecha o menu com a tecla Esc — comportamento esperado de qualquer overlay. */
  useEffect(() => {
    if (!menuAberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAberto(false)
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [menuAberto])

  return (
    <header className={[css.cabecalho, rolou ? css.rolou : ''].join(' ')}>
      <Container className={css.barra}>
        {/* O logo leva ao topo. `aria-label` porque a imagem sozinha não
            explica para o leitor de tela que aquilo é um link de retorno. */}
        <a href="#topo" className={css.logo} aria-label={`${EMPRESA.nome} — voltar ao início`}>
          <img
            /* Logo original do site no ar (símbolo azul + wordmark branco).
               width/height são as dimensões REAIS do arquivo, não o tamanho
               exibido: o navegador usa essa proporção para reservar o espaço
               antes de a imagem carregar, e a página não "pula" quando ela
               chega. Esse pulo é o CLS, uma das métricas de ranqueamento do
               Google. O tamanho visual quem define é o CSS. */
            src="/logo-omni.png"
            alt={EMPRESA.nome}
            width={232}
            height={273}
            /* Esta é a única imagem visível antes de rolar: carregar cedo evita
               o logo "piscar" depois que o resto já apareceu. */
            loading="eager"
            decoding="async"
          />
        </a>

        {/* <nav> é a tag semântica para navegação — o leitor de tela oferece
            "pular para a navegação" por causa dela. */}
        <nav className={css.links} aria-label="Navegação principal">
          {NAVEGACAO.map((item) => (
            <a key={item.href} href={item.href} className={css.link}>
              {item.rotulo}
            </a>
          ))}
        </nav>

        <div className={css.acoes}>
          <Button href={linkWhatsApp()} target="_blank" variante="primario" className={css.ctaTopo}>
            Falar com especialista
          </Button>

          {/* Botão do menu mobile. `aria-expanded` informa ao leitor de tela se
              está aberto ou fechado; `aria-controls` diz qual elemento ele abre. */}
          <button
            type="button"
            className={css.botaoMenu}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span className={[css.traco, menuAberto ? css.tracoAtivo : ''].join(' ')} />
            <span className={[css.traco, menuAberto ? css.tracoAtivo : ''].join(' ')} />
          </button>
        </div>
      </Container>

      {/* `hidden` (e não display:none no CSS) para o conteúdo sair de verdade da
          árvore de acessibilidade quando fechado — senão o leitor de tela lê um
          menu invisível. */}
      <div id="menu-mobile" className={css.menuMobile} hidden={!menuAberto}>
        <nav aria-label="Navegação mobile">
          {NAVEGACAO.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={css.linkMobile}
              onClick={() => setMenuAberto(false)}
            >
              {item.rotulo}
            </a>
          ))}
        </nav>
        <Button href={linkWhatsApp()} target="_blank" variante="primario">
          Falar com especialista
        </Button>
      </div>
    </header>
  )
}
