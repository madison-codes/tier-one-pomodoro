
'use strict';

var $ = require('jQuery');
const Timer = require('./timer');

const $startButton = $('#start-button');
const $pauseButton = $('#pause-button');
const $focusTimeInput = $('#focus-time-input');
const $breakTimeInput = $('#break-time-input');
const $focusTimeSubmit = $('#set-focus-submit');
const $breakTimeSubmit = $('#set-break-submit');


var timer = new Timer({});

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



$focusTimeInput.on('keyup', function() {
  checkFocusSubmitButtonStatus();
});

$breakTimeInput.on('keyup', function() {
  checkBreakSubmitButtonStatus();
});


function countDown(seconds, callback){
  seconds = timer.timeLeft;
  $('#display-count-down').html(seconds);
  timer.timeLeft--;
  callback(seconds);
}

function handleTime(seconds){
  if(seconds >= 0){
  setTimeout(countDown, 1, seconds, handleTime);
  // seconds --;
  console.log(timer.timeLeft, 'is working');
  }
}


// Countdown.countDown(Timer.focusTimeDuration,Timer.handleTime);

$startButton.on('click', function() {
  var time = getFocusTimeValue();
  disableStartButton();
  enablePauseButton();
  countDown(time, handleTime);
  // timer.setStartTimer();
  // timer.setEndTime();
  // timer.setDuration();
});
