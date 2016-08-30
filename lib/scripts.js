
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


var timer =  new Timer();

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

showStartButton();

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

function finalCountDown() {
  let endTime = new Audio('/sounds/end-time.wav');
  let intervalTime = new Audio('/sounds/interval-time.wav');
  if (210000 > timer.remaining > 20000) {
    intervalTime.play();
    $timerButton.toggleClass('final-seconds'); }
  if (16000 > timer.remaining > 15000) { intervalTime.play(); }
  if (1100 > timer.remaining > 10000) { intervalTime.play(); }
  if (6000 > timer.remaining > 5000) { intervalTime.play(); }
  if (1000 > timer.remaining > 0) { endTime.play(); initiateNextTimer();}

}

function isValidInput(input) {
  return Number.isInteger(input) && input >= 0;
}

function setCustomBreak() {
  var custom = parseInt($breakTimeInput.val());
  if (isValidInput(custom)) { return custom; }
  else { alert('Please enter a valid rest time.');}
}

function setCustomFocus() {
  // debugger;

  var custom = parseInt($focusTimeInput.val());
  if (isValidInput(custom)) { return custom; }
  else { alert('Please enter a valid focus time.');}
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function initiateNextTimer() {
  if (Pomodoro.pomodoros[0].session === 'work') { Pomodoro.createRestTimer(setCustomBreak()); }
  if (Pomodoro.pomodoros[0].session === 'rest') { Pomodoro.createWorkTimer(setCustomFocus()); }
}

function countDown(seconds, time){
  if (time.state === 'running') {
    displayClock(seconds, time);
    noise();
    var remaining = (time.remaining() / 1000);
    if(time.expired()) {
      setTimeout(countDown, 1000, remaining, time);
    }
  }
}


$startButton.on('click', function() {
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].changeStateToRunning();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  showPauseButton();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

$pauseButton.on('click', function() {
  localStorage.clear();
  Pomodoro.pomodoros[0].changeStateToPaused();
  showResumeButton();
  Pomodoro.save();
  // pauseTimer();
});


$resumeButton.on('click', function() {
  // Pomodoro.createDefaultWorkTimer();
  // Pomodoro.pomodoros[0].start();
  showPauseButton();
  Pomodoro.get();
  Pomodoro.pomodoros[0].changeStateToRunning();
  // Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].timeRemaining / 1000;
  // Pomodoro.pomodoros[0].remaining();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

$focusTimeSubmit.on('click', function(){
  Pomodoro.createWorkTimer(setCustomFocus());
  $focusTimeInput.val('');
});

$breakTimeSubmit.on('click', function(){
  Pomodoro.createWorkTimer(setCustomBreak());
  $breakTimeInput.val('');
});

$breakTimeInput.on('keyup', function(){
  checkBreakSubmitButtonStatus();
});

$focusTimeInput.on('keyup', function(){
  checkFocusSubmitButtonStatus();
});


$focusTimeSubmit.on('click', function(){
  Pomodoro.createWorkTimer(setCustomFocus());
  $focusTimeInput.val('');
});

$breakTimeSubmit.on('click', function(){
  Pomodoro.createWorkTimer(setCustomBreak());
  $breakTimeInput.val('');
});

$breakTimeInput.on('keyup', function(){
  checkBreakSubmitButtonStatus();
});

$focusTimeInput.on('keyup', function(){
  checkFocusSubmitButtonStatus();
});

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
