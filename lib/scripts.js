
'use strict';

var $ = require('jQuery');
const Timer = require('./timer');
const Pomodoro = require('./pomodoro');
const moment = require('moment');

const $startButton = $('.start-button');
const $pauseButton = $('.pause-button');
const $focusTimeInput = $('#focus-time-input');
const $breakTimeInput = $('#break-time-input');
const $focusTimeSubmit = $('#set-focus-submit');
const $breakTimeSubmit = $('#set-break-submit');
const $displayCountDown = $('.display-count-down');
const $timerButton = $('.timer-button');
const $resumeButton = $('.resume-button');

function showPauseButton() {
  $resumeButton.hide();
  $startButton.hide();
  $pauseButton.show();
}

function showStartButton() {
  $resumeButton.hide();
  $pauseButton.hide();
  $startButton.show();
}

function showResumeButton() {
  $resumeButton.show();
  $pauseButton.hide();
  $startButton.hide();
}

function checkFocusSubmitButtonStatus() {
  return $focusTimeSubmit.prop('disabled', !($focusTimeInput.val()));
}

function checkBreakSubmitButtonStatus() {
  return $breakTimeSubmit.prop('disabled', !($breakTimeInput.val()));
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}


// function pauseTimer(seconds, time) {
//   Pomodoro.get();
//   seconds = Pomodoro.pomodoros[0].remaining() / 1000;
//   time = Pomodoro.pomodoros[0];
//   displayClock(seconds, time);
// }

// function finalCountDown() {
//   debugger;
//   var remaining = Pomodoro.pomodoros[0].remaining();
//   let endTime = new Audio('/sounds/end-time.wav');
//   let intervalTime = new Audio('/sounds/interval-time.wav');
//   if (210000 <= timer.remaining) { $timerButton.toggleClass('final-seconds'); }
//
//   if (210000 >= timer.remaining >= 20000) { intervalTime.play(); $timerButton.toggleClass('final-seconds'); }
//   if (16000 >= remaining >= 15000){ intervalTime.play(); }
//   if (1100 >= remaining >= 10000) { intervalTime.play(); }
//   if (6000 >= remaining >= 5000) { intervalTime.play(); }
//   if (1000 >= remaining >= 0) { endTime.play(); initiateNextTimer();}
//
// }

function finalCountDown() {
  let endSound = new Audio('/sounds/end-time.wav');
  let intervalSound = new Audio('/sounds/interval-time.wav');
  if (Pomodoro.pomodoros[0].timeRemaining <= 20000) { $timerButton.addClass('final-seconds');}
  if (Pomodoro.pomodoros[0].timeRemaining <= 20000 && Pomodoro.pomodoros[0].timeRemaining % 5 === 0) {
    intervalSound.play();}
  if (Pomodoro.pomodoros[0].isExpired()) {
    endSound.play();
    initiateNextTimer();
  }
}
// function finalCountDown() {
//   var remaining = Pomodoro.pomodoros[0].remaining();
//   let endSound = new Audio('/sounds/end-time.wav');
//   let intervalSound = new Audio('/sounds/interval-time.wav');
//   if ()
//   if ((Pomodoro.pomodoros[0].remaining() / 1000) === 0) {
//     endSound.play();
//     initiateNextTimer();
//   }
//   if ((Pomodoro.pomodoros[0].remaining() / 1000) < 21000) {
//     intervalSound.play();
//     $timerButton.addClass('final-seconds');
//   }
  // if ((Pomodoro.pomodoros[0].remaining() / 1000) < 16000) {
  //   intervalSound.play();
  //   $timerButton.toggleClass('final-seconds');
  // }
  // if ((Pomodoro.pomodoros[0].remaining() / 1000) < 11000 && (Pomodoro.pomodoros[0].remaining() / 1000) > 10000) {
  //   intervalSound.play();
  //   $timerButton.toggleClass('final-seconds');
  // }
  // if ((Pomodoro.pomodoros[0].remaining() / 1000) < 6000 && (Pomodoro.pomodoros[0].remaining() / 1000) > 5000) {
  //   intervalSound.play();
  //   $timerButton.toggleClass('final-seconds');
  // }
    // $timerButton.toggleClass('final-seconds');

