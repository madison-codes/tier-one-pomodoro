'use strict';

const $ = require('jQuery');
const Pomodoro = require('./pomodoro');
const moment = require('moment');

const $startButton = $('.start-button');
const $pauseButton = $('.pause-button');
const $focusTimeInput = $('#focus-time-input');
const $breakTimeInput = $('#break-time-input');
const $displayCountDown = $('.display-count-down');
const $timerButton = $('.timer-button');
const $resumeButton = $('.resume-button');
const $month = $('#month');
const $day = $('#day');

function showCurrentDate () {
  $month.html(moment().format('MMM').toUpperCase());
  $day.html(moment().format('DD '));
}

function showPauseButton () {
  $resumeButton.hide();
  $startButton.hide();
  $pauseButton.show();
}

function showStartButton () {
  $resumeButton.hide();
  $pauseButton.hide();
  $startButton.show();
}

function showResumeButton () {
  $pauseButton.hide();
  $startButton.hide();
  $resumeButton.show();
}

function displayClock (seconds, time) {
  let timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function addBreakClass () {
  $timerButton.addClass('break');
}

function removeBreakClass () {
  $timerButton.removeClass('break');
}

function finalCountDown () {
  let currentTimer = Pomodoro.pomodoros[0];
  let endSound = new Audio('/sounds/end-time.wav');
  let intervalSound = new Audio('/sounds/interval-time.wav');

  if (currentTimer.remaining() <= 20000) {
    $timerButton.addClass('final-seconds');
  }
  if (currentTimer.remaining() <= 20000 && currentTimer.timeRemaining % 5 === 0) {
    intervalSound.play();}
  if (currentTimer.isExpired()) {
    endSound.play();
    initiateNextTimer();
  }
}

function setCustomBreak (breakTime) {
  let customBreak = parseInt($breakTimeInput.val());
  if (customBreak !== '' && customBreak > 0) { breakTime = customBreak; }
  else { breakTime = 5; }
  return breakTime;
}

function setCustomFocus (focusTime) {
  let customFocus = parseInt($focusTimeInput.val());
  if (customFocus !== '' && customFocus > 0) { focusTime = customFocus; }
  else { focusTime = 25; }
  return focusTime;
}

function initiateNextTimer () {
  let seconds;
  let currentTimer = Pomodoro.pomodoros[0];

  if (currentTimer.session === 'work' && currentTimer.isExpired()) {
    Pomodoro.createBreakTimer(setCustomBreak());
    currentTimer = Pomodoro.pomodoros[0];
    addBreakClass();
    currentTimer.start();
    currentTimer.changeStateToRunning();
    currentTimer.end();
    seconds = currentTimer.remaining() / 1000;
    currentTimer.remaining();
    showPauseButton();
    countDown(seconds, currentTimer);
    return;
  }
  if (currentTimer.session === 'rest' && currentTimer.isExpired()) {
    Pomodoro.createFocusTimer(setCustomFocus());
    currentTimer = Pomodoro.pomodoros[0];
    removeBreakClass();
    currentTimer.start();
    currentTimer.changeStateToRunning();
    currentTimer.end();
    seconds = currentTimer.remaining() / 1000;
    currentTimer.remaining();
    showPauseButton();
    countDown(seconds, currentTimer);
    return;
  }
}

function countDown (seconds, time){
  if (time.state === 'running') {
    displayClock(seconds, time);
    finalCountDown();
    let remaining = (time.remaining() / 1000);
    if(!time.isExpired()) {
      setTimeout(countDown, 1000, remaining, time);
    }
  }
}

showStartButton();
showCurrentDate();

$startButton.on('click', function () {
  Pomodoro.createFocusTimer(setCustomFocus());
  let currentTimer = Pomodoro.pomodoros[0];
  currentTimer.start();
  currentTimer.changeStateToRunning();
  currentTimer.end();
  let seconds = currentTimer.remaining() / 1000;
  showPauseButton();
  countDown(seconds, currentTimer);
  Pomodoro.save();
});

$pauseButton.on('click', function () {
  let currentTimer = Pomodoro.pomodoros[0];
  currentTimer.changeStateToPaused();
  showResumeButton();
  Pomodoro.save();
});

$resumeButton.on('click', function () {
  showPauseButton();
  Pomodoro.get();
  let currentTimer = Pomodoro.pomodoros[0];
  currentTimer.resumeRemaining();
  currentTimer.start();
  currentTimer.changeStateToRunning();
  let seconds = currentTimer.timeRemaining / 1000;
  Pomodoro.save();
  countDown(seconds, currentTimer);
});

$breakTimeInput.on('keyup', function () {
  setCustomBreak();
});

$focusTimeInput.on('keyup', function () {
  setCustomFocus();
});
