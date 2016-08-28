'use strict';
var $ = require('jQuery');

// example: this.focusTimeStart = this.timeprop.setStartTime;

function Timer(duration) {
  this.duration = duration || 25 * 60 * 1000;
  this.origionalDuration = duration;
  this.startTime = null;
}

Timer.prototype.start = function(time = Date.now()) {
  this.startTime = time;
  return this.startTime;
};

Timer.prototype.end = function() {
  if(!this.startTime) { return null; }
  return this.startTime + this.duration;
};

Timer.prototype.hasBeenStarted = function() {
  return !!this.startTime;
};

//
// Timer.prototype.setState = function(){
//   return !!this.focusTimeStart;
// };
//
// Timer.prototype.checkTimeInput = function(input) {
//   if (input !== '') {
//     this.setDuration(input);
//     this.timeLeft = this.setDuration(input);
//   }
// };
//
// Timer.prototype.setDuration = function(input){
//   this.focusTimeDuration = input * 60 * 1000;
// };
//
// Timer.prototype.timeRemaining() {
//   return this.focusTimeEnd - Date.now();
// }
//
// Timer.prototype.timeElapsed() {
//   return Date.now() - this.focusTimeStart;
// }
//
// Timer.prototype.setEndTime = function() {
//   if (!this.setStartTime) { return null; }
//   this.focusTimeEnd = this.focusTimeStart + this.focusTimeDuration;
//   return this.focusTimeEnd;
// };
//
// Timer.prototype.setTimeLeft = function() {
//   this.timeLeft = this.focusTimeEnd - this.focusTimeStart;
// };
//
// Timer.prototype.incrementTimeLeft = function() {
//   this.timeLeft--;
// };
//
// Timer.prototype.checkTimeStop = function() {
//   if(this.timeLeft === 0) { return 'time has stopped'; }
// };



// Timer.prototype.stopTime = function() {
//   return 'time has stopped';
// };

module.exports = Timer;

// ///////////////////////////////////////////////
// A default setting of 25 minutes of work followed by 5 minutes of break.
//
// The ability to set custom lengths of time for both work and breaks.
// If a custom length is set, it will stay at that new setting until it is set back to default.
// Countdown clock
// Visual indication of the time countdowns, including an indicator with more urgency/importance showing the final 20 second countdown.
