let booleanTituloQuizz = undefined;
let booleanUrlQuizz = undefined;
let booleanQtdPerguntasQuizz = undefined;
let booleanQtdNiveisQuizz = undefined;

let tituloQuizz;
let urlQuizz;
let qtdPerguntasQuizz;
let qtdNiveisQuizz;

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
    navegarEntreTelas(prosseguirNiveis, 'criacao-niveis')
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
    }
    else{
        booleanTituloQuizz = false;
        array[0].value = "";
    }

    if(urlQuizz.includes('https') && ((urlQuizz.includes('jpg')) || (urlQuizz.includes('png')) || (urlQuizz.includes('gif')) || (urlQuizz.includes('svg')))){
        booleanUrlQuizz = true;
    }
    else{
        booleanUrlQuizz = false;
        array[1].value = "";
    }

    if(qtdPerguntasQuizz >= 3){
        booleanQtdPerguntasQuizz = true;
    }
    else{
        booleanQtdPerguntasQuizz = false;
        array[2].value = "";
    }

    if(qtdNiveisQuizz >= 2){
        booleanQtdNiveisQuizz = true;
    }
    else{
        booleanQtdNiveisQuizz = false;
        array[3].value = "";
    }
}

// Verificação Tela de Criação de Perguntas do Quizz
function renderizarPerguntasNaTela(){
    const perguntasDoQuizz = document.querySelector('.criacao-de-quizz .criacao-perguntas .perguntas');
    
    for(let index = 1; index <= qtdPerguntasQuizz; index++){
        perguntasDoQuizz.innerHTML += `
        <div class="pergunta">
            <div class="visualizacao-inicial" onclick="acessarOpcoes(this)">
                <p>Pergunta ${index}</p>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <section class="escondido">
                <div>
                    <input type="text" placeholder="Texto da pergunta" minlength="20">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                
                    <div class="resposta-correta">
                        <p>Resposta correta</p>

                        <input type="text" placeholder="Resposta correta">
                        <input type="text" placeholder="URL da imagem">

                    </div>
                    
                    <div class="incorretas"></div>
                
                </div>
            </section>
        </div>
        `
    }
}

function renderizarRespostasIncorretas(){
    const opcoesIncorretasQuizz = [...document.querySelectorAll('.criacao-de-quizz .criacao-perguntas .perguntas .incorretas')];
    console.log(opcoesIncorretasQuizz);
    for(let index = 0; index <= (qtdPerguntasQuizz - 1); index++){
        opcoesIncorretasQuizz[index].innerHTML += `
        <div class="resposta-incorreta ${index+1}">
            <p>Respostas incorretas</p>

            <input type="text" placeholder="Resposta incorreta">
            <input type="text" placeholder="URL da imagem">
        </div>
        `
    }
}

function verificarInformacoesPergunta(){
    const informacoesPergunta = [...document.querySelectorAll('.pergunta section')];
    console.log(informacoesPergunta);
    
    const inputTextoECor = [...informacoesPergunta[0].querySelectorAll('.inputs input')];
    console.log(inputTextoECor);

    const tituloPergunta = inputTextoECor[0].value;
    const corDeFundo = inputTextoECor[1].value;

    if(tituloPergunta.length >= 20){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }
    
    if(corDeFundo.includes('#') && corDeFundo.length === 7){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }

    const respostaCorreta = [...informacoesPergunta[0].querySelectorAll('.resposta-correta input')];
    console.log(respostaCorreta);

    const respostaCorreta1 = respostaCorreta[0].value;
    const urlRespostaCorreta = respostaCorreta[1].value;

    if(respostaCorreta1 !== ""){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }

    if(urlRespostaCorreta.includes('https') && ((urlRespostaCorreta.includes('jpg')) || (urlRespostaCorreta.includes('png')) || (urlRespostaCorreta.includes('gif')) || (urlRespostaCorreta.includes('svg')))){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }
}

/*
const informacoesPergunta = [...document.querySelectorAll('.pergunta section')];
    console.log(informacoesPergunta);

    const inputTextoECor = [...informacoesPergunta[0].querySelectorAll('.inputs input')];
    console.log(inputTextoECor);

    const tituloPergunta = inputTextoECor[0].value;
    const corDeFundo = inputTextoECor[1].value;

    if(tituloPergunta.length >= 20){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }
    
    if(corDeFundo.includes('#') && corDeFundo.length === 7){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }

    const respostaCorreta = [...informacoesPergunta[0].querySelectorAll('.resposta-correta input')];
    console.log(respostaCorreta);

    const respostaCorreta1 = respostaCorreta[0].value;
    const urlRespostaCorreta = respostaCorreta[1].value;

    if(respostaCorreta1 !== ""){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }

    if(urlRespostaCorreta.includes('https') && ((urlRespostaCorreta.includes('jpg')) || (urlRespostaCorreta.includes('png')) || (urlRespostaCorreta.includes('gif')) || (urlRespostaCorreta.includes('svg')))){
        console.log('deu bom')
    }else{
        console.log('deu ruim')
    }
*/