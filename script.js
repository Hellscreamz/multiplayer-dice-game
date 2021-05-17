'use strict';

let generateRandomNum = 0;
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let currentScorePlayerOne = 0;
let currentScorePlayerTwo = 0;

let randomNumGenerate = () => {
  generateRandomNum = Math.trunc(Math.random() * 6) + 1;
};
randomNumGenerate();

const animationDice = () => {
  $('.dice').replaceWith(
    `<img src="dice-${generateRandomNum}.png" alt="Playing dice" class="dice" />`
  );
};
animationDice();

const btnRoll = $('.btn--roll').on('click', function () {
  randomNumGenerate();
  animationDice();
  diceRolls();
  punishment();
  generateRandomNum = 0;
  btnHold.show();
  win();
});
btnRoll.hide();
const btnNewGame = $('.btn--new').on('click', function () {
  location.reload();
});

const btnHold = $('.btn--hold').on('click', function () {
  mechanicsAboutResponsivenessSections();
  currentScorePlayerOne = 0;
  currentScorePlayerTwo = 0;
  resetCurrentResults();
  win();
  btnHold.hide();
});
btnHold.hide();

const collectScorePlayerOne = () => {
  currentScorePlayerOne += generateRandomNum;
  scorePlayerOne += currentScorePlayerOne;
  $('#score--0').replaceWith(
    `<p class="score" id="score--0">${currentScorePlayerOne}</p>`
  );
  $('#score--0').replaceWith(
    `<p class="score" id="score--0">${scorePlayerOne - generateRandomNum}</p>`
  );
};

const collectScorePlayerTwo = () => {
  currentScorePlayerTwo += generateRandomNum;
  scorePlayerTwo += currentScorePlayerTwo;
  $('#score--1').replaceWith(
    `<p class="score" id="score--1">${currentScorePlayerTwo}</p>`
  );
  $('#score--1').replaceWith(
    `<p class="score" id="score--1">${scorePlayerTwo - generateRandomNum}</p>`
  );
};

const mechanicsAboutResponsivenessSections = () => {
  if ($('.player--0').hasClass('player--active')) {
    $('.player--0').removeClass('player--active');
    $('.player--1').toggleClass('player--active');
    collectScorePlayerOne();
  } else {
    $('.player--1').removeClass('player--active');
    $('.player--0').toggleClass('player--active');
    collectScorePlayerTwo();
  }
};

const resetCurrentResults = () => {
  $('#current--0').replaceWith(
    `<p class="current-score" id="current--0">${currentScorePlayerOne}</p>`
  );
  $('#current--1').replaceWith(
    `<p class="current-score" id="current--1">${currentScorePlayerTwo}</p>`
  );
  $('.dice').replaceWith(
    `<img src="empty-dice.png" alt="Playing dice" class="dice" />`
  );
};

const win = () => {
  if (
    scorePlayerOne + currentScorePlayerOne >= 100 ||
    scorePlayerTwo + currentScorePlayerTwo >= 100
  ) {
    $('.winner').append('You Win The Game!');
    btnRoll.hide();
    btnHold.hide();
  }
};

const punishment = () => {
  if (generateRandomNum == 1) {
    currentScorePlayerOne = 0;
    currentScorePlayerTwo = 0;
    generateRandomNum = 0;
    $('#current--0').replaceWith(
      `<p class="current-score" id="current--0">${currentScorePlayerOne}</p>`
    );
    $('#current--1').replaceWith(
      `<p class="current-score" id="current--1">${currentScorePlayerTwo}</p>`
    );
    mechanicsAboutResponsivenessSections();
  }
};

const diceRolls = () => {
  if ($('.player--0').hasClass('player--active')) {
    currentScorePlayerOne += generateRandomNum;
    $('#current--0').replaceWith(
      `<p class="current-score" id="current--0">${currentScorePlayerOne}</p>`
    );
  } else {
    currentScorePlayerTwo += generateRandomNum;
    $('#current--1').replaceWith(
      `<p class="current-score" id="current--1">${currentScorePlayerTwo}</p>`
    );
  }
};

//ENTER KEYDOWN

let inputOne = $('#input_one').val();
let inputTwo = $('#input_two').val();
let counterEnterPresses = 0;

const inputNameOne = $(document).on('keydown', function (e) {
  inputOne = $('#input_one').val();

  if (e.keyCode === 13) {
    if (inputOne.length > 0) {
      $('#name--0').append(inputOne);
    } else {
      inputOne = 'Guest 1';
      $('#name--0').append(inputOne);
    }
    $('.input_players').hide();
    btnRoll.show();
    counterEnterPresses += 1;
    unbindEnterKeyPress();
  }
});

const inputNameTwo = $(document).on('keydown', function (e) {
  inputTwo = $('#input_two').val();

  if (e.keyCode === 13) {
    if (inputTwo.length > 0) {
      $('#name--1').append(inputTwo);
    } else {
      inputTwo = 'Guest 2';
      $('#name--1').append(inputTwo);
    }
    $('.input_players').hide();
    btnRoll.show();
    counterEnterPresses += 1;
    unbindEnterKeyPress();
  }
});

const unbindEnterKeyPress = () => {
  if (counterEnterPresses > 0) {
    $(document).unbind('keydown');
  }
};
