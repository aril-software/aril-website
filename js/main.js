document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer per le animazioni fade-in
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        fadeObserver.observe(element);
    });

    // Gestione scroll fluido per i link interni con offset per l'header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Altezza dell'header più un po' di spazio
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Se c'è un hash nell'URL (es. quando si arriva da un'altra pagina)
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Header trasparente che diventa solido allo scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Aggiungi classe per sfondo solido quando si scrolla giù
        if (currentScroll > 50) {
            header.classList.add('solid-bg');
        } else {
            header.classList.remove('solid-bg');
        }

        // Nascondi/mostra header basato sulla direzione dello scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    });

    // Gestione video hero
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ricarica il video se si verifica un errore
        heroVideo.addEventListener('error', () => {
            heroVideo.load();
        });

        // Assicurati che il video sia in muto per l'autoplay
        heroVideo.muted = true;
    }

    // Gestione form di contatto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Raccogli i dati del form
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            // Disabilita il pulsante durante l'invio
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Invio in corso...';

            try {
                // Qui andrebbe implementata la vera logica di invio
                // Per ora simuliamo un invio con successo
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mostra messaggio di successo
                alert('Messaggio inviato con successo! Ti contatteremo presto.');

                // Resetta il form
                contactForm.reset();
            } catch (error) {
                // Gestione errori
                alert('Si è verificato un errore durante l\'invio. Riprova più tardi.');
            } finally {
                // Riabilita il pulsante
                submitButton.disabled = false;
                submitButton.textContent = 'Invia Messaggio';
            }
        });
    }
});
