let booleanTituloQuizz = undefined;
let booleanUrlQuizz = undefined;
let booleanQtdPerguntasQuizz = undefined;
let booleanQtdNiveisQuizz = undefined;

let booleantituloPergunta = undefined;
let booleancorHexadecimalPergunta = undefined;
let booleanTextoRespostaCorreta = undefined;
let booleanUrlRespostaCorreta = undefined;

let booleanPrimeiraRespostaIncorreta = undefined;
let booleanSegundaRespostaIncorreta = undefined;
let booleanTerceiraRespostaIncorreta = undefined;
let booleanPrimeiraUrlRespostaIncorreta = undefined;
let booleanSegundaUrlRespostaIncorreta = undefined;
let booleanTerceiraUrlRespostaIncorreta = undefined;
let booleanAceitarRespostaIncorreta = undefined;
let booleanAceitarUrlRespostaIncorreta = undefined;

let booleanTituloNivel = undefined;
let booleanAcertoDoNivel = undefined;
let booleanUrlNivel = undefined;
let booleanDescricaoNivel = undefined;
let booleanAceitarPorcentagemMinima = undefined;

let tituloQuizz;
let urlQuizz;
let qtdPerguntasQuizz;
let qtdNiveisQuizz;

let tituloPergunta;
let corHexadecimalPergunta;
let textoRespostaCorreta;
let urlRespostaCorreta;

let primeiraRespostaIncorreta;
let segundaRespostaIncorreta;
let terceiraRespostaIncorreta;
let primeiraUrlRespostaIncorreta;
let segundaUrlRespostaIncorreta;
let terceiraUrlRespostaIncorreta;

let tituloNivel;
let acertoDoNivel;
let urlNivel;
let descricaoDoNivel;

let auxiliarPorcentagemMinima = 0;
let idQuizzCriado;

let listaDeQuizzesCriados = JSON.parse(localStorage.getItem('quizzCriado')) || [];

let objetoQuizzCriado = {};
let objetoDeQuestions = [];
let objetoDeLevels = [];

const urlDeEnvio = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function navegarEntreTelas(botaoClicado, seletorTela){
    const sairTelaAtual = botaoClicado.parentNode.parentNode;
    sairTelaAtual.classList.add('escondido');

    const avancarProximaTela = document.querySelector(`.criacao-de-quizz .${seletorTela}`);
    avancarProximaTela.classList.remove('escondido');
}

function acessarOpcoes(elementoSelecionado){
    elementoSelecionado.parentNode.querySelector('section').classList.toggle('escondido');
}

function entrarTelaCriacaoPerguntas(prosseguirPerguntas){
    verificarInformacoesQuizz();
    while(booleanTituloQuizz !== true && booleanUrlQuizz !== true && booleanQtdPerguntasQuizz !== true && booleanQtdNiveisQuizz !== true){
        verificarInformacoesQuizz();
    }

    if(booleanTituloQuizz === true && booleanUrlQuizz === true && booleanQtdPerguntasQuizz === true && booleanQtdNiveisQuizz === true){
        navegarEntreTelas(prosseguirPerguntas, 'criacao-perguntas');
        renderizarPerguntasNaTela();
        objetoQuizzCriado = {
            "title": tituloQuizz,
            "image": urlQuizz,
            "questions": objetoDeQuestions,
            "levels": objetoDeLevels
        };
    }else{
        alert('Por favor, insira os dados corretamente para a criaçao de um Quizz!');
    }
}

