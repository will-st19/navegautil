function calcularTempoViagem() {
    const distancia = parseFloat(document.getElementById("distancia").value);
    const velocidade = parseFloat(document.getElementById("velocidade").value);

    const resultadoEl = document.getElementById("resultado");
    const historinhaEl = document.getElementById("historinha");

    if (isNaN(distancia) || isNaN(velocidade) || velocidade <= 0) {
        resultadoEl.textContent = "Preencha todos os valores corretamente.";
        historinhaEl.textContent = "";
        resultadoEl.style.display = "block";
        historinhaEl.style.display = "none";
        return;
    }

    const tempo = distancia / velocidade;
    const horas = Math.floor(tempo);
    const minutos = Math.round((tempo - horas) * 60);

    resultadoEl.textContent = `Tempo estimado: ${horas}h ${minutos}min`;
    historinhaEl.textContent = `Se você viajar a ${velocidade} km/h, percorrendo ${distancia} km, levará cerca de ${horas} horas e ${minutos} minutos para chegar ao destino.`;

    resultadoEl.style.display = "block";
    historinhaEl.style.display = "block";
}