//
// console.log(isValidInput());
//
// function setCustomBreak() {
//   var custom = parseInt($breakTimeInput.val());
//   if (!isValidInput(custom)) { alert('Please enter a valid rest time.');}
//   else { return custom; }
// }
  // $focusTimeInput.val('');

  //
  // function isValidInput(input) {
  //   return Number.isInteger(input) && input >= 0;
  // }
var custom;

function setCustomBreak() {
  custom = parseInt($breakTimeInput.val());
  if (custom > 0) { return custom; }
  else { return 5; }
}

function setCustomFocus() {
  // debugger;
  custom = parseInt($focusTimeInput.val());
  if (custom > 0) { return custom; }
  else { return 25;}
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function initiateNextTimer() {
  // debugger;
  if (Pomodoro.pomodoros[0].session === 'work') {
    Pomodoro.createRestTimer(setCustomBreak());
    Pomodoro.pomodoros[0].start();
    Pomodoro.pomodoros[0].changeStateToRunning();
    Pomodoro.pomodoros[0].end();
    var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
    Pomodoro.pomodoros[0].remaining();
    showPauseButton();
    countDown(seconds, Pomodoro.pomodoros[0]);
  }
  if (Pomodoro.pomodoros[0].session === 'rest') {
    Pomodoro.createWorkTimer(setCustomFocus());
    Pomodoro.pomodoros[0].start();
    Pomodoro.pomodoros[0].changeStateToRunning();
    Pomodoro.pomodoros[0].end();
    var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
    Pomodoro.pomodoros[0].remaining();
    showPauseButton();
    countDown(seconds, Pomodoro.pomodoros[0]);
  }
}

function countDown(seconds, time){
  if (time.state === 'running') {
    displayClock(seconds, time);
    finalCountDown();
    var remaining = (time.remaining() / 1000);
    if(!time.isExpired()) {
      setTimeout(countDown, 1000, remaining, time);
    }
  }
}

var timer =  new Timer();

showStartButton();

$startButton.on('click', function() {
  Pomodoro.createWorkTimer(setCustomFocus());
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].changeStateToRunning();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  showPauseButton();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

$pauseButton.on('click', function() {
  Pomodoro.pomodoros[0].changeStateToPaused();
  showResumeButton();
  Pomodoro.save();
});


$resumeButton.on('click', function() {
  showPauseButton();
  Pomodoro.get();
  Pomodoro.pomodoros[0].resumeRemaining();
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].changeStateToRunning();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].timeRemaining / 1000;
  Pomodoro.pomodoros[0].remaining();
  Pomodoro.save();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

// $focusTimeSubmit.on('click', function(){
//   setCustomFocus();

  // Pomodoro.createWorkTimer(setCustomFocus());
  // console.log(setCustomFocus());

// });

// $breakTimeSubmit.on('click', function(){
//   setCustomBreak();
  // Pomodoro.createRestTimer(setCustomBreak());
  // console.log(setCustomFocus());

// });

// Pomodoro.createWorkTimer(setCustomFocus());

// $breakTimeInput.on('keyup', function(){
//   checkBreakSubmitButtonStatus();
// });
//
// $focusTimeInput.on('keyup', function(){
//   checkFocusSubmitButtonStatus();
// });

$breakTimeInput.on('click', function(){
  checkBreakSubmitButtonStatus();
});

$focusTimeInput.on('click', function(){
  checkFocusSubmitButtonStatus();
});



// $('#audio').on('click', function() {
//   let intervalTime = new Audio('/sounds/interval-time.wav');
//   intervalTime.play();
// });

//
// $focusTimeInput.on('change', function() {
//   checkFocusSubmitButtonStatus();
//   setNextWorkTime();
// });
//
// $breakTimeInput.on('change', function() {
//   checkBreakSubmitButtonStatus();
// });
