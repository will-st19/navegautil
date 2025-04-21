document.addEventListener("DOMContentLoaded", function () {
    const buscarBtn = document.getElementById("buscar");
    const cepInput = document.getElementById("cep");
    const cepInfo = document.getElementById("cepInfo");
    const mapa = document.getElementById("mapa");

    buscarBtn.addEventListener("click", async () => {
        const cep = cepInput.value.replace(/\D/g, "");
        if (cep.length !== 8) {
            cepInfo.innerHTML = "<p>CEP inválido. Informe 8 dígitos.</p>";
            mapa.src = "";
            return;
        }

        try {
            cepInfo.innerHTML = "<p>Buscando...</p>";
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();

            if (data.erro) {
                cepInfo.innerHTML = "<p>CEP não encontrado.</p>";
                mapa.src = "";
            } else {
                const { logradouro, bairro, localidade, uf } = data;
                const estado = obterEstadoPorUF(uf);

                cepInfo.innerHTML = `
                    <p><strong>Logradouro:</strong> ${logradouro || '-'}</p>
                    <p><strong>Bairro:</strong> ${bairro || '-'}</p>
                    <p><strong>Cidade:</strong> ${localidade}</p>
                    <p><strong>UF:</strong> ${uf}</p>
                    <p><strong>Estado:</strong> ${estado}</p>
                `;

                const endereco = encodeURIComponent(`${logradouro}, ${bairro}, ${localidade}, ${uf}`);
                mapa.src = `https://www.google.com/maps?q=${endereco}&output=embed`;
            }
        } catch (error) {
            cepInfo.innerHTML = "<p>Erro na consulta. Tente novamente.</p>";
            mapa.src = "";
        }
    });

    function obterEstadoPorUF(uf) {
        const estados = {
            "AC": "Acre", "AL": "Alagoas", "AP": "Amapá", "AM": "Amazonas", "BA": "Bahia",
            "CE": "Ceará", "DF": "Distrito Federal", "ES": "Espírito Santo", "GO": "Goiás",
            "MA": "Maranhão", "MT": "Mato Grosso", "MS": "Mato Grosso do Sul", "MG": "Minas Gerais",
            "PA": "Pará", "PB": "Paraíba", "PR": "Paraná", "PE": "Pernambuco", "PI": "Piauí",
            "RJ": "Rio de Janeiro", "RN": "Rio Grande do Norte", "RS": "Rio Grande do Sul",
            "RO": "Rondônia", "RR": "Roraima", "SC": "Santa Catarina", "SP": "São Paulo",
            "SE": "Sergipe", "TO": "Tocantins"
        };
        return estados[uf] || uf;
    }
});
