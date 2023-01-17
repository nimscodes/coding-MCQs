const timer = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start");
const questions = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choiceDiv = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const feedback = document.querySelector("#feedback");
const initials = document.querySelector("#initials");
const submitButton = document.querySelector("#submit");


const last = questionsArr.length - 1;
let current = 0;
let count = 60;
var quizTimer;
let score_of_user = 0;


function renderQuestion(){
    let currentQuestion = questionsArr[current];

    choiceDiv.innerHTML = "";
    questionTitle.innerHTML = currentQuestion.question;
    for (let i = 0; i < currentQuestion.choices.length; i++){
        let choiceButton = document.createElement('button');
        choiceButton.textContent = currentQuestion.choices[i];
        choiceDiv.append(choiceButton);

    }
}

function renderCounter(){
    timer.textContent = count;
    if (count > 0){
        count--;
    }else{
        count = 0;
        endGame();
    }
    
}

function endGame(){
    questions.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = count;
    clearInterval(quizTimer);
    score_of_user = count;
}


function checkAnswer(userAnswer){
    
    if ( userAnswer == questionsArr[current].choices[questionsArr[current].answer]){
        feedback.textContent = "Correct Answer!";
        feedback.classList.remove('hide');
        setTimeout(function(){
            feedback.classList.add('hide');
        }, 1000);
        current++;
        if (current > last){
            endGame();
        }else{
            renderQuestion();
        }
        
    }else{
        feedback.textContent = "Wrong Answer!";
        feedback.classList.remove('hide');
        count = count - 10;
    }

}

startButton.addEventListener('click', startQuiz);
choices.addEventListener('click', function(event){
    event.preventDefault();
    let userAnswer = event.target.innerText;
    checkAnswer(userAnswer);
})


function startQuiz(){
    startScreen.style.display = "none";
    renderQuestion();
    questions.classList.remove('hide');
    quizTimer = setInterval(renderCounter, 1000);
}

let gameScoreList = localStorage.getItem("userscores");

submitButton.addEventListener('click', function(){

    let userInitials = initials.value;
    let scores = [];
    if (gameScoreList){
        scores = JSON.parse(gameScoreList);
    }
    scores.push({initial: userInitials, score: score_of_user});
    localStorage.setItem("userscores", JSON.stringify(scores));
    window.location.href = "highscores.html";
})


