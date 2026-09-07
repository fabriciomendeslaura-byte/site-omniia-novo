import type { ReactNode } from 'react'
import css from './VisuaisServico.module.css'

/**
 * Os visuais que acompanham cada bloco de serviço.
 *
 * POR QUE DESENHADOS EM CSS/SVG, E NÃO IMAGENS
 * 1. O design system proíbe foto de banco de imagem e ilustração genérica —
 *    "arte de IA" mataria justamente o ar de software house.
 * 2. Pesam ZERO KB: não há arquivo para baixar, nada para carregar depois.
 * 3. Acompanham o tema sozinhos, porque usam os mesmos tokens do resto do site.
 * 4. São a própria prova do argumento: a página inteira é código.
 *
 * Quando existirem prints reais do produto, cada visual pode ser trocado
 * individualmente — o resto da seção não muda.
 */

/* ============================================================
   PEÇAS COMPARTILHADAS (DRY)
   Todos os visuais usam a mesma moldura de janela. Ela vive aqui uma vez só.
   ============================================================ */

/** A janela com barra de título — a mesma linguagem do painel do hero. */
function Moldura({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    // aria-hidden: o visual é ilustrativo. Quem usa leitor de tela já recebeu
    // a informação pelo texto do bloco; ouvir a decoração seria ruído.
    <div className={css.moldura} aria-hidden="true">
      <div className={css.molduraBarra}>
        <span className={css.molduraPontos}>
          <i />
          <i />
          <i />
        </span>
        <span className={css.molduraTitulo}>{titulo}</span>
      </div>
      <div className={css.molduraCorpo}>{children}</div>
    </div>
  )
}

/** Barra cinza que representa uma linha de texto. `w` é a largura em %. */
function Linha({ w, forte = false }: { w: number; forte?: boolean }) {
  return (
    <span
      className={forte ? css.linhaForte : css.linha}
      style={{ width: `${w}%` }}
    />
  )
}

/* ============================================================
   01 — SOFTWARE SOB MEDIDA
   Um painel de sistema: menu lateral, indicadores e gráfico.
   ============================================================ */

