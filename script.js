// ==========================================
// MENU MOBILE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const menuAberto = nav.classList.contains("active");

            menuBtn.setAttribute(
                "aria-expanded",
                menuAberto ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                menuAberto ? "Fechar menu" : "Abrir menu"
            );

        });

        // Fecha o menu ao clicar em um link
        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Abrir menu");

            });

        });

    }

});


// ==========================================
// CARROSSEL DE SERVIÇOS
// ==========================================

const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".servico-slide");

const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;


// Verifica se o carrossel existe
if (carousel && track && slides.length > 0) {

    // ------------------------------------------
    // Quantidade de slides visíveis
    // ------------------------------------------

    function getVisibleSlides() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }

    // ------------------------------------------
    // Índice máximo possível
    // ------------------------------------------

    function getMaxIndex() {

        return Math.max(
            0,
            slides.length - getVisibleSlides()
        );
    }


    // ------------------------------------------
    // Criar bolinhas
    // ------------------------------------------

    function createDots() {

        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("carousel-dot");

            if (i === currentIndex) {
                dot.classList.add("active");
            }

            dot.setAttribute(
                "aria-label",
                `Ir para o serviço ${i + 1}`
            );

            dot.addEventListener("click", () => {

                currentIndex = i;

                updateCarousel();

            });

            dotsContainer.appendChild(dot);
        }
    }


    // ------------------------------------------
    // Atualizar carrossel
    // ------------------------------------------

    function updateCarousel() {

        const maxIndex = getMaxIndex();

        // Impede índice menor que 0
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        // Impede passar do último slide
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        const currentSlide = slides[currentIndex];

        if (!currentSlide) {
            return;
        }

        // Move o carrossel
        const position = currentSlide.offsetLeft;

        track.style.transform =
            `translateX(-${position}px)`;


        // Atualiza as bolinhas
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
    }


    // ------------------------------------------
    // Botão ANTERIOR
    // ------------------------------------------

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            currentIndex--;

            updateCarousel();

        });
    }


    // ------------------------------------------
    // Botão PRÓXIMO
    // ------------------------------------------

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            currentIndex++;

            updateCarousel();

        });
    }


    // ==========================================
    // SWIPE NO CELULAR
    // ==========================================

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;

            const difference =
                touchStartX - touchEndX;


            // Arrastou para a esquerda
            if (difference > 50) {

                currentIndex++;

                updateCarousel();

            }


            // Arrastou para a direita
            if (difference < -50) {

                currentIndex--;

                updateCarousel();

            }

        },
        { passive: true }
    );


    // ==========================================
    // CONTROLE PELO TECLADO
    // ==========================================

    carousel.setAttribute("tabindex", "0");

    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            event.preventDefault();

            currentIndex++;

            updateCarousel();
        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            currentIndex--;

            updateCarousel();
        }
    });


    // ==========================================
    // RESPONSIVIDADE
    // ==========================================

    window.addEventListener("resize", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        createDots();

        updateCarousel();

    });


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    createDots();

    updateCarousel();
}


// ==========================================
// ANO AUTOMÁTICO DO RODAPÉ
// ==========================================

const year = document.querySelector("#current-year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


// ==========================================
// ==========================================
// FORMULÁRIO → WHATSAPP
// ==========================================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const telefone = document.querySelector("#telefone").value.trim();
        const mensagem = document.querySelector("#mensagem").value.trim();

        const texto = `Olá! Sou ${nome}.

Meu telefone: ${telefone}

Gostaria de saber mais sobre:
${mensagem}`;

        const textoWhatsApp = encodeURIComponent(texto);

        const numeroEmpresa = "5511983184154";

        const linkWhatsApp =
            `https://wa.me/${numeroEmpresa}?text=${textoWhatsApp}`;

        window.open(linkWhatsApp, "_blank");

    });

}
