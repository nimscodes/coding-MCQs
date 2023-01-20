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


const last = questionsArr.length - 1; // index for last question
let current = 0; // index for current question
let count = 60; // total game time
var quizTimer; // timer for game
let score_of_user = 0; // user's score initiliazed from the start of the game

// display Question
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

// dislpay timer
function renderTimer(){
    timer.textContent = count;
    if (count > 0){
        count--;
    }else{
        count = 0;
        endGame();
    }
}

// end game
function endGame(){
    questions.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = count;
    clearInterval(quizTimer);
    score_of_user = count;
}

// check user selection
function checkAnswer(userAnswer){
    
    if ( userAnswer == questionsArr[current].choices[questionsArr[current].answer]){
        feedback.textContent = "Correct Answer!";
        var cAudio = new Audio('assets/sfx/correct.wav');
        cAudio.play();
        feedback.classList.remove('hide');
        setTimeout(function(){
            feedback.classList.add('hide');
        }, 500);
        current++;
        if (current > last){
            endGame();
        }else{
            renderQuestion();
        }
        
    }else{
        feedback.textContent = "Wrong Answer!";
        var iAudio = new Audio('assets/sfx/incorrect.wav');
        iAudio.play();
        feedback.classList.remove('hide');
        count = count - 10;
    }

}

// start quiz with a click of the start button
startButton.addEventListener('click', startQuiz);

// record user choice and compare to the right answer
choices.addEventListener('click', function(event){
    event.preventDefault();
    let userAnswer = event.target.innerText;
    checkAnswer(userAnswer);
})

// start quiz
function startQuiz(){
    startScreen.style.display = "none";
    renderQuestion();
    questions.classList.remove('hide');
    quizTimer = setInterval(renderTimer, 1000);
}

// retrieve  scorelist from local storage and push current scores to the stringified array of score objects
let gameScoreList = localStorage.getItem("userscores");


submitButton.addEventListener('click', function(){

    let userInitials = initials.value;
    let scores = [];
    if (gameScoreList){
        scores = JSON.parse(gameScoreList);
    }
    scores.push({initial: userInitials, score: score_of_user});
    localStorage.setItem("userscores", JSON.stringify(scores));
    // pass the local storage to the next page
    window.location.href = "highscores.html";
})


