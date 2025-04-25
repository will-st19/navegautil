let frases = [];

fetch("../componentes/frases_para_status.json")
    .then(resp => resp.json())
    .then(data => {
        frases = data;
        mostrarFraseAleatoria();
    })
    .catch(() => {
        document.getElementById("fraseBox").textContent = "Erro ao carregar as frases.";
    });

function mostrarFraseAleatoria() {
    if (!Array.isArray(frases) || frases.length === 0) {
        document.getElementById("fraseBox").textContent = "Nenhuma frase disponível no momento.";
        return;
    }

    let tentativa = 0;
    let fraseSelecionada = "";

    // Tenta até 10 vezes achar uma frase válida
    while (tentativa < 10 && !fraseSelecionada) {
        const indice = Math.floor(Math.random() * frases.length);
        const tentativaFrase = frases[indice]?.frase?.trim();

        if (tentativaFrase) {
            fraseSelecionada = tentativaFrase;
        }

        tentativa++;
    }

    document.getElementById("fraseBox").textContent = fraseSelecionada || "Algo deu errado ao escolher a frase.";
}

// Evento para mostrar uma nova frase ao clicar no botão
document.getElementById("novaFraseBtn").addEventListener("click", mostrarFraseAleatoria);