document.addEventListener("DOMContentLoaded", function () {
    const hoje = new Date();
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0); // Último dia do mês
    const diasRestantes = (ultimoDia - hoje) / (1000 * 60 * 60 * 24);
    const diasFormatado = Math.ceil(diasRestantes);

    const texto =
        diasFormatado === 0
            ? "Hoje é o último dia do mês!"
            : `Faltam ${diasFormatado} dia${diasFormatado > 1 ? "s" : ""} para o fim do mês.`;

    document.getElementById("resultado").textContent = texto;
});
