let signosData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('../componentes/signos.json')
        .then(response => response.json())
        .then(data => {
            signosData = data;
        })
        .catch(error => {
            console.error('Erro ao carregar dados dos signos:', error);
            document.getElementById('resultado').textContent = "Erro ao carregar os dados.";
            document.getElementById('resultado').style.display = "block";
        });
});

function consultarSigno() {
    const dia = parseInt(document.getElementById("diaInput").value, 10);
    const mes = parseInt(document.getElementById("mesInput").value, 10);
    const resultadoEl = document.getElementById("resultado");
    const historinhaEl = document.getElementById("historinha");

    // Validação simples
    if (isNaN(dia) || isNaN(mes) || dia < 1 || dia > 31 || mes < 1 || mes > 12) {
        resultadoEl.textContent = "Por favor, informe um dia e um mês válidos.";
        resultadoEl.style.display = "block";
        historinhaEl.style.display = "none";
        return;
    }

    // Procura o signo correspondente no JSON
    const signoEncontrado = signosData.find(signo => isDataNoIntervalo(dia, mes, signo));

    if (!signoEncontrado) {
        resultadoEl.textContent = "Não foi possível determinar seu signo.";
        resultadoEl.style.display = "block";
        historinhaEl.style.display = "none";
        return;
    }

    // Exibe o resultado principal
    resultadoEl.innerHTML = `<strong>Signo:</strong> ${signoEncontrado.nome}<br>
                             <strong>Elemento:</strong> ${signoEncontrado.elemento}`;
    resultadoEl.style.display = "block";

    // Exibe a historinha personalizada para o signo
    historinhaEl.textContent = signoEncontrado.historinha;
    historinhaEl.style.display = "block";
}

// Função para verificar se a data (dia, mes) está no intervalo do signo
function isDataNoIntervalo(dia, mes, signo) {
    // Converte a data para um número composto: MMDD (por exemplo, 20 de abril -> 420)
    let dataUsuario = mes * 100 + dia;
    let inicio = signo.mes_ini * 100 + signo.dia_ini;
    let fim = signo.mes_fim * 100 + signo.dia_fim;

    // Se o intervalo não cruza o ano, a comparação é simples
    if (inicio <= fim) {
        return dataUsuario >= inicio && dataUsuario <= fim;
    } else {
        // Para intervalos que cruzam o ano (ex.: Capricórnio: de 1222 a 119), ajusta o valor da data
        // Se a data do usuário for pequena (janeiro), somamos 1200 para compará-la corretamente.
        if (dataUsuario < inicio) dataUsuario += 1200;
        fim += 1200;
        return dataUsuario >= inicio && dataUsuario <= fim;
    }
}
