document.getElementById("downloadForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calcularTempoDownload();
});

function calcularTempoDownload() {
    const tamanho = parseFloat(document.getElementById("tamanho").value);
    const unidadeTamanho = document.getElementById("unidadeTamanho").value;
    const velocidade = parseFloat(document.getElementById("velocidade").value);
    const unidadeVelocidade = document.getElementById("unidadeVelocidade").value;
    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(tamanho) || isNaN(velocidade) || tamanho <= 0 || velocidade <= 0) {
        resultadoDiv.style.display = "block";
        resultadoDiv.innerText = "Por favor, insira valores válidos.";
        return;
    }

    let tamanhoMB = unidadeTamanho === "GB" ? tamanho * 1024 : tamanho;
    let velocidadeMBps = unidadeVelocidade === "Mbps" ? velocidade / 8 : velocidade;

    const tempoSegundos = tamanhoMB / velocidadeMBps;

    const horas = Math.floor(tempoSegundos / 3600);
    const minutos = Math.floor((tempoSegundos % 3600) / 60);
    const segundos = Math.round(tempoSegundos % 60);

    let mensagem = "";
    if (tempoSegundos < 2) {
        mensagem = "Quase instantâneo. Você piscou e já chegou.";
    } else if (tempoSegundos > 3600) {
        mensagem = "Dá tempo de ver um filme. Ou dois.";
    } else {
        mensagem = "Aguarde um pouquinho...";
    }

    resultadoDiv.style.display = "block";
    resultadoDiv.innerText = `${mensagem} Estimativa: ` +
        `${horas > 0 ? horas + "h " : ""}` +
        `${minutos > 0 ? minutos + "min " : ""}` +
        `${segundos}s.`;

    resultadoDiv.classList.add("resultadoBox");
}
