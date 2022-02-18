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

const objetoQuizzCriado = {};

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
    if(booleanTituloQuizz === true && booleanUrlQuizz === true && booleanQtdPerguntasQuizz === true && booleanQtdNiveisQuizz === true){
        navegarEntreTelas(prosseguirPerguntas, 'criacao-perguntas');
        renderizarPerguntasNaTela();
    }
}


function entrarTelaCriacaoNiveis(prosseguirNiveis){
    verificarInformacoesPergunta();
    if(booleantituloPergunta === true && booleancorHexadecimalPergunta === true && booleanTextoRespostaCorreta === true && booleanUrlRespostaCorreta === true && booleanAceitarRespostaIncorreta === true && booleanAceitarUrlRespostaIncorreta === true){
        navegarEntreTelas(prosseguirNiveis, 'criacao-niveis')
    }
}

function entrarTelaConfirmarQuizz(finalizarQuizz){
    navegarEntreTelas(finalizarQuizz, 'confirmar-quizz');
}

function voltarParaHome(retornaHome){
    const sairTelaCriacaoQuizz = retornaHome.parentNode.parentNode;
    sairTelaCriacaoQuizz.classList.add('escondido');

    const retornaTelaInicial = document.querySelector('.home-quizz');
    retornaTelaInicial.classList.remove('escondido');
}

// Verificação Tela de Informações básicas do Quizz
function verificarInformacoesQuizz(){
    const inputInformacoes = [...document.querySelectorAll('.input-informacoes-basicas input')];
    // console.log(inputInformacoes);
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

// Verificação Tela de Criação de Perguntas do Quizz
function renderizarPerguntasNaTela(){
    const perguntasDoQuizz = document.querySelector('.criacao-de-quizz .criacao-perguntas .perguntas');
    
    for(let index = 1; index <= qtdPerguntasQuizz; index++){
    perguntasDoQuizz.innerHTML += `
    <div class="pergunta pergunta-${index}">
        <div class="visualizacao-inicial" onclick="acessarOpcoes(this)">
            <p>Pergunta ${index}</p>
            <ion-icon name="create-outline"></ion-icon>
        </div>
        <section class="escondido">
            <div>
                <div class="inputs">
                    <input type="text" placeholder="Texto da pergunta" minlength="20">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                </div>

                <div class="resposta-correta">
                    <p>Resposta correta</p>
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                </div>
                
                <div class="resposta-incorreta">
                    <p>Respostas incorretas</p>
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="text" placeholder="URL da imagem">

                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="text" placeholder="URL da imagem">

                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="text" placeholder="URL da imagem">
                </div>
        
            </div>
        </section>
    </div>`;
    }  
}

function verificarInformacoesPergunta(){
    for(let index = 1; index <= qtdPerguntasQuizz; index++){
        const sectionPergunta = document.querySelector(`.criacao-perguntas .perguntas .pergunta-${index} section div`);
        console.log(sectionPergunta);
        const inputTituloECor = [...sectionPergunta.querySelectorAll('.inputs input')];
        const inputRespostaCorreta = [...sectionPergunta.querySelectorAll(`.resposta-correta input`)];
        const inputRespostaIncorreta = [...sectionPergunta.querySelectorAll(`.resposta-incorreta input`)];

        verificarInputTitulosECorPerguntas(inputTituloECor);
        verificarInputRespostasCorretas(inputRespostaCorreta);
        verificarInputRespostasIncorretas(inputRespostaIncorreta);
    }
}

function verificarInputTitulosECorPerguntas(array){
    console.log(array);
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

function verificarInputRespostasCorretas(array){
    console.log(array);
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
    console.log(array);
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
        array[2].value = "";
    }
    
    if(terceiraUrlRespostaIncorreta.includes('https') && ((terceiraUrlRespostaIncorreta.includes('jpg')) || (terceiraUrlRespostaIncorreta.includes('png')) || (terceiraUrlRespostaIncorreta.includes('gif')) || (terceiraUrlRespostaIncorreta.includes('svg')))){
        booleanTerceiraUrlRespostaIncorreta = true;
    }else{
        booleanTerceiraUrlRespostaIncorreta = false;
        array[3].value = "";
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
