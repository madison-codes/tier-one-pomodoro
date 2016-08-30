const assert = require('chai').assert;
const Pomodoro = require('../lib/pomodoro');
const Timer = require('../lib/timer');

describe('Pomodoro', function() {
  var array = Pomodoro.pomodoroArray;

  beforeEach(function() {
    Pomodoro.pomodoroArray = [new Timer()];
  });

  afterEach(function() {
    Pomodoro.pomodoroArray = [];
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
  });

  context('pomoduroArray', function(){
      // array.push(new Timer(25, 'work'));

    it('should add a new timer to pomodoro array', function() {
      Pomodoro.add(5, 'rest');
      assert.equal(array.length, 2);
    });

    it('should maintain 8 objects within the pomodoro array', function() {
      while(Pomodoro.pomodoros.length < 9) { Pomodoro.add(5, 'rest'); }
      Pomodoro.clean();
      assert.equal(array.length, 8);
    });
  });

  context('long rest object', function(){

    it('should return false if workcount is not 4', function(){
      Pomodoro.createDefaultWorkTimer();
      assert.isFalse(Pomodoro.longBreak());
    });

    it('return true if workcount is 4', function(){
      Pomodoro.createDefaultWorkTimer();
      Pomodoro.createDefaultWorkTimer();
      Pomodoro.createDefaultWorkTimer();
      assert.isTrue(Pomodoro.longBreak());
    });
  });

  context('default work object', function(){

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
