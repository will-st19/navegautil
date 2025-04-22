document.addEventListener("DOMContentLoaded", function () {
    // Header
    const headerContainer = document.querySelector('header');
    fetch('../componentes/header.html')
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
        })
        .catch(error => {
            console.warn("Erro ao carregar o cabeçalho: ", error);
        });

    // Footer
    const footerContainer = document.querySelector('footer');
    fetch('../componentes/footer.html')
        .then(response => response.text())
        .then(html => {
            footerContainer.innerHTML = html;
        })
        .catch(error => {
            console.warn("Erro ao carregar o rodapé: ", error);
        });
});
