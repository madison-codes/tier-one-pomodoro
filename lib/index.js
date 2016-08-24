'use strict';
var $ = require('jQuery');
const $startButton = $('#start-button');
const $pauseButton = $('#pause-button');

function disableSendButton() {
  $startButton.attr('disabled', true);
}

function enablePauseButton(){
  $pauseButton.attr('disabled', false);
}
// 
// function disablePauseButton(){
//   $pauseButton.attr('disabled', true);
// }

$startButton.on('click', function() {
  disableSendButton();
  enablePauseButton();
});
