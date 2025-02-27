const TAMANHO_TABULEIRO = 15;
let tabuleiroArray = Array.from({ length: TAMANHO_TABULEIRO }, () => Array(TAMANHO_TABULEIRO).fill(""));

// Função para posicionar uma palavra no tabuleiro
function posicionarPalavra(palavra, direcao) {
    let linha, coluna, encaixeValido;

    do {
        encaixeValido = true;
        linha = Math.floor(Math.random() * TAMANHO_TABULEIRO);
        coluna = Math.floor(Math.random() * TAMANHO_TABULEIRO);

        // Verificar se a palavra cabe no tabuleiro
        if (direcao === "horizontal" && coluna + palavra.length > TAMANHO_TABULEIRO) {
            encaixeValido = false;
        } else if (direcao === "vertical" && linha + palavra.length > TAMANHO_TABULEIRO) {
            encaixeValido = false;
        } else {
            // Verificar se a palavra não conflita com outras
            for (let i = 0; i < palavra.length; i++) {
                const celula = direcao === "horizontal" ? tabuleiroArray[linha][coluna + i] : tabuleiroArray[linha + i][coluna];
                if (celula !== "" && celula !== palavra[i]) {
                    encaixeValido = false;
                    break;
                }
            }
        }
    } while (!encaixeValido);

    // Posicionar a palavra
    for (let i = 0; i < palavra.length; i++) {
        if (direcao === "horizontal") {
            tabuleiroArray[linha][coluna + i] = palavra[i];
        } else {
            tabuleiroArray[linha + i][coluna] = palavra[i];
        }
    }
}

// Função para preencher o tabuleiro com palavras
function preencherTabuleiro(palavras) {
    palavras.forEach(palavraObj => {
        const palavra = palavraObj.palavra.toUpperCase();
        const direcao = Math.random() < 0.5 ? "horizontal" : "vertical";
        posicionarPalavra(palavra, direcao);
    });

    // Preencher espaços vazios com letras aleatórias
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
        for (let j = 0; j < TAMANHO_TABULEIRO; j++) {
            if (tabuleiroArray[i][j] === "") {
                tabuleiroArray[i][j] = letras[Math.floor(Math.random() * letras.length)];
            }
        }
    }
}
