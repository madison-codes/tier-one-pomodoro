const assert = require('chai').assert;
const Timer = require('../lib/timer');

describe('Timer', function() {

    beforeEach(function() {
      this.rightNow = Date.now();
      this.dateNow = Date.now;
      Date.now = () => this.rightNow;
    });

    afterEach(function() {
      Date.now = this.dateNow;
    });

  context('timer constructor', function(){

    var timer = new Timer(20);

    it('should be a function', function() {
      assert.isFunction(Timer);
    });

    it('should return null if .start is not called', function() {
      assert.isNull(timer.startTime);
    });

    it('should return null if .start is not called', function() {
      assert.isNull(timer.timeRemaining);
    });

    it('should return null if changeStatetoPaused is not called', function() {
      assert.isNull(timer.state);
    });

    it('should return null if changeSecondsToTime is not called', function() {
      assert.isNull(timer.state);
    });
  });

  context('timer methods', function(){
    var timer = new Timer();

    it('should return false if the timer has a startTime value', function(){
      assert.isFalse(timer.hasStarted());
    });

    it('should return true if the timer has a startTime value', function(){
      timer.start();
      assert.isTrue(timer.hasStarted());
    });

    it('should return .startTime if .start is called', function() {
      let time = Date.now();
      timer.start(time);
      assert.equal(timer.startTime, timer.start(time));
    });

    it.skip('should change .timeRemaining property of the timer', function() {
      // let time = Date.now();
      let expected = (timer.end() - timer.remaining());
      assert.equal(timer.remaining(), expected);
    });

    it('should have return a value equal to the the timer start time and timer duration', function() {
      timer.startTime = Date.now();
      timer.duration = 2;
      let expected = timer.startTime + timer.duration;
      assert.equal(timer.end(), expected);
    });

    it('should set timer.state property equal to the string paused', function(){
      timer.changeStateToPaused();
      assert.equal(timer.state, 'paused');
    });

    it('should set timer.state property equal to the string running', function(){
      timer.changeStateToRunning();
      assert.equal(timer.state, 'running');
    });

    it('should take in seconds and return the correct value in html elements', function(){
      let seconds = 65;
      let functionValue = timer.changeSecondsToTime(seconds);
      let expected = `${1}:0${5}`;
      assert.equal(functionValue, expected);
    });

    it('should take in seconds and return the correct value in html elements', function(){
      let seconds = 70;
      let functionValue = timer.changeSecondsToTime(seconds);
      let expected = `${1}:${10}`;
      assert.equal(functionValue, expected);
    });

    it('should return the remaining time, difference between the current time and the set end time', function() {
      timer.resumeRemaining();
      assert.equal(this.timeRemaining, timer.duration);
    });

    it('should return the elapsed time, difference between the current time and the start time', function() {
      var remaining = timer.elapsed();
      var expected = Date.now() - timer.start();
      assert.equal(remaining, expected);
    });

    it('should return true if the time remaining is less than 0', function() {
      timer.remaining = () => -1;
      assert.isTrue(timer.isExpired());
    });

    it('should return false if the time remaining is greater than 0', function() {
      timer.remaining = () => 1;
      assert.isFalse(timer.isExpired());
    });
  });
});
