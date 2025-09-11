import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // Permite acceso desde cualquier dispositivo en la red local
    port: 3000,
    open: true // Abre automáticamente el navegador
  },
  root: '.', // Directorio raíz del proyecto
  publicDir: 'assets', // Directorio de assets estáticos
  build: {
    outDir: 'dist', // Directorio de salida para el build
    rollupOptions: {
      input: {
        main: 'index.html',
        // Agrega aquí otras páginas principales si las necesitas
        cursos: 'cursos.html',
        'aula-virtual': 'aula-virtual.html'
      }
    }
  }
})
