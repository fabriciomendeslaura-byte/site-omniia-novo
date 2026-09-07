import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Configuração do Vite — o servidor de desenvolvimento e o empacotador do site.
 *
 * Duas coisas acontecem aqui:
 * 1. O plugin do React habilita JSX e o Fast Refresh (a tela atualiza sem perder estado).
 * 2. O alias `@` aponta para `src/`, para os imports não virarem `../../../`.
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Precisa espelhar o "paths" do tsconfig.json: o TypeScript resolve os tipos,
      // o Vite resolve o arquivo de verdade. Se os dois divergirem, o editor
      // mostra o import como válido e o build quebra.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    // Gera os .map para conseguirmos ler um erro de produção com nome de arquivo
    // e linha reais, em vez de código minificado.
    sourcemap: true,
  },
})
