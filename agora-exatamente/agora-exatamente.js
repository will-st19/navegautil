document.addEventListener("DOMContentLoaded", async () => {
    const horaEl = document.getElementById("hora");
    const mensagemEl = document.getElementById("mensagem");

    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes();

    horaEl.textContent = `Agora são ${hora}:${agora.getMinutes().toString().padStart(2, '0')}`;

    try {
        const res = await fetch("../componentes/mensagens_por_hora.json");
        const data = await res.json();

        const mensagens = data[hora];
        if (mensagens && mensagens[minuto]) {
            mensagemEl.textContent = mensagens[minuto];
        } else {
            mensagemEl.textContent = "Está tudo tão quieto quanto agora.";
        }
    } catch (err) {
        mensagemEl.textContent = "Não foi possível carregar a mensagem.";
    }
});
