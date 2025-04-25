function calcularGastoCafe() {
    const valor = parseFloat(document.getElementById("valorCafe").value);
    const resultado = document.getElementById("cafeResultado");

    if (isNaN(valor) || valor <= 0) {
        resultado.style.display = "block";
        resultado.innerHTML = `<p style="color: red;">Por favor, insira um valor válido.</p>`;
        return;
    }

    const diasNoAno = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1;

    const semana = (valor * 7).toFixed(2);
    const mes = (valor * 30).toFixed(2);
    const ano = (valor * 365).toFixed(2);
    const ateHoje = (valor * diasNoAno).toFixed(2);

    resultado.style.display = "block";
    resultado.innerHTML = `
        <p style="margin-bottom: 1rem; font-style: italic;">
            ☕ Seu amor por café é uma arte... e um investimento!
        </p>

        <div style="margin-bottom: 1rem;">
            <p><strong>Por semana:</strong> R$ ${semana}</p>
            <p><strong>Por mês:</strong> R$ ${mes}</p>
            <p><strong>Por ano:</strong> R$ ${ano}</p>
            <p><strong>Desde 1º de janeiro:</strong> R$ ${ateHoje}</p>
        </div>

        <p style="margin-bottom: 1rem; font-style: italic;">
            Se essa página te ajudou, retribui com um cafézinho:
        </p>

        <div style="text-align: center; margin-top: 1rem;">
            <a href="../apoie-me.html" class="btn-apoie">Apoie-me ☕</a>
        </div>
    `;
}
