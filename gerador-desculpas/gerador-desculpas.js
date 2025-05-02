let frases = [];

fetch("../componentes/desculpas.json")
    .then(resp => resp.json())
    .then(data => {
        frases = data;
        mostrarDesculpaAleatoria();
    })
    .catch(() => {
        document.getElementById("resultado").textContent = "Erro ao carregar as desculpas.";
    });

function mostrarDesculpaAleatoria() {
    if (!Array.isArray(frases) || frases.length === 0) {
        document.getElementById("resultado").textContent = "Nenhuma desculpa disponível no momento.";
        return;
    }

    let tentativa = 0;
    let desculpaSelecionada = "";

    // Tenta até 10 vezes encontrar uma desculpa válida
    while (tentativa < 10 && !desculpaSelecionada) {
        const indice = Math.floor(Math.random() * frases.length);
        const tentativaDesculpa = frases[indice]?.frase?.trim();

        if (tentativaDesculpa) {
            desculpaSelecionada = tentativaDesculpa;
        }
        tentativa++;
    }

    document.getElementById("resultado").textContent =
        desculpaSelecionada || "Algo deu errado ao escolher a desculpa.";
}

document.getElementById("gerar-btn").addEventListener("click", mostrarDesculpaAleatoria);

document.getElementById("copiar-btn").addEventListener("click", () => {
    const texto = document.getElementById("resultado").textContent;
    if (texto.trim() === "") return;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert("Desculpa copiada!");
            })
            .catch(err => {
                alert("Erro ao copiar a desculpa.");
                console.error("Erro ao copiar: ", err);
            });
    } else {
        // Fallback para navegadores sem suporte ao navigator.clipboard
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand("copy");
            alert("Desculpa copiada!");
        } catch (err) {
            alert("Erro ao copiar a desculpa.");
            console.error("Erro ao copiar: ", err);
        }
        document.body.removeChild(textArea);
    }
});
