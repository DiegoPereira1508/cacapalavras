// palavras.json será carregado aqui
const palavras = [
    { palavra: "PYTHON", dica: "Linguagem de programação" },
    { palavra: "GITHUB", dica: "Plataforma de versionamento" },
    { palavra: "JAVASCRIPT", dica: "Linguagem para web" },
    { palavra: "HTML", dica: "Linguagem de marcação" },
    { palavra: "CSS", dica: "Estilização de páginas" },
    { palavra: "REACT", dica: "Biblioteca JavaScript" },
    { palavra: "NODEJS", dica: "Runtime para JavaScript" },
    { palavra: "API", dica: "Interface de programação" },
    { palavra: "JSON", dica: "Formato de dados" },
    { palavra: "SQL", dica: "Linguagem para banco de dados" }
];

const tabuleiro = document.getElementById("tabuleiro");
const dicasDiv = document.getElementById("dicas");

// Função para criar o tabuleiro
function criarTabuleiro() {
    for (let i = 0; i < 100; i++) { // 10x10
        const celula = document.createElement("input");
        celula.type = "text";
        celula.maxLength = 1;
        celula.classList.add("celula");
        tabuleiro.appendChild(celula);
    }
}

// Função para exibir as dicas
function exibirDicas() {
    dicasDiv.innerHTML = "<h3>Dicas:</h3>";
    palavras.forEach((palavra, index) => {
        dicasDiv.innerHTML += `<p><strong>${index + 1}:</strong> ${palavra.dica}</p>`;
    });
}

// Inicialização
criarTabuleiro();
exibirDicas();