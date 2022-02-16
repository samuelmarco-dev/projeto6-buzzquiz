const api = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let allQuizzesListHtml = document.querySelector(".all-quizzes .quizzesList");
let yourQuizzesListHtml = document.querySelector(".your-quizzes .quizzesList");

//fazendo requisição para obter o objeto contendo os quizzes
function gettingAllQuizzes(){
    const quizzesRequested = axios.get(`${api}quizzes`);
    quizzesRequested.then(result =>{
        const quizzesObjects = result.data;
        console.log(quizzesObjects);
        renderQuizzes(quizzesObjects);
    })
}

//renderizando os quizzes na Home-quizz
function renderQuizzes(quizzesObjects){
    quizzesObjects.forEach(quizzObject => {

        const title = quizzObject.title;
        const image = quizzObject.image;
        allQuizzesListHtml.innerHTML+=`
            <article class="quizz">
                    <p>${title}</p>
                    <img src= ${image} alt="Imagem do quizz">
            </article>
        `;

    });
}

//chamando funções
gettingAllQuizzes();