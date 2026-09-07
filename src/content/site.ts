/**
 * Conteúdo do site — TEXTO, separado do CÓDIGO.
 *
 * Por que um arquivo só para texto: mudar uma frase não pode exigir abrir um
 * componente React e arriscar quebrar layout. Aqui o texto é dado; lá é
 * apresentação. É o mesmo princípio de separar conteúdo de estilo — cada coisa
 * tem uma responsabilidade só (SRP).
 *
 * Fonte do conteúdo: site atual omniiabr.tech (extraído em 07/09/2026).
 * Ver docs/BRIEFING-NOVO-SITE.md §2.
 */

/** Dados fixos da empresa — usados em vários lugares (nav, rodapé, links). */
export const EMPRESA = {
  nome: 'OMNI.IA',
  razao: 'OMNI.IA Tecnologia',
  local: 'Rio de Janeiro · atendemos todo o Brasil',
  /**
   * E-mail oficial. Também é o canal para o titular exercer os direitos da
   * LGPD — a lei pede um meio de contato, e e-mail deixa registro para as
   * duas partes, diferente de uma conversa de WhatsApp.
   */
  email: 'contato@omniiabr.tech',
  instagram: 'https://www.instagram.com/omniiabr/',
  /** Número apenas com dígitos — é o formato que o link do WhatsApp exige. */
  whatsappNumero: '5521994277725',
  whatsappExibicao: '+55 (21) 99427-7725',
  /** Mensagem que já vem digitada quando o usuário abre a conversa. */
  whatsappMensagem: 'Olá! Gostaria de agendar uma consultoria gratuita.',
} as const

/**
 * Monta o link do WhatsApp com a mensagem pré-preenchida.
 *
 * `encodeURIComponent` é obrigatório: a mensagem tem espaços e acentos, e
 * caractere não codificado dentro de URL quebra o link (ou pior, permite
 * injetar parâmetro extra na query string).
 */
export const linkWhatsApp = (mensagem: string = EMPRESA.whatsappMensagem): string =>
  `https://wa.me/${EMPRESA.whatsappNumero}?text=${encodeURIComponent(mensagem)}`

/** Itens da navegação. `href` aponta para o id da seção na página. */
export const NAVEGACAO = [
  { rotulo: 'O que fazemos', href: '#servicos' },
  { rotulo: 'Como funciona', href: '#processo' },
  { rotulo: 'Infraestrutura', href: '#infraestrutura' },
  { rotulo: 'Dúvidas', href: '#faq' },
] as const

/** Texto do topo da página. */
export const HERO = {
  /** Etiqueta pequena acima do título — dá contexto antes de a pessoa ler o resto. */
  etiqueta: 'Engenharia de software e IA',
  /** O título é quebrado em partes para dar destaque só na última linha. */
  tituloLinhas: ['Sua empresa', 'operando com'],
  tituloDestaque: 'Inteligência Artificial.',
  subtitulo:
    'Não entregamos apenas Agentes de IA. Desenvolvemos uma estrutura inteligente que automatiza processos, organiza a operação e impulsiona o crescimento da sua empresa.',
  ctaPrimario: 'Quero meu diagnóstico gratuito',
  ctaSecundario: 'Falar com especialista',
  /**
   * Reforços de confiança logo abaixo dos botões.
   *
   * "Resposta na hora" no lugar de "em 24h úteis": prazo longo dá ao visitante
   * a desculpa para adiar — ele fecha a aba pensando "depois eu vejo". Resposta
   * imediata remove o atrito de começar a conversa AGORA, que é o único momento
   * em que ele está interessado.
   *
   * ⚠️ É uma promessa operacional: só vale porque o agente atende de fato na
   * hora. Se um dia isso deixar de ser verdade, esta linha muda junto —
   * promessa que o site faz e a operação não cumpre custa mais caro que a
   * conversa que ela trouxe.
   */
  garantias: ['Diagnóstico gratuito', 'Resposta na hora', 'Sem compromisso'],
} as const


/** Cabeçalho da seção de serviços. */
export const SECAO_SERVICOS = {
  etiqueta: 'O que construímos',
  titulo: 'Software feito para a sua operação,',
  tituloDestaque: 'não para a média do mercado.',
  descricao:
    'Sistema pronto resolve o problema médio de todo mundo. O seu não é o médio — por isso a gente parte do seu processo, e não de um template.',
} as const