function VisualSoftware() {
  // Alturas do gráfico em %. Ficam fora do JSX para o markup não virar
  // uma parede de números mágicos.
  const barras = [38, 62, 45, 78, 56, 92, 70]

  return (
    <Moldura titulo="painel-operacional">
      <div className={css.appLayout}>
        {/* Menu lateral */}
        <div className={css.appMenu}>
          <span className={css.appMenuItemAtivo} />
          <span className={css.appMenuItem} />
          <span className={css.appMenuItem} />
          <span className={css.appMenuItem} />
        </div>

        <div className={css.appConteudo}>
          {/* Três indicadores no topo */}
          {/* Números ilustrativos de um painel de operação — deliberadamente
              genéricos, sem contexto de lead ou venda: o sistema sob medida
              pode ser de qualquer área da empresa. */}
          <div className={css.appIndicadores}>
            <div className={css.appCartao}>
              <span className={css.appCartaoValor}>1.284</span>
              <Linha w={70} />
            </div>
            <div className={css.appCartao}>
              <span className={css.appCartaoValor}>97%</span>
              <Linha w={55} />
            </div>
            <div className={css.appCartao}>
              <span className={css.appCartaoValorDestaque}>12</span>
              <Linha w={62} />
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className={css.grafico}>
            {barras.map((altura, i) => (
              <span
                key={i}
                // A última barra recebe a cor de ação: o olho segue a
                // sequência e para no resultado. Uma cor, um destino.
                className={i === barras.length - 1 ? css.barraDestaque : css.barra}
                style={{ height: `${altura}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Moldura>
  )
}

/* ============================================================
   02 — AGENTES DE IA
   Uma FROTA de agentes, um por área da empresa.

   O visual anterior mostrava um agente só executando uma tarefa. Estava
   estreito: a OMNI.IA constrói agentes para marketing, financeiro, relatórios,
   atendimento — e configura o assistente do próprio empresário. O desenho
   precisa comunicar essa amplitude na primeira olhada, porque é ela que
   diferencia "montamos um chatbot" de "montamos a sua operação com IA".
   ============================================================ */

function VisualAgentes() {
  /**
   * Cada linha é um agente rodando numa área diferente.
   * `ativo` marca o que está trabalhando agora — os demais já entregaram.
   */
  const agentes = [
    { area: 'marketing', resultado: 'relatório semanal', ativo: false },
    { area: 'financeiro', resultado: '34 notas conferidas', ativo: false },
    { area: 'atendimento', resultado: '12 conversas', ativo: true },
    { area: 'comercial', resultado: 'proposta gerada', ativo: false },
  ]

  return (
    <Moldura titulo="agentes · em operação">
      <div className={css.frota}>
        {agentes.map((agente) => (
          <div key={agente.area} className={css.agente}>
            <span className={agente.ativo ? css.agenteAtivo : css.agenteOk}>
              {agente.ativo ? '●' : '✓'}
            </span>
            <span className={css.agenteArea}>{agente.area}</span>
            <span className={css.agenteResultado}>{agente.resultado}</span>
          </div>
        ))}

        {/* O fecho do desenho.
            "4 agentes" era número solto — não prova nada e não dói em ninguém.
            "ninguém precisa cobrar" mira a dor diária de quem tem equipe:
            o dono não gerencia tarefa, ele gerencia gente que esquece. Agente
            não esquece, não adoece e não precisa ser lembrado. */}
        <div className={css.frotaRodape}>
          <span>executam em paralelo</span>
          <span className={css.frotaSeta}>·</span>
          <span className={css.frotaResultado}>ninguém precisa cobrar</span>
        </div>
      </div>
    </Moldura>
  )
}

/* ============================================================
   03 — APLICATIVOS
   Um celular com a tela do app.
   ============================================================ */

function VisualAplicativos() {
  return (
    <Moldura titulo="app · campo">
      <div className={css.celularArea}>
        <div className={css.celular}>
          <span className={css.celularEntalhe} />

          <div className={css.celularTela}>
            <div className={css.celularCabecalho}>
              <Linha w={45} forte />
              <Linha w={70} />
            </div>

            {/* Lista de tarefas: duas concluídas, uma em andamento */}
            <div className={css.tarefa}>
              <span className={css.marcaFeita} />
              <Linha w={72} />
            </div>
            <div className={css.tarefa}>
              <span className={css.marcaFeita} />
              <Linha w={58} />
            </div>
            <div className={css.tarefaAtiva}>
              <span className={css.marcaAtiva} />
              <Linha w={80} forte />
            </div>
            <div className={css.tarefa}>
              <span className={css.marcaVazia} />
              <Linha w={64} />
            </div>
          </div>
        </div>

        {/* Selo de funcionamento sem internet — é o diferencial do bloco */}
        <div className={css.selo}>
          <span className={css.seloPonto} />
          funciona offline
        </div>
      </div>
    </Moldura>
  )
}

/* ============================================================
   04 — SITES
   Um esqueleto de página com as métricas que importam.
   ============================================================ */

function VisualSites() {
  return (
    <Moldura titulo="site · desempenho">
      <div className={css.pagina}>
        {/* Cabeçalho do site */}
        <div className={css.paginaNav}>
          <span className={css.paginaLogo} />
          <span className={css.paginaLinks}>
            <i />
            <i />
            <i />
          </span>
        </div>

        {/* Hero do site */}
        <div className={css.paginaHero}>
          <Linha w={78} forte />
          <Linha w={52} forte />
          <Linha w={90} />
          <span className={css.paginaBotao} />
        </div>

        {/* As três notas de desempenho */}
        <div className={css.notas}>
          <div className={css.nota}>
            <span className={css.notaValor}>0.9s</span>
            <span className={css.notaRotulo}>carregamento</span>
          </div>
          <div className={css.nota}>
            <span className={css.notaValor}>100</span>
            <span className={css.notaRotulo}>desempenho</span>
          </div>
          <div className={css.nota}>
            <span className={css.notaValorDestaque}>AI</span>
            <span className={css.notaRotulo}>legível</span>
          </div>
        </div>
      </div>
    </Moldura>
  )
}

/* ============================================================
   05 — AUTOMAÇÕES E CRM
   Um fluxo de nós conectados. Feito em SVG porque são linhas e curvas —
   é para isso que SVG existe; com divs viraria gambiarra de posicionamento.
   ============================================================ */

function VisualAutomacoes() {
  /**
   * Os nós do fluxo, com coordenadas na caixa 300x180 do SVG.
   * Descrever como dado (e não como 6 blocos de JSX repetidos) mantém o
   * desenho legível e permite mudar o fluxo mexendo só nesta lista.
   */
  const nos = [
    { x: 26, y: 34, rotulo: 'ERP' },
    { x: 26, y: 90, rotulo: 'Planilhas' },
    { x: 26, y: 146, rotulo: 'E-mail' },
  ]

  return (
    <Moldura titulo="fluxo · integração">
      <svg
        className={css.fluxo}
        viewBox="0 0 300 180"
        // preserveAspectRatio garante que o desenho não distorça ao esticar.
        preserveAspectRatio="xMidYMid meet"
      >
        {/* As conexões vêm ANTES dos nós no código: em SVG não existe
            z-index — quem é desenhado depois fica por cima. */}
        {nos.map((no) => (
          <path
            key={no.rotulo}
            // Curva de Bézier: M = origem, C = curva com dois pontos de
            // controle. Curva parece "fluxo"; reta parece diagrama de manual.
            d={`M ${no.x + 42} ${no.y} C 110 ${no.y}, 110 90, 142 90`}
            className={css.fluxoLinha}
          />
        ))}
        <path d="M 178 90 C 205 90, 205 90, 232 90" className={css.fluxoLinhaAtiva} />

        {/* Nós de entrada */}
        {nos.map((no) => (
          <g key={no.rotulo}>
            <rect
              x={no.x - 18}
              y={no.y - 13}
              width={60}
              height={26}
              rx={6}
              className={css.fluxoCaixa}
            />
            <circle cx={no.x + 12} cy={no.y} r={2.5} className={css.fluxoPonto} />
          </g>
        ))}

        {/* Nó central: o motor da automação */}
        <rect x={142} y={72} width={36} height={36} rx={8} className={css.fluxoMotor} />
        <circle cx={160} cy={90} r={4} className={css.fluxoMotorNucleo} />

        {/* Nó final: o CRM preenchido */}
        <rect x={232} y={74} width={46} height={32} rx={6} className={css.fluxoDestino} />
        <rect x={240} y={83} width={30} height={2.5} rx={1.25} className={css.fluxoPonto} />
        <rect x={240} y={91} width={20} height={2.5} rx={1.25} className={css.fluxoPonto} />
      </svg>

      <div className={css.fluxoRodape}>
        <span>3 sistemas</span>
        <span className={css.fluxoSeta}>→</span>
        <span>1 fluxo</span>
        <span className={css.fluxoSeta}>→</span>
        <span className={css.fluxoResultado}>0 digitação</span>
      </div>
    </Moldura>
  )
}

/* ============================================================
   06 — INFRAESTRUTURA DEDICADA
   As camadas do servidor, empilhadas.
   ============================================================ */

function VisualInfra() {
  const camadas = [
    { rotulo: 'Aplicação', detalhe: 'sua' },
    { rotulo: 'Banco de dados', detalhe: 'isolado' },
    { rotulo: 'Rede · SSL', detalhe: 'criptografada' },
    { rotulo: 'Servidor', detalhe: 'exclusivo' },
  ]

  return (
    <Moldura titulo="vps · dedicada">
      <div className={css.pilha}>
        {camadas.map((camada) => (
          <div key={camada.rotulo} className={css.camada}>
            <span className={css.camadaRotulo}>{camada.rotulo}</span>
            <span className={css.camadaDetalhe}>{camada.detalhe}</span>
          </div>
        ))}

        <div className={css.statusInfra}>
          <span className={css.statusPonto} />
          <span>monitorado 24/7</span>
          <span className={css.statusUptime}>backup diário</span>
        </div>
      </div>
    </Moldura>
  )
}

/* ============================================================
   ROTEADOR
   ============================================================ */

/**
 * Mapa de id do serviço → visual.
 *
 * Fica FORA do componente de propósito: se ficasse dentro, o objeto seria
 * recriado a cada render. Aqui ele é criado uma vez, quando o módulo carrega.
 *
 * E um mapa é melhor que uma cadeia de `if/else`: acrescentar um serviço vira
 * uma linha nova, sem tocar em lógica. É o padrão "objeto como tabela de
 * despacho" — o mesmo princípio de um `switch`, mas sem o `switch`.
 */
const VISUAIS: Record<string, () => ReactNode> = {
  software: VisualSoftware,
  agentes: VisualAgentes,
  aplicativos: VisualAplicativos,
  sites: VisualSites,
  automacoes: VisualAutomacoes,
  infra: VisualInfra,
}

/** Renderiza o visual do serviço. Sem visual cadastrado, não desenha nada. */
export function VisualServico({ id }: { id: string }) {
  const Visual = VISUAIS[id]
  return Visual ? <Visual /> : null
}
