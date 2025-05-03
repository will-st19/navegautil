async function executarCalculo() {
    const inicio = new Date(document.getElementById("dataInicio").value);
    const fim = new Date(document.getElementById("dataFim").value);
    const resultado = document.getElementById("resultado");
    const historinha = document.getElementById("historinha");

    if (isNaN(inicio) || isNaN(fim)) {
        resultado.textContent = "Preencha as duas datas corretamente.";
        historinha.textContent = "";
        resultado.style.display = "block";
        historinha.style.display = "none";
        return;
    }

    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    resultado.textContent = `Diferença: ${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;
    resultado.style.display = "block";

    // Buscar mensagens do JSON
    fetch("../componentes/dif-datas.json")
        .then(response => response.json())
        .then(mensagens => {
            let texto = mensagens["7301+"]; // Padrão caso nenhuma faixa seja encontrada

            for (const faixa in mensagens) {
                if (faixa.includes("-")) {
                    const [min, max] = faixa.split("-").map(Number);
                    if (diffDays >= min && diffDays <= max) {
                        texto = mensagens[faixa];
                        break;
                    }
                } else if (diffDays >= parseInt(faixa)) {
                    texto = mensagens[faixa];
                }
            }

            historinha.textContent = texto;
            historinha.style.display = "block";
        });
}