/**
 * O que a empresa vende. Cada item vira um bloco na seção de serviços.
 *
 * A ORDEM É ARGUMENTO (decidido em 08/09/2026)
 * O visitante lê de cima para baixo e conclui quem somos nos dois primeiros
 * blocos. Começando por software e aplicativos, ele conclui "constroem software
 * de verdade". Começando por agentes de IA, concluiria "são uma agência de
 * automação" — e não leria o resto para mudar de ideia.
 *
 * `codigo` é o rótulo em fonte monoespaçada; `id` escolhe qual visual em
 * CSS/SVG acompanha o bloco (ver components/visuals).
 */
export const SERVICOS = [
  {
    id: 'software',
    codigo: '01',
    titulo: 'Software Sob Medida',
    chamada: 'Quando nenhum sistema pronto serve, a gente constrói o seu.',
    descricao:
      'Sua operação já tem um jeito de funcionar. Sistema pronto obriga a mudar esse jeito — e aí sobra planilha para tapar o que ele não faz. A gente parte do seu processo e constrói o sistema em volta dele.',
    itens: [
      'Projeto do zero, sem template',
      'Conversa com os sistemas que você já usa',
      'Relatórios e painéis em tempo real',
      'Cresce junto com a operação, sem reescrever tudo',
    ],
  },
  {
    id: 'agentes',
    codigo: '02',
    titulo: 'Agentes de IA',
    chamada: 'Um agente para cada trabalho que consome seu time.',
    descricao:
      'Marketing montando relatório toda segunda. Financeiro conferindo nota fiscal na mão. Atendimento respondendo a mesma pergunta quarenta vezes por dia. Cada uma dessas funções vira um agente — com as ferramentas, o acesso e o conhecimento que ela precisa. E se você já usa IA no dia a dia, a gente configura o seu: instruções, habilidades e acessos certos para ele trabalhar do seu jeito.',
    itens: [
      'Agentes de marketing, financeiro, relatórios e atendimento',
      'Configuramos o seu assistente de IA, com as habilidades certas',
      'Acesso aos sistemas e documentos da sua empresa',
      'Decide o próximo passo sem roteiro fixo',
    ],
  },
  {
    id: 'aplicativos',
    codigo: '03',
    titulo: 'Aplicativos',
    chamada: 'O app da sua operação, no bolso de quem executa.',
    descricao:
      'Equipe em campo, técnico na rua, vendedor na visita. Se a informação só existe no computador do escritório, ela chega tarde. Construímos o aplicativo que sua equipe usa onde o trabalho acontece.',
    itens: [
      'Funciona no celular e no tablet',
      'Continua funcionando com internet ruim',
      'Mesma base de dados do sistema web',
      'Notificação chega em quem precisa agir',
    ],
  },
  {
    id: 'sites',
    codigo: '04',
    titulo: 'Sites',
    chamada: 'Site que traz cliente, não só elogio.',
    descricao:
      'Um site bonito que ninguém encontra é um cartão de visita caro. Entregamos os dois lados: o visual que gera confiança e a estrutura técnica que faz você ser achado — rápido no 4G, pronto para o Google e legível pelas IAs que hoje respondem no lugar dele.',
    itens: [
      'Projeto do zero, sem template',
      'Estruturado para o Google e para as IAs',
      'Rápido no celular e no 4G',
      'Agente de IA integrado desde o lançamento',
    ],
  },
  {
    id: 'automacoes',
    codigo: '05',
    titulo: 'Automações e Integrações',
    chamada: 'Automatizamos o que consome o seu dia.',
    descricao:
      'O relatório que alguém monta na mão toda segunda-feira. O dado digitado duas vezes porque os sistemas não conversam. A aprovação que dorme no e-mail. A gente liga as pontas e isso passa a acontecer sozinho, no horário certo, sem ninguém lembrar.',
    itens: [
      'Integração entre sistemas que não conversam',
      'Tarefas repetitivas rodando sozinhas',
      'Relatórios que chegam prontos',
      'Alerta quando algo sai do padrão',
    ],
  },
  {
    id: 'infra',
    codigo: '06',
    titulo: 'Infraestrutura Dedicada',
    chamada: 'Seu sistema roda em servidor exclusivo. Não em condomínio.',
    descricao:
      'Nuvem compartilhada quer dizer que o pico de outro cliente vira a sua lentidão. Cada projeto nosso sobe em uma VPS própria, com os processos isolados, tráfego criptografado e backup diário em mais de um lugar. O acesso e os dados ficam no seu nome.',
    itens: [
      'Servidor exclusivo, sem vizinho dividindo recursos',
      'Tráfego criptografado com certificado SSL',
      'Backup automático diário, em mais de um lugar',
      'Monitoramento 24/7 com alerta antes de você notar',
    ],
  },
] as const