function entrarTelaCriacaoNiveis(prosseguirNiveis){
    verificarInformacoesPergunta();
    while(booleantituloPergunta !== true && booleancorHexadecimalPergunta !== true && booleanTextoRespostaCorreta !== true && booleanUrlRespostaCorreta !== true && booleanAceitarRespostaIncorreta !== true && booleanAceitarUrlRespostaIncorreta !== true){
        verificarInformacoesPergunta();
    }

    if(booleantituloPergunta === true && booleancorHexadecimalPergunta === true && booleanTextoRespostaCorreta === true && booleanUrlRespostaCorreta === true && booleanAceitarRespostaIncorreta === true && booleanAceitarUrlRespostaIncorreta === true){
        navegarEntreTelas(prosseguirNiveis, 'criacao-niveis');
        renderizarNiveisNaTela();
        objetoQuizzCriado = {
            "title": tituloQuizz,
            "image": urlQuizz,
            "questions": objetoDeQuestions,
            "levels": objetoDeLevels
        };
    }else{
        alert('Por favor, insira os dados corretamente para a criaçao de um Quizz!');
    }
}

function entrarTelaConfirmarQuizz(finalizarQuizz){
    verificarInformacoesNivel();
    aceitarPorcentagemMinimaDeNiveis();
    // while(booleanTituloNivel !== true && booleanUrlNivel !== true && booleanAcertoDoNivel !== true && booleanDescricaoNivel !== true && booleanAceitarPorcentagemMinima !== true){
    //     verificarInformacoesNivel();
    //     aceitarPorcentagemMinimaDeNiveis(); 
    // }

    if(booleanTituloNivel === true && booleanUrlNivel === true && booleanAcertoDoNivel === true && booleanDescricaoNivel === true && booleanAceitarPorcentagemMinima === true){
        objetoQuizzCriado = {
            "title": tituloQuizz,
            "image": urlQuizz,
            "questions": objetoDeQuestions,
            "levels": objetoDeLevels
        };
        
        axios.post(urlDeEnvio, objetoQuizzCriado)
        .then((resposta)=>{
            setTimeout(()=>{
                navegarEntreTelas(finalizarQuizz, 'confirmar-quizz')
            }, 500);
            mostrarFigureQuizzCriado();
            idQuizzCriado = resposta.data.id;

            listaDeQuizzesCriados.push(idQuizzCriado);
            localStorage.setItem('quizzCriado', JSON.stringify(listaDeQuizzesCriados));
        })
        .catch((erro)=>{
            location.reload(true);
        })

    }else{
        alert('Por favor, insira os dados corretamente para a criaçao de um Quizz!');
    }
}

function voltarParaHome(){
    location.reload(true);
}

// Verificação Tela de Informações básicas do Quizz
function verificarInformacoesQuizz(){
    const inputInformacoes = [...document.querySelectorAll('.input-informacoes-basicas input')];
    validacaoInputInformacoes(inputInformacoes);
}

function validacaoInputInformacoes(array){
    tituloQuizz = array[0].value;
    urlQuizz = array[1].value; 
    qtdPerguntasQuizz = array[2].value;
    qtdNiveisQuizz = array[3].value;

    if(tituloQuizz.length >= 20 && tituloQuizz.length <= 65){
        booleanTituloQuizz = true;
        array[0].style.border = '1px solid green';
    }
    else{
        booleanTituloQuizz = false;
        array[0].style.border = '1px solid rgb(238, 38, 38)';
        array[0].value = "";
    }

    if(urlQuizz.includes('https') && ((urlQuizz.includes('jpg')) || (urlQuizz.includes('png')) || (urlQuizz.includes('gif')) || (urlQuizz.includes('svg')))){
        booleanUrlQuizz = true;
        array[1].style.border = '1px solid green';
    }
    else{
        booleanUrlQuizz = false;
        array[1].style.border = '1px solid rgb(238, 38, 38)';
        array[1].value = "";
    }

    if(qtdPerguntasQuizz >= 3){
        booleanQtdPerguntasQuizz = true;
        array[2].style.border = '1px solid green';
    }
    else{
        booleanQtdPerguntasQuizz = false;
        array[2].style.border = '1px solid rgb(238, 38, 38)';
        array[2].value = "";
    }

    if(qtdNiveisQuizz >= 2){
        booleanQtdNiveisQuizz = true;
        array[3].style.border = '1px solid green';
    }
    else{
        booleanQtdNiveisQuizz = false;
        array[3].style.border = '1px solid rgb(238, 38, 38)';
        array[3].value = "";
    }
}

