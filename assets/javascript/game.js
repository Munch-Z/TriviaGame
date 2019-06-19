//screens to hide and show

let startScreen = document.getElementById('startScreen');
let gameScreen = document.getElementById('gameScreen');
let finalScreen = document.getElementById('finalScreen');
let transitionScreen = document.getElementById('transitionScreen');

//buttons

let playGameBtn = document.getElementById('playGame');
let submitBtn = document.getElementById('submitAnswer');
let restartBtn = document.getElementById('restartGame');

//text locations

let questionDisplay = document.getElementById('questionHeader');
let answersDiv = document.getElementById('answerSelection');
let rightAnswer = document.getElementById('rightAnswers');
let wrongAnswer = document.getElementById('wrongAnswers');
let timerDisplay = document.getElementById('timer');
let transitionText = document.getElementById('transitionHeader');
let correctAnswerHTML = document.getElementById('correctAnswer');

//global stats
let losses = 0;
let wins = 0;
let timer = 15;

//for clearing interval
let intervalId;

//Counts questions to reset at max
let count = 0;

//questions and answers

let questionsObj = [{
    question : "What has been shown to be the most secure type of password for devices and accounts?",
    answers: ["A very long list of random words combined with symbols", "Your pets name", "Your mothers maiden name", "The model of your first car"],
    correct: "A very long list of random words combined with symbols"
},
{
    question : " What are the words of the acronym CD-ROM?",
    answers: ["Compact Disc Read Only Memory", "Compact Disc Runs On Machine", "Compact Disc Relinquish Owner Machine", "Car Driver Really Oughta Move"],
    correct: "Compact Disc Read Only Memory"
},
{
    question : " One of the first electronic computers, located in Philadelphia, occupied 167 square metres, weighed 27 tons and consumed 150kW of electricity. What was it called?",
    answers: ["ENIAC", "Big Blue", "Large and in charge", "Computer McComputer Face"],
    correct: "ENIAC"
},
{
    question : "Which British mathematician and inventor, known as the 'Father of the Computer', designed a mechanical computer called the Analytical Engine which was an early forerunner of the computer we know today?",
    answers: ["Charles Babbage", "Daniel Craig", "Benedict Cumberbatch", "Bill Gates"],
    correct: "Charles Babbage"
},
{
    question : "When IBM chose the name System/360 (or S/360), it was selected to be all-encompassing (a compass rose was the logo for the S/360). As such the System was designed to handle all EXCEPT which of the following types of processing?",
    answers: ["Graphics Processing", "Batch Processing", "Scientific Processing", "Communications Processing"],
    correct: "Graphics Processing"
},
{
    question : "Which general term refers to all kinds of harmful software, including viruses, worms, trojan horses, and spyware?",
    answers: ["Malware", "Firmware", "Meanware", "Badware"],
    correct: "Malware"
},
{
    question : "The CPU controls all of a computer's functions. It acts as the brain of the computer. What does CPU stand for?",
    answers: ["Central Processing Unit", "Central Python Unit", "Cool Part Unix", "Computer Processing Unit"],
    correct: "Central Processing Unit"
},
{
    question : "Which of the following is a non-impact printer?",
    answers: ["ink jet printer", "dot matrix printer", "daisy-wheel printer", "line printer"],
    correct: "ink jet printer"
},
{
    question : "The 'Caesar Cipher' is also known as what?",
    answers: ["Rot3", "Et tu, Brute? Cipher", "Backstabber", "Salad Cipher"],
    correct: "Rot3"
},
{
    question : "Which is not associated with computers?",
    answers: ["Turing Machine", "Babbage Engine", "CPU Overdrive", "FPU Manifold"],
    correct: "FPU Manifold"
},
{
    question : "Which of the following is not a method for encoding text characters on a computer?",
    answers: ["EBCDIC", "ASCII", "SIXBIT", "ANSI"],
    correct: "ANSI"
},
{
    question : "McAfee, the internet security company, became a subsidiary of which of these in 2011?",
    answers: ["Dell", "Microsoft", "IBM", "Intel"],
    correct: "Intel"
},
{
    question : "What does ICMP stand for?",
    answers: ["Internet Control Message Protocol", "Internal Conflict Management Program", "Internet Connection Modem Protocol", "Intranet Control Message Program"],
    correct: "Internet Control Message Protocol"
},
{
    question : "Algorithms are composed of control structures. Which of these is not a control structure?",
    answers: ["Pseudocode", "Sequence", "Iteration", "Selection"],
    correct: "Pseudocode"
},
{
    question : "Which of the following is the lowest level of computer language?",
    answers: ["Machine language", "PASCAL", "FORTRAN", "Assembler"],
    correct: "Machine language"
}];


function gameStart(arr) {

    transitionScreen.classList.add('hidden');
    gameScreen.classList.remove("hidden");

    questionDisplay.textContent = questionsObj[count].question;

    //randomizes answers array so correct answer is not always in the same place
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
    }

    //creates buttons and labels
    for (let i = 0; i < arr.length; i++){
        let radioLabel = document.createElement('label');
        let radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.id = arr[i];
        radioButton.name = 'answers';
        radioLabel.textContent = arr[i];
        radioLabel.setAttribute('for', arr[i]);
        answersDiv.appendChild(radioButton);
        answersDiv.appendChild(radioLabel);
    }

    //keeps track of where we are in questions object
    

    //starts timer
    intervalId = setInterval(timerFunction, 1000);
}

function placeholderStart(){    
    let userSelected = document.querySelector('input[name=answers]:checked').value;
    clearInterval(intervalId);
    console.log(userSelected);

    transitionScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");

    if (userSelected === questionsObj[count].correct) {
        transitionText.textContent = 'Correct';
        wins++;
    } else {
        transitionText.innerHTML = 'Wrong<br>The correct answer was: ' + questionsObj[count].correct;
        losses++
    }

    count++;

    setTimeout(gameStart, 2000, questionsObj[count].answers)
}


function timerFunction() {
    timerDisplay.textContent = timer;
    timer--;
    
    if (timer === 0){
        transitionScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
        transitionText.innerHTML = 'You ran out of time!<br>The correct answer was: ' + questionsObj[count].correct; 
    }
}




submitBtn.addEventListener('click', placeholderStart);

playGameBtn.addEventListener('click', () => {
    gameStart(questionsObj[count].answers);
    startScreen.classList.add('hidden');
})
