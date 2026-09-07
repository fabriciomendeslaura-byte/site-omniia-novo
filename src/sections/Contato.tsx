import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useFormularioContato } from '@/hooks/useFormularioContato'
import {
  FATURAMENTOS,
  INTERESSES,
  SECAO_CONTATO,
  VOLUMES_LEADS,
  linkWhatsApp,
} from '@/content/site'
import css from './Contato.module.css'

/**
 * Contato — a conversão.
 *
 * Este componente cuida só da APARÊNCIA. Validação, envio e tratamento de erro
 * moram em `useFormularioContato`.
 *
 * ACESSIBILIDADE DE FORMULÁRIO (o que a maioria erra)
 * • Todo campo tem <label> ligado por `htmlFor`/`id` — sem isso o leitor de
 *   tela anuncia "campo de texto" e o usuário não sabe o que digitar.
 * • Erro ligado ao campo por `aria-describedby`, e não só pintado de vermelho:
 *   quem não enxerga cor precisa OUVIR qual é o problema.
 * • `aria-invalid` marca o campo com erro.
 * • O aviso de sucesso é `role="status"`, então é anunciado quando aparece.
 */
export function Contato() {
  const { dados, erros, situacao, alterar, enviar } = useFormularioContato()

  // Enviado com sucesso: o formulário sai e dá lugar à confirmação. Manter o
  // formulário na tela depois do envio convida ao envio duplicado.
  //
  // Sem botão de WhatsApp aqui: a automação já iniciou a conversa no número
  // informado. Mandar a pessoa "falar com a gente" seria pedir que ela
  // procurasse um atendimento que já está esperando por ela.
  if (situacao === 'sucesso') {
    return (
      <Container as="section" id="contato" className={css.secao}>
        <div className={css.sucesso} role="status">
          <span className={css.sucessoMarca}>✓</span>
          <h2 className={css.sucessoTitulo}>{SECAO_CONTATO.sucessoTitulo}</h2>
          <p className={css.sucessoTexto}>{SECAO_CONTATO.sucessoTexto}</p>
        </div>
      </Container>
    )
  }

  return (
    <Container as="section" id="contato" className={css.secao}>
      <div className={css.grade}>
        {/* Coluna de texto */}
        <Reveal className={css.colunaTexto}>
          <p className={css.etiqueta}>
            <span className={css.etiquetaBarra}>//</span>
            {SECAO_CONTATO.etiqueta}
          </p>

          <h2 className={css.titulo}>
            {SECAO_CONTATO.titulo}{' '}
            <span className={css.tituloDestaque}>{SECAO_CONTATO.tituloDestaque}</span>
          </h2>

          <p className={css.descricao}>{SECAO_CONTATO.descricao}</p>

          <ul className={css.garantias} role="list">
            {SECAO_CONTATO.garantias.map((garantia) => (
              <li key={garantia} className={css.garantia}>
                {garantia}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Coluna do formulário */}
        <Reveal atraso={120} className={css.colunaForm}>
          {/* noValidate desliga as mensagens do navegador: elas aparecem em
              inglês, ignoram o design e uma por vez. As nossas são em
              português, no estilo do site e todas de uma vez. */}
          <form className={css.formulario} onSubmit={enviar} noValidate>
            {/* A armadilha (honeypot). Escondida por CSS, não por `hidden`:
                robô costuma ignorar campo com `hidden`, mas preenche o que
                está apenas fora da tela. `tabIndex={-1}` mantém fora do Tab. */}
            <div className={css.armadilha} aria-hidden="true">
              <label htmlFor="empresa-site">Não preencha este campo</label>
              <input
                id="empresa-site"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={dados.armadilha}
                onChange={(e) => alterar('armadilha', e.target.value)}
              />
            </div>

            <div className={css.linha}>
              <div className={css.campo}>
                <label htmlFor="nome" className={css.rotulo}>
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  className={css.entrada}
                  value={dados.nome}
                  onChange={(e) => alterar('nome', e.target.value)}
                  aria-invalid={Boolean(erros.nome)}
                  aria-describedby={erros.nome ? 'erro-nome' : undefined}
                  autoComplete="name"
                  placeholder="Como podemos te chamar"
                />
                {erros.nome && (
                  <span id="erro-nome" className={css.erro}>
                    {erros.nome}
                  </span>
                )}
              </div>

              <div className={css.campo}>
                <label htmlFor="email" className={css.rotulo}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className={css.entrada}
                  value={dados.email}
                  onChange={(e) => alterar('email', e.target.value)}
                  aria-invalid={Boolean(erros.email)}
                  aria-describedby={erros.email ? 'erro-email' : undefined}
                  autoComplete="email"
                  placeholder="voce@suaempresa.com.br"
                />
                {erros.email && (
                  <span id="erro-email" className={css.erro}>
                    {erros.email}
                  </span>
                )}
              </div>
            </div>

            <div className={css.linha}>
              <div className={css.campo}>
                <label htmlFor="whatsapp" className={css.rotulo}>
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  /* type="tel" faz o celular abrir o teclado numérico —
                     detalhe pequeno que reduz muito o abandono no mobile. */
                  type="tel"
                  className={css.entrada}
                  value={dados.whatsapp}
                  onChange={(e) => alterar('whatsapp', e.target.value)}
                  aria-invalid={Boolean(erros.whatsapp)}
                  aria-describedby={erros.whatsapp ? 'erro-whatsapp' : undefined}
                  autoComplete="tel"
                  placeholder="(21) 90000-0000"
                />
                {erros.whatsapp && (
                  <span id="erro-whatsapp" className={css.erro}>
                    {erros.whatsapp}
                  </span>
                )}
              </div>

              <div className={css.campo}>
                <label htmlFor="empresa" className={css.rotulo}>
                  Empresa
                </label>
                <input
                  id="empresa"
                  type="text"
                  className={css.entrada}
                  value={dados.empresa}
                  onChange={(e) => alterar('empresa', e.target.value)}
                  aria-invalid={Boolean(erros.empresa)}
                  aria-describedby={erros.empresa ? 'erro-empresa' : undefined}
                  autoComplete="organization"
                  placeholder="Nome da sua empresa"
                />
                {erros.empresa && (
                  <span id="erro-empresa" className={css.erro}>
                    {erros.empresa}
                  </span>
                )}
              </div>
            </div>

            <div className={css.linha}>
              <div className={css.campo}>
                <label htmlFor="interesse" className={css.rotulo}>
                  O que você procura
                </label>
                <select
                  id="interesse"
                  className={css.entrada}
                  value={dados.interesse}
                  onChange={(e) => alterar('interesse', e.target.value)}
                  aria-invalid={Boolean(erros.interesse)}
                  aria-describedby={erros.interesse ? 'erro-interesse' : undefined}
                >
                  <option value="">Selecione</option>
                  {INTERESSES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {erros.interesse && (
                  <span id="erro-interesse" className={css.erro}>
                    {erros.interesse}
                  </span>
                )}
              </div>

              <div className={css.campo}>
                <label htmlFor="faturamento" className={css.rotulo}>
                  Faturamento mensal <span className={css.opcional}>opcional</span>
                </label>
                <select
                  id="faturamento"
                  className={css.entrada}
                  value={dados.faturamento}
                  onChange={(e) => alterar('faturamento', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {FATURAMENTOS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Os dois campos de QUALIFICAÇÃO ficam juntos, na mesma linha.
                Agrupar é intencional: a pessoa entende que ali é o bloco
                "sobre o tamanho da operação" e responde os dois de uma vez,
                em vez de tratar cada um como uma pergunta nova. */}
            <div className={css.linha}>
              <div className={css.campo}>
                <label htmlFor="leads" className={css.rotulo}>
                  Leads por dia <span className={css.opcional}>opcional</span>
                </label>
                <select
                  id="leads"
                  className={css.entrada}
                  value={dados.leads}
                  onChange={(e) => alterar('leads', e.target.value)}
                >
                  <option value="">Selecione</option>
                  {VOLUMES_LEADS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className={css.campo}>
                <label htmlFor="site" className={css.rotulo}>
                  Site ou LinkedIn <span className={css.opcional}>opcional</span>
                </label>
                <input
                  id="site"
                  type="text"
                  className={css.entrada}
                  value={dados.site}
                  onChange={(e) => alterar('site', e.target.value)}
                  autoComplete="url"
                  placeholder="suaempresa.com.br"
                />
              </div>
            </div>

            <div className={css.campo}>
              <label htmlFor="mensagem" className={css.rotulo}>
                Conte sobre a sua operação
              </label>
              <textarea
                id="mensagem"
                className={[css.entrada, css.area].join(' ')}
                value={dados.mensagem}
                onChange={(e) => alterar('mensagem', e.target.value)}
                aria-invalid={Boolean(erros.mensagem)}
                aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
                rows={4}
                maxLength={2000}
                placeholder="O que consome mais tempo do seu time hoje? Quais sistemas vocês usam?"
              />
              {erros.mensagem && (
                <span id="erro-mensagem" className={css.erro}>
                  {erros.mensagem}
                </span>
              )}
            </div>

            {/**
             * CONSENTIMENTO — LGPD.
             * Nunca vem marcado por padrão: a lei exige manifestação livre e
             * inequívoca, e caixa pré-marcada não é escolha. O texto diz a
             * finalidade específica, porque consentimento genérico não vale.
             */}
            <div className={css.consentimento}>
              <label className={css.caixaRotulo}>
                <input
                  type="checkbox"
                  className={css.caixa}
                  checked={dados.consentimento}
                  onChange={(e) => alterar('consentimento', e.target.checked)}
                  aria-invalid={Boolean(erros.consentimento)}
                  aria-describedby={erros.consentimento ? 'erro-consentimento' : undefined}
                />
                <span>
                  Autorizo a OMNI.IA a usar meus dados para responder a esta solicitação,
                  conforme a{' '}
                  <a href="#privacidade" className={css.link}>
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>
              {erros.consentimento && (
                <span id="erro-consentimento" className={css.erro}>
                  {erros.consentimento}
                </span>
              )}
            </div>

            <Button type="submit" variante="primario" disabled={situacao === 'enviando'}>
              {situacao === 'enviando' ? SECAO_CONTATO.botaoEnviando : SECAO_CONTATO.botao}
            </Button>

            {/* role="alert" faz o leitor de tela interromper e anunciar o erro
                assim que ele aparece — falha de envio não pode passar batida. */}
            {situacao === 'erro' && (
              <p className={css.avisoErro} role="alert">
                {SECAO_CONTATO.erroTexto}{' '}
                <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className={css.link}>
                  Abrir o WhatsApp
                </a>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Container>
  )
}
