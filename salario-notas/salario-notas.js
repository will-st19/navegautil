document.querySelector('.calc-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const salario = parseFloat(document.getElementById('salario').value);
    const resultado = document.getElementById('resultSalario');

    if (isNaN(salario) || salario <= 0) {
        resultado.innerHTML = `<p>Por favor, insira um valor válido! 🧐</p>`;
        return;
    }

    try {
        const response = await fetch("../componentes/mensagens-salario.json");
        if (!response.ok) {
            throw new Error('Erro ao carregar mensagens');
        }

        const mensagensPorAltura = await response.json();

        const alturaNota = 0.1; // altura de uma nota de R$1 em milímetros
        const alturaTotalMm = salario * alturaNota;
        const alturaTotalCm = alturaTotalMm / 10;

        let mensagemAltura = mensagensPorAltura.find(item => alturaTotalCm <= item.max)?.mensagem
            || "Sua pilha é simplesmente inimaginável! 🚀";

        resultado.innerHTML = `
          <p>Você teria <strong>${salario.toFixed(0)}</strong> notas de R$1.</p>
          <p>Empilhadas, elas teriam aproximadamente <strong>${alturaTotalCm.toFixed(1)} cm</strong> de altura.</p>
          <p><em>${mensagemAltura}</em></p>
        `;

        resultado.classList.add('show');
    } catch (error) {
        console.error(error);
        resultado.innerHTML = `<p>Erro ao calcular. Tente novamente mais tarde. 😔</p>`;
    }
});
