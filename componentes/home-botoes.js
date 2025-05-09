document.addEventListener("DOMContentLoaded", function () {
    const botoes = [
        { texto: "Consulta CEP", link: "consulta-cep/consulta-cep.html" },
        { texto: "Regra de 3", link: "regra-de-tres/regra-de-tres.html" },
        { texto: "Porcentagem", link: "porcentagem/porcentagem.html" },
        { texto: "IMC", link: "imc/imc.html" },
        { texto: "Dias entre Datas", link: "diferenca-datas/diferenca-datas.html" },
        { texto: "Dias Restantes", link: "contador-dias/contador-dias.html" },
        { texto: "Que horas são?", link: "agora-exatamente/agora-exatamente.html" },
        { texto: "Dica do Dia", link: "dica-do-dia/dica-do-dia.html" },
        { texto: "Resumo CSV", link: "resumo-csv/resumo-csv.html" },
        { texto: "Frases para Status", link: "frases-status/frases-status.html" },
        { texto: "Café do Dia", link: "calculadora-cafe/calculadora-cafe.html" },
        { texto: "Salário em Notas", link: "salario-notas/salario-notas.html" },
        { texto: "Tempo de Download", link: "tempo-download/tempo-download.html" },
        { texto: "Simulador de Cartão", link: "simulador-cartao/simulador-cartao.html" },
        { texto: "Apoie o Projeto", link: "apoie-me.html" }
    ];

    // Embaralhar array e pegar os 6 primeiros
    const selecionados = botoes
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

    const container = document.querySelector(".home-buttons");

    selecionados.forEach(botao => {
        const a = document.createElement("a");
        a.href = botao.link;
        a.className = "btn-home";
        a.textContent = botao.texto;
        container.appendChild(a);
    });
});
