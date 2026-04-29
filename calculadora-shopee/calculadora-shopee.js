function calcularLucroShopee() {
    const custo = parseFloat(document.getElementById("custo").value);
    const venda = parseFloat(document.getElementById("venda").value);
    
    const resultadoEl = document.getElementById("resultado");
    const margemEl = document.getElementById("margem");
    const avisoEl = document.getElementById("aviso");

    if (isNaN(custo) || isNaN(venda) || venda <= 0) {
        resultadoEl.textContent = "Insira valores válidos para calcular.";
        return;
    }

    // A Mágica: 20% de comissão + 4 reais de taxa fixa
    const taxaPorcentagem = 0.20;
    const taxaFixa = 4.00;

    const descontoShopee = (venda * taxaPorcentagem) + taxaFixa;
    const lucroLiquido = venda - custo - descontoShopee;
    const margemPorcentagem = (lucroLiquido / venda) * 100;

    // Exibição dos resultados
    resultadoEl.textContent = `Lucro Líquido: R$ ${lucroLiquido.toFixed(2)}`;
    margemEl.textContent = `Margem de Lucro: ${margemPorcentagem.toFixed(1)}%`;

    // Lógica do aviso (O toque Navega Útil)
    if (lucroLiquido <= 0) {
        avisoEl.style.color = "red";
        avisoEl.textContent = "⚠️ Alerta: Você está PAGANDO para trabalhar. Aumente o preço!";
    } else if (margemPorcentagem < 15) {
        avisoEl.style.color = "orange";
        avisoEl.textContent = "🧐 Margem perigosa. Quase todo o lucro está ficando com a Shopee.";
    } else {
        avisoEl.style.color = "green";
        avisoEl.textContent = "✅ Margem aceitável. Pode preparar a embalagem!";
    }

    // Habilita o botão limpar após o cálculo
    document.getElementById("btnLimpar").disabled = false;
}

function limparCalculadora() {
    // Limpa os inputs
    document.getElementById("custo").value = "";
    document.getElementById("venda").value = "";
    
    // Limpa os textos de resultado
    document.getElementById("resultado").textContent = "";
    document.getElementById("margem").textContent = "";
    document.getElementById("aviso").textContent = "";
    
    // Desabilita o botão novamente (estado inicial)
    document.getElementById("btnLimpar").disabled = true;
}