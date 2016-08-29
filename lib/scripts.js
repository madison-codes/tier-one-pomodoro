
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
  var sec = Math.floor(ms % millisecondsInAMinute/ 1000);
  if (sec < 10) { $('#display-count-down').html(`${min}: 0${sec}`);}
  if (sec >= 10) { $('#display-count-down').html(`${min}: ${sec}`); }
}

var timer = new Timer();

function countDown(ms, callback){
  ms = timer.remaining();
  displayTime(ms);
  callback(ms);
}

function handleTime(ms){
  if(ms >= 0){
  setTimeout(countDown, 1, ms, handleTime);
  // displayTime(ms);
  }
}

// var timer = new Timer({});

// Countdown.countDown(Timer.focusTimeDuration,Timer.handleTime);

$startButton.on('click', function() {
  Pomodoro.createDefaultWorkTimer();
  debugger;
  Pomodoro.pomodoroArray[0].start();
  Pomodoro.pomodoroArray[0].remaining();
  // var time = getFocusTimeValue();
  disableStartButton();
  enablePauseButton();
  countDown(timer.remaining(), handleTime);
  displayTime(timer.remaining());
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
