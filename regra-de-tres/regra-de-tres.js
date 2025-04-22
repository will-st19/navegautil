function calcularRegraDeTres() {
    const v1 = parseFloat(document.getElementById("valor1").value);
    const v2 = parseFloat(document.getElementById("valor2").value);
    const v3 = parseFloat(document.getElementById("valor3").value);

    const resultadoEl = document.getElementById("resultado");
    const explicacaoEl = document.getElementById("explicacao");

    if (isNaN(v1) || isNaN(v2) || isNaN(v3) || v1 === 0) {
        resultadoEl.textContent = "Preencha os 3 valores corretamente. O primeiro não pode ser zero.";
        explicacaoEl.textContent = "";
        return;
    }

    const valorFinal = (v2 * v3) / v1;
    const arredondado = valorFinal.toFixed(2);
    resultadoEl.textContent = `Resultado: ${arredondado}`;

    // Gerar explicação simples estilo "historinha"
    let exemplo;
    if (Number.isInteger(v1) && Number.isInteger(v2) && Number.isInteger(v3)) {
        exemplo = `Se ${v1} unidades equivalem a ${v2}, então ${v3} unidades equivalem a ${arredondado}.`;
    } else {
        exemplo = `Considerando que ${v1} corresponde a ${v2}, então ${v3} corresponde a ${arredondado}.`;
    }

    explicacaoEl.textContent = exemplo;
}
