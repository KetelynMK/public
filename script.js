document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".servico-slide");

    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");

    const dotsContainer = document.querySelector(".carousel-dots");


    if (
        !track ||
        !slides.length ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    let paginaAtual = 0;


    function quantidadeVisivel() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    function totalPaginas() {

        return Math.ceil(
            slides.length / quantidadeVisivel()
        );

    }


    function criarBolinhas() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const total = totalPaginas();

        for (let i = 0; i < total; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add("carousel-dot");

            dot.setAttribute(
                "aria-label",
                `Ir para página ${i + 1}`
            );


            if (i === paginaAtual) {
                dot.classList.add("active");
            }


            dot.addEventListener("click", () => {

                paginaAtual = i;

                atualizarCarrossel();

            });


            dotsContainer.appendChild(dot);
        }

    }


    function atualizarCarrossel() {

        const primeiroSlide = slides[0];

        const larguraSlide =
            primeiroSlide.getBoundingClientRect().width;

        const estiloTrack =
            window.getComputedStyle(track);

        const gap =
            parseFloat(estiloTrack.gap) || 0;

        const quantidade =
            quantidadeVisivel();

        const deslocamento =
            (larguraSlide + gap) *
            quantidade *
            paginaAtual;


        track.style.transform =
            `translateX(-${deslocamento}px)`;


        const ultimaPagina =
            totalPaginas() - 1;


        prevButton.disabled =
            paginaAtual === 0;


        nextButton.disabled =
            paginaAtual === ultimaPagina;


        criarBolinhas();

    }


    prevButton.addEventListener("click", () => {

        if (paginaAtual > 0) {

            paginaAtual--;

            atualizarCarrossel();

        }

    });


    nextButton.addEventListener("click", () => {

        if (
            paginaAtual <
            totalPaginas() - 1
        ) {

            paginaAtual++;

            atualizarCarrossel();

        }

    });


    window.addEventListener("resize", () => {

        const total = totalPaginas();

        if (paginaAtual >= total) {

            paginaAtual = total - 1;

        }

        atualizarCarrossel();

    });


    atualizarCarrossel();

});
