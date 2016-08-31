'use strict';
var $ = require('jQuery');

function Timer(duration, session) {
  this.duration = duration * 60000;
  this.timeRemaining = null;
  this.startTime = null;
  this.session = session;
  this.state = null;
}
//
// Timer.prototype.isWorkSession = function () {
//   return this.session === 'work';
// };

Timer.prototype.start = function(time = Date.now()) {
  this.startTime = time;
  return this.startTime;
};

Timer.prototype.end = function() {
  if(!this.startTime) { return null; }
  return this.startTime + this.duration;
};

Timer.prototype.changeStateToPaused = function() {
    this.state = 'paused';
};

Timer.prototype.changeStateToRunning = function() {
    this.state = 'running';
};

Timer.prototype.changeSecondsToTime = function(seconds) {
  var leftOverSeconds = Math.floor(seconds % 60);
  var minutes = Math.floor(seconds / 60);
  if (leftOverSeconds < 10) {
    return `${minutes}:0${leftOverSeconds}`;
  } else {
    return `${minutes}:${leftOverSeconds}`;
  }
};

Timer.prototype.hasStarted = function() {
  return !!this.startTime;
};

Timer.prototype.remaining = function() {
  this.timeRemaining = this.end() - Date.now();
  return this.timeRemaining;
};

Timer.prototype.resumeRemaining = function() {
  this.duration = this.timeRemaining;
};

Timer.prototype.elapsed = function() {
  return Date.now() - this.start();
};

Timer.prototype.isExpired = function() {
  return this.remaining() <= 0;
};


// Timer.prototype.save = function() {
//   localStorage.setItem('timer', JSON.stringify(this));
//
// };
//
// Timer.prototype.get = function(){
//   return JSON.parse(localStorage.getItem('timer'));
// };

module.exports = Timer;

// ///////////////////////////////////////////////
// A default setting of 25 minutes of work followed by 5 minutes of break.

// The ability to set custom lengths of time for both work and breaks.

// If a custom length is set, it will stay at that new setting until it is set back to default.

// Countdown clock

// Visual indication of the time countdowns, including an indicator with more urgency/importance showing the final 20 second countdown.
