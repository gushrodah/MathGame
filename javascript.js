var timer = 0;
var score = 0;
var maxTimer = 10;
var hasStarted = false;
var correctAnswer = 0;

//onClick
document.getElementById("startButton").onclick =
function startCountdown(){
    Reset();
    hasStarted = true;
    DisplayElement("startButton", false);
    DisplayElement("endGameMsg", false);
    if (hasStarted) {
        // decrement timer
        action = setInterval(function () {
            timer--;
            SetElement("timeLeft", timer);
            // check for end game
            if (timer <= 0) {
                document.getElementById("endGameMsg").style.display = "block";
                DisplayElement("endGameMsg", true);
                SetElement("finalScore", score);
                //Reset();
                hasStart= false;
                clearInterval(action);
                DisplayElement("startButton", true);
            }
        }, 1000);
    }
}

for (i = 1; i < 5; i++) {
    document.getElementById("Option"+i).onclick =
        function () {
            if (hasStarted) {
                if (this.innerHTML == correctAnswer) {
                    score += 100;
                    DisplayElement("correct", true);
                    GenerateQuestion();
                }
                else {
                    score -= 50;
                    DisplayElement("wrong", true);
                }
                SetElement("scoreValue", score);
            }
        }
}

function GenerateQuestion(){
    // get random number
    var num1 = GetRandomInt(1,10);
    var num2 = GetRandomInt(1,10);
    // set display
    SetElement("question", num1 + " x " + num2);
    var answers = [];
    // set answers
    answers.push(num1* num2);
    correctAnswer = num1 * num2;
    answers.push(num1* num2 + 1);
    answers.push(num1+ num2);
    answers.push(num1- num2);
    //mix them
    answers = shuffleArray(answers);
    //set buttons
    for(var i =1; i< 5; i++){
        SetElement("Option"+i, answers[i-1]);
        if(answers[i-1] == num1*num2)
        {
            //SetElement("Option"+i, AAA);
            //document.getElementById("Option1").onclick = GenerateQuestion();
            //score+=100;
            //SetElement("scoreValue", score);
        }
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function GetRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Reset(){
    timer = maxTimer;
    score = 0;
    SetElement("timeLeft", timer);
    SetElement("finalScore", score);
    SetElement("scoreValue", score);
    DisplayElement("correct", false);
    DisplayElement("wrong", false);
    GenerateQuestion();
}

function DisplayElement( elementName, shouldDisplay){
    document.getElementById(elementName).style.display = shouldDisplay ? "block" : "none";
}

function SetElement(elementId, newValue){
    document.getElementById(elementId).innerHTML = newValue;
}