// Renderização e Verificação Tela de Criação de Perguntas do Quizz
function renderizarPerguntasNaTela(){
    const perguntasDoQuizz = document.querySelector('.criacao-de-quizz .criacao-perguntas .perguntas');
    
    for(let index = 1; index <= qtdPerguntasQuizz; index++){
    perguntasDoQuizz.innerHTML += `
    <div class="pergunta pergunta-${index}" data-identifier="question">
        <div class="visualizacao-inicial" onclick="acessarOpcoes(this)" data-identifier="expand">
            <p>Pergunta ${index}</p>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <section class="escondido">
            <div>
                <div class="inputs">
                    <span>obrigatório</span>
                    <input type="text" placeholder="Texto da pergunta" minlength="20">
                    <span>obrigatório</span>
                    <input type="text" placeholder="Cor de fundo da pergunta">
                </div>

                <div class="resposta-correta">
                    <p>Resposta correta</p>
                    <span>obrigatório</span>
                    <input type="text" placeholder="Resposta correta">
                    <span>obrigatório</span>
                    <input type="text" placeholder="URL da imagem">
                </div>
                
                <div class="resposta-incorreta">
                    <p>Respostas incorretas</p>
                    <span>obrigatório</span>
                    <input type="text" placeholder="Resposta incorreta 1">
                    <span>obrigatório</span>
                    <input type="text" placeholder="URL da imagem 1">

                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="text" placeholder="URL da imagem 2">

                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="text" placeholder="URL da imagem 3">
                </div>
        
            </div>
        </section>
    </div>`;
    }  
}

function verificarInformacoesPergunta(){
    for(let index = 1; index <= qtdPerguntasQuizz; index++){
        const sectionPergunta = document.querySelector(`.criacao-perguntas .perguntas .pergunta-${index} section div`);
        const inputTituloECor = [...sectionPergunta.querySelectorAll('.inputs input')];
        const inputRespostaCorreta = [...sectionPergunta.querySelectorAll(`.resposta-correta input`)];
        const inputRespostaIncorreta = [...sectionPergunta.querySelectorAll(`.resposta-incorreta input`)];

        verificarInputTitulosECorPerguntas(inputTituloECor);
        verificarInputRespostasCorretas(inputRespostaCorreta);
        verificarInputRespostasIncorretas(inputRespostaIncorreta);

        objetoDeQuestions[index - 1] = {
            "title": tituloPergunta,
            "color": corHexadecimalPergunta,
            "answers": [
                {
                    "text": inputRespostaCorreta[0].value,
                    "image": inputRespostaCorreta[1].value,
                    "isCorrectAnswer": true
                },
                {
                    "text": inputRespostaIncorreta[0].value,
                    "image": inputRespostaIncorreta[1].value,
                    "isCorrectAnswer": false
                },
                {
                    "text": inputRespostaIncorreta[2].value,
                    "image": inputRespostaIncorreta[3].value,
                    "isCorrectAnswer": false
                },
                {
                    "text": inputRespostaIncorreta[4].value,
                    "image": inputRespostaIncorreta[5].value,
                    "isCorrectAnswer": false
                }
            ]
        };

        // verificação de inputs === ""
        if(inputRespostaIncorreta[2].value === '' && inputRespostaIncorreta[3].value === ''){
            objetoDeQuestions[index - 1] = {
                "title": tituloPergunta,
                "color": corHexadecimalPergunta,
                "answers": [
                    {
                        "text": inputRespostaCorreta[0].value,
                        "image": inputRespostaCorreta[1].value,
                        "isCorrectAnswer": true
                    },
                    {
                        "text": inputRespostaIncorreta[0].value,
                        "image": inputRespostaIncorreta[1].value,
                        "isCorrectAnswer": false
                    },
                    {
                        "text": inputRespostaIncorreta[4].value,
                        "image": inputRespostaIncorreta[5].value,
                        "isCorrectAnswer": false
                    }
                ]
            };
        }

        if(inputRespostaIncorreta[4].value === '' && inputRespostaIncorreta[5].value === ''){
            objetoDeQuestions[index - 1] = {
                "title": tituloPergunta,
                "color": corHexadecimalPergunta,
                "answers": [
                    {
                        "text": inputRespostaCorreta[0].value,
                        "image": inputRespostaCorreta[1].value,
                        "isCorrectAnswer": true
                    },
                    {
                        "text": inputRespostaIncorreta[0].value,
                        "image": inputRespostaIncorreta[1].value,
                        "isCorrectAnswer": false
                    },
                    {
                        "text": inputRespostaIncorreta[2].value,
                        "image": inputRespostaIncorreta[3].value,
                        "isCorrectAnswer": false
                    }
                ]
            };
        }

        if((inputRespostaIncorreta[2].value === '' && inputRespostaIncorreta[3].value === '') && (inputRespostaIncorreta[4].value === '' && inputRespostaIncorreta[5].value === '')){
            objetoDeQuestions[index - 1] = {
                "title": tituloPergunta,
                "color": corHexadecimalPergunta,
                "answers": [
                    {
                        "text": inputRespostaCorreta[0].value,
                        "image": inputRespostaCorreta[1].value,
                        "isCorrectAnswer": true
                    },
                    {
                        "text": inputRespostaIncorreta[0].value,
                        "image": inputRespostaIncorreta[1].value,
                        "isCorrectAnswer": false
                    }
                ]
            };
        }

    }
    aceitarCorHexadecimal();
}

