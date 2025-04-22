function calcularPorcentagem() {
    const tipo = document.getElementById("tipo").value;
    const v1 = parseFloat(document.getElementById("valor1").value);
    const v2 = parseFloat(document.getElementById("valor2").value);

    const resultadoEl = document.getElementById("resultado");
    const explicacaoEl = document.getElementById("explicacao");

    if (isNaN(v1) || isNaN(v2)) {
        resultadoEl.textContent = "Preencha os dois valores corretamente.";
        explicacaoEl.textContent = "";
        return;
    }

    let resultado = 0;
    let explicacao = "";

    switch (tipo) {
        case "1":
            resultado = (v1 / 100) * v2;
            resultadoEl.textContent = `Resultado: ${resultado.toFixed(2)}`;
            explicacao = `${v1}% de ${v2} é igual a ${resultado.toFixed(2)}.`;
            break;

        case "2":
            resultado = (v1 / v2) * 100;
            resultadoEl.textContent = `Resultado: ${resultado.toFixed(2)}%`;
            explicacao = `${v1} representa ${resultado.toFixed(2)}% de ${v2}.`;
            break;

        case "3":
            const diferenca = v2 - v1;
            resultado = (diferenca / v1) * 100;
            const direcao = diferenca >= 0 ? "aumento" : "redução";
            resultadoEl.textContent = `Resultado: ${Math.abs(resultado).toFixed(2)}% de ${direcao}`;
            explicacao = `De ${v1} para ${v2} houve um ${direcao} de ${Math.abs(resultado).toFixed(2)}%.`;
            break;
    }

    explicacaoEl.textContent = explicacao;
}
