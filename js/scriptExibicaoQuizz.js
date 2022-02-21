const homeQuizz= document.querySelector(".home-quizz");
const exibicaoQuizz = document.querySelector(".exibicao-quizz");
const criandoQuizz = document.querySelector(".criacao-de-quizz");
const exibicaoPerguntas = document.querySelector(".exibicao-perguntas");
let grupoDeRespostas, arrayDeRespostas=[];
let idSelecionado, titulo,urlImagem, objetoPerguntas=[],objetoLeveis=[],acertos=0,porcentagemAcertos;
//variaveis para reinicialização do quizz
let resultadoDoQuizz,posNavegacaoQuiz, listaDeIndices=[],tituloResultado;

//abrindo o quizz na página 2 pelo seu id
function abrindoQuizz(quizzId){
    telaDeCarregamento.classList.remove("escondido");
    homeQuizz.classList.add("escondido");
    exibicaoQuizz.classList.remove("escondido");
    exibicaoQuizz.scrollIntoView();
    idSelecionado = parseInt(quizzId);
    identificandoQuizz(idSelecionado);
}

//identificando qual quizz deverá ser aberto
function identificandoQuizz(quizzSelecionado){
    for(let i=0; i<objetoQuizzes.length;i++){
        if(objetoQuizzes[i].id===quizzSelecionado){
            titulo=objetoQuizzes[i].title;
            urlImagem=objetoQuizzes[i].image;
            objetoPerguntas = objetoQuizzes[i].questions;
            objetoLeveis=objetoQuizzes[i].levels;
            continue;
        }
    }
    colocarImagemNoTopo();
    renderizandoPerguntas();
}
//colocando imagem e título no topo
function colocarImagemNoTopo(){
    const imagemTopo = document.querySelector(".imagem-topo");
    //definindo tamanho da imagem
    imagemTopo.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${urlImagem})`;
    imagemTopo.style.backgroundSize = "cover";
    imagemTopo.style.backgroundPosition = "center center";

    //colocando o título sobre a imagem
    imagemTopo.innerHTML=`
    <h1>${titulo}</h1>
    `;
}
//renderizando as perguntas na tela
function renderizandoPerguntas(){
    telaDeCarregamento.classList.add("escondido");
    objetoPerguntas.forEach(pergunta=>{
        exibicaoPerguntas.innerHTML+=`
        <article data-identifier="question" class="exibicao-pergunta questao${objetoPerguntas.indexOf(pergunta)}">
            <div class="titulo-pergunta">
                <p>${pergunta.title}</p>
            </div>
            <div class="respostas-pergunta">
            
            </div>
        </article>
        `
        //embaralhando array de respostas
        let respostasEmbaralhadas = pergunta.answers;
        respostasEmbaralhadas.sort(embaralhandoArray);
        //chamando metodos de renderização da resposta / cor do título
        renderizandoResposta(respostasEmbaralhadas,objetoPerguntas.indexOf(pergunta));
        definindoCorDoTitulo(pergunta.color,objetoPerguntas.indexOf(pergunta));
    });
}
//aqui se encontra a função para embaralhar uma array
function embaralhandoArray(){
    return Math.random() - 0.5; 
}
//definindo a cor de fundo do título
function definindoCorDoTitulo(corDoTitulo,indiceDaPergunta){
    const areaDoTitulo = [...document.querySelectorAll(".titulo-pergunta")];
    areaDoTitulo[indiceDaPergunta].style.backgroundColor=`${corDoTitulo}`;
}
//renderizando as respostas contidas em cada pergunta
function renderizandoResposta(respostas,indiceDaPergunta){
    grupoDeRespostas = [...document.querySelectorAll('.respostas-pergunta')];
    for(let i=0; i<respostas.length; i++){
        //dentro de cada "grupo de respostas", terá várias divs, cada uma contendo uma resposta
        grupoDeRespostas[indiceDaPergunta].innerHTML+=`
        <div data-identifier="answer" class="resposta-pergunta pergunta${indiceDaPergunta} resposta${respostas[i].isCorrectAnswer}" onclick="escolherResposta(this,${indiceDaPergunta})">

           <img src="${respostas[i].image}" alt="Imagem que representa uma resposta">
           <p>${respostas[i].text}</p>

        </div>
        `;
        listaDeIndices.push(indiceDaPergunta);
    }
}
//definindo algoritmo para a escolha de uma resposta
function escolherResposta(respostaSelecionada,indiceDaPergunta){
    mudandoCorDoTexto(indiceDaPergunta);
    diminuirOpacidadeDasRespostas(indiceDaPergunta);
    respostaSelecionada.classList.remove("diminuir-opacidade");
    if(respostaSelecionada.classList.contains("respostatrue")){
        acertos+=1;
    }
    scrollarParaProximaPergunta(indiceDaPergunta);
}
//mudando a cor do texto das respostas certas/erradas
function mudandoCorDoTexto(indiceDaPergunta){
    const textosDasRespostas=[...document.querySelectorAll(`.pergunta${indiceDaPergunta} p`)];
    //colocando cores nos textos da resposta certa/errada
    textosDasRespostas.forEach(texto=>{
        if(texto.parentNode.classList.contains("respostatrue")){
            texto.style.color="#009C22";
        }
        else{
            texto.style.color="#FF4B4B";
        }
    })
}
//diminuindo a opacidade das respostas não escolhidas
function diminuirOpacidadeDasRespostas(indiceDaPergunta){
    const respostasDaPergunta=[...document.querySelectorAll(`.pergunta${indiceDaPergunta}`)];
    //diminuindo opacidade das respostas não escolhidas
    respostasDaPergunta.forEach(respostaDaPergunta=>{
        respostaDaPergunta.classList.add("diminuir-opacidade");
        respostaDaPergunta.removeAttribute("onclick");
    })
}
//escrolando automaticamente e identificando a % de acertos
function scrollarParaProximaPergunta(indiceDaPergunta){
    const indiceProximaPergunta = parseInt(indiceDaPergunta)+1;
    const proximaPergunta=document.querySelector(`.questao${indiceProximaPergunta}`);
    if(proximaPergunta!==null){
        setTimeout(()=>{
            proximaPergunta.scrollIntoView({block: "center", behavior:"smooth"});
        },2000);
    }
    else if(proximaPergunta===null){
        resultadoDoQuizz=document.querySelector(".resultado-do-quizz");
        posNavegacaoQuiz = document.querySelector(".pos-navegacao-quizz");
        setTimeout(()=>{
            resultadoDoQuizz.classList.remove("escondido");
            posNavegacaoQuiz.classList.remove("escondido");
            resultadoDoQuizz.scrollIntoView({block: "center", behavior:"smooth"});
        },2000);
        const quantidadeDeQuestões = objetoPerguntas.length;
        porcentagemAcertos = Math.round(acertos*100/quantidadeDeQuestões);
        construindoResultado(resultadoDoQuizz);
    }
}
//indentificando o level do resultado e mostrando na tela
function construindoResultado(AbaDeResultado){
    tituloResultado=AbaDeResultado.querySelector(".titulo-do-resultado");
    for(let i = objetoLeveis.length-1; i>=0;i--){
        const tituloLevel = objetoLeveis[i].title;
        const imagemLevel = objetoLeveis[i].image;
        const textoLevel = objetoLeveis[i].text;
        const porcentagemMinima = objetoLeveis[i].minValue;
        if(porcentagemAcertos>=porcentagemMinima){
            tituloResultado.innerHTML=`<p>Você acertou ${porcentagemAcertos}%:
            ${tituloLevel}</p>
            `;
            AbaDeResultado.innerHTML+=`
            <img src="${imagemLevel}" alt="imagem do level">
            <div class="texto-resultado"><p><strong>${textoLevel}</strong></p></div>
            `;
            break;
        }
    }
}
//reiniciando o quizz
function reiniciandoQuizz(){
    exibicaoQuizz.scrollIntoView({block:"start",behavior:"smooth"});
    resultadoDoQuizz.classList.add("escondido");
    posNavegacaoQuiz.classList.add("escondido");
    const todosAsRespostas = [...document.querySelectorAll(".resposta-pergunta")];
    const todosTextos=[...document.querySelectorAll(".resposta-pergunta p")];
    todosTextos.forEach(texto=>texto.style.color="#000000");
    todosAsRespostas.forEach(resposta=>{
        resposta.classList.remove("diminuir-opacidade");
    })
    for(let i=0; i<todosAsRespostas.length; i++){
        todosAsRespostas[i].classList.remove("diminuir-opacidade");
        todosAsRespostas[i].setAttribute("onclick",`escolherResposta(this,${listaDeIndices[i]})`);
    }
    resultadoDoQuizz.innerHTML=`
        <div class="titulo-do-resultado">
                <!--aqui ficará o título do level-->
        </div>
        <!--aqui ficará a imagem e o texto do level-->`;
    tituloResultado.innerHTML=``;
    acertos=0;
}
//voltando para homequizz após finalização
function voltarParaHomeQuizz(){
    voltarParaHome();
}
