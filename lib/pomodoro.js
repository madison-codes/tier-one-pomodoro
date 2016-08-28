
const Timer = require('./timer');

var pomodoroLength = 8;
// needs to be called on page load

const Pomodoro = {
  pomodoroArray: [],

  add: function() {
    this.pomodoroArray.push(new Timer());
  },

  clean: function() {
    var array = this.pomodoroArray;
    if (array.length > pomodoroLength) {
      array.shift(array[0]);
      this.clean();
    }
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
    this.add(duration, 'rest');
  },
};
  // nextType: function() {
  //   var array = this.pomodoroArray;
  //   var last = array.length - 1;
  //   if (array[last].session === 'work') { return 'rest';}
  //   if (array[last].session === 'rest') { return 'work';}
  // },
  //
  // defaultDuration: function() {
  //   var array = this.pomodoroArray;
  //   var last = array.length - 1;
  //   if (array[last].session === 'work') { return array.duration(25 * 60000);}
  //   if (array[last].session === 'rest') { return array.duration(5 * 60000);}
  // },


//
//   TimerRoom.prototype.longBreak = function() {
//     for (var i = 0; i < timerRoom.length; i++) {
//       if (this[i].type = work) {return rest * 3; }
//     }
//   };


module.exports = Pomodoro;
