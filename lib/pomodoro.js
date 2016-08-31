
const Timer = require('./timer');

var pomodorosLength = 8;
var workCount = 0;

const Pomodoro = {
  pomodoros: [],

  // add: function() {
  //   this.pomodoros.unshift(new Timer());
  // },

  clean: function() {
    this.pomodoros = this.pomodoros.slice(0, pomodoroLength);
  },

  longBreak: function() {
    for (var i = 0; i < this.pomodoros.length; i++) {
      if (this.pomodoros[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  save: function() {
    localStorage.setItem('pomodoros', JSON.stringify(this.pomodoros));
  },

  get: function(){
    return JSON.parse(localStorage.getItem('pomodoros'));
  },

  createDefaultWorkTimer: function() {
    this.pomodoros.unshift(new Timer(25, 'work'));
  },

  createDefaultRestTimer: function() {
    this.pomodoros.unshift(new Timer(5, 'rest'));
  },

  createWorkTimer: function(duration) {
    if (arguments) { duration = arguments[0]; }
    else { duration = 25; }
    this.pomodoros.unshift(new Timer(duration, 'work'));
  },

  createRestTimer: function(duration) {
    if (arguments) { duration = arguments[0]; }
    else { duration = 5; }
    this.pomodoros.unshift(new Timer(duration,'rest'));
  },

  createLongRestTimer: function(duration) {
    if (arguments) { duration = arguments[0]; }
    else { duration = 5; }
    this.pomodoros.unshift(new Timer(duration * 3, 'rest'));
  },

};

module.exports = Pomodoro;
