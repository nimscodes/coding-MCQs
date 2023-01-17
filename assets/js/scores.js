const highscores = document.querySelector("#highscores");

let localStorageScores = localStorage.getItem("userscores");
if(localStorageScores){
    let scores = JSON.parse(localStorageScores);
    scores.sort(function(element1, element2){
        console.log(element1, element2);
        return element2.score - element1.score;
    });
    for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        const li = document.createElement('li');
        li.innerHTML = score.initial + " - " + score.score;
        highscores.append(li);
    }
}

console.log(localStorageScores);