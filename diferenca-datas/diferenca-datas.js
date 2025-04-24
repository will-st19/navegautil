function calcularDias() {
    const inicio = new Date(document.getElementById("dataInicio").value);
    const fim = new Date(document.getElementById("dataFim").value);
    const resultado = document.getElementById("resultado");
    const explicacao = document.getElementById("explicacao");

    if (isNaN(inicio) || isNaN(fim)) {
        resultado.textContent = "Preencha as duas datas corretamente.";
        explicacao.textContent = "";
        return;
    }

    const diffTime = Math.abs(fim - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    resultado.textContent = `Diferença: ${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;

    // Historinha suave
    let texto = "";
    if (diffDays === 0) {
        texto = "É o mesmo dia! Nem deu tempo de sentir saudade.";
    } else if (diffDays <= 7) {
        texto = "Foi só uma semaninha… dá pra encarar.";
    } else if (diffDays <= 30) {
        texto = "Mais de uma semana já é saudade com gosto.";
    } else if (diffDays <= 365) {
        texto = "Foi um bom tempo. Que tal marcar na agenda?";
    } else {
        texto = "Essa diferença é digna de outro século (ou quase).";
    }

    explicacao.textContent = texto;
}
