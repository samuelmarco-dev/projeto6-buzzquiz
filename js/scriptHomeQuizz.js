const api = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const listaQuizzesLocais =document.querySelector(".seus-quizzes .quizzes-lista");
let objetoQuizzes, urlImagens=[];
let listaTodosOsQuizzes = document.querySelector(".todos-quizzes .quizzesLista");
let listaSeusQuizzes = document.querySelector(".seus-quizzes .quizzesLista");

//fazendo requisição para obter o objeto contendo os quizzes
function pegandoTodosOsQuizzes(){
    const requisicaoDosQuizzes = axios.get(`${api}quizzes`);
    requisicaoDosQuizzes.then(resultado =>{
        objetoQuizzes = resultado.data;
        renderQuizzes(objetoQuizzes);
    })
}

//renderizando os quizzes na Home-quizz
function renderQuizzes(objetoQuizzes){
    objetoQuizzes.forEach(objetoquizz => {
        urlImagens.push(objetoquizz.image);
        const titulo = objetoquizz.title;
        const id = objetoquizz.id
        //renderizando cada um dos quizzes
        listaTodosOsQuizzes.innerHTML+=`
            <article onclick="abrindoQuizz('${id}')" class="quizz">
                <p>${titulo}</p>
            </article>
        `;
    });
    let areaDoQuiz = [...document.querySelectorAll(".quizz")];
    colocandoImagemNoQuizz(areaDoQuiz);
}
//verificando a existência de quizzes locais
function conferindoQuizzesLocais(){
    if(listaQuizzesLocais.innerHTML===""){
        listaQuizzesLocais.parentNode.innerHTML=`
            <article class="sem-quizz">
                <p>Você não criou nenhum <br> quizz ainda :(</p>
                <button onclick="criarQuizz()" class="criar-quizz">Criar Quizz</button>
            </article>
        `;
    }
}
//colocando imagem no quizz pelo backgroundo do css
function colocandoImagemNoQuizz(areaDoQuiz){
    for(let i=0; i<areaDoQuiz.length; i++){
        areaDoQuiz[i].style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${urlImagens[i]})`;
        areaDoQuiz[i].style.backgroundSize = "340px 181px";
    }
}
//criando primeiro quizz
function criarQuizz(){
    homeQuizz.classList.add("escondido");
    criandoQuizz.classList.remove("escondido");
}
//chamando funções
pegandoTodosOsQuizzes();
conferindoQuizzesLocais();