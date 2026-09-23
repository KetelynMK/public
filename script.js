// ==========================================
// CARROSSEL DE SERVIÇOS - GRUPO ASSIS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Elementos do carrossel
    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".servico-slide");

    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");

    const dotsContainer = document.querySelector(".carousel-dots");


    // ==========================================
    // VERIFICAÇÃO
    // ==========================================

    if (!carousel || !track || slides.length === 0) {

        console.log("Carrossel não encontrado.");

        return;
    }


    // ==========================================
    // CONFIGURAÇÃO
    // ==========================================

    let currentIndex = 0;

    const totalSlides = slides.length;


    // ==========================================
    // CRIAR AS BOLINHAS
    // ==========================================

    if (dotsContainer) {

        dotsContainer.innerHTML = "";

        slides.forEach(function (slide, index) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add("carousel-dot");

            dot.setAttribute(
                "aria-label",
                "Ir para o serviço " + (index + 1)
            );


            // Clique na bolinha
            dot.addEventListener("click", function () {

                currentIndex = index;

                atualizarCarrossel();

            });


            dotsContainer.appendChild(dot);

        });

    }


    // ==========================================
    // ATUALIZAR CARROSSEL
    // ==========================================

    function atualizarCarrossel() {

        // Move o carrossel
        const deslocamento = currentIndex * 100;

        track.style.transform =
            `translateX(-${deslocamento}%)`;


        // Atualiza as bolinhas
        const dots =
            document.querySelectorAll(".carousel-dot");


        dots.forEach(function (dot, index) {

            if (index === currentIndex) {

                dot.classList.add("active");

            } else {

                dot.classList.remove("active");

            }

        });


        // Acessibilidade
        slides.forEach(function (slide, index) {

            if (index === currentIndex) {

                slide.setAttribute("aria-hidden", "false");

            } else {

                slide.setAttribute("aria-hidden", "true");

            }

        });

    }


    // ==========================================
    // BOTÃO ANTERIOR
    // ==========================================

    if (prevButton) {

        prevButton.addEventListener("click", function () {

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex = totalSlides - 1;

            }

            atualizarCarrossel();

        });

    }


    // ==========================================
    // BOTÃO PRÓXIMO
    // ==========================================

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            currentIndex++;

            if (currentIndex >= totalSlides) {

                currentIndex = 0;

            }

            atualizarCarrossel();

        });

    }


    // ==========================================
    // INICIAR
    // ==========================================

    atualizarCarrossel();

});
