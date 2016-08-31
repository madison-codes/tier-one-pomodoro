const Timer = require('./timer');

var pomodorosLength = 8;
var workCount = 0;

const Pomodoro = {
  pomodoros: [],

  clean: function() {
    this.pomodoros = this.pomodoros.slice(0, pomodorosLength);
  },

  longBreak: function() {
    for (var i = 0; i < this.pomodoros.length; i++) {
      if (this.pomodoros[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  createBreakTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration,'rest'));
  },

  createFocusTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration, 'work'));
  },

  createLongBreakTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration * 3, 'rest'));
  },

  save: function() {
    localStorage.setItem('pomodoros', JSON.stringify(this.pomodoros));
  },

  get: function(){
    return JSON.parse(localStorage.getItem('pomodoros'));
  },
};

module.exports = Pomodoro;
