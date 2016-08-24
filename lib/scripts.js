const Timer = require('.timer');

var $startButton = $('#start-button');
var $pauseButton = $('#pause-button');
var $resumeButton = $ ('#resume-button');
var $displayCountDown = $('#display-timer');

var timer = new Timer();

// function makeTimerObject() {
//   return new Timer({
//     start: createStartTime(),
//     duration: duration || 25;
//   });
// }
// 
// function startTime() {
//   return Date.now();
// }
