let pontuacao = 0;

// Função para criar o tabuleiro visual
function criarTabuleiroVisual() {
    tabuleiro.innerHTML = "";
    tabuleiro.style.gridTemplateColumns = `repeat(${TAMANHO_TABULEIRO}, 40px)`;
    tabuleiro.style.gridTemplateRows = `repeat(${TAMANHO_TABULEIRO}, 40px)`;

    for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
        for (let j = 0; j < TAMANHO_TABULEIRO; j++) {
            const celula = document.createElement("input");
            celula.type = "text";
            celula.maxLength = 1;
            celula.value = tabuleiroArray[i][j];
            celula.readOnly = true;
            celula.classList.add("celula");
            tabuleiro.appendChild(celula);
        }
    }
}

// Função para verificar a pontuação
function verificarPontuacao() {
    pontuacao += 10;
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

// Inicialização
function iniciarJogo(tema) {
    tabuleiroArray = Array.from({ length: TAMANHO_TABULEIRO }, () => Array(TAMANHO_TABULEIRO).fill(""));
    preencherTabuleiro(palavras[tema]);
    criarTabuleiroVisual();
    exibirDicas(tema);
    pontuacao = 0;
    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
}

// Evento para mudar o tema
temaSelect.addEventListener("change", () => iniciarJogo(temaSelect.value));

// Iniciar o jogo com o primeiro tema
iniciarJogo("conhecimentos_gerais");
