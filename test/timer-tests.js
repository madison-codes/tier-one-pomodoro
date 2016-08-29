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

  context('instantiate timer', function(){
    // does this object need a value??

    var timer = new Timer({duration: 20});

    it('should be a function', function() {
      assert.isFunction(Timer);
    });

    it('should return null if there is not a given start time', function() {
      var returned = timer.end();
      assert.isNull(returned);
    });

    it('should have a start time equal to date.now', function() {
      var start = timer.start();
      var expected = Date.now();
      assert.equal(start, expected);
    });

    it('should return the end time if given a start time', function(){
      timer.start();
      var end = timer.end();
      var expected = Date.now() + timer.duration;
      assert.equal(end, expected);
    });
  });
  context('methods of timer', function(){
    var timer = new Timer(20);

    it('should return false if the timer start function has not been started', function(){
      var outcome = timer.hasStarted();
      assert.isFalse(outcome);
    });

    it('should return the start time if the start function has been called', function(){
      timer.start();
      var outcome = timer.hasStarted();
      assert.isTrue(outcome);
    });

    it('should return the remaining time, difference between the current time and the set end time', function() {
      var remaining = timer.remaining();
      var expected = timer.end() - Date.now();
      assert.equal(remaining, expected);
    });

    it('should return the elapsed time, difference between the current time and the start time', function() {
      var remaining = timer.elapsed();
      var expected = Date.now() - timer.start();
      assert.equal(remaining, expected);
    });
  });

  context('time expired', function() {
    var timer = new Timer(20);

    it('should return true if the time remaining is less than 0', function() {
      timer.remaining = () => -1;
      assert.isTrue(timer.expired());
    });

    it('should return false if the time remaining is greater than 0', function() {
      timer.remaining = () => 1;
      assert.isFalse(timer.expired());
    });
  });
});
