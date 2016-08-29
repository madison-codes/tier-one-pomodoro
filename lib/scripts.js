
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

function showPauseButton() {
  $startButton.hide();
  $pauseButton.show();
}

function showStartButton() {
  $startButton.show();
  $pauseButton.hide();
}

showStartButton();

function checkFocusSubmitButtonStatus() {
  return $focusTimeSubmit.prop('disabled', !!($focusTimeInput.val()));
}

function checkBreakSubmitButtonStatus() {
  return $breakTimeSubmit.prop('disabled', !!($breakTimeInput.val()));
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

function countDown(seconds, time){
  displayClock(seconds, time);
  var remaining = (time.remaining() / 1000);
  if(time.expired()) {
    setTimeout(countDown, 1000, remaining, time);
  }
}

$startButton.on('click', function() {
  Pomodoro.createDefaultWorkTimer();
  showPauseButton();
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

$pauseButton.on('click', function() {
  showStartButton();
});

$focusTimeInput.on('change', function() {
  checkFocusSubmitButtonStatus();
});

$breakTimeInput.on('change', function() {
  checkBreakSubmitButtonStatus();
});
