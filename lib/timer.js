'use strict';
//
// Timer.prototype.startTimer = function(duration, display) {
//   var timer = duration, minutes, seconds;
//   setInterval(function () {
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);
//
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
//
//     display.text(minutes + ':' + seconds);
//
//     if (--timer <0) {
//       timer = duration;
//     }
//   }, 1000);
// };
//
// Timer.prototype.startTimer
// Timer.prototype.displayTime = function(duration) {
//   var timeInterval = 60 * duration,
//     display = $('#display-count-down');
//   this.startTimer(timeInterval, display);
// };
//
// module.exports = Timer;
