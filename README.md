# 📚 Documentación del Proyecto Web - IFAP (Instituto de Formación Archivística del Perú)

## 🎯 Resumen Ejecutivo

Este proyecto es una **plataforma educativa completa** desarrollada para el **Instituto de Formación Archivística Peruano (IFAP)**. Se trata de una página web y aula virtual que ofrece formación especializada en archivística, gestión documental y preservación de documentos históricos y administrativos.

### Información del Instituto
- **Nombre**: IFAP - Instituto de Formación Archivística Peruano
- **Modalidad**: 100% Virtual (Zoom / Google Meet)
- **Especialidad**: Formación Archivística
- **Certificación**: Certificados de estudios al culminar cada curso

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS, flexbox, grid y animaciones
- **JavaScript (ES6+)**: Funcionalidades interactivas, módulos y APIs modernas
- **Font Awesome**: Iconografía consistente
- **Google Fonts**: Tipografía Roboto para una experiencia visual coherente

### Herramientas de Desarrollo
- **VS Code**: Entorno de desarrollo principal
- **Git**: Control de versiones
- **Live Server**: Servidor local para desarrollo
- **Python**: Scripts de automatización (clean_styles.py)

### Hosting y Servicios
- **GitHub Pages**: Hosting gratuito para sitios estáticos
- **Google Analytics**: Análisis de tráfico y comportamiento de usuarios
- **Google Workspace**: Servicios de email corporativo

### Futuras Implementaciones
- **Backend**: FastAPI (Python)
- **Base de Datos**: MongoDB
- **APIs**: Google Meet API, generación de PDFs

---

## 📁 Estructura del Proyecto

```
# 🏛️ Instituto de Formación Archivística del Perú (IFAP)

Plataforma educativa moderna para formación en archivística y gestión documental.

## 📁 Estructura del Proyecto

```
PAGINA-WEB-Y-AULA-VIRTUAL-IFAP/
├── html/                          # Archivos HTML organizados
│   ├── index.html                # Página principal
│   ├── cursos.html               # Catálogo de cursos
│   ├── aula-virtual.html         # Aula virtual
│   ├── contacto.html             # Formulario de contacto
│   ├── iniciar-sesion.html       # Login
│   └── inscribirse.html          # Registro
├── assets/                       # Recursos estáticos organizados
│   ├── css/                      # Hojas de estilo
│   │   ├── styles.css           # Estilos principales
│   │   ├── certificates.css     # Estilos de certificados
│   │   ├── course-detail.css    # Detalles de cursos
│   │   ├── gallery.css          # Galería
│   │   └── search.css           # Búsqueda
│   ├── js/                      # JavaScript
│   │   ├── carousel.js          # Carrusel de imágenes
│   │   ├── certificates.js      # Sistema de certificados
│   │   ├── formValidation.js    # Validación de formularios
│   │   ├── gallery.js           # Galería interactiva
│   │   ├── search.js            # Búsqueda básica
│   │   └── search-advanced.js   # Búsqueda avanzada
│   └── images/                  # Imágenes y recursos visuales
│       ├── placeholder.svg      # Placeholder genérico
│       ├── imagen2.jpg          # Imagen del hero
│       ├── imagen3.webp         # Imagen adicional
│       └── library-facebook-cover.jpg
├── dist/                        # Build de producción (Vite)
├── node_modules/                # Dependencias de Node.js
├── index.html                   # Redirección a html/index.html
├── package.json                 # Configuración de Node.js
├── vite.config.js              # Configuración de Vite
├── server.py                    # Servidor Python de desarrollo
├── manifest.json               # PWA
└── sw.js                       # Service Worker
```

## 🚀 Inicio Rápido

### Opción 1: Servidor Python (Recomendado para desarrollo)
```bash
cd /home/jorge/Desktop/PAGINA-WEB-Y-AULA-VIRTUAL-IFAP
python3 server.py 8126
```
Accede a: http://localhost:8126

### Opción 2: Vite (Desarrollo moderno con hot reload)
```bash
cd /home/jorge/Desktop/PAGINA-WEB-Y-AULA-VIRTUAL-IFAP
npm install
npm run dev
```
Accede a: http://localhost:8127

## 🎯 Características

- ✅ **Estructura organizada** por tipo de archivo
- ✅ **Optimización automática** con Vite
- ✅ **Hot reload** en desarrollo
- ✅ **PWA** lista para instalación
- ✅ **Responsive design** para móviles y desktop
- ✅ **SEO optimizado** con meta tags apropiados

## 📱 Páginas Principales

- **/** - Página principal con información institucional
- **/html/cursos.html** - Catálogo completo de cursos
- **/html/aula-virtual.html** - Plataforma de aprendizaje
- **/html/contacto.html** - Formulario de contacto
- **/html/iniciar-sesion.html** - Autenticación de usuarios
- **/html/inscribirse.html** - Registro de nuevos estudiantes

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Interactividad
- **Vite** - Build tool y dev server
- **Python** - Servidor de desarrollo alternativo

## 📊 Rendimiento Optimizado

- ✅ Archivos organizados por tipo
- ✅ CSS y JS minificados en producción
- ✅ Imágenes optimizadas
- ✅ Carga diferida (lazy loading)
- ✅ Service Worker para cache offline

## 🔧 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo con Vite
npm run build    # Genera build de producción
npm run preview  # Vista previa del build
```

