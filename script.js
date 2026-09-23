document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";
        });


        // Fecha o menu quando clicar em um link

        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            });

        });

    }


    /* =========================================
       CARROSSEL
    ========================================= */

    const carousel =
        document.querySelector(".carousel");

    const track =
        document.querySelector(".carousel-track");

    const slides =
        document.querySelectorAll(".servico-slide");

    const prevButton =
        document.querySelector(".carousel-btn.prev");

    const nextButton =
        document.querySelector(".carousel-btn.next");

    const dotsContainer =
        document.querySelector(".carousel-dots");


    // Verificação

    if (
        !carousel ||
        !track ||
        !slides.length ||
        !prevButton ||
        !nextButton ||
        !dotsContainer
    ) {
        console.warn(
            "Carrossel: algum elemento não foi encontrado."
        );

        return;
    }


    let currentIndex = 0;


    /* =========================================
       QUANTIDADE DE CARDS VISÍVEIS
    ========================================= */

    function getVisibleSlides() {

        const width =
            window.innerWidth;


        // Celular

        if (width <= 700) {
            return 1;
        }


        // Tablet

        if (width <= 1000) {
            return 2;
        }


        // Computador

        return 3;
    }


    /* =========================================
       LIMITE DO CARROSSEL
    ========================================= */

    function getMaxIndex() {

        const visible =
            getVisibleSlides();

        return Math.max(
            0,
            slides.length - visible
        );
    }


    /* =========================================
       CRIAR BOLINHAS
    ========================================= */

    function createDots() {

        dotsContainer.innerHTML = "";


        const maxIndex =
            getMaxIndex();


        for (
            let i = 0;
            i <= maxIndex;
            i++
        ) {

            const dot =
                document.createElement("button");


            dot.type = "button";

            dot.className =
                "carousel-dot";


            dot.setAttribute(
                "aria-label",
                `Mostrar grupo ${i + 1}`
            );


            if (i === currentIndex) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {

                    currentIndex = i;

                    updateCarousel();

                }
            );


            dotsContainer.appendChild(dot);

        }

    }


    /* =========================================
       ATUALIZAR CARROSSEL
    ========================================= */

    function updateCarousel() {

        const maxIndex =
            getMaxIndex();


        // Corrige índice

        if (
            currentIndex < 0
        ) {

            currentIndex = 0;

        }


        if (
            currentIndex > maxIndex
        ) {

            currentIndex =
                maxIndex;

        }


        /*
            Em vez de calcular porcentagens,
            usamos a posição real do card.
            Isso evita problemas com gap.
        */

        const activeSlide =
            slides[currentIndex];


        if (activeSlide) {

            const position =
                activeSlide.offsetLeft;


            track.style.transform =
                `translateX(-${position}px)`;

        }


        /* Atualiza bolinhas */

        const dots =
            dotsContainer.querySelectorAll(
                ".carousel-dot"
            );


        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );


        /* Atualiza seta anterior */

        prevButton.disabled =
            currentIndex === 0;


        /* Atualiza seta próxima */

        nextButton.disabled =
            currentIndex >= maxIndex;

    }


    /* =========================================
       SETA ANTERIOR
    ========================================= */

    prevButton.addEventListener(
        "click",
        () => {

            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();

            }

        }
    );


    /* =========================================
       SETA PRÓXIMA
    ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            const maxIndex =
                getMaxIndex();


            if (
                currentIndex < maxIndex
            ) {

                currentIndex++;

                updateCarousel();

            }

        }
    );


    /* =========================================
       TECLADO
    ========================================= */

    carousel.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowLeft"
            ) {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateCarousel();

                }

            }


            if (
                event.key === "ArrowRight"
            ) {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex < maxIndex
                ) {

                    currentIndex++;

                    updateCarousel();

                }

            }

        }
    );


    /* =========================================
       SWIPE / ARRASTAR NO CELULAR
    ========================================= */

    let startX = 0;

    let endX = 0;


    track.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    track.addEventListener(
        "touchend",
        (event) => {

            endX =
                event.changedTouches[0].clientX;


            const difference =
                startX - endX;


            const minimumSwipe = 50;


            // Arrastou para esquerda

            if (
                difference >
                minimumSwipe
            ) {

                const maxIndex =
                    getMaxIndex();


                if (
                    currentIndex <
                    maxIndex
                ) {

                    currentIndex++;

                    updateCarousel();

                }

            }


            // Arrastou para direita

            if (
                difference <
                -minimumSwipe
            ) {

                if (
                    currentIndex > 0
                ) {

                    currentIndex--;

                    updateCarousel();

                }

            }

        },
        {
            passive: true
        }
    );


    /* =========================================
       REDIMENSIONAMENTO
    ========================================= */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