/** Tipo derivado do próprio dado — se um serviço mudar, o tipo acompanha sozinho. */
export type Servico = (typeof SERVICOS)[number]

/**
 * A engenharia por trás — a seção de PROVA.
 *
 * ⚠️ POR QUE ELA EXISTE, E POR QUE NÃO TEM DEPOIMENTO
 * Toda página de serviço tem uma seção de credibilidade, e o padrão do mercado
 * é prova social: logo de cliente, depoimento, "+200 projetos entregues".
 * A OMNI.IA está em pré-lançamento e não tem cliente pagante — inventar
 * qualquer um desses seria mentira que uma ligação derruba.
 *
 * A saída é PROVA TÉCNICA: em vez de "outros confiaram", mostramos "olha como
 * é feito por dentro". Para comprador desconfiado ou tecnicamente informado,
 * isso costuma pesar mais que depoimento — e é a única versão honesta.
 *
 * Cada pilar abaixo descreve uma prática real, verificável em qualquer projeto
 * entregue. Nada aqui é aspiração.
 */
export const SECAO_ENGENHARIA = {
  etiqueta: 'Como construímos',
  titulo: 'Você não vê a engenharia.',
  tituloDestaque: 'Você sente quando ela falta.',
  descricao:
    'Sistema mal feito não avisa. Ele funciona na demonstração, quebra no volume, some com dado e vira refém de quem escreveu. O que separa um do outro é o que ninguém mostra no orçamento.',
} as const

/** Os pilares da prática de engenharia. */
export const PILARES = [
  {
    codigo: '01',
    titulo: 'Segurança desde a primeira linha',
    descricao:
      'Permissão validada no banco, não só na tela. Cada usuário enxerga apenas o que é dele, mesmo que alguém altere a requisição no caminho. Segredo nenhum mora no código.',
    marcador: 'RLS · validação no servidor · secrets fora do repositório',
  },
  {
    codigo: '02',
    titulo: 'Código que outro dev entende',
    descricao:
      'Tipado, comentado em português e organizado por responsabilidade. Se amanhã outra equipe assumir o projeto, ela lê e continua — sem precisar ligar para a gente.',
    marcador: 'TypeScript estrito · comentado · arquitetura em camadas',
  },
  {
    codigo: '03',
    titulo: 'Nada quebra em silêncio',
    descricao:
      'O sistema é monitorado e avisa quando algo sai do padrão. Se parar às duas da manhã, o alerta chega para nós — e não para você descobrir pelo cliente reclamando.',
    marcador: 'monitoramento 24/7 · alerta ativo · backup diário',
  },
  {
    codigo: '04',
    titulo: 'Você é dono do que construímos',
    descricao:
      'Servidor no seu nome, código no seu repositório, dados no seu banco. Nenhum projeto nasce preso à nossa infraestrutura — se um dia quiser levar, leva.',
    marcador: 'sem lock-in · acesso total · infraestrutura dedicada',
  },
] as const

/**
 * COMO FUNCIONA — os três passos até o projeto rodar.
 *
 * Objetivo desta seção: reduzir o medo de começar. "Projeto sob medida" soa
 * caro, longo e arriscado. Mostrar três passos, com o primeiro gratuito e sem
 * compromisso, derruba a barreira de dar o primeiro passo — que é a única
 * decisão que o visitante precisa tomar hoje.
 */
export const SECAO_PROCESSO = {
  etiqueta: 'Como funciona',
  titulo: 'Começa com uma conversa.',
  tituloDestaque: 'Não com um contrato.',
  descricao:
    'Cada empresa tem processos e gargalos próprios. Por isso nenhum orçamento sai antes de entendermos a sua operação — e essa primeira etapa não custa nada.',
} as const

