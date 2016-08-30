
const Timer = require('./timer');

var pomodorosLength = 8;
var workCount = 0;

const Pomodoro = {
  pomodoros: [],

  // add: function() {
  //   this.pomodoros.unshift(new Timer());
  // },

  clean: function() {
    this.pomodoros = this.pomodoros.slice(0, pomodorosLength);
  },

  longBreak: function() {
    for (var i = 0; i < this.pomodoros.length; i++) {
      if (this.pomodoros[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  save: function() {
    localStorage.setItem('pomodoros', JSON.stringify(this));
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

  createCustomWorkTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration, 'work'));
  },

  createCustomRestTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration,'rest'));
  },

  createLongRestTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration * 3, 'rest'));
  },
};

module.exports = Pomodoro;