## 📈 Estado del Proyecto

- ✅ Estructura completamente organizada
- ✅ Servidores funcionando correctamente
- ✅ Rendimiento optimizado
- ✅ PWA funcional
- 🔄 Backend en desarrollo (FastAPI + MongoDB)

---

**Instituto de Formación Archivística del Perú** © 2025
├── 📄 index.html                    # Página principal
├── 📄 styles.css                    # Estilos globales (4376 líneas)
├── 📄 clean_styles.py               # Script Python para limpieza de estilos
├── 📄 PLAN_IFAP.md                  # Plan completo del proyecto
├── 📄 BUSQUEDA_README.md            # Documentación del sistema de búsqueda
├── 📁 assets/                       # Recursos estáticos
│   ├── 📁 css/
│   │   ├── 📄 certificates.css      # Estilos para certificados
│   │   ├── 📄 course-detail.css     # Estilos para detalles de cursos
│   │   ├── 📄 gallery.css           # Estilos para galería
│   │   ├── 📄 search.css            # Estilos para búsqueda
│   │   └── 📄 styles.css            # Estilos adicionales
│   ├── 📁 fonts/                    # Fuentes personalizadas
│   ├── 📁 images/                   # Imágenes estáticas
│   │   └── 📄 placeholder.svg       # Placeholder SVG
│   └── 📁 js/
│       ├── 📄 carousel.js           # Funcionalidad del carrusel
│       ├── 📄 certificates.js       # Gestión de certificados
│       ├── 📄 formValidation.js     # Validación de formularios
│       ├── 📄 gallery.js            # Funcionalidad de galería
│       ├── 📄 search-advanced.js    # Búsqueda avanzada
│       └── 📄 search.js             # Motor de búsqueda principal
├── 📁 components/                   # Componentes reutilizables
├── 📁 data/                         # Datos y configuraciones
├── 📁 imagenes/                     # Imágenes del sitio
│   ├── 📄 imagen2.jpg
│   ├── 📄 imagen3.webp
│   └── 📄 library-facebook-cover.jpg
├── 📁 pages/                        # Páginas adicionales
├── 📁 video publicitario/           # Videos promocionales
│   └── 📄 IFAP INSTITUTO DE FORMACIÓN ARCHIVISTICA DE PERÚ.mp4
└── 📄 [archivos HTML individuales]   # Páginas específicas del sitio
    ├── 📄 articulos.html
    ├── 📄 aula-virtual.html
    ├── 📄 biblioteca.html
    ├── 📄 buscar.html
    ├── 📄 calendario.html
    ├── 📄 carreras.html
    ├── 📄 contacto.html
    ├── 📄 curso-archivistica-basica.html
    ├── 📄 curso-conservacion-preventiva.html
    ├── 📄 curso-gestion-documental-sector-publico.html
    ├── 📄 cursos.html
    ├── 📄 dashboard.html
    ├── 📄 equipo-docente.html
    ├── 📄 foros.html
    ├── 📄 galeria.html
    ├── 📄 header_template.html
    ├── 📄 historia.html
    ├── 📄 iniciar-sesion.html
    ├── 📄 inscribirse.html
    ├── 📄 mensajes.html
    ├── 📄 mis-cursos.html
    ├── 📄 normas.html
    ├── 📄 tareas.html
    └── 📄 form_contacto_rapido.html
