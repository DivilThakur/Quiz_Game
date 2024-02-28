let Url = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"

const Question = document.querySelector(".Question p") // select question element
const Answers = document.querySelectorAll(".Answers button"); // array of answers elements
const difficulty = document.querySelector(".Dropdown-Select .Difficulty") // difficulty section (select element)
const category = document.querySelector(".Dropdown-Select .Category") // Category section (select element)
const button = document.querySelector("#btn"); // next button
const QuesTrack = document.querySelector("#QuesTrack"); 
const Message = document.querySelector(".Message")
const Start = document.querySelector("#Start")
const goBack = document.querySelector(".goBack")
const Scoreboard = document.querySelector(".Scoreboard")
let click = new Audio("change.mp3"); // )
let won = new Audio("won.mp3");      // } --- Music files
let lost = new Audio("lost.mp3");
let happy =new Audio("Happy_giphy.mp3")    // )
let currcategory = category.value; // Storing the value of current category to change with respect to difficulty
let currdifficulty = difficulty.value; //  Storing the value of current difficulty to change with respect to category
let score = 0;
let QuesNum = 1;
let body = document.querySelector("body");




disableInput = () => {
    for (box of Answers) {
        box.disabled = true;
    }
}


enableInput = () => {
    for (box of Answers) {
        box.disabled = false;
    }
}



// Checking Difficulty If changed Then Change the url and set api difficulty
category.addEventListener('change', (evt) => {
    let val = evt.target;
    currcategory = val.value;
    Url = `https://opentdb.com/api.php?amount=10&category=${currcategory}&difficulty=${currdifficulty}&type=multiple`

})



// Checking Category If changed Then Change the url and set api Category
difficulty.addEventListener('change', (evt) => {
    let val = evt.target;
    currdifficulty = val.value;
    Url = `https://opentdb.com/api.php?amount=10&category=${currcategory}&difficulty=${currdifficulty}&type=multiple`

})



// Our main function to fetch api and show results
async function getquiz(Url, next) {
    const reponse = await fetch(Url)
    const data = await reponse.json();
    button.addEventListener('click', () => {
        if (QuesNum === 10) {
            button.disabled = true;
            for (a of Answers) {
                a.style.background = "#fda403";
            }
            ScoreDisplay();
        }
        else {
            QuesNum++;
            QuesTrack.innerHTML = QuesNum;
            for (a of Answers) {
                a.style.background = "#fda403";
            }
            enableInput();
            next++;
            setquestion(data, next);
        }

    })
    setquestion(data, next);

}



// start button 
Start.addEventListener('click', async() => {
    let next = 0;
    Start.innerText="Loading..";
    await getquiz(Url, next)
    body.children[1].classList.add("transition2")
    body.children[2].classList.add("transition1")
    for (i of difficulty) {
        i.disabled = true
    }
    for (i of category) {
        i.disabled = true
    }
    QuesTrack.innerHTML = QuesNum;
    Start.disabled = true;
})



// Setting Questions Answers To  Our Page With Api
function setquestion(data, next) {
    let correctAns = data.results[next].correct_answer;
    let IncorrectAns = data.results[next].incorrect_answers;
    let Options = IncorrectAns;
    Options.splice(Math.floor(Math.random() * 4), 0, correctAns);
    Question.innerText = data.results[next].question;
    for (let i = 0; i < 4; i++) {
        Answers[i].innerHTML = Options[i];
    }
    Answers.forEach((box) => {
        box.addEventListener('click', () => {
            click.play();
            if (box.innerText === correctAns) {
                box.style.background = "green";
                score++;
                disableInput();
            } else {
                box.style.background = "red";
                disableInput();
            }
        })
    })
}



// display score in page3
ScoreDisplay = () => {
    body.children[0].classList.add("transition2")
    body.children[2].classList.add("transition2")
    body.children[3].classList.add("transition1")
    if (score <= 3) {
        Scoreboard.children[1].innerText = "Better Luck Next Time";
        Scoreboard.children[2].childNodes[0].innerText = score;
        Scoreboard.children[3].src = "Sad_giphy.gif";
        lost.play();
    }   else if (score >= 4 && score <= 7) {
        Scoreboard.children[1].innerText = "Almost There";
        Scoreboard.children[2].childNodes[0].innerText = score;
        Scoreboard.children[3].src = "Almostthere.gif";
        won.play()
    }   else {
        Scoreboard.children[1].innerText = "Good Game Dude";
        Scoreboard.children[2].childNodes[0].innerText = score;
        Scoreboard.children[3].src = "happy_giphy.gif";
        happy.play()
    }
}



// Full refresh button of Page3
goBack.addEventListener('click', () => {


    setTimeout(() => {
        location.reload();
    }, 1000)

})


