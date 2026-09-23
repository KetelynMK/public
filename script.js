document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CARROSSEL DE SERVIÇOS
    ========================================= */

    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".servico-slide");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");
    const dotsContainer = document.querySelector(".carousel-dots");

    // Se algum elemento não existir, não executa o carrossel
    if (
        !carousel ||
        !track ||
        slides.length === 0 ||
        !prevButton ||
        !nextButton
    ) {
        console.warn("Elementos do carrossel não encontrados.");
        return;
    }

    let currentIndex = 0;

    /* =========================================
       QUANTOS CARDS APARECEM
    ========================================= */

    function getVisibleSlides() {
        const width = window.innerWidth;

        if (width <= 600) {
            return 1;
        }

        if (width <= 900) {
            return 2;
        }

        return 3;
    }

    /* =========================================
       TOTAL DE MOVIMENTOS POSSÍVEIS
    ========================================= */

    function getMaxIndex() {
        const visibleSlides = getVisibleSlides();

        return Math.max(
            0,
            slides.length - visibleSlides
        );
    }

    /* =========================================
       CRIAR AS BOLINHAS
    ========================================= */

    function createDots() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Ir para o serviço ${i + 1}`
            );

            if (i === currentIndex) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateCarousel();
            });

            dotsContainer.appendChild(dot);
        }
    }

    /* =========================================
       ATUALIZAR CARROSSEL
    ========================================= */

    function updateCarousel() {

        const maxIndex = getMaxIndex();

        // Impede que o índice fique inválido
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        /*
           Pega a posição real do card.
           Isso evita problemas de porcentagem
           quando existe gap entre os cards.
        */

        const activeSlide = slides[currentIndex];

        if (activeSlide) {

            const position = activeSlide.offsetLeft;

            track.style.transform =
                `translateX(-${position}px)`;
        }

        /* Atualiza as bolinhas */

        if (dotsContainer) {

            const dots =
                dotsContainer.querySelectorAll(".carousel-dot");

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });
        }

        /* Ativa/desativa as setas */

        prevButton.disabled =
            currentIndex === 0;

        nextButton.disabled =
            currentIndex >= maxIndex;

        /* Acessibilidade */

        prevButton.setAttribute(
            "aria-disabled",
            currentIndex === 0
        );

        nextButton.setAttribute(
            "aria-disabled",
            currentIndex >= maxIndex
        );
    }

    /* =========================================
       BOTÃO ANTERIOR
    ========================================= */

    prevButton.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();
        }
    });

    /* =========================================
       BOTÃO PRÓXIMO
    ========================================= */

    nextButton.addEventListener("click", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();
        }
    });

    /* =========================================
       TECLADO
    ========================================= */

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowLeft") {

            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();
            }
        }

        if (event.key === "ArrowRight") {

            const maxIndex = getMaxIndex();

            if (currentIndex < maxIndex) {

                currentIndex++;

                updateCarousel();
            }
        }
    });

    carousel.setAttribute("tabindex", "0");

    /* =========================================
       ARRASTAR NO CELULAR
    ========================================= */

    let startX = 0;
    let endX = 0;

    track.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.touches[0].clientX;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (event) => {

            endX =
                event.changedTouches[0].clientX;

            const difference =
                startX - endX;

            const minimumSwipe = 50;

            // Arrastou para a esquerda
            if (difference > minimumSwipe) {

                const maxIndex =
                    getMaxIndex();

                if (currentIndex < maxIndex) {

                    currentIndex++;

                    updateCarousel();
                }
            }

            // Arrastou para a direita
            if (difference < -minimumSwipe) {

                if (currentIndex > 0) {

                    currentIndex--;

                    updateCarousel();
                }
            }

        },
        { passive: true }
    );

    /* =========================================
       REDIMENSIONAMENTO DA TELA
    ========================================= */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            createDots();
            updateCarousel();

        }, 150);
    });

    /* =========================================
       INICIALIZAÇÃO
    ========================================= */

    createDots();

    updateCarousel();

});