```

---

## 🚀 Funcionalidades Principales

### 1. Navegación y Menú
- **Menú responsivo**: Adaptable a dispositivos móviles con hamburguesa
- **Submenús desplegables**: Organización jerárquica del contenido
- **Accesibilidad**: Etiquetas ARIA y navegación por teclado
- **Búsqueda integrada**: Barra de búsqueda en el header

### 2. Sistema de Búsqueda Avanzado
- **Búsqueda en tiempo real**: Resultados instantáneos
- **Filtros por categoría**:
  - Todos
  - Cursos
  - Recursos
  - Institución
  - Plataforma
- **Funcionalidades avanzadas**:
  - Autocompletado inteligente
  - Búsqueda por voz (si soporta el navegador)
  - Resaltado de términos
  - Estadísticas de búsqueda

### 3. Gestión de Cursos
- **Catálogo de cursos**: Diplomados, licenciaturas, talleres
- **Cursos especializados**:
  - Archivística Básica
  - Conservación Preventiva
  - Gestión Documental en Sector Público
- **Modalidad virtual**: 100% online con Zoom/Google Meet

### 4. Recursos Educativos
- **Biblioteca Virtual**: Acceso a documentos y materiales
- **Normas y Legislación**: Información jurídica actualizada
- **Artículos y Publicaciones**: Contenido académico
- **Galería**: Imágenes y recursos visuales

### 5. Aula Virtual
- **Dashboard personal**: Panel de control del estudiante
- **Mis Cursos**: Seguimiento del progreso
- **Tareas y actividades**: Gestión de trabajos
- **Foros de discusión**: Interacción entre estudiantes
- **Calendario**: Fechas importantes y eventos
- **Mensajes**: Comunicación interna

### 6. Sistema de Certificación
- **Certificados de estudios**: Al culminar cursos
- **Sistema de progreso**: Seguimiento de avances
- **Generación automática**: PDFs de certificados

### 7. Información Institucional
- **Historia del IFAP**: Antecedentes y trayectoria
- **Equipo docente**: Profesores especializados
- **Contacto**: Información de ubicación y comunicación

---

## 🎨 Diseño y Experiencia de Usuario

### Principios de Diseño
- **Moderno y profesional**: Interfaz limpia y contemporánea
- **Responsivo**: Adaptable a todos los dispositivos
- **Accesible**: Cumple estándares WCAG
- **Intuitivo**: Navegación clara y lógica

### Paleta de Colores
- **Primario**: Azul institucional (#1e40af)
- **Secundario**: Verde para acentos (#10b981)
- **Neutros**: Grises y blancos para fondo
- **Éxito**: Verde para confirmaciones
- **Advertencia**: Amarillo para alertas
- **Error**: Rojo para errores

### Tipografía
- **Fuente principal**: Roboto (Google Fonts)
- **Pesos**: 300, 400, 500, 700
- **Jerarquía clara**: Títulos, subtítulos y cuerpo de texto

### Componentes UI
- **Tarjetas**: Para cursos, noticias y recursos
- **Botones**: Variantes para diferentes acciones
- **Formularios**: Validación en tiempo real
- **Modales**: Para contenido adicional
- **Carrusel**: Para imágenes destacadas

---

## 📋 Instalación y Configuración

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para recursos externos (Google Fonts, Font Awesome)
- VS Code con extensión Live Server (recomendado)

### Instalación Local
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Piwi127/PAGINA-WEB-Y-AULA-VIRTUAL-IFAP.git
   cd PAGINA-WEB-Y-AULA-VIRTUAL-IFAP
   ```

2. **Abrir en VS Code**:
   ```bash
   code .
   ```

3. **Instalar extensión Live Server** (si no está instalada):
   - Abrir VS Code
   - Ir a Extensions (Ctrl+Shift+X)
   - Buscar "Live Server" de Ritwick Dey
   - Instalar y recargar

4. **Ejecutar servidor local**:
   - Clic derecho en `index.html`
   - Seleccionar "Open with Live Server"
   - El sitio se abrirá en `http://127.0.0.1:5500`

### Configuración de Producción
1. **GitHub Pages**:
   - Subir el código a un repositorio público en GitHub
   - Ir a Settings > Pages
   - Seleccionar branch main y carpeta root
   - El sitio estará disponible en `https://[usuario].github.io/[repositorio]`

2. **Dominio personalizado** (opcional):
   - Registrar dominio .edu.pe o .com.pe
   - Configurar DNS para apuntar a GitHub Pages
   - Actualizar configuración en GitHub

---

## 🔧 Scripts y Automatización

### clean_styles.py
Script Python para mantener la organización del código CSS:

```python
# Limpia estilos duplicados y mueve secciones específicas
# a archivos separados para mejor mantenibilidad
python clean_styles.py
```

**Funcionalidades**:
- Remueve estilos duplicados
- Organiza secciones CSS en archivos modulares
- Mantiene consistencia en el código

---

## 📊 Sistema de Búsqueda

### Implementación Técnica
- **Motor de búsqueda**: JavaScript puro sin dependencias externas
- **Indexación**: Lista estática de páginas con metadatos
- **Filtrado**: Por categorías y relevancia
- **Interfaz**: Resultados en tiempo real con resaltado

### Archivos Relacionados
- `assets/js/search.js`: Motor principal
- `assets/js/search-advanced.js`: Funcionalidades avanzadas
- `assets/css/search.css`: Estilos específicos
- `buscar.html`: Página de resultados

