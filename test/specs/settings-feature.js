'use strict';
const assert = require('assert');

describe('settings options', function () {
  browser.url('/');

  it('should have an input for setting break time', function () {
    browser.click('#settings-link');
    var pomodoroTimeInput = browser.element('#focus-time-input');
    assert(pomodoroTimeInput.isExisting(''));
  });

  it('should have an input for setting break time', function () {
    var breakTimeInput = browser.element('#break-time-input');
    assert(breakTimeInput.isExisting(''));
  });

  it('should register the value of the input for setting pomodoro focus time', function () {
    var pomodoroTimeInput = browser.element('#focus-time-input');
    pomodoroTimeInput.setValue(25);
    assert.equal(pomodoroTimeInput.getValue(), 25);
  });

  it('should register the value of the input for setting pomodoro break time', function () {
    var breakTimeInput = browser.element('#break-time-input');
    breakTimeInput.setValue(5);
    assert.equal(breakTimeInput.getValue(), 5);
  });
});
