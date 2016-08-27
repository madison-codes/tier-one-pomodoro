const assert = require('chai').assert;
const Timer = require('../lib/timer');

describe('Timer', function() {
  var timer = new Timer();

  it('should be a function', function() {
    assert.isFunction(Timer);
  });

  it('should check the time input and set a duration if there is no user input', function() {
    var input = '';
    timer.checkTimeInput(input);
    assert.equal(timer.focusTimeDuration, 1500000);
  });

  it('should be able to set a duration', function() {
    var input = 1000;
    timer.setDuration(input);
    assert.equal(timer.focusTimeDuration, 60000000);
  });

  it('should check the time input and set a duration based on user input', function() {
    var input = 5;
    timer.checkTimeInput(input);
    assert.equal(timer.focusTimeDuration, 300000);
  });

  it('should add both the start time and duration to determine the appropriate end time', function() {
    timer.focusTimeStart = 10;
    timer.focusTimeDuration = 10;
    timer.setEndTime();
    assert.equal(timer.focusTimeEnd, 20);
  });

  it('should return time end minus time start to keep track of how much time remains', function() {
    timer.focusTimeStart = 10;
    timer.focusTimeEnd = 20;
    timer.setTimeLeft();
    assert.equal(timer.timeLeft, 10);
  });

  it('should reduce time left by one', function() {
    timer.timeLeft = 5;
    timer.incrementTimeLeft();
    assert.equal(timer.timeLeft, 4);
  });

  it('should stop time if timeLeft equals zero', function() {
    timer.timeLeft = 0;
    var stopTime = timer.checkTimeStop();
    assert.equal(stopTime, 'time has stopped');
  });


});
