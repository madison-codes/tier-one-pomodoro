'use strict';
var $ = require('jQuery');

function Timer(duration, session) {
  this.duration = duration * 60000;
  this.startTime = null;
  this.timeRemaining = null;
  this.session = session;
  this.state = null;
}

Timer.prototype.hasStarted = function() {
  return !!this.startTime;
};

Timer.prototype.start = function(time = Date.now()) {
  this.startTime = time;
  return this.startTime;
};

Timer.prototype.remaining = function() {
  this.timeRemaining = this.end() - Date.now();
  return this.timeRemaining;
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

Timer.prototype.resumeRemaining = function() {
  this.duration = this.timeRemaining;
};

Timer.prototype.elapsed = function() {
  return Date.now() - this.start();
};

Timer.prototype.isExpired = function() {
  return this.remaining() <= 0;
};

module.exports = Timer;
