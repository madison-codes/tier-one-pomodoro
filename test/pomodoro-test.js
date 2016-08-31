const assert = require('chai').assert;
const Pomodoro = require('../lib/pomodoro');
const Timer = require('../lib/timer');

describe('Pomodoro', function() {

  context('instantiate Pomodoro Object and Array', function(){

    it('should be an object', function() {
      assert.isObject(Pomodoro);
    });

    it('should have an array called pomodoros', function() {
      assert.isArray(Pomodoro.pomodoros);
    });
  });

  context('Pomodoro methods', function(){

    it('should have a variable that sets array length', function() {
      var pomodoroLength = 2;
      assert.equal(pomodoroLength, 2);
    });

    it('should maintain pomodoro array length', function() {
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.pomodoros.unshift(new Timer(5, 'work'));
      Pomodoro.clean();
      assert.equal(Pomodoro.pomodoros.length, 8);
    });

    it('should return false if workcount is not 4', function(){
      Pomodoro.createFocusTimer();
      assert.isFalse(Pomodoro.longBreak());
    });

    it('return true if workcount is 4', function(){
      Pomodoro.createFocusTimer();
      Pomodoro.createFocusTimer();
      assert.isTrue(Pomodoro.longBreak());
    });
  });

  context('custom work object', function(){

    var duration = 25;

    it('should create a new default work object', function(){
      assert.equal(Pomodoro.pomodoros.length, 11);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createBreakTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].duration, 25 * 60000);
    });

    it('should have a session of rest', function(){
      Pomodoro.createBreakTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].session, 'rest');
    });
  });

  context('custom rest object', function(){

    var duration = 20;

    it('should create a new default work object', function(){
      assert.equal(Pomodoro.pomodoros.length, 13);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createFocusTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].duration, 20 * 60000);
    });

    it('should have a session of work', function(){
      Pomodoro.createFocusTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].session, 'work');
    });
  });

  context('long rest object', function(){
    var duration = 2;

    it('should create a new default work object', function(){
      Pomodoro.createLongBreakTimer(duration);
      assert.equal(Pomodoro.pomodoros.length, 16);
    });

    it('should have a duration of 25 min', function(){
      Pomodoro.createLongBreakTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].duration, 6 * 60000);
    });

    it('should have a session of work', function(){
      Pomodoro.createLongBreakTimer(duration);
      assert.equal(Pomodoro.pomodoros[0].session, 'rest');
    });
  });

  context('localStorage', function(){
    it('should save the timer in local storage with the key value pomodoros', function() {
      Pomodoro.save();
      var stored = JSON.parse(localStorage.getItem('pomodoros'));
      assert.equal(Pomodoro.pomodoros[0].duration, stored[0].duration);
    });

    it('should get the timer from local storage with the key value pomodoros', function() {
      Pomodoro.save();
      var stored = JSON.parse(localStorage.getItem('pomodoros'));
      assert.equal(Pomodoro.pomodoros[0].duration, stored[0].duration);
    });
  });

});
