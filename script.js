
// ========================================
// CARROSSEL DE SERVIÇOS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const servicos = document.querySelectorAll(".servico-slide");

    const botaoAnterior = document.querySelector(".seta-esquerda");
    const botaoProximo = document.querySelector(".seta-direita");

    const indicadores = document.querySelector(".indicadores");

    let indiceAtual = 0;


    // Se não encontrar os serviços, não faz nada
    if (servicos.length === 0) {
        return;
    }


    // ========================================
    // MOSTRAR SERVIÇO
    // ========================================

    function mostrarServico(indice) {

        // Garante que o índice fique dentro dos limites
        if (indice < 0) {
            indiceAtual = servicos.length - 1;
        }

        else if (indice >= servicos.length) {
            indiceAtual = 0;
        }

        else {
            indiceAtual = indice;
        }


        // Esconde todos os serviços
        servicos.forEach(function (servico) {
            servico.style.display = "none";
        });


        // Mostra o serviço atual
        servicos[indiceAtual].style.display = "block";


        // Atualiza os indicadores
        atualizarIndicadores();
    }


    // ========================================
    // INDICADORES
    // ========================================

    function atualizarIndicadores() {

        if (!indicadores) {
            return;
        }

        const pontos = indicadores.querySelectorAll("span");

        pontos.forEach(function (ponto, indice) {

            if (indice === indiceAtual) {
                ponto.classList.add("ativo");
            } else {
                ponto.classList.remove("ativo");
            }

        });
    }


    // ========================================
    // SETA ESQUERDA
    // ========================================

    if (botaoAnterior) {

        botaoAnterior.addEventListener("click", function () {

            indiceAtual--;

            if (indiceAtual < 0) {
                indiceAtual = servicos.length - 1;
            }

            mostrarServico(indiceAtual);

        });

    }


    // ========================================
    // SETA DIREITA
    // ========================================

    if (botaoProximo) {

        botaoProximo.addEventListener("click", function () {

            indiceAtual++;

            if (indiceAtual >= servicos.length) {
                indiceAtual = 0;
            }

            mostrarServico(indiceAtual);

        });

    }


    // ========================================
    // INICIAR CARROSSEL
    // ========================================

    mostrarServico(0);

});
