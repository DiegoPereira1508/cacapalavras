document.addEventListener("DOMContentLoaded", () => {
    iniciarJogo(document.getElementById("tema").value);
});

document.getElementById("tema").addEventListener("change", (e) => {
    iniciarJogo(e.target.value);
});

let tabuleiroArray = [];  // Matriz do tabuleiro

function iniciarJogo(tema) {
    gerarTabuleiroVazio();
    criarTabuleiroVisual();
    iniciarTimer();
}

function gerarTabuleiroVazio() {
    tabuleiroArray = Array.from({ length: 15 }, () => Array(15).fill(""));
}

function criarTabuleiroVisual() {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";  // Limpa o tabuleiro antes de criar

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const input = document.createElement("input");
            input.classList.add("celula");
            input.maxLength = 1;
            input.dataset.x = i;
            input.dataset.y = j;
            input.value = tabuleiroArray[i][j] || "";
            tabuleiro.appendChild(input);
        }
    }
}

function verificarRespostas() {
    alert("Lógica de verificação ainda será implementada.");
}

// Timer básico (só pra exemplo)
let segundos = 0;
let timer;

function iniciarTimer() {
    clearInterval(timer);  // Reseta caso esteja rodando
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
