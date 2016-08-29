
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
const $displayCountDown = $('#display-count-down');

// function disableStartButton() {
//   $startButton.prop('disabled', true);
// }

// function enablePauseButton(){
//   $pauseButton.prop('disabled', false);
// }

function showPauseButton() {
  $startButton.hide();
  $pauseButton.show();
}

function showStartButton() {
  $startButton.show();
  $pauseButton.hide();
}

function checkFocusSubmitButtonStatus() {
  return $focusTimeSubmit.prop('disabled', !!($focusTimeInput.val()));
}

function checkBreakSubmitButtonStatus() {
  return $breakTimeSubmit.prop('disabled', !!($breakTimeInput.val()));
}

// function displayTime(ms) {
//   var millisecondsInAMinute = 60000;
//   var min = Math.floor(ms / millisecondsInAMinute);
//   var sec = Math.floor(ms % millisecondsInAMinute/ 1000);
//   if (sec < 10) { $('#display-count-down').html(`${min}: 0${sec}`);}
//   if (sec >= 10) { $('#display-count-down').html(`${min}: ${sec}`); }
// }

// function convertToMs(mins) {
//   var ms = mins * 60000;
//   return ms;
// }

function renderTimer(time) {
  // time = convertToMs(time);
  $displayCountDown.html(`${moment(time).format('mm:ss')}`);
}

// var timer = new Timer();

function countDown(ms , callback){
  // var targetIndex = Pomodoro.pomodoroArray.length - 1;
  // renderTimer(Pomodoro.pomodoroArray[targetIndex].remaining());
  // callback(Pomodoro.pomodoroArray[targetIndex].remaining());
  renderTimer(Timer.remaining());
  callback(ms);
}

function handleTime(ms){
  if(ms >= 0){
  setTimeout(countDown, 1, ms, handleTime);
  // displayTime(ms);
  renderTimer(ms);

  }
}

Pomodoro.createDefaultWorkTimer();

$startButton.on('click', function() {
  console.log('working!!');
  // debugger;
  showPauseButton();
  // Pomodoro.pomodoroArray[0].start();
  // Pomodoro.pomodoroArray[0].remaining();

  // countDown(ms, handleTime);
  // var time = getFocusTimeValue();

  // displayTime(timer.remaining());
  // timer.setStartTimer();
  // timer.setEndTime();
  // timer.setDuration();
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
