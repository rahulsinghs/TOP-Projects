// Rock paper scissor
/*
 1. get computer choice a random 'rock', 'paper' or 'scissor'
 2. get a input from user
 3. Compare the results 'rock beats scissor', 'paper beats rock', 'scissor beats paper'
 4. Declare who is Winner or loser 
 5. notify how many games played 
 6. play the game again till total  rounds of game is played
*/

//1. get a random rock paper or scissor for computer. No need of array in this project

function playGame() {
    count = 0;
    while (count < 5) {
        const computerChoice =  getComputerChoice();
        const humanChoice = getHumanChoice();
        // console.log(`c = ${computerChoice}, h = ${humanChoice}`); //test
        playRound(computerChoice, humanChoice);
        count++;
    }

}


function getComputerChoice(){
    let randomNum = Math.floor(Math.random() * 3); 
    // console.log(randomNum);
    if(randomNum === 0){
        return "rock";
    }else if(randomNum === 1){
        return "paper";
    }
    else {return "scissor";} 
}

// 2. get a human choice can use prompt
function getHumanChoice() {
    let choice = prompt().toLowerCase();
    console.log(choice); //test
    return choice;
}

// let computerChoice = getComputerChoice();
// let humanChoice = getHumanChoice();


// 3. Compare
function winnerChoice(computerChoice, humanChoice) {
    if(computerChoice === 'rock' && humanChoice === 'rock') {
        return 'draw';
    }
    else if(computerChoice === 'rock' && humanChoice === 'rock'){
        console.log('rock cannot beat rock its draw');
        return 'Draw';
    }else if(computerChoice === 'rock' && humanChoice === 'paper'){
        console.log('You won, rock  lost to paper');console.log('You won, paper beat rock');
        return 'human';
    }else if (computerChoice === 'rock' && humanChoice === 'scissor'){
        console.log('You lost! rock beat scissor');
        return 'computer';
    }else if (computerChoice === 'paper' && humanChoice === 'rock'){
        console.log('You loose! paper beat rock');
        return 'computer';
    }else if (computerChoice === 'paper' && humanChoice === 'paper'){
        console.log('Its draw! paper cannot beat paper');
        return 'Draw';
    }else if (computerChoice === 'paper' && humanChoice === 'scissor'){
        console.log('You won, Paper  lost to scissor');
        return 'human';
    }else if (computerChoice === 'scissor' && humanChoice === 'rock'){
        console.log('You won!, scissor lost to rock');
        return 'human';
    }else if (computerChoice === 'scissor' && humanChoice === 'paper'){
        console.log("you lost Scissor beat paper");
        return 'computer';
    }else if (computerChoice === 'scissor' && humanChoice === 'scissor'){
        console.log('no ond won, its a tie');
        return 'draw';
    }
}

//Eliminatied repetition
function winnerChoice2(computerChoice,humanChoice) {
    // console.log(`winnerChoice console ${computerChoice} ${humanChoice}`);
    if (computerChoice === humanChoice){
        return 'draw';
    }
    if(computerChoice === 'rock' && humanChoice === 'scissor' ||
        computerChoice === 'scissor' && humanChoice === 'paper' ||
        computerChoice === 'paper' && humanChoice === 'rock'
    ){
        return 'computer';
    }
    else{ return 'human';}
}



//declare who has won 
function declareWinner(winner) {
    // console.log(`computer chose ${computerChoice}, human chose ${humanChoice}`);
    if(winner === 'draw'){
        console.log('there is no winner or loser match draw');
        // return winner;
    }else if(winner === 'computer'){
        console.log('Computer Won and You Lost');
        // return winner;
    }else if(winner === 'human'){
        console.log('You Won and Computer Lost');
        // return winner;
    }
}

let humanScore = 0;
let computerScore = 0;


function playRound(computerChoice, humanChoice) {
    const winner = winnerChoice2(computerChoice, humanChoice);
    // console.log(`winner console ${winner}`);
    declareWinner(winner);
    if (winner === 'human'){
        humanScore++;
    }else if( winner === 'computer'){
        computerScore++;
    }
    console.log(`Your score ${humanScore}, Computer Score ${computerScore}`);
}

