'use strict';

const $ = require('jQuery');
const Pomodoro = require('./pomodoro');

const $startButton = $('.start-button');
const $pauseButton = $('.pause-button');
const $settingMenuButton = $('.settings-link');
const $settingNav = $('#setting-menu');
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

// function addBreakClass() {
//   $timerButton.addClass('break');
// }
//
// function removeBreakClass() {
//   $timerButton.removeClass('break');
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

var customBreak;
var customFocus;

function setCustomBreak() {
  customBreak = parseInt($breakTimeInput.val());
  if (customBreak > 0) { return customBreak; }
  else { return 5; }
}

function setCustomFocus() {
  customFocus = parseInt($focusTimeInput.val());
  if (customFocus > 0) { return customFocus; }
  else { return 25;}
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function initiateNextTimer() {
  var seconds;
  if (Pomodoro.pomodoros[0].session === 'work') {
    Pomodoro.createBreakTimer(setCustomBreak());
    // addBreakClass();
    Pomodoro.pomodoros[0].start();
    Pomodoro.pomodoros[0].changeStateToRunning();
    Pomodoro.pomodoros[0].end();
    seconds = Pomodoro.pomodoros[0].remaining() / 1000;
    Pomodoro.pomodoros[0].remaining();
    showPauseButton();
    countDown(seconds, Pomodoro.pomodoros[0]);
  }
  if (Pomodoro.pomodoros[0].session === 'rest') {
    Pomodoro.createFocusTimer(setCustomFocus());
    // removeBreakClass();
    Pomodoro.pomodoros[0].start();
    Pomodoro.pomodoros[0].changeStateToRunning();
    Pomodoro.pomodoros[0].end();
    seconds = Pomodoro.pomodoros[0].remaining() / 1000;
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

showStartButton();

$startButton.on('click', function() {
  Pomodoro.createFocusTimer(setCustomFocus());
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].changeStateToRunning();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  showPauseButton();
  countDown(seconds, Pomodoro.pomodoros[0]);
  Pomodoro.save();
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

$breakTimeInput.on('click', function(){
  checkBreakSubmitButtonStatus();
});

$focusTimeInput.on('click', function(){
  checkFocusSubmitButtonStatus();
});

$settingMenuButton.on('click', function(){
  $settingNav.slideDown();
  $settingMenuButton.hide();
});

$settingNav.on('mouseleave', function(){
  $settingNav.slideUp();
  $settingMenuButton.show();
});
