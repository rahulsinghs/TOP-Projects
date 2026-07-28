let status = 'reset';
let game_played = 0;
let totalGame = 0;
let pScore = 0;
let cScore = 0;
let timerInterval = null;
let secondsElapsed = 0;


const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const gameStatus = document.querySelector('#gameStatus');
const games = document.querySelector('#no__of__matches');
const btnContainer = document.querySelector('#choices');
const timerDisplay = document.querySelector('.digital__timer')
//rock paper scissor button
const buttons = document.querySelectorAll('#choices button');



startBtn.addEventListener('click', (e) => {
    if (status === 'start') return;
    if (status !== 'reset') return;
    
    totalGame = parseInt(games.value, 10);
    game_played = 0;
    pScore = 0;
    cScore = 0;
    status = 'start';

    buttons.forEach(button =>button.disabled = false);

    startBtn.classList.add('startBtn--active');
    resetBtn.classList.remove('resetBtn--active');
    

    gameStatus.classList.add('gameStatus');
    gameStatus.textContent = 'The Game has started. Choose rock, Paper, or Scissor.';
    games.disabled = true;

    startTimer();
})



//when reset button is clicked
resetBtn.addEventListener('click', (e) => {
    if (status === 'reset') return;
    status = 'reset';
    stopTimer();
    secondsElapsed = 0;
    updateTimerDisplay();

    resetBtn.classList.add('resetBtn--active');
    startBtn.classList.remove('startBtn--active');

    const buttons = document.querySelectorAll('.choice').forEach(b => {
        b.classList.remove(`${b.id}--active`);
        b.classList.add(`${b.id}--default`);
    })

    reset_scoreboard();
})


//Play Round
//if start is clicked and status changes to 'start'
btnContainer.addEventListener('click', (e) => {
    //if the game has not started reset and do nothing;
    if(status !== 'start') return;

    if (game_played === totalGame){
        game_end();
    };
    
    const btn = e.target.closest('.choice');
    if (!btn) return; //clicked outside a button

    //remove active classes from all buttons
    document.querySelectorAll('.choice').forEach(b => {
        b.className = `choice ${b.id}--default`;
    })
    btn.className = `choice ${btn.id}--active`;
   
    const playerChoice = btn.id; //take a note of this
    // console.log(`id name is  ${idName}`);

    // console.log(`id from btn.id is ${btn.id}`); //check above(activte clicked button)
    const computerChoice = computer_choice();
    // console.log(`computer selected ${computer}`);
    const winner = decide_winner(playerChoice, computerChoice);

    const player_score_el = document.querySelector('.player__score');
    const computer_score_el = document.querySelector('.computer__score');
    
    console.log(`playerscore = ${pScore} computer score = ${cScore}`);
    if (winner === 'player'){
        pScore++;
        player_score_el.textContent = pScore;
    }
    if (winner === 'computer'){
        cScore++
        computer_score_el.textContent = cScore;
    }

    game_played++;
    leader(pScore, cScore);
    //add commentry per round
    add_commetry(game_played, playerChoice, computerChoice, winner);

    //check win condition (first to majority wins or max matches reached)
    const majorityNeeded = Math.ceil(totalGame/2);
    if(pScore === majorityNeeded || 
        cScore === majorityNeeded || 
        game_played === totalGame){
            game_end();
        }
})


//timer helper functions 
function startTimer() {
    stopTimer();
    secondsElapsed = 0;
    updateTimerDisplay();
    timerInterval = setInterval(()=>{
        secondsElapsed++;
        updateTimerDisplay();
    },1000);
}

function stopTimer() {
    if(timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const mins = String(Math.floor(secondsElapsed/60)).padStart(2,'0');
    const secs = String(secondsElapsed % 60).padStart(2,'0');
    const minute_e = timerDisplay.querySelector('.mins');
    const secs_e = timerDisplay.querySelector('.secs');
    minute_e.textContent = `${mins}`;
    secs_e.textContent = `${secs}`;
    
}

//rock paper scissor buttons and container
function computer_choice () {
    const choice = Math.floor((Math.random() * 10) % 3 + 1);
    console.log(`choice in function is ${choice}`);
    if (choice === 1){ return 'rock';}
    if (choice === 2){ return 'paper';}
    if (choice === 3) { return 'scissor';}
}

function decide_winner(player, computer){
    if (player===computer){
        return 'draw';
    }
    else if (player === 'rock' && computer === 'scissor' ||
         player === 'paper' && computer === 'rock' ||
        player === 'scissor' && computer === 'paper'
        ) return 'player';
    else {
        return 'computer';        
    }
}


//who leads
function leader(pScore, cScore) {
    // console.log(typeof(pScore));
    // console.log(typeof(cScore));
    // console.log(`player score is ${pScore} computer score is ${cScore}`);
    leader_display = document.querySelector('.leader');
    if (pScore === cScore){
        leader_display.textContent= "Equal";
    }
    else if (pScore > cScore){
        leader_display.textContent = "Player";
    } 
    else{
        leader_display.textContent = "Computer"
    };
    
    // pScore === cSore ? "Equal": (pScore > cScore ? "Player": "Computer");
}

//reset scoreboard
function reset_scoreboard(){
    document.querySelector('.player__score').textContent = 0;
    document.querySelector('.computer__score').textContent = 0;
    document.querySelector('.leader').textContent = "";
    document.querySelector('.gameStatus').textContent = "";
    games.disabled = false;

    //remove all the list in ul
    document.querySelector('#rounds').replaceChildren();

    //remove the div child in declare__winner
    const declare = document.querySelector('#declare__winner');
    declare.innerHTML = "";
}


//add commetryfunction
function add_commetry(roundNum, player, computer, winner){
    const rounds = document.querySelector('#rounds');
    const list = document.createElement('li');

    if(winner === 'draw'){
        list.textContent = `Round ${roundNum} ${player} x ${computer} game is draw `;
    }else {
        list.textContent = `Round ${roundNum} ${player} x ${computer} ${winner} wins round!`;
    }
    rounds.appendChild(list);    
}


//End Game. if game is equal to the total game, game ends
function game_end(){
    status = 'end';
    stopTimer();
    
    buttons.forEach(button =>button.disabled = true);
    
    const declare = document.querySelector('#declare__winner');
    declare.innerHTML = '';

    let finalResult = '';
    if(pScore > cScore){
        finalResult = 'You won the series';
    }else if (cScore > pScore){
        finalResult = 'Computer won the series';
    }else {
        finalResult = 'The series ended in a tie';
    }
    
    gameStatus.textContent = "Game Over"

    const div = document.createElement('div');
    div.classList.add('game__end');
    div.innerHTML = `<h3>${finalResult}</h3><p>Press <strong>Reset</strong> to play again.</p>`;
    declare.appendChild(div);
}

