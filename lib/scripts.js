'use strict';

const $ = require('jQuery');
const Pomodoro = require('./pomodoro');

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

// function checkFocusSubmitButtonStatus() {
//   return $focusTimeSubmit.prop('disabled', !($focusTimeInput.val()));
// }
//
// function checkBreakSubmitButtonStatus() {
//   return $breakTimeSubmit.prop('disabled', !($breakTimeInput.val()));
// }

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

// function addBreakClass() {
//   $timerButton.addClass('break');
// }
//
// function removeBreakClass() {
//   $timerButton.removeClass('break');
// }

function finalCountDown() {
  var currentTimer = Pomodoro.pomodoros[0];
  let endSound = new Audio('/sounds/end-time.wav');
  let intervalSound = new Audio('/sounds/interval-time.wav');

  if (currentTimer.remaining() <= 20000) { $timerButton.addClass('final-seconds');}
  if (currentTimer.remaining() <= 20000 && currentTimer.timeRemaining % 5 === 0) {
    intervalSound.play();}
  if (currentTimer.isExpired()) {
    endSound.play();
    // initiateNextTimer();
  }
}

// var custom;

function setCustomBreak() {
  var customBreak = parseInt($breakTimeInput.val());
  if (customBreak > 0) { return customBreak; }
  else { return 5; }
}

function setCustomFocus() {
  var customFocus = parseInt($focusTimeInput.val());
  if (customFocus > 0) { return customFocus; }
  else { return 25;}
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function initiateNextTimer() {
  var seconds;
  var currentTimer = Pomodoro.pomodoros[0];

  if (currentTimer.session === 'work') {
    Pomodoro.createBreakTimer(setCustomBreak());
    // addBreakClass();
    currentTimer.start();
    currentTimer.changeStateToRunning();
    currentTimer.end();
    seconds = currentTimer.remaining() / 1000;
    currentTimer.remaining();
    showPauseButton();
    countDown(seconds, currentTimer);
  }
  if (currentTimer.session === 'rest') {
    Pomodoro.createFocusTimer(setCustomFocus());
    // removeBreakClass();
    currentTimer.start();
    currentTimer.changeStateToRunning();
    currentTimer.end();
    seconds = currentTimer.remaining() / 1000;
    currentTimer.remaining();
    showPauseButton();
    countDown(seconds, currentTimer);
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

showStartButton();

$startButton.on('click', function() {
  Pomodoro.createFocusTimer(setCustomFocus());
  var currentTimer = Pomodoro.pomodoros[0];
  currentTimer.start();
  currentTimer.changeStateToRunning();
  currentTimer.end();
  var seconds = currentTimer.remaining() / 1000;
  // currentTimer.remaining();
  showPauseButton();
  countDown(seconds, currentTimer);
  Pomodoro.save();
});

$pauseButton.on('click', function() {
  var currentTimer = Pomodoro.pomodoros[0];
  currentTimer.changeStateToPaused();
  showResumeButton();
  Pomodoro.save();
});

$resumeButton.on('click', function() {
  showPauseButton();
  Pomodoro.get();
  var currentTimer = Pomodoro.pomodoros[0];
  currentTimer.resumeRemaining();
  currentTimer.start();
  currentTimer.changeStateToRunning();
  // currentTimer.end();
  var seconds = currentTimer.timeRemaining / 1000;
  // currentTimer.remaining();
  Pomodoro.save();
  countDown(seconds, currentTimer);
});

$breakTimeInput.on('keyup', function(){
  // debugger;

  setCustomBreak();
});

$focusTimeInput.on('keyup', function(){
  setCustomFocus();
});
