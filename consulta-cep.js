function consultarCEP() {
    var cep = document.getElementById("cep").value.replace("-", ""); // Remove o hífen do CEP se houver

    if (cep.length !== 8) {
        alert("Por favor, insira um CEP válido (8 dígitos).");
        return;
    }

    var url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById("resultado").innerHTML = "CEP não encontrado.";
            } else {
                document.getElementById("resultado").innerHTML = `
                    <p><strong>Endereço:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Erro ao consultar o CEP:", error);
            document.getElementById("resultado").innerHTML = "Erro ao consultar o CEP.";
        });
}
