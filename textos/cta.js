// Lista de mensagens
const ctaMessages = [
    "Gostou? Compartilhe e apoie para manter este cantinho vivo! 😊",
    "Se esse texto te cutucou, o botão <strong>Apoie-me</strong> está sempre ali no rodapé. 😉",
    "Se esse texto fez sentido, espalhe a ideia e ajude o projeto a crescer! 🚀",
    "Curtiu? Um clique, um apoio, um café... Tudo ajuda a manter o site no ar! ☕",
    "Se esse conteúdo te fez pensar, que tal compartilhar com alguém? 🤔",
    "Gostou? Apoie e ajude a manter esse espaço de respiro na internet! 🌿",
    "Apoie este projeto e ajude a manter a internet um pouco mais interessante!",
    "Se esse texto te fez sorrir, que tal espalhar a leveza por aí? 😄",
    "Compartilhe com alguém que precisa ler isso hoje! 💡",
    "Cada apoio mantém esse projeto vivo. Obrigado por estar aqui! 🙌",
    "Se esse conteúdo te ajudou, retribua com um compartilhamento! 🔄",
    "Gostou? Um pequeno gesto pode ajudar esse projeto a crescer! ✨",
    "Se esse texto fez sentido, apoie e ajude a manter o Navega Útil no ar!",
    "Compartilhe e ajude a espalhar boas ideias pela internet! 🌎",
    "Apoie este projeto e ajude a manter esse espaço de reflexão e leveza!",
    "Se esse conteúdo te tocou, que tal enviá-lo para alguém especial? ❤️"
];

// Função para definir a mensagem com base no número passado no HTML
function setCtaMessage(index) {
    const ctaElement = document.getElementById("cta-message");
    if (ctaElement) {
        // Garante que o índice esteja dentro do limite usando módulo (%)
        const validIndex = index % ctaMessages.length;
        ctaElement.innerHTML = ctaMessages[validIndex];
    }
}

// Executa automaticamente assim que o HTML estiver pronto
document.addEventListener("DOMContentLoaded", function () {
    const ctaElement = document.getElementById("cta-message");
    if (ctaElement) {
        const index = parseInt(ctaElement.getAttribute("data-cta")) || 0;
        setCtaMessage(index);
    }
});
