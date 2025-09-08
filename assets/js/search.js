document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultsContainer = document.getElementById('search-results-container');
    const noResultsMessage = document.getElementById('no-results');

    const pagesToSearch = [
        { url: 'index.html', title: 'Inicio' },
        { url: 'cursos.html', title: 'Cursos' },
        { url: 'articulos.html', title: 'Artículos y Publicaciones' },
        { url: 'biblioteca.html', title: 'Biblioteca Virtual' },
        { url: 'normas.html', title: 'Normas y Legislación' },
        { url: 'historia.html', title: 'Historia' },
        { url: 'equipo-docente.html', title: 'Equipo Docente' }
    ];

    let pageContents = [];

    async function loadPageContents() {
        for (const page of pagesToSearch) {
            try {
                const response = await fetch(page.url);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                
                // Extract relevant text from the body, excluding script and style tags
                const bodyText = doc.body.innerText || '';
                const cleanText = bodyText.replace(/(<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>)/gi, '');

                pageContents.push({
                    url: page.url,
                    title: page.title,
                    content: cleanText.toLowerCase()
                });
            } catch (error) {
                console.error(`Error loading ${page.url}:`, error);
            }
        }
    }

    function displayResults(results) {
        searchResultsContainer.innerHTML = '';
        if (results.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.innerHTML = `
                    <h3><a href="${result.url}">${result.title}</a></h3>
                    <p>${result.snippet}...</p>
                `;
                searchResultsContainer.appendChild(resultItem);
            });
        }
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) { // Require at least 2 characters for search
            displayResults([]);
            return;
        }

        const results = [];
        pageContents.forEach(page => {
            const index = page.content.indexOf(query);
            if (index !== -1) {
                // Create a snippet around the search term
                const start = Math.max(0, index - 100); // 100 characters before
                const end = Math.min(page.content.length, index + query.length + 100); // 100 characters after
                let snippet = page.content.substring(start, end);

                // Highlight the search term in the snippet (optional, but good for UX)
                const regex = new RegExp(query, 'gi');
                snippet = snippet.replace(regex, (match) => `<mark>${match}</mark>`);

                results.push({
                    url: page.url,
                    title: page.title,
                    snippet: snippet
                });
            }
        });
        displayResults(results);
    }

    // Event listeners
    searchButton.addEventListener('click', () => {
        // Redirect to search page with query parameter if not already on it
        if (window.location.pathname.endsWith('buscar.html')) {
            performSearch();
        } else {
            window.location.href = `buscar.html?q=${searchInput.value}`;
        }
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Handle search on buscar.html load
    if (window.location.pathname.endsWith('buscar.html')) {
        loadPageContents().then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            if (query) {
                searchInput.value = query;
                performSearch();
            }
        });
    } else {
        // For other pages, just load content in the background if desired for instant search later
        // loadPageContents(); 
    }
});