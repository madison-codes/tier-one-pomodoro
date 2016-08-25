
'use strict';

var $ = require('jQuery');
const Timer = require('./timer');

const $startButton = $('#start-button');
const $pauseButton = $('#pause-button');
const $focusTimeInput = $('#focus-time-input');
const $breakTimeInput = $('#break-time-input');
const $focusTimeSubmit = $('#set-focus-submit');
const $breakTimeSubmit = $('#set-break-submit');

// var timer = new Timer();

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
  return $focusTimeInput.val();
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

$startButton.on('click', function() {
  disableStartButton();
  enablePauseButton();
});

$focusTimeInput.on('keyup', function() {
  checkFocusSubmitButtonStatus();
});

$breakTimeInput.on('keyup', function() {
  checkBreakSubmitButtonStatus();
});

function countDown(seconds, callback){
  $('#display-count-down').html(seconds);
  seconds--;
  callback(seconds);
}

function handleTime(seconds){
  if(seconds >= 0){
  setTimeout(countDown, 1000, seconds, handleTime);
  Timer.timeLeft --;
  console.log(Timer.timeLeft, 'is working');
  }
}

countDown(10,handleTime);


// Countdown.countDown(Timer.focusTimeDuration,Timer.handleTime);