export const PASSOS = [
  {
    codigo: '01',
    titulo: 'Diagnóstico',
    duracao: 'gratuito · sem compromisso',
    descricao:
      'Uma reunião para entender como sua operação funciona hoje. Mapeamos os gargalos, o que dá para automatizar e onde a tecnologia paga por si mesma mais rápido.',
  },
  {
    codigo: '02',
    titulo: 'Projeto e construção',
    duracao: 'prazo definido antes de começar',
    descricao:
      'Com o diagnóstico na mão, você recebe o escopo e o orçamento — sem surpresa depois. A partir da aprovação, construímos e mostramos o andamento em etapas.',
  },
  {
    codigo: '03',
    titulo: 'Operação e suporte',
    duracao: 'acompanhamento contínuo',
    descricao:
      'A entrega não termina na instalação. Acompanhamos o sistema rodando, ajustamos conforme a operação muda e monitoramos para agir antes de você notar.',
  },
] as const

/**
 * FAQ — as objeções que travam a decisão.
 *
 * As respostas vêm do site atual, onde já estavam bem escritas e testadas em
 * conversa real. A ordem é intencional: começa pelas dúvidas de processo
 * (baixo risco) e termina em preço, que é a objeção mais pesada. Perguntar
 * preço cedo demais espanta; tarde demais frustra.
 */
export const SECAO_FAQ = {
  etiqueta: 'Dúvidas frequentes',
  titulo: 'As perguntas que mais recebemos',
  tituloDestaque: 'de quem está avaliando trabalhar com a gente.',
} as const

export const PERGUNTAS = [
  {
    pergunta: 'Como funciona o processo de diagnóstico inicial?',
    resposta:
      'Nosso diagnóstico começa com uma imersão técnica e de negócio. Analisamos seus fluxos de trabalho atuais, identificamos gargalos operacionais e mapeamos onde a IA pode gerar o maior retorno imediato. Você recebe um roteiro claro de implementação baseado em dados reais, não em suposições.',
  },
  {
    pergunta: 'Como os Agentes de IA geram retorno de verdade?',
    resposta:
      'A diferença para um chatbot comum está na execução. O agente não devolve texto: ele lê o documento, consulta o sistema, atualiza o registro e reporta. Cada função que hoje consome horas do seu time — relatório, conferência, resposta repetida — deixa de consumir. O ganho aparece em horas que voltam para a operação.',
  },
  {
    pergunta: 'A integração com meus sistemas atuais é complexa?',
    resposta:
      'Nossa engenharia cuida de tudo. Utilizamos APIs de alta performance para conectar os sistemas que você já usa — ERP, CRM, calendários e gateways de pagamento. A sincronização roda em segundo plano, sem exigir esforço técnico da sua equipe.',
  },
  {
    pergunta: 'Meus dados estarão seguros?',
    resposta:
      'Sim. Não usamos nuvem compartilhada. Sua empresa recebe uma instância própria, com os processos isolados dos de qualquer outro cliente, tráfego criptografado por certificado SSL e backup automático diário. Os dados e o acesso ficam no seu nome.',
  },
  {
    pergunta: 'Vocês oferecem suporte técnico contínuo?',
    resposta:
      'Sim. A entrega não termina no dia da instalação. Acompanhamos a operação, ajustamos conforme aparecem necessidades novas e enviamos relatórios de desempenho. Se algo parar às duas da manhã, o alerta chega para nós, não para você.',
  },
  {
    pergunta: 'Quanto custa implementar a estrutura da OMNI.IA?',
    resposta:
      'Depende do tamanho do projeto: quantas áreas os agentes vão cobrir, quantas integrações são necessárias e se entra sistema sob medida. Por isso o orçamento sai depois do diagnóstico, quando já sabemos o que precisa ser construído. O diagnóstico é gratuito e sem compromisso.',
  },
] as const

/**
 * CONTATO — a conversão.
 *
 * Só existe UM caminho de conversão no site inteiro: diagnóstico gratuito.
 * Nada de plano, preço ou checkout — este é o site da empresa, não do SaaS.
 */
export const SECAO_CONTATO = {
  etiqueta: 'Diagnóstico gratuito',
  titulo: 'Conte como sua operação funciona hoje.',
  tituloDestaque: 'A gente mostra o que dá para automatizar.',
  descricao:
    'Sem compromisso e sem custo. Você descreve a operação, a gente responde com um diagnóstico do que dá para resolver com tecnologia — e do que não vale a pena mexer agora.',
  garantias: ['Resposta na hora', 'Sem compromisso', 'Seus dados não são compartilhados'],
  botao: 'Quero meu diagnóstico gratuito',
  botaoEnviando: 'Enviando…',
  sucessoTitulo: 'Recebemos sua solicitação.',
  sucessoTexto:
    'Nossa equipe vai analisar o que você contou e retornar com o diagnóstico. Se preferir adiantar, chama no WhatsApp.',
  erroTexto: 'Não conseguimos enviar agora. Tente de novo ou fale com a gente pelo WhatsApp.',
} as const

