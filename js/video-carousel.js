document.addEventListener('DOMContentLoaded', () => {
    const videos = [
        '305525689519153156.mp4',
        '305527781902229507.mp4',
        '305528184152764425.mp4',
        '305531722874466307.mp4',
        '305751638546292742.mp4'
    ];

    const videoElement = document.getElementById('showcase-video');
    const videoContainer = videoElement.closest('.video-container');
    const playButton = videoContainer.querySelector('.play-button');
    const prevButton = document.querySelector('.video-nav.prev');
    const nextButton = document.querySelector('.video-nav.next');
    const indicators = document.querySelectorAll('.indicator');

    let currentVideoIndex = 0;
    let autoplayInterval;
    let isPlaying = false;
    let isLoading = false;

    // Funzione per costruire il percorso completo del video
    const getVideoPath = (filename) => `assets/videos/${filename}`;

    // Funzione per verificare se il video può essere riprodotto
    const canPlayVideo = () => {
        return videoElement.readyState >= 2;
    };

    // Funzione per cambiare video
    const changeVideo = (index, autoplay = false) => {
        if (isLoading) return;
        isLoading = true;

        // Gestione dell'indice circolare
        if (index >= videos.length) index = 0;
        if (index < 0) index = videos.length - 1;

        currentVideoIndex = index;

        // Ferma il video corrente
        videoElement.pause();

        // Mostra l'overlay durante il caricamento
        showPlayButton();

        // Aggiorna il source del video
        const newSource = getVideoPath(videos[currentVideoIndex]);
        if (videoElement.src !== window.location.href.replace(/\/[^\/]*$/, '/') + newSource) {
            videoElement.src = newSource;
            videoElement.load();
        }

        // Aggiorna gli indicatori
        updateIndicators();

        // Gestisci l'autoplay dopo il caricamento
        const handleLoad = () => {
            isLoading = false;
            if (autoplay && isPlaying && canPlayVideo()) {
                playVideo();
            }
        };

        videoElement.addEventListener('loadeddata', handleLoad, { once: true });
        videoElement.addEventListener('error', () => {
            console.log('Errore durante il caricamento del video');
            isLoading = false;
            showPlayButton();
        }, { once: true });

        // Timeout di sicurezza per il caricamento
        setTimeout(() => {
            if (isLoading) {
                isLoading = false;
                showPlayButton();
            }
        }, 5000);
    };

    const updateIndicators = () => {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentVideoIndex);
        });
    };

    const showPlayButton = () => {
        videoContainer.classList.add('awaiting-interaction');
    };

    const hidePlayButton = () => {
        videoContainer.classList.remove('awaiting-interaction');
    };

    const playVideo = async () => {
        if (!canPlayVideo()) {
            console.log('Video non pronto per la riproduzione');
            return;
        }

        try {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                await playPromise;
                isPlaying = true;
                hidePlayButton();
                startAutoplay();
            }
        } catch (error) {
            console.log('Riproduzione video non consentita:', error);
            showPlayButton();
            isPlaying = false;
        }
    };

    // Gestione click sul pulsante play
    playButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isLoading) {
            playVideo();
        }
    });

    // Event listeners per i controlli di navigazione
    prevButton.addEventListener('click', () => {
        if (!isLoading) {
            changeVideo(currentVideoIndex - 1, true);
        }
    });

    nextButton.addEventListener('click', () => {
        if (!isLoading) {
            changeVideo(currentVideoIndex + 1, true);
        }
    });

    // Event listeners per gli indicatori
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isLoading && index !== currentVideoIndex) {
                changeVideo(index, true);
            }
        });
    });

    // Gestione dell'autoplay
    const startAutoplay = () => {
        clearInterval(autoplayInterval);
        if (isPlaying) {
            autoplayInterval = setInterval(() => {
                if (!document.hidden && !isLoading && videoElement.paused && canPlayVideo()) {
                    changeVideo(currentVideoIndex + 1, true);
                }
            }, 5000);
        }
    };

    // Gestione hover sul carosello
    const carousel = document.querySelector('.video-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', () => {
        if (isPlaying && !isLoading) {
            startAutoplay();
        }
    });

    // Gestione fine video
    videoElement.addEventListener('ended', () => {
        if (!isLoading) {
            changeVideo(currentVideoIndex + 1, true);
        }
    });

    // Gestione errori video
    videoElement.addEventListener('error', () => {
        console.log('Errore durante il caricamento del video');
        showPlayButton();
        isPlaying = false;
        isLoading = false;
    });

    // Gestione visibilità pagina
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoplayInterval);
            if (isPlaying) {
                videoElement.pause();
            }
        } else {
            if (isPlaying && !isLoading && canPlayVideo()) {
                videoElement.play().catch(() => {
                    showPlayButton();
                    isPlaying = false;
                });
                startAutoplay();
            }
        }
    });

    // Inizializzazione
    changeVideo(0);
});
