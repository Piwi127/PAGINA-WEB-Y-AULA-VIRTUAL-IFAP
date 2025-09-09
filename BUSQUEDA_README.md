# Sistema de Búsqueda Avanzado - IFAP

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

1. **Búsqueda en Tiempo Real**
   - Resultados instantáneos mientras escribes
   - Sin necesidad de presionar Enter

2. **Filtros por Categoría**
   - **Todos**: Busca en todo el contenido
   - **Cursos**: Diplomados, licenciaturas, talleres
   - **Recursos**: Biblioteca, normas, artículos
   - **Institución**: Historia, equipo docente
   - **Plataforma**: Aula virtual, dashboard

3. **Búsqueda Inteligente**
   - Búsqueda por título, contenido, tags y descripción
   - Resaltado de términos de búsqueda
   - Puntuación de relevancia
   - Ordenamiento por importancia

4. **Interfaz Mejorada**
   - Categorías con iconos y colores
   - Tags descriptivos
   - Animaciones suaves
   - Diseño responsivo

5. **Funcionalidades Avanzadas**
   - Autocompletado inteligente
   - Búsqueda por voz (si el navegador lo soporta)
   - Estadísticas de búsqueda
   - Accesibilidad completa

## 📁 Archivos Modificados/Creados

### Archivos JavaScript
- `assets/js/search.js` - Motor principal de búsqueda
- `assets/js/search-advanced.js` - Funcionalidades avanzadas

### Archivos CSS
- `assets/css/search.css` - Estilos para búsqueda

### Archivos HTML
- `buscar.html` - Página de resultados mejorada
- `index.html` - Incluye scripts de búsqueda

## 🔍 Cómo Usar

### Búsqueda Básica
1. Escribe en el campo de búsqueda en cualquier página
2. Los resultados aparecen automáticamente
3. Presiona Enter o haz clic en buscar para ir a resultados completos

### Filtros
1. Ve a la página de resultados (`buscar.html`)
2. Usa los botones de filtro para categorizar resultados
3. Los filtros se aplican en tiempo real

### Búsqueda por Voz
1. Haz clic en el ícono de micrófono (si está disponible)
2. Habla tu consulta de búsqueda
3. La búsqueda se ejecuta automáticamente

## 🎯 Contenido Indexado

El sistema busca en las siguientes páginas:

### Cursos y Formación
- Cursos de Archivística Básica
- Conservación Preventiva
- Gestión Documental del Sector Público
- Diplomado en Archivística Digital
- Licenciatura en Archivística
- Maestría en Gestión Documental
- Talleres y Seminarios

### Recursos
- Biblioteca Virtual
- Normas y Legislación
- Artículos y Publicaciones
- Galería

### Institución
- Historia del IFAP
- Equipo Docente
- Información de Contacto

### Plataforma
- Aula Virtual
- Dashboard
- Mis Cursos
- Mensajes
- Tareas
- Foros
- Calendario

## 🛠️ Personalización

### Agregar Nueva Página
Para incluir una nueva página en la búsqueda:

1. Edita `assets/js/search.js`
2. Agrega al array `pagesToSearch`:
```javascript
{
    url: 'nueva-pagina.html',
    title: 'Título de la Página',
    category: 'categoria', // principal, cursos, recursos, institución, plataforma
    tags: ['tag1', 'tag2', 'tag3']
}
```

### Modificar Categorías
Las categorías disponibles son:
- `principal` - Páginas principales
- `cursos` - Contenido educativo
- `recursos` - Biblioteca y documentos
- `institución` - Información institucional
- `plataforma` - Herramientas del aula virtual

## 📊 Estadísticas

El sistema guarda estadísticas de búsqueda en `localStorage`:
- Consultas realizadas
- Número de resultados
- Timestamp
- Información del navegador

## ♿ Accesibilidad

- Soporte completo para lectores de pantalla
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Respetar preferencias de movimiento reducido
- Soporte para modo de alto contraste

## 🔧 Tecnologías Utilizadas

- **JavaScript Vanilla** - Sin dependencias externas
- **Fetch API** - Para cargar contenido de páginas
- **DOMParser** - Para procesar HTML
- **SpeechRecognition API** - Para búsqueda por voz
- **LocalStorage** - Para estadísticas
- **CSS Grid/Flexbox** - Para layouts responsivos

## 🚀 Rendimiento

- Carga diferida del contenido de búsqueda
- Búsqueda en tiempo real con debounce
- Indexación inteligente del contenido
- Optimización para dispositivos móviles

---

**Instituto de Formación Archivística del Perú (IFAP)**
