let booleanTituloQuizz;
let booleanUrlQuizz;
let booleanQtdPerguntasQuizz;
let booleanQtdNiveisQuizz;

function navegarEntreTelas(botaoClicado, seletorTela){
    const sairTelaAtual = botaoClicado.parentNode.parentNode;
    sairTelaAtual.classList.add('escondido');

    const avancarProximaTela = document.querySelector(`.criacao-de-quizz .${seletorTela}`);
    avancarProximaTela.classList.remove('escondido');
}

function entrarTelaCriacaoPerguntas(prosseguirPerguntas){
    verificarInformacoesQuizz();
    if(booleanTituloQuizz === true && booleanUrlQuizz === true && booleanQtdPerguntasQuizz === true && booleanQtdNiveisQuizz === true){
        navegarEntreTelas(prosseguirPerguntas, 'criacao-perguntas');
    }
    // else{
    //     alert('erro')
    // }
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
    console.log(inputInformacoes);
    
}
    const tituloQuizz = array[0].value;
    const urlQuizz = array[1].value; 
    const qtdPerguntasQuizz = array[2].value;
    const qtdNiveisQuizz = array[3].value;

    if(tituloQuizz.length >= 20 && tituloQuizz.length <= 65){
        // alert('deu bom')
        booleanTituloQuizz === true;
    }
    // else{
    //     alert('funfou')
    //     // array[0].value = ""
    // }

    if(urlQuizz.includes('https') && ((urlQuizz.includes('jpg')) || (urlQuizz.includes('png')) || (urlQuizz.includes('gif')) || (urlQuizz.includes('svg')))){
        // alert('deu bom')
        booleanUrlQuizz === true;
    }
    // else{
    //     alert('funfou')
    //     // array[1].value = ""
    // }

    if(qtdPerguntasQuizz >= 3){
        // alert('deu bom')
        booleanQtdPerguntasQuizz === true;
    }
    // else{
    //     alert('funfou')
    //     // array[2].value = ""
    // }

    if(qtdNiveisQuizz >= 2){
        // alert('deu bom')
        booleanQtdNiveisQuizz === true;
    }
    // else{
    //     alert('funfou')
    //     // array[3].value = ""
    // }
}