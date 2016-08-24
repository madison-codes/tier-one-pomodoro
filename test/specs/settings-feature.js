'use strict';
const assert = require('assert');

describe('settings options', function() {
  browser.url('/');

  it('should have an input for setting pomodoro time', function() {
    browser.click('#settings-link');
    var pomodoroTimeInput = browser.element('#focus-time-input');
    assert(pomodoroTimeInput.isExisting(''));
  });

  // it('should have an input for setting break time', function() {
  //
  // });
  //
  // it('should register the value of the input for setting pomodoro time', function() {
  //
  // });
  //
  // it('should register the value of the input for setting pomodoro time', function() {
  //
  // });
});
