// === FUNCIONALIDADES AVANZADAS DE BÚSQUEDA ===

// Función para resaltar términos de búsqueda en tiempo real
function highlightSearchTerms() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchBox = document.querySelector('.search-box');

    // Agregar clase de búsqueda activa
    searchInput.addEventListener('focus', () => {
        searchBox.classList.add('searching');
    });

    searchInput.addEventListener('blur', () => {
        searchBox.classList.remove('searching');
    });

    // Mejorar accesibilidad con ARIA
    searchInput.setAttribute('aria-label', 'Buscar en el sitio web');
    searchInput.setAttribute('aria-describedby', 'search-help');
    searchInput.setAttribute('autocomplete', 'off');

    // Crear elemento de ayuda
    const helpText = document.createElement('div');
    helpText.id = 'search-help';
    helpText.className = 'sr-only';
    helpText.textContent = 'Presiona Enter para buscar o usa los filtros disponibles';
    searchBox.appendChild(helpText);
}

// Función para autocompletado inteligente
function setupAutocomplete() {
    const searchInput = document.getElementById('search-input');

    // Lista de términos comunes para autocompletado
    const commonTerms = [
        'cursos', 'archivística', 'diplomado', 'licenciatura', 'maestría',
        'biblioteca', 'normas', 'legislación', 'artículos', 'historia',
        'contacto', 'inscripción', 'aula virtual', 'talleres', 'seminarios'
    ];

    let autocompleteList = null;

    function showAutocomplete(matches) {
        if (autocompleteList) {
            autocompleteList.remove();
        }

        if (matches.length === 0) return;

        autocompleteList = document.createElement('ul');
        autocompleteList.className = 'autocomplete-list';

        matches.slice(0, 5).forEach(term => {
            const item = document.createElement('li');
            item.className = 'autocomplete-item';
            item.textContent = term;
            item.addEventListener('click', () => {
                searchInput.value = term;
                autocompleteList.remove();
                autocompleteList = null;
                // Trigger search
                const event = new KeyboardEvent('keyup', { key: 'Enter' });
                searchInput.dispatchEvent(event);
            });
            autocompleteList.appendChild(item);
        });

        searchInput.parentNode.appendChild(autocompleteList);
    }

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();

        if (value.length < 2) {
            if (autocompleteList) {
                autocompleteList.remove();
                autocompleteList = null;
            }
            return;
        }

        const matches = commonTerms.filter(term =>
            term.toLowerCase().includes(value)
        );

        showAutocomplete(matches);
    });

    // Ocultar autocompletado al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && autocompleteList) {
            autocompleteList.remove();
            autocompleteList = null;
        }
    });
}

// Función para estadísticas de búsqueda
function trackSearchAnalytics() {
    const searches = JSON.parse(localStorage.getItem('searchAnalytics') || '[]');

    function addSearch(query, resultsCount) {
        const search = {
            query: query,
            resultsCount: resultsCount,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        searches.push(search);

        // Mantener solo las últimas 100 búsquedas
        if (searches.length > 100) {
            searches.shift();
        }

        localStorage.setItem('searchAnalytics', JSON.stringify(searches));
    }

    // Hacer la función disponible globalmente
    window.trackSearch = addSearch;
}

// Función para búsqueda por voz (opcional)
function setupVoiceSearch() {
    const searchInput = document.getElementById('search-input');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES'; // Español de España, cambiar según necesidad

        // Crear botón de búsqueda por voz
        const voiceButton = document.createElement('button');
        voiceButton.type = 'button';
        voiceButton.className = 'voice-search-btn';
        voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceButton.setAttribute('aria-label', 'Búsqueda por voz');
        voiceButton.title = 'Buscar con voz';

        voiceButton.addEventListener('click', () => {
            recognition.start();
            voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceButton.classList.add('listening');
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            // Trigger search
            const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
            searchInput.dispatchEvent(enterEvent);
        };

        recognition.onend = () => {
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            // Error silencioso en reconocimiento de voz
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceButton.classList.remove('listening');
        };

        // Agregar el botón después del botón de búsqueda
        const searchButton = document.getElementById('search-button');
        searchButton.parentNode.insertBefore(voiceButton, searchButton.nextSibling);
    }
}

// Inicializar funcionalidades avanzadas
document.addEventListener('DOMContentLoaded', () => {
    highlightSearchTerms();
    setupAutocomplete();
    trackSearchAnalytics();

    // Solo activar búsqueda por voz en páginas principales (no en resultados de búsqueda)
    if (!window.location.pathname.endsWith('buscar.html')) {
        setupVoiceSearch();
    }
});
