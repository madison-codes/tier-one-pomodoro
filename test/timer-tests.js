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

  // it('should calculate and end time if using the default start time', function() {
  //   var input = '';
  //   var output = timer.setEndTime(input);
  //   assert.equal(output, 1500000);
  //
  // });


});
