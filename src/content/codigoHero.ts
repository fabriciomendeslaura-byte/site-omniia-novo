/**
 * O código exibido no painel do topo da página.
 *
 * POR QUE É DADO E NÃO TEXTO SOLTO
 * Para colorir a sintaxe existiriam três caminhos:
 *   1. Uma biblioteca de highlight → +40 KB no pacote, para um bloco decorativo.
 *   2. `dangerouslySetInnerHTML` com HTML montado à mão → porta aberta para XSS
 *      no dia em que esse texto vier de fora (um CMS, uma API).
 *   3. Descrever o código como DADOS e deixar o React desenhar → 0 KB extra e
 *      seguro por construção, porque o React escapa todo texto que renderiza.
 * Escolhemos o 3.
 *
 * ⭐ OS COMENTÁRIOS SÃO A COPY
 * Este bloco tem dois leitores ao mesmo tempo:
 *   • quem programa lê o CÓDIGO e reconhece que a casa sabe o que faz;
 *   • quem decide a compra lê os COMENTÁRIOS em português e entende o produto.
 *
 * ⚠️ HISTÓRICO DAS DUAS CORREÇÕES (08/09/2026)
 * 1ª versão: um agente de ATENDIMENTO (lead, WhatsApp, reunião marcada).
 *    Errado — é um caso de uso só, e ainda por cima o do SaaS.
 * 2ª versão: um agente genérico com ferramentas. Melhor, mas ainda estreito:
 *    dava a entender que a entrega é UM agente.
 * Versão atual: uma FROTA — um agente por função da empresa (marketing,
 *    financeiro, atendimento) mais a configuração do assistente do próprio
 *    empresário. É essa amplitude que separa "montamos um chatbot" de
 *    "montamos a sua operação com IA", e é ela que precisa aparecer primeiro.
 */

/** Papel de cada pedaço na hora de pintar. */
export type TipoToken = 'comentario' | 'palavra' | 'funcao' | 'texto' | 'valor' | 'destaque'

export interface Token {
  t: string
  tipo: TipoToken
}

/** Cada item é uma linha; cada linha é uma lista de pedaços coloridos. */
export const CODIGO_HERO: Token[][] = [
  [{ t: '// um agente para cada função que consome seu time', tipo: 'comentario' }],
  [
    { t: 'const ', tipo: 'palavra' },
    { t: 'operacao', tipo: 'texto' },
    { t: ' = ', tipo: 'texto' },
    { t: 'criarFrota', tipo: 'funcao' },
    { t: '([', tipo: 'texto' },
  ],
  [
    { t: '  agente', tipo: 'funcao' },
    { t: '(', tipo: 'texto' },
    { t: "'marketing'", tipo: 'valor' },
    { t: ',   [relatorios, campanhas]),', tipo: 'texto' },
  ],
  [
    { t: '  agente', tipo: 'funcao' },
    { t: '(', tipo: 'texto' },
    { t: "'financeiro'", tipo: 'valor' },
    { t: ',  [lerNotas, conciliar]),', tipo: 'texto' },
  ],
  [
    { t: '  agente', tipo: 'funcao' },
    { t: '(', tipo: 'texto' },
    { t: "'atendimento'", tipo: 'valor' },
    { t: ', [responder, agendar]),', tipo: 'texto' },
  ],
  [{ t: '])', tipo: 'texto' }],
  [],
  [{ t: '// e o seu, configurado do seu jeito', tipo: 'comentario' }],
  [
    { t: 'const ', tipo: 'palavra' },
    { t: 'assistente', tipo: 'texto' },
    { t: ' = ', tipo: 'texto' },
    { t: 'configurar', tipo: 'funcao' },
    { t: '({', tipo: 'texto' },
  ],
  [
    { t: '  skills: [analisarDados, escreverProposta],', tipo: 'texto' },
  ],
  [
    { t: '  contexto: ', tipo: 'texto' },
    { t: 'documentos', tipo: 'texto' },
    { t: '.', tipo: 'texto' },
    { t: 'daEmpresa', tipo: 'funcao' },
    { t: '(),', tipo: 'texto' },
  ],
  [{ t: '})', tipo: 'texto' }],
  [],
  [{ t: '// eles trabalham em paralelo, sem ninguém coordenando', tipo: 'comentario' }],
  [
    { t: 'await ', tipo: 'palavra' },
    { t: 'operacao', tipo: 'texto' },
    { t: '.', tipo: 'texto' },
    { t: 'executar', tipo: 'destaque' },
    { t: '()', tipo: 'texto' },
  ],
]

/** Rótulo do "arquivo aberto" no painel. */
export const ARQUIVO_HERO = 'agente/frota.ts'

/**
 * Rodapé do painel — a assinatura técnica do bloco.
 *
 * Fica aqui, e não escrito dentro do componente, porque é TEXTO — e texto do
 * site mora no `content/`. Mudar uma frase não pode exigir abrir um arquivo
 * de componente e arriscar quebrar layout.
 *
 * POR QUE "ARQUITETURA DE AGENTES" E NÃO "4 AGENTES EM PRODUÇÃO"
 * O número não prova nada: quatro agentes podem ser quatro prompts colados
 * num n8n. A objeção silenciosa de quem lê é "qualquer um faz isso com
 * ChatGPT" — e ela precisa morrer nesta linha.
 *
 * Os três termos escolhidos são exatamente o que NÃO se resolve com prompt:
 *   • orquestração → vários agentes coordenados sem virar bagunça
 *   • memória      → contexto que persiste entre execuções
 *   • permissões   → o agente acessa só o que pode (e isso é segurança)
 * Quem é técnico reconhece o peso; quem não é percebe que ali tem engenharia.
 */
export const RODAPE_HERO = 'arquitetura de agentes · orquestração, memória e permissões'
