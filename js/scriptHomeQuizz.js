const api = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const listaQuizzesLocais =document.querySelector(".seus-quizzes .quizzes-lista");
let objetoQuizzes, urlImagens=[], urlImagensUsuario=[];
let listaTodosOsQuizzes = document.querySelector(".todos-quizzes .quizzes-lista");
let listaQuizzesUsuario = document.querySelector(".seus-quizzes .quizzes-lista");

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
        //renderizando quizzes do usuário
        listaDeQuizzesCriados.forEach(idDoUsuario=>{
            if(idDoUsuario==id){
                urlImagensUsuario.push(objetoquizz.image);
                listaQuizzesUsuario.innerHTML+=`
                <article data-identifier="quizz-card" data-identifier="user-quizzes" onclick="abrindoQuizz('${id}')" class="quizz-do-usuario">
                    <p>${titulo}</p>
                </article>
                `;
            }
            else{
                //renderizando cada um dos quizzes
                listaTodosOsQuizzes.innerHTML+=`
                <article data-identifier="quizz-card" data-identifier="general-quizzes" onclick="abrindoQuizz('${id}')" class="quizz">
                    <p>${titulo}</p>
                </article>
                `;
            }
        })
    });
    let areaDoQuiz = [...document.querySelectorAll(".quizz")];
    let areaDoQuizDoUsuario = [...document.querySelectorAll(".quizz-do-usuario")];
    conferindoQuizzesLocais();
    colocandoImagemNoQuizz(areaDoQuiz);
    colocandoImagemNoQuizzDoUsuario(areaDoQuizDoUsuario);
}
//verificando a existência de quizzes locais
function conferindoQuizzesLocais(){
    if(listaQuizzesLocais.innerHTML===""){
        listaQuizzesLocais.parentNode.innerHTML=`
            <article class="sem-quizz">
                <p>Você não criou nenhum <br> quizz ainda :(</p>
                <button data-identifier="create-quizz" onclick="criarQuizz()" class="criar-quizz">Criar Quizz</button>
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
//colocando imagem no quizz do usuário
function colocandoImagemNoQuizzDoUsuario(areaDoQuizDoUsuario){
    for(let i=0; i<areaDoQuizDoUsuario.length; i++){
        areaDoQuizDoUsuario[i].style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 0.5) 65%, #000000 100%), url(${urlImagensUsuario[i]})`;
        areaDoQuizDoUsuario[i].style.backgroundSize = "340px 181px";
    }
}
//criando primeiro quizz
function criarQuizz(){
    homeQuizz.classList.add("escondido");
    criandoQuizz.classList.remove("escondido");
}
//abrindo quizz criado 
function jogandoQuizzCriado(){
    const requisicaoDosQuizzes = axios.get(`${api}quizzes`);
    requisicaoDosQuizzes.then(resultado =>{
        objetoQuizzes = resultado.data;
        console.log(resultado.data);
        for(let i=0; i<objetoQuizzes.length; i++){
            if(objetoQuizzes[i].id==listaDeQuizzesCriados[listaDeQuizzesCriados.length-1]){
                console.log(listaDeQuizzesCriados[listaDeQuizzesCriados.length-1]);
                console.log(objetoQuizzes[i].id);
                abrindoQuizz(objetoQuizzes[i].id);
                break;
            }
        }
        
    })
}
//chamando funções
pegandoTodosOsQuizzes();