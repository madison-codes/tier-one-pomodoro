'use strict';

// const Countdown = require('./countdown');


function Timer(startTime, duration) {
  // this.focusTimeStart = this.setStartTimer();
  this.focusTimeStart = Date.now();
  this.focusTimeEnd = this.setEndTime(startTime, duration);
  this.focusTimeDuration = this.checkTimeInput();
  // this.breakTimeDuration = breakTimeDuration || 300;
}

Timer.prototype.checkTimeInput = function(input) {
  if (input !== '') { this.setDuration(); }
  else { return 1500000; }
  // if (input === '') { this.setDefaultFocusDuration(); }
};

// Timer.prototype.setDefaultFocusDuration = function(){
//   // return duration = 1500000;
//   return 1500000;
// };

Timer.prototype.setDuration = function(input){
  // return duration = $focusTimeInput.val() * 60 * 1000;
  return input * 60 * 1000;

};

// t = new Timer(val, val2);
// t.setDuration($focusTimeInput.val())

// Timer.prototype.setStartTimer = function() {
//   var startTimeId = Date.now();
//   return startTimeId;
// };

Timer.prototype.setEndTime = function(duration) {
  // var endTimeId = startTimeId + duration;
  // return endTimeId;

  var endTime = this.focusTimeStart + duration;
  return endTime;

};

Timer.prototype.checkTimeStop = function(startTime, endTime) {
  // if (startTimeId)
  // if (startTimeId === endTimeId) { stopTime(); }
  // if(startTimeId !== endTimeId) { checkTimeStop(); }
};

Timer.prototype.stopTime = function() {

};

module.exports = Timer;
// ///////////////////////////////////////////////
// A default setting of 25 minutes of work followed by 5 minutes of break.
//
// The ability to set custom lengths of time for both work and breaks.
// If a custom length is set, it will stay at that new setting until it is set back to default.
// Countdown clock
// Visual indication of the time countdowns, including an indicator with more urgency/importance showing the final 20 second countdown.
