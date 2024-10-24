// Header Component
function getHeaderContent() {
    // Determina se siamo in una sottocartella
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '../' : '';

    return `
    <header>
        <div class="container header-content">
            <a href="${basePath}index.html">
                <img src="${basePath}assets/images/aril-logo.svg" alt="Aril Logo" class="logo">
            </a>
            <nav>
                <button class="mobile-menu-button">
                    <span class="material-icons">menu</span>
                </button>
                <ul class="nav-menu">
                    <li><a href="${basePath}index.html" class="nav-link">Home</a></li>
                    <li><a href="${basePath}pages/products.html" class="nav-link">Prodotti</a></li>
                    <li><a href="${basePath}pages/about.html" class="nav-link">Chi Siamo</a></li>
                    <li><a href="${basePath}index.html#contact" class="nav-link">Contatti</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;
}

// Footer Component
function getFooterContent() {
    // Determina se siamo in una sottocartella
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '../' : '';

    return `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Aril</h4>
                    <ul class="footer-links">
                        <li><a href="${basePath}pages/about.html">Chi Siamo</a></li>
                        <li><a href="${basePath}pages/products.html">Prodotti</a></li>
                        <li><a href="${basePath}index.html#contact">Contatti</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Prodotti</h4>
                    <ul class="footer-links">
                        <li><a href="${basePath}pages/products.html#fines">Fines</a></li>
                        <li><a href="${basePath}pages/products.html#management">Management</a></li>
                        <li><a href="${basePath}pages/products.html#analytics">Analytics</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contatti</h4>
                    <ul class="footer-links">
                        <li>Email: info@aril.it</li>
                        <li>Tel: +39 XXX XXX XXXX</li>
                        <li>Indirizzo: Via Example, 123</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="social-links">
                    <a href="#" target="_blank">LinkedIn</a>
                    <a href="#" target="_blank">Facebook</a>
                    <a href="#" target="_blank">Twitter</a>
                </div>
                <p class="copyright">© ${new Date().getFullYear()} Aril. Tutti i diritti riservati.</p>
            </div>
        </div>
    </footer>
    `;
}

// Insert components into the page
document.addEventListener('DOMContentLoaded', () => {
    // Insert header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = getHeaderContent();
    }

    // Insert footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooterContent();
    }

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Gestione scroll per link con anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestione scroll per link con anchor quando si arriva da un'altra pagina
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});
