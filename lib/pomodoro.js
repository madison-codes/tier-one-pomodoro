const Timer = require('./timer');

let pomodorosLength = 8;
let workCount = 0;

const Pomodoro = {
  pomodoros: [],

  clean: () =>  {
    this.pomodoros = this.pomodoros.slice(0, pomodorosLength);
  },

  longBreak: () =>  {
    for (let i = 0; i < this.pomodoros.length; i++) {
      if (this.pomodoros[i].session === 'work') { workCount++; }
    }
    return (workCount % 4 === 0);
  },

  createBreakTimer: function (duration) {
    this.pomodoros.unshift(new Timer(duration,'rest'));
  },

  createFocusTimer: function (duration) {
    this.pomodoros.unshift(new Timer(duration, 'work'));
  },

  createLongBreakTimer: function (duration) {
    this.pomodoros.unshift(new Timer(duration * 3, 'rest'));
  },

  save: () => {
    localStorage.setItem('pomodoros', JSON.stringify(this.pomodoros));
  },

  get: () => {
    return JSON.parse(localStorage.getItem('pomodoros'));
  },
};

module.exports = Pomodoro;
