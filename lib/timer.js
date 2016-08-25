'use strict';
var $ = require('jQuery');

// example: this.focusTimeStart = this.timeprop.setStartTime;

function Timer() {
  this.focusTimeStart = Date.now();
  this.focusTimeEnd = this.setEndTime();
  this.focusTimeDuration = this.checkTimeInput() || 1500000;
  this.timeLeft = this.setTimeLeft() || 1500000;
}

Timer.prototype.checkTimeInput = function(input) {
  if (input !== '') {
    this.setDuration(input);
    this.timeLeft = this.setDuration(input);
  }
};

Timer.prototype.setDuration = function(input){
  this.focusTimeDuration = input * 60 * 1000;
};

Timer.prototype.setEndTime = function() {
  this.focusTimeEnd = this.focusTimeStart + this.focusTimeDuration;
};

Timer.prototype.setTimeLeft = function() {
  this.timeLeft = this.focusTimeEnd - this.focusTimeStart;
};

// Timer.prototype.incrementTimeLeft = function() {
//   this.timeLeft--;
// };

Timer.prototype.checkTimeStop = function() {
  if(this.timeLeft === 0) { return 'time has stopped'; }
};

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
