function processarCSV() {
    const input = document.getElementById("csvInput");
    const output = document.getElementById("resumoCSV");
    output.innerHTML = "";

    if (!input.files.length) {
        output.innerHTML = "<p style='color: red;'>Por favor, selecione um arquivo CSV.</p>";
        return;
    }

    const file = input.files[0];
    if (!file.name.endsWith(".csv")) {
        output.innerHTML = "<p style='color: red;'>Arquivo inválido. Envie um arquivo .csv</p>";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const decoder = new TextDecoder("iso-8859-1");
            const text = decoder.decode(new Uint8Array(e.target.result));

            const linhas = text.split(/\r?\n/).filter(l => l.trim() !== "");
            if (linhas.length < 2) {
                output.innerHTML = "<p style='color: red;'>Arquivo CSV vazio ou sem dados suficientes.</p>";
                return;
            }

            // Detecta separador por maior ocorrência na primeira linha
            const primeiro = linhas[0];
            const sepVirgula = (primeiro.match(/,/g) || []).length;
            const sepPontoVirgula = (primeiro.match(/;/g) || []).length;
            const separador = sepPontoVirgula > sepVirgula ? ";" : ",";

            const colunas = primeiro
                .split(separador)
                .map(c => c.trim())
                .filter((c, i, arr) => !(i === arr.length - 1 && c === ""));
            const dados = linhas.slice(1).map(l => l.split(separador).map(c => c.trim()));

            let html = `<p><strong>Total de colunas:</strong> ${colunas.length}</p>`;
            html += `<p><strong>Total de linhas:</strong> ${dados.length}</p>`;
            html += `<p><strong>Nomes das colunas:</strong> ${colunas.join(", ")}</p>`;

            html += "<table border='1' cellpadding='5' style='margin-top: 1rem; border-collapse: collapse;'>";
            html += "<thead><tr>" + colunas.map(c => `<th>${c}</th>`).join("") + "</tr></thead><tbody>";

            for (let i = 0; i < Math.min(dados.length, 5); i++) {
                html += "<tr>" + dados[i].map(d => `<td>${d}</td>`).join("") + "</tr>";
            }

            if (dados.length > 5) {
                html += `<tr><td colspan="${colunas.length}" style="text-align: center;">...e mais ${dados.length - 5} linhas</td></tr>`;
            }

            html += "</tbody></table>";
            output.innerHTML = html;

        } catch (error) {
            output.innerHTML = "<p style='color: red;'>Erro ao processar o arquivo.</p>";
        }
    };

    reader.onerror = () => {
        output.innerHTML = "<p style='color: red;'>Erro ao ler o arquivo. Tente novamente.</p>";
    };

    reader.readAsArrayBuffer(file);
}