### Categorías de Búsqueda
1. **Principal**: Páginas principales del sitio
2. **Cursos**: Diplomados, licenciaturas, talleres
3. **Recursos**: Biblioteca, normas, artículos
4. **Institución**: Historia, equipo docente
5. **Plataforma**: Aula virtual, dashboard
6. **Acceso**: Login, registro

---

## 🌐 Despliegue y Hosting

### Opciones de Hosting
1. **GitHub Pages** (Recomendado para desarrollo)
   - Gratuito
   - Fácil configuración
   - Ideal para sitios estáticos

2. **Vercel/Netlify**
   - Despliegue automático desde Git
   - SSL gratuito
   - Dominios personalizados incluidos

3. **Servidor propio**
   - Mayor control
   - Posibilidad de backend dinámico
   - Requiere mantenimiento

### Configuración de Analytics
- **Google Analytics**: Seguimiento de usuarios y comportamiento
- **Configuración**: Agregar ID de seguimiento en el código
- **Reportes**: Métricas de engagement y conversión

---

## 🔒 Seguridad y Privacidad

### Medidas Implementadas
- **HTTPS**: Certificados SSL para encriptación
- **Validación de formularios**: Prevención de inyección de código
- **Sanitización de datos**: Limpieza de entradas de usuario
- **Cookies**: Solo para funcionalidades esenciales

### Consideraciones de Privacidad
- **Política de privacidad**: Información clara sobre datos recopilados
- **Consentimiento**: Aprobación explícita para cookies no esenciales
- **GDPR Compliance**: Cumplimiento con regulaciones de protección de datos

---

## 📈 Métricas y Monitoreo

### KPIs Principales
- **Tráfico web**: Número de visitantes únicos
- **Tasa de conversión**: Inscripciones vs. visitantes
- **Engagement**: Tiempo en sitio, páginas por sesión
- **SEO**: Posicionamiento en motores de búsqueda

### Herramientas de Monitoreo
- **Google Analytics**: Análisis detallado del tráfico
- **Google Search Console**: Optimización SEO
- **Lighthouse**: Auditoría de rendimiento y accesibilidad

---

## 🚀 Roadmap y Futuras Implementaciones

### Fase 2: Backend Dinámico
- **API REST**: FastAPI para servicios backend
- **Base de datos**: MongoDB para almacenamiento
- **Autenticación**: Sistema de usuarios seguro
- **Gestión de contenido**: CMS para actualizar cursos

### Mejoras de UX/UI
- **Progressive Web App**: Funcionalidad offline
- **Notificaciones push**: Recordatorios de cursos
- **Modo oscuro**: Alternativa visual
- **Internacionalización**: Soporte multiidioma

### Integraciones
- **Google Meet API**: Videoconferencias integradas
- **Sistema de pagos**: Procesamiento de matrículas
- **CRM**: Gestión de estudiantes
- **Learning Management System**: Plataforma LMS completa

---

## 🤝 Contribución

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crear rama** para nueva funcionalidad: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear Pull Request**

### Estándares de Código
- **HTML**: Semántico y accesible
- **CSS**: BEM methodology, variables CSS
- **JavaScript**: ES6+, módulos, async/await
- **Commits**: Mensajes descriptivos en español

### Reporte de Issues
- Usar plantillas de issues para bugs y features
- Incluir pasos para reproducir
- Adjuntar capturas de pantalla si aplica

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👥 Equipo de Desarrollo

- **Desarrollador Principal**: [Nombre del desarrollador]
- **Diseñador UI/UX**: [Nombre del diseñador]
- **Especialista en Contenido**: IFAP
- **Revisores**: Comunidad de colaboradores

---

## 📞 Contacto

**Instituto de Formación Archivística del Perú (IFAP)**
- **Email**: info@ifap.edu.pe
- **Sitio Web**: [URL del sitio]
- **Teléfono**: [Número de contacto]
- **Dirección**: [Dirección física]

Para soporte técnico del proyecto web:
- **Repositorio**: https://github.com/Piwi127/PAGINA-WEB-Y-AULA-VIRTUAL-IFAP
- **Issues**: Para reportar bugs o solicitar features

---

## 🔄 Historial de Versiones

### v1.0.0 (Actual)
- ✅ Página web principal completa
- ✅ Sistema de búsqueda avanzado
- ✅ Aula virtual básica
- ✅ Diseño responsivo
- ✅ Accesibilidad WCAG
- ✅ Optimización SEO

### Próximas Versiones
- **v1.1.0**: Integración backend
- **v1.2.0**: Sistema de pagos
- **v2.0.0**: LMS completo

---

*Esta documentación se mantiene actualizada con el desarrollo del proyecto. Última actualización: Septiembre 2025*</content>
<parameter name="filePath">c:\Users\LIBRERIA BELEN\Desktop\PAGINA WEB Y AULA VIRTUAL IFAP\README.md
