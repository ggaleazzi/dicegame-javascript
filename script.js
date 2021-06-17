'use strict';

// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice2El = document.querySelector('.dice2');
//const quantity = parseInt(document.getElementById('quantity').value, 10);

let score, currentScore, activePlayer, playing, dicestotal, winpoints;

// Starting conditions
// document.getElementById('myform').addEventListener('change', funcwinpoints);
// function funcwinpoints() {
//   const quantity = parseInt(document.getElementById('quantity').value, 10);
//   console.log(quantity);
// }

// store the number to win
document.getElementById('myform').addEventListener('change', funcwinpoints);
function funcwinpoints() {
  const quantity = parseInt(document.getElementById('quantity').value, 10);

  winpoints = quantity;
}
console.log(winpoints);
// click start game and number choice disappears
// compare player points with the setted points for win condition
// start game and number resets

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  dice2El.classList.add('hidden');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    const dice2 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    dice2El.classList.remove('hidden');
    dice2El.src = `dice-${dice2}.png`;

    // 3. Check for rolled 1:
    if (dice !== 1 && dice2 !== 1) {
      // add dice to current score
      dicestotal = dice + dice2;

      currentScore += dicestotal;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. addcurent score to active player's score
    score[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. check if players score is >= 100
    if (score[activePlayer] >= winpoints) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      dice2El.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  // 3. switch to next player
});

btnNew.addEventListener('click', init);
