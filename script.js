document.addEventListener("DOMContentLoaded", () => {
    const tema = document.getElementById("tema");
    if (tema) {
        iniciarJogo(tema.value);
    }
});

document.getElementById("tema")?.addEventListener("change", (e) => {
    iniciarJogo(e.target.value);
});

document.getElementById("verificarRespostas")?.addEventListener("click", verificarRespostas);

let tabuleiroArray = [];  // Matriz do tabuleiro
let palavrasDoTema = [];  // Lista de palavras para o tema selecionado
let dicasDoTema = [];     // Lista de dicas para o tema selecionado

function iniciarJogo(tema) {
    // Define palavras e dicas com base no tema
    definirPalavrasEDicas(tema);

    // Gera o tabuleiro vazio
    gerarTabuleiroVazio();

    // Preenche o tabuleiro com as palavras
    preencherTabuleiroComPalavras();

    // Cria o tabuleiro visual
    criarTabuleiroVisual();

    // Inicia o timer
    iniciarTimer();

    // Exibe as dicas
    exibirDicas();
}

function definirPalavrasEDicas(tema) {
    switch (tema) {
        case "conhecimentos_gerais":
            palavrasDoTema = ["JAVASCRIPT", "HTML", "CSS", "PROGRAMACAO"];
            dicasDoTema = [
                "Linguagem de programação usada na web.",
                "Linguagem de marcação para criar páginas web.",
                "Linguagem de estilização para páginas web.",
                "Processo de escrever código para computadores."
            ];
            break;
        case "ditos_populares":
            palavrasDoTema = ["AGUA", "PEDRA", "TEMPO", "VIDA"];
            dicasDoTema = [
                "Água mole em pedra dura...",
                "Pedra que rola não cria limo.",
                "O tempo é relativo.",
                "A vida é feita de escolhas."
            ];
            break;
        case "marcas_de_carros":
            palavrasDoTema = ["FIAT", "FORD", "TOYOTA", "VOLKSWAGEN"];
            dicasDoTema = [
                "Marca italiana de carros.",
                "Marca americana de carros.",
                "Marca japonesa de carros.",
                "Marca alemã de carros."
            ];
            break;
        case "frutas":
            palavrasDoTema = ["BANANA", "MACA", "LARANJA", "UVA"];
            dicasDoTema = [
                "Fruta amarela e alongada.",
                "Fruta vermelha ou verde.",
                "Fruta cítrica e redonda.",
                "Fruta pequena e roxa."
            ];
            break;
        default:
            palavrasDoTema = [];
            dicasDoTema = [];
    }
}

function gerarTabuleiroVazio() {
    tabuleiroArray = Array.from({ length: 15 }, () => Array(15).fill(""));
}

function preencherTabuleiroComPalavras() {
    palavrasDoTema.forEach((palavra) => {
        const direcao = Math.random() > 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * (15 - palavra.length));
        const y = Math.floor(Math.random() * (15 - palavra.length));

        for (let i = 0; i < palavra.length; i++) {
            if (direcao === "horizontal") {
                tabuleiroArray[x][y + i] = palavra[i];
            } else {
                tabuleiroArray[x + i][y] = palavra[i];
            }
        }
    });
}

function criarTabuleiroVisual() {
    const tabuleiro = document.getElementById("tabuleiro");
    if (tabuleiro) {
        tabuleiro.innerHTML = "";
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                const input = document.createElement("input");
                input.classList.add("celula");
                input.maxLength = 1;
                input.dataset.x = i;
                input.dataset.y = j;
                input.value = tabuleiroArray[i][j] || "";
                fragment.appendChild(input);
            }
        }

        tabuleiro.appendChild(fragment);
        tabuleiro.querySelector(".celula")?.focus();
    }
}

function exibirDicas() {
    const dicas = document.getElementById("dicas");
    if (dicas) {
        dicas.innerHTML = "<h3>Dicas:</h3>" + dicasDoTema.map((dica, index) => `<p>${index + 1}. ${dica}</p>`).join("");
    }
}

function verificarRespostas() {
    const celulas = document.querySelectorAll(".celula");
    let acertos = 0;

    celulas.forEach((celula) => {
        const x = parseInt(celula.dataset.x);
        const y = parseInt(celula.dataset.y);
        if (celula.value.toUpperCase() === tabuleiroArray[x][y]) {
            acertos++;
        }
    });

    alert(`Você acertou ${acertos} de ${palavrasDoTema.join("").length} letras!`);
}

// Timer
let segundos = 0;
let timer;

function iniciarTimer() {
    clearInterval(timer);
    segundos = 0;
    atualizarTempo();
    timer = setInterval(() => {
        segundos++;
        atualizarTempo();
    }, 1000);
}

function atualizarTempo() {
    const minutos = Math.floor(segundos / 60).toString().padStart(2, '0');
    const segundosRestantes = (segundos % 60).toString().padStart(2, '0');
    document.getElementById("tempo").innerText = `${minutos}:${segundosRestantes}`;
}
