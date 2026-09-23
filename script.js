// ===============================
// MENU MOBILE
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}


// ===============================
// CARROSSEL DE SERVIÇOS
// ===============================

const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".servico-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;


// Verifica se o carrossel existe
if (carousel && track && slides.length > 0) {

    // --------------------------------
    // Descobre quantos cards aparecem
    // --------------------------------

    function getVisibleSlides() {
        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    // --------------------------------
    // Quantidade máxima de movimento
    // --------------------------------

    function getMaxIndex() {
        return Math.max(
            0,
            slides.length - getVisibleSlides()
        );
    }


    // --------------------------------
    // Cria as bolinhas
    // --------------------------------

    function createDots() {

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("carousel-dot");

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


    // --------------------------------
    // Atualiza posição do carrossel
    // --------------------------------

    function updateCarousel() {

        const maxIndex = getMaxIndex();

        // Impede passar do começo
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        // Impede passar do final
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const slide = slides[currentIndex];

        if (!slide) return;


        // Pega a posição real do card
        const position = slide.offsetLeft;

        track.style.transform = `translateX(-${position}px)`;


        // Atualiza as bolinhas

        const dots = document.querySelectorAll(".carousel-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });
    }


    // --------------------------------
    // Botão ANTERIOR
    // --------------------------------

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentIndex--;

            updateCarousel();

        });

    }


    // --------------------------------
    // Botão PRÓXIMO
    // --------------------------------

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentIndex++;

            updateCarousel();

        });

    }


    // --------------------------------
    // Arrastar no celular
    // --------------------------------

    let touchStartX = 0;
    let touchEndX = 0;


    track.addEventListener(
        "touchstart",
        (event) => {

            touchStartX = event.touches[0].clientX;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        (event) => {

            touchEndX = event.changedTouches[0].clientX;

            const difference = touchStartX - touchEndX;

            // Arrastou para esquerda
            if (difference > 50) {

                currentIndex++;

                updateCarousel();

            }

            // Arrastou para direita
            if (difference < -50) {

                currentIndex--;

                updateCarousel();

            }

        },
        { passive: true }
    );


    // --------------------------------
    // Teclado
    // --------------------------------

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            currentIndex++;

            updateCarousel();

        }

        if (event.key === "ArrowLeft") {

            currentIndex--;

            updateCarousel();

        }

    });


    // --------------------------------
    // Quando mudar tamanho da tela
    // --------------------------------

    window.addEventListener("resize", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        createDots();
        updateCarousel();

    });


    // --------------------------------
    // Inicialização
    // --------------------------------

    createDots();
    updateCarousel();

}


// ===============================
// ANO DO RODAPÉ
// ===============================

const year = document.querySelector("#current-year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ===============================
// FORMULÁRIO
// ===============================

const form = document.querySelector("#contact-form");

if (form) {

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        alert(
            "Mensagem enviada com sucesso! Em breve entraremos em contato."
        );

        form.reset();

    });

}
