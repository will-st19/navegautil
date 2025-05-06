// Simular data (remover em produção)
// let dataHoje = new Date("2025-09-25");
let dataHoje = new Date(); // usar em produção

const caminho = window.location.pathname;
let estacao = "";

if (caminho.includes("outono")) estacao = "outono";
else if (caminho.includes("primavera")) estacao = "primavera";
else if (caminho.includes("verao")) estacao = "verao";
else if (caminho.includes("inverno")) estacao = "inverno";
else estacao = "desconhecida";

// Retorna o próximo ciclo (início e fim) da estação
function obterProximoCiclo(estacao, dataBase) {
    const ano = dataBase.getFullYear();
    let inicio, fim;

    switch (estacao) {
        case "verao":
            inicio = new Date(`${ano}-12-21`);
            fim = new Date(`${ano + 1}-03-19`);
            if (dataBase < new Date(`${ano}-03-20`)) {
                // Estamos no ciclo que começou no ano anterior
                inicio = new Date(`${ano - 1}-12-21`);
                fim = new Date(`${ano}-03-19`);
            } else if (dataBase > fim) {
                inicio = new Date(`${ano + 1}-12-21`);
                fim = new Date(`${ano + 2}-03-19`);
            }
            break;

        case "outono":
            inicio = new Date(`${ano}-03-20`);
            fim = new Date(`${ano}-06-20`);
            if (dataBase > fim) {
                inicio = new Date(`${ano + 1}-03-20`);
                fim = new Date(`${ano + 1}-06-20`);
            }
            break;

        case "inverno":
            inicio = new Date(`${ano}-06-21`);
            fim = new Date(`${ano}-09-22`);
            if (dataBase > fim) {
                inicio = new Date(`${ano + 1}-06-21`);
                fim = new Date(`${ano + 1}-09-22`);
            }
            break;

        case "primavera":
            inicio = new Date(`${ano}-09-23`);
            fim = new Date(`${ano}-12-20`);
            if (dataBase > fim) {
                inicio = new Date(`${ano + 1}-09-23`);
                fim = new Date(`${ano + 1}-12-20`);
            }
            break;
    }

    return { inicio, fim };
}

function diasEntre(a, b) {
    const ms = b.getTime() - a.getTime();
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function carregarImagem(src, alt) {
    const img = new Image();
    img.src = src;
    img.alt = alt;
    img.width = 200;

    img.onload = () => {
        document.getElementById("imagemEstacao").innerHTML = "";
        document.getElementById("imagemEstacao").appendChild(img);
    };

    img.onerror = () => {
        document.getElementById("imagemEstacao").innerHTML = "";
    };
}

function nomeFormatado(estacao) {
    switch (estacao) {
        case "verao": return "verão";
        case "inverno": return "inverno";
        case "primavera": return "primavera";
        case "outono": return "outono";
        default: return estacao;
    }
}

function artigo(estacao) {
    return estacao === "primavera" ? "a" : "o";
}

function gerarPagina(estacao) {
    const { inicio, fim } = obterProximoCiclo(estacao, dataHoje);
    const resultado = document.getElementById("resultado");
    const historinha = document.getElementById("historinha");

    let mensagem = "";
    let contexto = "";

    if (dataHoje < inicio) {
        const dias = diasEntre(dataHoje, inicio);
        mensagem = `Faltam <strong>${dias} dia(s)</strong> para o início d${artigo(estacao)} ${nomeFormatado(estacao)}.`;

        if (dias <= 7) {
            contexto = `Está quase na hora. ${artigo(estacao).charAt(0).toUpperCase() + artigo(estacao).slice(1)} ${nomeFormatado(estacao)} começa em breve.`;
        } else if (dias <= 30) {
            contexto = `${artigo(estacao).charAt(0).toUpperCase() + artigo(estacao).slice(1)} ${nomeFormatado(estacao)} se aproxima, falta pouco.`;
        } else if (dias <= 90) {
            contexto = `Falta um pouco ainda, mas ${artigo(estacao)} ${nomeFormatado(estacao)} já está no horizonte.`;
        } else if (dias <= 180) {
            contexto = `${artigo(estacao).charAt(0).toUpperCase() + artigo(estacao).slice(1)} ${nomeFormatado(estacao)} vem aí, só mais um tempo.`;
        } else {
            contexto = `Ainda está distante, mas ${artigo(estacao)} ${nomeFormatado(estacao)} chega na hora certa.`;
        }

        carregarImagem(`../imgs/${estacao}_espera.png`, `${estacao} se aproximando`);
    } else if (dataHoje > fim) {
        const dias = diasEntre(dataHoje, inicio); // próximo ciclo
        mensagem = `${artigo(estacao)} ${nomeFormatado(estacao)} já passou. Faltam <strong>${dias} dia(s)</strong> para ${artigo(estacao)} próxim${artigo(estacao)}.`;
        contexto = `Saudades d${artigo(estacao)} ${nomeFormatado(estacao)}? Volta em breve!`;
        carregarImagem(`../imgs/${estacao}_fim.png`, `Fim d${artigo(estacao)} ${nomeFormatado(estacao)}`);
    } else {
        const total = diasEntre(inicio, fim);
        const jaPassaram = diasEntre(inicio, dataHoje);
        const falta = diasEntre(dataHoje, fim);
        const porcentagem = Math.floor((jaPassaram / total) * 100);

        mensagem = `Estamos n${artigo(estacao)} ${nomeFormatado(estacao)}! Já se passaram <strong>${jaPassaram}</strong> de <strong>${total}</strong> dias (${porcentagem}%).`;

        if (jaPassaram < 30) {
            contexto = `${artigo(estacao).charAt(0).toUpperCase() + artigo(estacao).slice(1)} ${nomeFormatado(estacao)} está só começando! Aproveite o clima e o charme.`;
            carregarImagem(`../imgs/${estacao}_inicio.png`, `Início d${artigo(estacao)} ${nomeFormatado(estacao)}`);
        } else if (falta < 30) {
            contexto = `${artigo(estacao).charAt(0).toUpperCase() + artigo(estacao).slice(1)} ${nomeFormatado(estacao)} já está se despedindo. Curta os últimos dias.`;
            carregarImagem(`../imgs/${estacao}_fim.png`, `Final d${artigo(estacao)} ${nomeFormatado(estacao)}`);
        } else {
            contexto = `Estamos no auge d${artigo(estacao)} ${nomeFormatado(estacao)}. Está gostando?`;
            carregarImagem(`../imgs/${estacao}_meio.png`, `Meio d${artigo(estacao)} ${nomeFormatado(estacao)}`);
        }
    }

    resultado.innerHTML = mensagem;
    historinha.innerHTML = `<p>${contexto}</p>`;
}

if (estacao !== "desconhecida") {
    gerarPagina(estacao);
} else {
    document.getElementById("resultado").textContent = "Estação não reconhecida.";
}
