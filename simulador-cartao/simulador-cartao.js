async function simularCartao() {
    const valor = parseFloat(document.getElementById('valor').value);
    const parcelas = parseInt(document.getElementById('parcelas').value);
    const resultado = document.getElementById('resultado');
    const mensagem = document.getElementById('mensagem-explicativa');
    const containerResultado = document.getElementById('cartaoResultado');

    if (isNaN(valor) || isNaN(parcelas)) {
        resultado.innerHTML = 'Preencha todos os campos corretamente.';
        mensagem.innerHTML = '';
        containerResultado.style.display = 'block'; // Mostra mesmo com erro
        return;
    }

    const jurosInput = parseFloat(document.getElementById('juros').value) || 0;
    const juros = jurosInput / 100;

    containerResultado.style.display = 'block'; // Agora visível apenas após clique
    mensagem.style.display = 'block';

    if (parcelas === 1) {
        resultado.innerHTML = `
            <p>Pagamento à vista: <strong>R$ ${valor.toFixed(2)}</strong></p>
        `;
        mensagem.innerText = 'Parabéns por pagar tudo de uma vez! Sem juros, sem enrolação. 😉';
    } else {
        const total = valor * Math.pow(1 + juros, parcelas);
        const parcela = total / parcelas;

        resultado.innerHTML = `
            <p>Valor total com juros: <strong>R$ ${total.toFixed(2)}</strong></p>
            <p>${parcelas}x de <strong>R$ ${parcela.toFixed(2)}</strong></p>
        `;

        try {
            const res = await fetch('../componentes/mensagens_cartao.json');
            const mensagens = await res.json();
            const indice = Math.floor(Math.random() * mensagens.length);
            mensagem.innerText = mensagens[indice];
        } catch (e) {
            mensagem.innerText = 'Algo deu errado ao carregar a mensagem :(';
        }
    }
}
