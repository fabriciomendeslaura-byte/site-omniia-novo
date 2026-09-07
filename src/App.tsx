import { Nav } from '@/components/layout/Nav'
import { Rodape } from '@/components/layout/Rodape'
import { BannerCookies } from '@/components/layout/BannerCookies'
import { Hero } from '@/sections/Hero'
import { Servicos } from '@/sections/Servicos'
import { Engenharia } from '@/sections/Engenharia'
import { Processo } from '@/sections/Processo'
import { Faq } from '@/sections/Faq'
import { Contato } from '@/sections/Contato'

/**
 * App — a montagem da página.
 *
 * De propósito, este arquivo é quase vazio: ele só diz QUAIS seções existem e
 * em que ordem. Nenhuma regra, nenhum estilo, nenhuma lógica.
 *
 * A ORDEM NÃO É ESTÉTICA, É ARGUMENTO.
 * O visitante desce a página com perguntas numa ordem previsível, e cada
 * seção responde uma delas antes de entregá-lo para a próxima:
 *
 *   Hero        → "quem são vocês?"
 *   Serviços    → "o que vocês entregam?"
 *   Engenharia  → "vocês sabem mesmo fazer?"
 *   Processo    → "como começa? dá trabalho?"
 *   FAQ         → "mas e se...?"
 *   Contato     → "ok, quero falar"
 *
 * Trocar a ordem quebra o raciocínio: responder "como começa" antes de provar
 * competência é convidar alguém que ainda não confia.
 */
export function App() {
  return (
    <>
      <Nav />

      {/* <main> marca o conteúdo principal. É o que permite ao leitor de tela
          oferecer "pular direto para o conteúdo", sem reouvir o menu. */}
      <main>
        <Hero />
        <Servicos />
        <Engenharia />
        <Processo />
        <Faq />
        <Contato />
      </main>

      <Rodape />

      {/* Fora do <main>: é um aviso sobre o site, não conteúdo dele. */}
      <BannerCookies />
    </>
  )
}
