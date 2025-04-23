
function calcularIMC() {
    const peso = parseFloat(document.getElementById("peso").value);
    const resultadoDiv = document.getElementById("resultado");
    const historinhaDiv = document.getElementById("historinha");

    let altura = parseFloat(document.getElementById("altura").value);
    if (altura > 100) {
        altura = altura / 100; // converte centímetros para metros
    }

    if (!peso || !altura || altura === 0) {
        resultadoDiv.textContent = "Preencha os dois campos corretamente.";
        historinhaDiv.textContent = "";
        return;
    }

    const imc = peso / (altura * altura);
    let classificacao = "";
    let historinha = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        historinha = "Talvez seja hora de caprichar na janta e dar aquela atenção pra saúde.";
    } else if (imc < 25) {
        classificacao = "Peso ideal";
        historinha = "Segue o jogo! Continue com seus hábitos saudáveis (ou sorte mesmo 😄).";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        historinha = "Talvez um empurrãozinho nos hábitos ajude. Mas sem neura — cada corpo tem sua jornada.";
    } else {
        classificacao = "Obesidade";
        historinha = "Calma, respira. O importante é cuidar da saúde no seu tempo, sem se culpar.";
    }

    resultadoDiv.textContent = `Seu IMC é ${imc.toFixed(1)} — ${classificacao}.`;
    historinhaDiv.textContent = historinha;
}
