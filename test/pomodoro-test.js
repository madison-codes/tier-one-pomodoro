const assert = require('chai').assert;
const Pomodoro = require('../lib/pomodoro');
const Timer = require('../lib/timer');

describe('Pomodoro', function() {

  context('instantiate timer within TimerRoom array', function(){

    it('should be an object', function() {
      assert.isObject(Pomodoro);
    });

    it('should have an array called pomodoroArray', function() {
      assert.isArray(Pomodoro.pomodoroArray);
    });

    it('should have a variable that sets array length to 2', function() {
      var pomodoroLength = 2;
      assert.equal(pomodoroLength, 2);
    });

    it('should have a variable that sets array length to 2', function() {
      var pomodoroLength = 2;
      assert.equal(pomodoroLength, 2);
    });
  });

  context('pomoduroArray', function(){
      var array = Pomodoro.pomodoroArray;
      array.push(new Timer(25, 'work'));

    it('should add a new timer to pomodoro array', function() {
      Pomodoro.add(5, 'rest');
      assert.equal(array.length, 2);
    });

    it('should maintain 8 objects within the pomodoro array', function() {
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.add(5, 'rest');
      Pomodoro.clean();
      assert.equal(array.length, 8);
    });
  });
});

describe('Add timer', function() {
  var array1 = Pomodoro.pomodoroArray;
  context('createDefaultWorkTimer', function(){
    it('should create a new object', function(){
      Pomodoro.createDefaultWorkTimer();
      assert.equal(array1.length,1);
    });
  });
});

//
// it('should set the new timer work duration to the default duration', function() {
//   var last = array.length - 1;
//   Pomodoro.add('work');
//   assert.equal(array[last].duration, 25 * 60000);
// });
//
// it('should set the new timer rest duration to the default duration', function() {
//   var last = array.length - 1;
//   Pomodoro.add('rest');
//   assert.equal(array[last].duration, 5 * 60000);
// });
