// 'use strict';
//
// const Countdown = require('./countdown');
//
// function Timer(){
//   this.focusTimeStart = this.setStartTimer();
//   this.focusTimeEnd = this.endTimer();
//   this.focusTimeDuration = this.checkFocusTimeInput();
//   // this.breakTimeDuration = breakTimeDuration || 300;
// }
//
// Timer.prototype.checkFocusTimeInput = function() {
//   if ($focusTimeInput.val() !== '') { this.setDuration(); }
//   if ($focusTimeInput.val() === '') { this.setDefaultFocusDuration(); }
// };
//
// Timer.prototype.setDefaultFocusDuration = function(){
//   return duration = 1500000;
// };
//
// Timer.prototype.setDuration = function(){
//   return duration = $focusTimeInput.val() * 60 * 1000;
// };
//
// Timer.prototype.setStartTimer = function() {
//   var startTimeId = Date.now();
//   return startTimeId;
// };
//
// Timer.prototype.setEndTime = function(startTimeId, duration) {
//   var endTime =
// }
// ///////////////////////////////////////////////
// A default setting of 25 minutes of work followed by 5 minutes of break.
//
// The ability to set custom lengths of time for both work and breaks.
// If a custom length is set, it will stay at that new setting until it is set back to default.
// Countdown clock
// Visual indication of the time countdowns, including an indicator with more urgency/importance showing the final 20 second countdown.
