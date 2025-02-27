const TAMANHO = 15;
let tabuleiroArray = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(""));
let segundos = 0, minutos = 0, intervalo;
let pontuacao = 0;

const palavras = {
    conhecimentos_gerais: [
        { palavra: "EINSTEIN", dica: "Físico famoso pela teoria da relatividade" },
        { palavra: "AMAZONIA", dica: "Maior floresta tropical do mundo" }
    ],
    ditos_populares: [
        { palavra: "AGUA", dica: "Quem não tem colher, bebe direto da..." },
        { palavra: "CACHORRO", dica: "Quem não tem... caça com gato" }
    ],
    marcas_de_carros: [
        { palavra: "FIAT", dica: "Marca italiana de carros" },
        { palavra: "FORD", dica: "Marca americana de carros" }
    ],
    frutas: [
        { palavra: "BANANA", dica: "Fruta amarela e alongada" },
        { palavra: "UVA", dica: "Fruta usada para fazer vinho" }
    ]
};

const tabuleiro = document.getElementById("tabuleiro");
const dicasDiv = document.getElementById("dicas");
const temaSelect = document.getElementById("tema");
const pontuacaoDiv = document.getElementById("pontuacao");
const tempoDiv = document.getElementById("tempo");
document.getElementById("verificar").addEventListener("click", verificarRespostas);

temaSelect.addEventListener("change", () => iniciarJogo(temaSelect.value));

function iniciarJogo(tema) {
    tabuleiroArray = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(""));
    preencherTabuleiro(palavras[tema]);
    criarTabuleiroVisual();
    exibirDicas(tema);
    pontuacao = 0;
    pontuacaoDiv.innerText = `Pontuação: ${pontuacao}`;
    iniciarCronometro();
}

function preencherTabuleiro(palavrasDoTema) {
    palavrasDoTema.forEach(({ palavra }) => {
        let encaixou = false;
        palavra = palavra.toUpperCase();

        while (!encaixou) {
            const horizontal = Math.random() < 0.5;
            const linha = Math.floor(Math.random() * TAMANHO);
            const coluna = Math.floor(Math.random() * TAMANHO);
            if (horizontal && coluna + palavra.length <= TAMANHO ||
                !horizontal && linha + palavra.length <= TAMANHO) {
                encaixou = true;
                for (let i = 0; i < palavra.length; i++) {
                    const x = horizontal ? linha : linha + i;
                    const y = horizontal ? coluna + i : coluna;
                    if (tabuleiroArray[x][y] && tabuleiroArray[x][y] !== palavra[i]) {
                        encaixou = false;
                        break;
                    }
                }
                if (encaixou) {
                    for (let i = 0; i < palavra.length; i++) {
                        const x = horizontal ? linha : linha + i;
                        const y = horizontal ? coluna + i : coluna;
                        tabuleiroArray[x][y] = palavra[i];
                    }
                }
            }
        }
    });

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    tabuleiroArray = tabuleiroArray.map(linha =>
        linha.map(c => c || letras[Math.floor(Math.random() * letras.length)])
    );
}

function criarTabuleiroVisual() {
    tabuleiro.innerHTML = "";
    tabuleiro.style.gridTemplateColumns = `repeat(${TAMANHO}, 40px)`;
    tabuleiro.style.gridTemplateRows = `repeat(${TAMANHO}, 40px)`;

    tabuleiroArray.flat().forEach(letra => {
        const input = document.createElement("input");
        input.classList.add("celula");
        input.maxLength = 1;
        tabuleiro.appendChild(input);
    });
}

function exibirDicas(tema) {
    dicasDiv.innerHTML = "<h3>Dicas:</h3>";
    palavras[tema].forEach(({ dica }, i) => {
        dicasDiv.innerHTML += `<p>${i + 1}. ${dica}</p>`;
    });
}

function iniciarCronometro() {
    clearInterval(intervalo);
    minutos = segundos = 0;
    atualizarTempo();
    intervalo = setInterval(() => {
        segundos++;
        if (segundos === 60) { minutos++; segundos = 0; }
        atualizarTempo();
    }, 1000);
}

function atualizarTempo() {
    tempoDiv.innerText = `Tempo: ${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function verificarRespostas() {
    let acertos = 0;
    [...tabuleiro.children].forEach((celula, i) => {
        const x = Math.floor(i / TAMANHO), y = i % TAMANHO;
        if (celula.value.toUpperCase() === tabuleiroArray[x][y]) {
            celula.style.backgroundColor = "#c8e6c9";
            acertos++;
        } else {
            celula.style.backgroundColor = "#ffcdd2";
        }
    });
    pontuacaoDiv.innerText = `Pontuação: ${acertos}`;
}

iniciarJogo(temaSelect.value);
