import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

/**
 * Ponto de entrada da aplicação. É o primeiro arquivo que o navegador roda.
 *
 * A ORDEM DOS IMPORTS DE CSS IMPORTA — o último vence em caso de empate:
 * 1. tokens  → define as variáveis (as cores, medidas e tempos)
 * 2. reset   → zera as diferenças entre navegadores
 * 3. global  → aplica os tokens ao documento
 * Inverter isso faria o reset apagar o que o global acabou de definir.
 */
import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'

const container = document.getElementById('root')

// Falhar alto e cedo. Se a div sumir do index.html, o erro precisa dizer
// exatamente isso — e não um "Cannot read property of null" três telas abaixo.
if (!container) {
  throw new Error('[OMNI.IA] Elemento #root não encontrado no index.html.')
}

createRoot(container).render(
  // StrictMode roda os efeitos duas vezes em desenvolvimento de propósito, para
  // expor efeito sem limpeza (listener que não é removido, timer que não para).
  // Não roda em produção — é uma rede de segurança só para o desenvolvedor.
  <StrictMode>
    <App />
  </StrictMode>,
)
