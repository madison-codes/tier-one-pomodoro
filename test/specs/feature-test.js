'use strict';
const assert = require('assert');

describe('Welcome page, button functionality', function(){
    browser.url('/');
  it('should be able to grab the page title', function(){
  	var title = browser.getTitle();
  	assert.equal(title, 'Pomodoro');
  });

  it('should have a pragraph tag to display the remaining countdown time', function() {
    var timer = browser.element('#display-count-down');
    assert(timer.isExisting(''));
  });

  it('start button should be enabled on game start', function() {
    var buttonStatus = browser.isEnabled('#start-button');
    assert.equal(buttonStatus, true);
  });

  it('pause button should be disabled on game start', function() {
    var buttonStatus = browser.isEnabled('#pause-button');
    assert.equal(buttonStatus, false);
  });

  it('start button should be disabled on click of start button', function() {
    browser.click('#start-button');
    var buttonStatus = browser.isEnabled('#start-button');
    assert.equal(buttonStatus, false);
  });

  it('pause button enabled on click of start button', function() {
    browser.click('#start-button');
    var buttonStatus = browser.isEnabled('#pause-button');
    assert.equal(buttonStatus, true);
  });
});

// A default setting of 25 minutes of work followed by 5 minutes of break.
// The ability to set custom lengths of time for both work and breaks.
// If a custom length is set, it will stay at that new setting until it is set back to default.
// A countdown alert that pings every 5 seconds for the final 20 seconds of both work and break, ending in an alert sound to signal the time has run out.
// Visual indication of the time countdowns, including an indicator with more urgency/importance showing the final 20 second countdown.
