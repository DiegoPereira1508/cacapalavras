const TAMANHO = 15;
let tabuleiroArray = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(""));
let pontuacao = 0;
let cronometro = null;
let segundos = 0;

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
    resetarCronometro();
    tabuleiroArray = Array.from({ length: TAMANHO }, () => Array(TAMANHO).fill(""));
    preencherTabuleiro(palavras[tema]);
    criarTabuleiroVisual();
    exibirDicas(tema);
    pontuacao = 0;
    atualizarPontuacao();
    iniciarCronometro();
}

function preencherTabuleiro(lista) {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    lista.forEach(({ palavra }) => {
        let colocado = false;
        palavra = palavra.toUpperCase();

        while (!colocado) {
            const horizontal = Math.random() < 0.5;
            const linha = Math.floor(Math.random() * TAMANHO);
            const coluna = Math.floor(Math.random() * TAMANHO);

            if (horizontal && coluna + palavra.length <= TAMANHO ||
                !horizontal && linha + palavra.length <= TAMANHO) {
                colocado = true;
                for (let i = 0; i < palavra.length; i++) {
                    const x = horizontal ? linha : linha + i;
                    const y = horizontal ? coluna + i : coluna;
                    if (tabuleiroArray[x][y] && tabuleiroArray[x][y] !== palavra[i]) {
                        colocado = false;
                        break;
                    }
                }
                if (colocado) {
                    for (let i = 0; i < palavra.length; i++) {
                        const x = horizontal ? linha : linha + i;
                        const y = horizontal ? coluna + i : coluna;
                        tabuleiroArray[x][y] = palavra[i];
                    }
                }
            }
        }
    });

    tabuleiroArray = tabuleiroArray.map(row => 
        row.map(cell => cell || letras[Math.floor(Math.random() * letras.length)])
    );
}

function criarTabuleiroVisual() {
    tabuleiro.innerHTML = "";
    tabuleiroArray.flat().forEach(letra => {
        const input = document.createElement("input");
        input.classList.add("celula");
        input.maxLength = 1;
        input.value = letra;
        tabuleiro.appendChild(input);
    });
}

function exibirDicas(tema) {
    dicasDiv.innerHTML = "<h3>Dicas:</h3>";
    palavras[tema].forEach(({ dica
