
'use strict';

var $ = require('jQuery');
const Timer = require('./timer');
const Pomodoro = require('./pomodoro');

const $startButton = $('#start-button');
const $pauseButton = $('#pause-button');
const $focusTimeInput = $('#focus-time-input');
const $breakTimeInput = $('#break-time-input');
const $focusTimeSubmit = $('#set-focus-submit');
const $breakTimeSubmit = $('#set-break-submit');
const $displayCountDown = $('#display-count-down');

function disableStartButton() {
  $startButton.attr('disabled', true);
}

function enablePauseButton(){
  $pauseButton.attr('disabled', false);
}

function enableFocusSubmitButton() {
  $focusTimeSubmit.attr('disabled', false);
}

function disableFocusSubmitButton() {
  $focusTimeSubmit.prop('disabled', true);
}

function enableBreakSubmitButton() {
  $breakTimeSubmit.prop('disabled', false);
}

function disableBreakSubmitButton() {
  $breakTimeSubmit.prop('disabled', true);
}

function getFocusTimeValue() {
  var focusTime = $focusTimeInput.val();
  return focusTime;
}

function getBreakTimeValue() {
  return $breakTimeInput.val();
}

function checkFocusSubmitButtonStatus() {
  var focusTimeValue = getFocusTimeValue();
  if (focusTimeValue !== '') { enableFocusSubmitButton(); }
  if (focusTimeValue === '') { disableFocusSubmitButton(); }
}

function checkBreakSubmitButtonStatus() {
  var breakTimeValue = getBreakTimeValue();
  if(breakTimeValue !== '') { enableBreakSubmitButton(); }
  if(breakTimeValue === '') { disableBreakSubmitButton(); }
}

function displayTime(ms) {
  var millisecondsInAMinute = 60000;
  var min = Math.floor(ms / millisecondsInAMinute);
  var sec = Math.ceil(ms % millisecondsInAMinute/ 1000);
  if (sec < 10) { $displayCountDown.html(`${min}: 0${sec}`);}
  if (sec >= 10) { $displayCountDown.html(`${min}: ${sec}`); }
}

function displayClock(seconds, time) {
  var timeDisplay = time.changeSecondsToTime(seconds);
  $displayCountDown.html(timeDisplay);
}

// var timer = new Timer();

function countDown(seconds, time){
  // debugger;
  // ms = timer.timeRemaining;
  displayClock(seconds, time);
  var remaining = (time.remaining() / 1000);
  if(time.expired()){
    setTimeout(countDown, 1000, remaining, time);
  }
}

// function handleTime(){
//   // displayClock(seconds);
//   }
// }

// Countdown.countDown(Timer.focusTimeDuration,Timer.handleTime);

$startButton.on('click', function() {

  Pomodoro.createDefaultWorkTimer();
  Pomodoro.pomodoros[0].start();
  Pomodoro.pomodoros[0].end();
  var seconds = Pomodoro.pomodoros[0].remaining() / 1000;
  Pomodoro.pomodoros[0].remaining();
  // var time = getFocusTimeValue();
  disableStartButton();
  enablePauseButton();
  countDown(seconds, Pomodoro.pomodoros[0]);
  // displayClock(seconds);
  // displayTime(timeRemaining);
  // timer.setStartTimer();
  // timer.setEndTime();
  // timer.setDuration();
});

$focusTimeInput.on('change', function() {
  checkFocusSubmitButtonStatus();
});

$breakTimeInput.on('change', function() {
  checkBreakSubmitButtonStatus();
});


// $startButton.on('click', function() {
//
//   var time = getFocusTimeValue();
//   disableStartButton();
//   enablePauseButton();
//   countDown(time, handleTime);
//   // timer.setStartTimer();
//   // timer.setEndTime();
//   // timer.setDuration();
// });
//
// $focusTimeInput.on('change', function() {
//   checkFocusSubmitButtonStatus();
// });
//
// $breakTimeInput.on('change', function() {
//   checkBreakSubmitButtonStatus();
// });
