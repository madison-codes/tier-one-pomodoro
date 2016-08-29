
const Timer = require('./timer');

var pomodoroLength = 8;
var workCount = 0;

const Pomodoro = {
  pomodoroArray: [],

  add: function() {
    this.pomodoroArray.push(new Timer());
  },

  clean: function() {
    if (this.pomodoroArray.length > pomodoroLength) {
      this.pomodoroArray.shift(this.pomodoroArray[0]);
      this.clean();
    }
  },

  longBreak: function() {
    for (var i = 0; i < this.pomodoroArray.length; i++) {
      if (this.pomodoroArray[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  createDefaultWorkTimer: function() {
    this.pomodoroArray.push(new Timer(1500000, 'work'));
  },

  createDefaultRestTimer: function() {
    this.pomodoroArray.push(new Timer(300000, 'rest'));
  },

  createCustomWorkTimer: function(duration) {
    this.pomodoroArray.push(new Timer(duration, 'work'));
  },

  createCustomRestTimer: function(duration) {
    this.pomodoroArray.push(new Timer(duration,'rest'));
  },

  createLongRestTimer: function(duration) {
    this.pomodoroArray.push(new Timer(duration * 3, 'rest'));
  },
};

module.exports = Pomodoro;