function verificarInputTitulosECorPerguntas(array){
    tituloPergunta = array[0].value;
    corHexadecimalPergunta = array[1].value;

    if(tituloPergunta.length >= 20){
        booleantituloPergunta = true;
        array[0].style.border = '1px solid green';
    }else{
        booleantituloPergunta = false;
        array[0].style.border = '1px solid rgb(238, 38, 38)';
        array[0].value = "";
    }
    
    if(corHexadecimalPergunta.includes('#') && corHexadecimalPergunta.length === 7){
        booleancorHexadecimalPergunta = true;
        array[1].style.border = '1px solid green';
    }else{
        booleancorHexadecimalPergunta = false;
        array[1].style.border = '1px solid rgb(238, 38, 38)';
        array[1].value = "";
    }
}

function aceitarCorHexadecimal(){
    for(item in objetoDeQuestions){
        if((objetoDeQuestions[item].color.length !== 7) || (objetoDeQuestions[item].color.includes('#') === false)){
            booleancorHexadecimalPergunta = false;
        }
    }
}

function verificarInputRespostasCorretas(array){
    textoRespostaCorreta = array[0].value;
    urlRespostaCorreta = array[1].value;

    if(textoRespostaCorreta !== ""){
        booleanTextoRespostaCorreta = true;
        array[0].style.border = '1px solid green';
    }else{
        booleanTextoRespostaCorreta = false;
        array[0].style.border = '1px solid rgb(238, 38, 38)';
        array[0].value = "";
    }

    if(urlRespostaCorreta.includes('https') && ((urlRespostaCorreta.includes('jpg')) || (urlRespostaCorreta.includes('png')) || (urlRespostaCorreta.includes('gif')) || (urlRespostaCorreta.includes('svg')))){
        booleanUrlRespostaCorreta = true;
        array[1].style.border = '1px solid green';
    }else{
        booleanUrlRespostaCorreta = false;
        array[1].style.border = '1px solid rgb(238, 38, 38)';
        array[1].value = "";
    }
}

