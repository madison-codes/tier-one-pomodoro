
const Timer = require('./timer');

var $ = require('jQuery');
var pomodorosLength = 8;
var workCount = 0;
var $timerButton = $('.timer-button');

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
    localStorage.setItem('pomodoros', JSON.stringify(this.pomodoros));
  },

  get: function(){
    return JSON.parse(localStorage.getItem('pomodoros'));
  },

  createFocusTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration, 'work'));
  },

  createBreakTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration,'rest'));
    $timerButton.toggleClass('break');
  },

  createLongBreakTimer: function(duration) {
    this.pomodoros.unshift(new Timer(duration * 3, 'rest'));
  },

};

module.exports = Pomodoro;
