const assert = require('chai').assert;
const Timer = require('../lib/timer');

describe('Timer', function() {

  var timer = new Timer();

  it('should be a function', function() {
    assert.isFunction(Timer);
  });

  it('should be able to set a duration', function() {

    var input = 1000;
    var output = timer.setDuration(input);
    // var timeNow = Date.now();
    assert.equal(output, 60000000);
  });

});
