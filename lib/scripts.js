
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

var timer =  new Timer();

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
  // debugger;
  displayClock(seconds, time);
  timer.noise();
  var remaining = (time.remaining() / 1000);
  if(time.expired()) {
    setTimeout(countDown, 1000, remaining, time);
  }
}

// function setNextWorkTime() {
//   if (!!($focusTimeInput.val())) { Pomodoro.createCustomWorkTimer(parseInt($focusTimeInput.val()));}
//   else { Pomodoro.createDefaultWorkTimer();}
// }

// $focusTimeInput.val();

$startButton.on('click', function() {
  Pomodoro.createDefaultWorkTimer();
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  showPauseButton();
  countDown(seconds, Pomodoro.pomodoros[0]);
});

$pauseButton.on('click', function() {
  showStartButton();
});

// $('#audio').on('click', function() {
//   let endTime = new Audio('/sounds/end-time.wav');
//   endTime.play();
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