function verificarInputRespostasIncorretas(array){
    primeiraRespostaIncorreta = array[0].value;
    segundaRespostaIncorreta = array[2].value;
    terceiraRespostaIncorreta = array[4].value;

    primeiraUrlRespostaIncorreta = array[1].value;
    segundaUrlRespostaIncorreta = array[3].value;
    terceiraUrlRespostaIncorreta = array[5].value;

    // Primeira Resposta Incorreta e Primeira Url Resposta Incorreta
    if(primeiraRespostaIncorreta !== ""){
        booleanPrimeiraRespostaIncorreta = true;
        array[0].style.border = '1px solid green';
    }else{
        booleanPrimeiraRespostaIncorreta = false;
        array[0].style.border = '1px solid rgb(238, 38, 38)';
        array[0].value = "";
    }

    if(primeiraUrlRespostaIncorreta.includes('https') && ((primeiraUrlRespostaIncorreta.includes('jpg')) || (primeiraUrlRespostaIncorreta.includes('png')) || (primeiraUrlRespostaIncorreta.includes('gif')) || (primeiraUrlRespostaIncorreta.includes('svg')))){
        booleanPrimeiraUrlRespostaIncorreta = true;
        array[1].style.border = '1px solid green';
    }else{
        booleanPrimeiraUrlRespostaIncorreta = false;
        array[1].style.border = '1px solid rgb(238, 38, 38)';
        array[1].value = "";
    }

    // Segunda Resposta Incorreta e Segunda Url Resposta Incorreta
    if(segundaRespostaIncorreta !== ""){
        booleanSegundaRespostaIncorreta = true;
    }else{
        booleanSegundaRespostaIncorreta = false;
        array[2].value = "";
    }
    
    if(segundaUrlRespostaIncorreta.includes('https') && ((segundaUrlRespostaIncorreta.includes('jpg')) || (segundaUrlRespostaIncorreta.includes('png')) || (segundaUrlRespostaIncorreta.includes('gif')) || (segundaUrlRespostaIncorreta.includes('svg')))){
        booleanSegundaUrlRespostaIncorreta = true;
    }else{
        booleanSegundaUrlRespostaIncorreta = false;
        array[3].value = "";
    }

    // Terceira Resposta Incorreta e Terceira Url Resposta Incorreta
    if(terceiraRespostaIncorreta !== ""){
        booleanTerceiraRespostaIncorreta = true;
    }else{
        booleanTerceiraRespostaIncorreta = false;
        array[4].value = "";
    }
    
    if(terceiraUrlRespostaIncorreta.includes('https') && ((terceiraUrlRespostaIncorreta.includes('jpg')) || (terceiraUrlRespostaIncorreta.includes('png')) || (terceiraUrlRespostaIncorreta.includes('gif')) || (terceiraUrlRespostaIncorreta.includes('svg')))){
        booleanTerceiraUrlRespostaIncorreta = true;
    }else{
        booleanTerceiraUrlRespostaIncorreta = false;
        array[5].value = "";
    }

    // Verificando se pelo menos um dos input de resposta incorreta e url foram preenchidos
    verificarPeloMenosUmaRespostaIncorreta();
}

function verificarPeloMenosUmaRespostaIncorreta(){
    if(booleanPrimeiraRespostaIncorreta === true || booleanSegundaRespostaIncorreta === true || booleanTerceiraRespostaIncorreta === true){
        booleanAceitarRespostaIncorreta = true;
    }else{
        booleanAceitarRespostaIncorreta = false;
    }

    if(booleanPrimeiraUrlRespostaIncorreta === true || booleanSegundaUrlRespostaIncorreta === true || booleanTerceiraUrlRespostaIncorreta === true){
        booleanAceitarUrlRespostaIncorreta = true;
    }else{
        booleanAceitarUrlRespostaIncorreta = false;
    }
}

