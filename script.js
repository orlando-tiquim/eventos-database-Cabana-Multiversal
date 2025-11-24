/* BOA PARTE DO CÓDIGO AQUI NÃO É FEITA POR MIM
Código disponibilizado pela Alura e feitos com pedidos em aula pro Gemini
95% dos comentários também foram feitos pelo Gemini em aula */

let cardContainer = document.querySelector(".card-container"); /* o . pelo menos nessa linha em específico é supostamente a mesma funcionalidade de classe do CSS */
let campoBusca = document.querySelector("header input");
/* let msgstatus = document.getElementById("status"); */
let dados = [];

iniciarBusca(); /* Iniciar a página mostrando todos os eventos */

async function iniciarBusca() {

    /* "Se os dados ainda não foram carregados, busca do JSON" -Gemini na Alura */
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json"); /* Resposta da conexão entre os 2 arquivos */
            dados = await resposta.json();
        } catch (error) {
            console.error("Flha ao carregar dados:", error);
            return; /* !Interrompe a execução se houver erro" -Gemini na Alura */
        }
    }
    
    let termoBusca = campoBusca.value.toLowerCase();
    let dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) || dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizeCards(dadosFiltrados);
}


function renderizeCards(dados) {

    cardContainer.innerHTML = ""; /* Limpa o container antes de renderizar (essa linha de código foi acrescentada pelo Gemini (me sinto mal por essa :( ) quando pedi ajuda pra encontrar um problema da criação duplicada de artigos */
    /* msgstatus.innerHTML = ""; */

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <div id="conteudoescrito">
            <h2>${dado.nome}</h2>
            <p class="quandoevento">${dataArrumada(dado.quando)}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Ver mensagem(ns) <span class="material-icons">open_in_new</span></a>
        </div>
        <img src="${dado.imglink}" alt="${dado.alt}" class="banner">
        `;
        cardContainer.appendChild(article); /* <- Pesquisar melhor como isso funciona */

        /* if (campoBusca == "") {
            msgstatus.innerHTML = "Mostrando todos os resultados!";
        } else {
            msgstatus.innerHTML = "Mostrando resultados pra \"${campobusca}\"";
        } */
    }

    function dataArrumada (dataehora) {
        let umadataehora = new Date(dataehora)
        return umadataehora.toLocaleString();
    }

}