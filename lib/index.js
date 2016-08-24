'use strict';
var $ = require('jQuery');

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
  $focusTimeSubmit.attr('disabled', true);
}

function enableBreakSubmitButton() {
  $breakTimeSubmit.attr('disabled', false);
}

function getFocusTimeValue() {
  return $focusTimeInput.val();
}

function checkFocusSubmitButtonStatus() {
  var focusTimeValue = getFocusTimeValue();
  if (focusTimeValue !== '') { enableFocusSubmitButton(); }
  if (focusTimeValue === '') { disableFocusSubmitButton(); }
}

$startButton.on('click', function() {
  disableStartButton();
  enablePauseButton();
});

$focusTimeInput.on('keyup', function() {
  checkFocusSubmitButtonStatus();
});
