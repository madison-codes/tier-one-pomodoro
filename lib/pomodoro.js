
const Timer = require('./timer');

var pomodoroLength = 8;
var workCount = 0;

const Pomodoro = {
  pomodoros: [],

  add: function() {
    this.pomodoros.unshift(new Timer());
  },

  clean: function() {
    this.pomodoros = this.pomodoros.slice(0, pomodorosLength);
  },

  longBreak: function() {
    for (var i = 0; i < this.pomodoros.length; i++) {
      if (this.pomodoros[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  createDefaultWorkTimer: function() {
    this.pomodoros.push(new Timer(1500000, 'work'));
  },

  createDefaultRestTimer: function() {
    this.pomodoros.push(new Timer(300000, 'rest'));
  },

  createCustomWorkTimer: function(duration) {
    this.pomodoros.push(new Timer(duration, 'work'));
  },

  createCustomRestTimer: function(duration) {
    this.pomodoros.push(new Timer(duration,'rest'));
  },

  createLongRestTimer: function(duration) {
    this.pomodoros.push(new Timer(duration * 3, 'rest'));
  },
};

module.exports = Pomodoro;
