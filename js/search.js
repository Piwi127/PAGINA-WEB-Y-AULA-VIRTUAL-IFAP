document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultsContainer = document.getElementById('search-results-container');
    const noResultsMessage = document.getElementById('no-results');

    // Expandida lista de páginas con categorías
    const pagesToSearch = [
        // Páginas principales
        { url: 'index.html', title: 'Inicio', category: 'principal', tags: ['inicio', 'home', 'principal'] },
        { url: 'cursos.html', title: 'Cursos', category: 'cursos', tags: ['cursos', 'educación', 'formación'] },
        { url: 'carreras.html', title: 'Carreras Archivísticas', category: 'cursos', tags: ['carreras', 'archivística', 'profesional'] },

        // Recursos y biblioteca
        { url: 'biblioteca.html', title: 'Biblioteca Virtual', category: 'recursos', tags: ['biblioteca', 'libros', 'documentos'] },
        { url: 'normas.html', title: 'Normas y Legislación', category: 'recursos', tags: ['normas', 'legislación', 'leyes'] },
        { url: 'articulos.html', title: 'Artículos y Publicaciones', category: 'recursos', tags: ['artículos', 'publicaciones', 'investigación'] },
        { url: 'galeria.html', title: 'Galería', category: 'recursos', tags: ['galería', 'imágenes', 'fotos'] },

        // Institución
        { url: 'historia.html', title: 'Historia', category: 'institución', tags: ['historia', 'ifap', 'instituto'] },
        { url: 'equipo-docente.html', title: 'Equipo Docente', category: 'institución', tags: ['profesores', 'docentes', 'equipo'] },
        { url: 'contacto.html', title: 'Contacto', category: 'institución', tags: ['contacto', 'información', 'ubicación'] },

        // Cursos específicos
        { url: 'curso-archivistica-basica.html', title: 'Curso Archivística Básica', category: 'cursos', tags: ['archivística', 'básico', 'introducción'] },
        { url: 'curso-conservacion-preventiva.html', title: 'Curso Conservación Preventiva', category: 'cursos', tags: ['conservación', 'preventiva', 'preservación'] },
        { url: 'curso-gestion-documental-sector-publico.html', title: 'Curso Gestión Documental Sector Público', category: 'cursos', tags: ['gestión', 'documental', 'público'] },

        // Otras páginas
        { url: 'iniciar-sesion.html', title: 'Iniciar Sesión', category: 'acceso', tags: ['login', 'sesión', 'acceder'] },
        { url: 'inscribirse.html', title: 'Inscríbete', category: 'acceso', tags: ['registro', 'inscripción', 'matrícula'] },
        { url: 'aula-virtual.html', title: 'Aula Virtual', category: 'plataforma', tags: ['aula', 'virtual', 'plataforma'] },
        { url: 'dashboard.html', title: 'Dashboard', category: 'plataforma', tags: ['dashboard', 'panel', 'control'] },
        { url: 'mis-cursos.html', title: 'Mis Cursos', category: 'plataforma', tags: ['mis cursos', 'inscritos', 'progreso'] },
        { url: 'mensajes.html', title: 'Mensajes', category: 'plataforma', tags: ['mensajes', 'comunicación', 'notificaciones'] },
        { url: 'tareas.html', title: 'Tareas', category: 'plataforma', tags: ['tareas', 'actividades', 'trabajos'] },
        { url: 'foros.html', title: 'Foros', category: 'plataforma', tags: ['foros', 'discusiones', 'comunidad'] },
        { url: 'calendario.html', title: 'Calendario', category: 'plataforma', tags: ['calendario', 'fechas', 'eventos'] }
    ];

    let pageContents = [];
    let searchTimeout;
    let currentFilter = 'all';

    // Función para obtener icono por categoría
    function getCategoryIcon(category) {
        const icons = {
            principal: 'fas fa-home',
            cursos: 'fas fa-book',
            recursos: 'fas fa-folder-open',
            institución: 'fas fa-building',
            acceso: 'fas fa-user-circle',
            plataforma: 'fas fa-desktop'
        };
        return icons[category] || 'fas fa-file';
    }

    // Función para obtener color por categoría
    function getCategoryColor(category) {
        const colors = {
            principal: '#2563eb',
            cursos: '#059669',
            recursos: '#dc2626',
            institución: '#7c3aed',
            acceso: '#ea580c',
            plataforma: '#0891b2'
        };
        return colors[category] || '#6b7280';
    }

    async function loadPageContents() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando contenido de búsqueda...';
        loadingIndicator.style.cssText = 'text-align: center; padding: 2rem; color: #6b7280;';
        document.querySelector('main').appendChild(loadingIndicator);

        for (const page of pagesToSearch) {
            try {
                const response = await fetch(page.url);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                // Extraer texto relevante del body, excluyendo scripts y estilos
                const bodyText = doc.body.innerText || '';
                const cleanText = bodyText.replace(/(<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>)/gi, '');

                // Extraer meta descripción si existe
                const metaDesc = doc.querySelector('meta[name="description"]');
                const description = metaDesc ? metaDesc.getAttribute('content') : '';

                pageContents.push({
                    url: page.url,
                    title: page.title,
                    content: cleanText.toLowerCase(),
                    category: page.category,
                    tags: page.tags,
                    description: description
                });
            } catch (error) {
                // Error silencioso para evitar spam en consola
            }
        }

        loadingIndicator.remove();
    }

    function createFilterButtons() {
        if (!window.location.pathname.endsWith('buscar.html')) return;

        const filterContainer = document.createElement('div');
        filterContainer.id = 'search-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">
                    <i class="fas fa-search"></i> Todos
                </button>
                <button class="filter-btn" data-filter="cursos">
                    <i class="fas fa-book"></i> Cursos
                </button>
                <button class="filter-btn" data-filter="recursos">
                    <i class="fas fa-folder-open"></i> Recursos
                </button>
                <button class="filter-btn" data-filter="institución">
                    <i class="fas fa-building"></i> Institución
                </button>
                <button class="filter-btn" data-filter="plataforma">
                    <i class="fas fa-desktop"></i> Plataforma
                </button>
            </div>
        `;

        const searchSection = document.querySelector('.section');
        searchSection.insertBefore(filterContainer, document.getElementById('search-results-container'));

        // Event listeners para filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                performSearch();
            });
        });
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otros términos de búsqueda o revisa la ortografía.</p>
                    <div class="search-suggestions">
                        <p><strong>Sugerencias:</strong></p>
                        <ul>
                            <li>Usa palabras clave más generales</li>
                            <li>Verifica la ortografía</li>
                            <li>Prueba sinónimos</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            noResultsMessage.style.display = 'none';

            // Mostrar contador de resultados
            const resultsCount = document.createElement('div');
            resultsCount.className = 'results-count';
            resultsCount.innerHTML = `<p>Se encontraron <strong>${results.length}</strong> resultado${results.length !== 1 ? 's' : ''}</p>`;
            searchResultsContainer.appendChild(resultsCount);

            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');

                const categoryIcon = getCategoryIcon(result.category);
                const categoryColor = getCategoryColor(result.category);

                resultItem.innerHTML = `
                    <div class="result-header">
                        <div class="result-category" style="background-color: ${categoryColor}">
                            <i class="${categoryIcon}"></i>
                            <span>${result.category.charAt(0).toUpperCase() + result.category.slice(1)}</span>
                        </div>
                        <div class="result-meta">
                            <i class="fas fa-external-link-alt"></i>
                            <span>${result.url}</span>
                        </div>
                    </div>
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    ${result.description ? `<p class="result-description">${result.description}</p>` : ''}
                    <div class="result-snippet">
                        <p>${result.snippet}...</p>
                    </div>
                    ${result.tags && result.tags.length > 0 ? `
                        <div class="result-tags">
                            ${result.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                `;

                searchResultsContainer.appendChild(resultItem);
            });
        }
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) {
            displayResults([]);
            return;
        }

        const results = [];
        pageContents.forEach(page => {
            // Aplicar filtro de categoría
            if (currentFilter !== 'all' && page.category !== currentFilter) {
                return;
            }

            // Buscar en título, contenido, tags y descripción
            const searchFields = [
                page.title.toLowerCase(),
                page.content,
                page.tags ? page.tags.join(' ').toLowerCase() : '',
                page.description ? page.description.toLowerCase() : ''
            ];

            let relevanceScore = 0;
            let bestMatch = '';

            searchFields.forEach(field => {
                if (field.includes(query)) {
                    // Calcular puntuación de relevancia
                    const titleMatch = page.title.toLowerCase().includes(query) ? 10 : 0;
                    const tagMatch = page.tags && page.tags.some(tag => tag.toLowerCase().includes(query)) ? 5 : 0;
                    const contentMatch = field === page.content ? 1 : 0;

                    relevanceScore += titleMatch + tagMatch + contentMatch;

                    // Encontrar la mejor coincidencia para el snippet
                    if (field === page.content) {
                        const index = field.indexOf(query);
                        if (index !== -1) {
                            const start = Math.max(0, index - 100);
                            const end = Math.min(field.length, index + query.length + 100);
                            bestMatch = field.substring(start, end);
                        }
                    }
                }
            });

            if (relevanceScore > 0) {
                // Resaltar términos de búsqueda
                const regex = new RegExp(`(${query})`, 'gi');
                let snippet = bestMatch || page.content.substring(0, 200);
                snippet = snippet.replace(regex, (match) => `<mark>${match}</mark>`);

                results.push({
                    url: page.url,
                    title: page.title,
                    snippet: snippet,
                    category: page.category,
                    tags: page.tags,
                    description: page.description,
                    relevanceScore: relevanceScore
                });
            }
        });

        // Ordenar por relevancia
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);

        displayResults(results);
    }

    // Función de búsqueda en tiempo real
    function debounceSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.length >= 2) {
                performSearch();
            } else if (searchInput.value.length === 0) {
                displayResults([]);
            }
        }, 300); // Esperar 300ms después de que el usuario deje de escribir
    }

    // Event listeners
    searchButton.addEventListener('click', () => {
        if (window.location.pathname.endsWith('buscar.html')) {
            performSearch();
        } else {
            window.location.href = `buscar.html?q=${encodeURIComponent(searchInput.value)}`;
        }
    });

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', debounceSearch);

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Manejar búsqueda en buscar.html
    if (window.location.pathname.endsWith('buscar.html')) {
        loadPageContents().then(() => {
            createFilterButtons();
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            if (query) {
                searchInput.value = query;
                performSearch();
            }
        });
    } else {
        // Cargar contenido en segundo plano para búsqueda instantánea
        loadPageContents();
    }
});