/**
 * Faixas de faturamento.
 *
 * ⚠️ ISTO É QUALIFICAÇÃO, NÃO CURIOSIDADE.
 * Projeto sob medida tem piso de custo. Saber o porte antes da conversa evita
 * gastar uma reunião com quem não tem orçamento — e evita fazer a pessoa
 * perder tempo ouvindo um valor que não cabe. Serve aos dois lados.
 */
export const FATURAMENTOS = [
  'Até R$ 50 mil/mês',
  'R$ 50 mil a R$ 200 mil/mês',
  'R$ 200 mil a R$ 500 mil/mês',
  'Acima de R$ 500 mil/mês',
  'Prefiro não informar',
] as const

/** O que a pessoa procura — direciona quem atende antes da conversa. */
export const INTERESSES = [
  'Software sob medida',
  'Agentes de IA',
  'Automações e integrações',
  'Aplicativo',
  'Site',
  'Ainda não sei — quero entender',
] as const

/**
 * POLÍTICA DE PRIVACIDADE — LGPD (Lei 13.709/2018).
 *
 * Escrita em linguagem simples de propósito. A lei exige informação "clara,
 * adequada e ostensiva": política que só advogado entende não cumpre o
 * requisito de ser informada — e ainda passa a impressão de que há algo
 * escondido.
 *
 * ✅ Canal para o titular exercer os direitos: contato@omniiabr.tech
 */
export const PRIVACIDADE = {
  titulo: 'Política de Privacidade',
  blocos: [
    {
      titulo: 'Quem trata os seus dados',
      texto:
        'A OMNI.IA Tecnologia, sediada no Rio de Janeiro, é a responsável pelos dados coletados neste site. Para qualquer assunto sobre privacidade, escreva para contato@omniiabr.tech ou chame no WhatsApp (21) 99427-7725.',
    },
    {
      titulo: 'Que dados coletamos',
      texto:
        'Somente o que você digita no formulário de diagnóstico: nome, e-mail, WhatsApp, empresa, site ou LinkedIn, faixa de faturamento (opcional), o que você procura e a descrição da sua operação. Não coletamos dado sensível, não compramos lista e não pedimos documento nem dado bancário.',
    },
    {
      titulo: 'Para que usamos',
      texto:
        'Exclusivamente para responder à sua solicitação, preparar o diagnóstico e conversar sobre o projeto. Não usamos seus dados para outra finalidade, não enviamos mensagem em massa e não fazemos disparo sem que você tenha pedido.',
    },
    {
      titulo: 'Com que autorização',
      texto:
        'Com o seu consentimento, que você dá ao marcar a caixa antes de enviar o formulário. Sem essa marcação o envio não acontece. Você pode retirar o consentimento quando quiser, e nesse caso apagamos os seus dados.',
    },
    {
      titulo: 'Com quem compartilhamos',
      texto:
        'Com ninguém. Não vendemos, não cedemos e não compartilhamos os seus dados com terceiros para fins comerciais. Eles são usados apenas dentro da nossa própria infraestrutura, pelo time que vai te atender.',
    },
    {
      titulo: 'Por quanto tempo guardamos',
      texto:
        'Enquanto durar a conversa sobre o projeto e por até 12 meses depois, para manter o histórico caso você volte a nos procurar. Passado esse prazo, os dados são apagados — ou antes, se você pedir.',
    },
    {
      titulo: 'Cookies',
      texto:
        'Usamos os cookies necessários para o site funcionar, que não identificam você. Cookies de medição e de anúncio só são ativados se você autorizar no aviso que aparece na primeira visita. Recusar não limita nada: o site funciona igual.',
    },
    {
      titulo: 'Seus direitos',
      texto:
        'A LGPD garante que você pode pedir, a qualquer momento: confirmação de que tratamos seus dados, acesso ao que temos, correção do que estiver errado, exclusão, e a revogação do consentimento. É só chamar no WhatsApp — respondemos em até 15 dias.',
    },
    {
      titulo: 'Segurança',
      texto:
        'Os dados trafegam criptografados por HTTPS e ficam em infraestrutura com acesso restrito. Nenhuma senha ou chave de acesso é armazenada neste site.',
    },
  ],
} as const
