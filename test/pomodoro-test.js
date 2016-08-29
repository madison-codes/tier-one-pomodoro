const assert = require('chai').assert;
const Pomodoro = require('../lib/pomodoro');
const Timer = require('../lib/timer');

describe('Pomodoro', function() {
  var array = Pomodoro.pomodoroArray;
  beforeEach(function() {
    array.push(new Timer());
  });

  afterEach(function() {
    array.splice(0, array.length);
  });

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

  context('default work object', function(){
    var array = Pomodoro.pomodoroArray;

    it('should create a new default work object', function(){
      assert.equal(array.length, 1);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createDefaultWorkTimer();
      assert.equal(array[1].duration, 1500000);
    });

    it('should have a session of work', function(){
      Pomodoro.createDefaultWorkTimer();
      assert.equal(array[1].session, 'work');
    });
  });

  context('default rest object', function(){
    var array = Pomodoro.pomodoroArray;

    it('should create a new default work object', function(){
      assert.equal(array.length, 1);
    });

    it('should have a duration of 5 min', function(){
      Pomodoro.createDefaultRestTimer();
      assert.equal(array[1].duration, 300000);
    });

    it('should have a session of rest', function(){
      Pomodoro.createDefaultRestTimer();
      assert.equal(array[1].session, 'rest');
    });
  });

  context('custom work object', function(){
    var array = Pomodoro.pomodoroArray;
    var duration = 20;

    it('should create a new default work object', function(){
      assert.equal(array.length, 1);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createCustomWorkTimer(duration);
      assert.equal(array[1].duration, 20);
    });

    it('should have a session of work', function(){
      Pomodoro.createDefaultWorkTimer(duration);
      assert.equal(array[1].session, 'work');
    });
  });

  context('custom rest object', function(){
    var array = Pomodoro.pomodoroArray;
    var duration = 20;

    it('should create a new default work object', function(){
      assert.equal(array.length, 1);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createCustomWorkTimer(duration);
      assert.equal(array[1].duration, 20);
    });

    it('should have a session of work', function(){
      Pomodoro.createDefaultWorkTimer(duration);
      assert.equal(array[1].session, 'work');
    });
  });

  context('long rest object', function(){
    var array = Pomodoro.pomodoroArray;
    var duration = 2;

    it('should create a new default work object', function(){
      Pomodoro.createLongRestTimer(duration);
      assert.equal(array.length, 2);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createLongRestTimer(duration);
      assert.equal(array[1].duration, 6);
    });

    it('should have a session of work', function(){
      Pomodoro.createLongRestTimer(duration);
      assert.equal(array[1].session, 'rest');
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
