import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 8127,
    open: false,
    // Configurar el servidor para servir archivos estáticos correctamente
    fs: {
      strict: false
    }
  },
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        articulos: './articulos.html',
        'aula-virtual': './aula-virtual.html',
        biblioteca: './biblioteca.html',
        buscar: './buscar.html',
        calendario: './calendario.html',
        carreras: './carreras.html',
        contacto: './contacto.html',
        'curso-archivistica-basica': './curso-archivistica-basica.html',
        'curso-conservacion-preventiva': './curso-conservacion-preventiva.html',
        'curso-gestion-documental-sector-publico': './curso-gestion-documental-sector-publico.html',
        cursos: './cursos.html',
        dashboard: './dashboard.html',
        'equipo-docente': './equipo-docente.html',
        foros: './foros.html',
        galeria: './galeria.html',
        historia: './historia.html',
        'iniciar-sesion': './iniciar-sesion.html',
        inscribirse: './inscribirse.html',
        mensajes: './mensajes.html',
        'mis-cursos': './mis-cursos.html',
        normas: './normas.html',
        tareas: './tareas.html'
      }
    }
  },
  // Eliminar alias que causaban problemas
  css: {
    devSourcemap: true
  },
  // Configuración para mejor rendimiento
  esbuild: {
    target: 'es2015'
  }
})
