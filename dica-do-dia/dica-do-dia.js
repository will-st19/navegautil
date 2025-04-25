fetch("../componentes/dica-do-dia.json")
    .then(resp => resp.json())
    .then(dicas => {
        const hoje = new Date();
        const dia = hoje.getDate(); // 1 a 31
        const hora = hoje.getHours(); // 0 a 23

        let turno;
        if (hora < 12) turno = "manha";
        else if (hora < 18) turno = "tarde";
        else turno = "noite";

        const dica = dicas.find(d => d.dia === dia);
        const texto = dica?.[turno] || "Sem dica para este horário.";
        document.getElementById("dicaTexto").textContent = texto;
    })
    .catch(() => {
        document.getElementById("dicaTexto").textContent = "Erro ao carregar a dica.";
    });