// Renderização e Verificação Tela de Criação de Perguntas do Quizz
function renderizarNiveisNaTela(){
    const niveisDoQuizz = document.querySelector('.criacao-de-quizz .criacao-niveis .opcoes-niveis');
    for(let index = 1; index <= qtdNiveisQuizz; index++){
        niveisDoQuizz.innerHTML += `
        <div class="niveis nivel-${index}" data-identifier="level">
            <div class="visualizacao-inicial" onclick="acessarOpcoes(this)" data-identifier="expand">
                <p>Nível ${index}</p>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        
            <section class="escondido">
                <div class="inputs">
                    <span>obrigatório</span>
                    <input type="text" placeholder="Título do seu quizz">
                    <span>obrigatório</span>
                    <input type="text" placeholder="% de acerto mínima">
                    <span>obrigatório</span>
                    <input type="text" placeholder="URL da imagem do nível">
                    <span>obrigatório</span>
                    <textarea wrap="soft" cols="30" rows="10" placeholder="Descrição do nível"></textarea>
                </div>
            </section>
        </div>
        `;
    }
}

function verificarInformacoesNivel(){
    for(let index = 1; index <= qtdNiveisQuizz; index++){
        const divDeNivel = document.querySelector(`.criacao-de-quizz .criacao-niveis .opcoes-niveis .nivel-${index} section`);
        const inputInformacoesNivel = [...divDeNivel.querySelectorAll('.inputs input')];
        const descricaoNivel = divDeNivel.querySelector('textarea');

        verificarInformacoesDeNiveis(inputInformacoesNivel);
        verificarDescricaoDeNiveis(descricaoNivel);

        objetoDeLevels[index - 1] = {
            "title": tituloNivel,
            "image": urlNivel,
            "text": descricaoDoNivel,
            "minValue": acertoDoNivel
        };
    }
}

function verificarInformacoesDeNiveis(array){
    tituloNivel = array[0].value;
    acertoDoNivel = array[1].value;
    urlNivel = array[2].value;

    if(tituloNivel.length >= 10){
        booleanTituloNivel = true;
        array[0].style.border = '1px solid green';
    }else{
        booleanTituloNivel = false;
        array[0].style.border = '1px solid rgb(238, 38, 38)';
        array[0].value = "";
    }

    if(acertoDoNivel < 0 || acertoDoNivel > 100 || acertoDoNivel === ''){
        booleanAcertoDoNivel = false;
        array[1].style.border = '1px solid rgb(238, 38, 38)';
        array[1].value = "";
    }else{
        booleanAcertoDoNivel = true;
        array[1].style.border = '1px solid green';
    }

    if(urlNivel.includes('https') && ((urlNivel.includes('jpg')) || (urlNivel.includes('png')) || (urlNivel.includes('gif')) || (urlNivel.includes('svg')))){
        booleanUrlNivel = true;
        array[2].style.border = '1px solid green';
    }else{
        booleanUrlNivel = false;
        array[2].style.border = '1px solid rgb(238, 38, 38)';
        array[2].value = "";
    }

}

function verificarDescricaoDeNiveis(descricao){
    descricaoDoNivel = descricao.value;

    if(descricaoDoNivel.length >= 30){
        booleanDescricaoNivel = true;
        descricao.style.border = '1px solid green';
    }else{
        booleanDescricaoNivel = false;
        descricao.style.border = '1px solid rgb(238, 38, 38)';
        descricao.value = "";
    }
}

function aceitarPorcentagemMinimaDeNiveis(){
    for(let item in objetoDeLevels){
        if(objetoDeLevels[item].minValue === '0'){
            auxiliarPorcentagemMinima ++;
        }
    }
    
    if(auxiliarPorcentagemMinima === 1){
        booleanAceitarPorcentagemMinima = true;
    }else{
        alert('Pelo menos um nível deve ter porcentagem mínima 0%');
        booleanAceitarPorcentagemMinima = false;
    }
}

function mostrarFigureQuizzCriado(){
    const figureDoQuizzCriado = document.querySelector('.confirmar-quizz figure');
    figureDoQuizzCriado.innerHTML = `
        <div>
            <figcaption>${tituloQuizz}</figcaption>
        </div>
    `;

    const gradienteImagem = figureDoQuizzCriado.querySelector('div');
    gradienteImagem.style.background = `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), no-repeat center/100% url(${urlQuizz})`;
}
