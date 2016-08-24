'use strict';
const assert = require('assert');

describe('settings options', function() {
  browser.url('/');

  it('should have an input for setting break time', function() {
    browser.click('#settings-link');
    var pomodoroTimeInput = browser.element('#focus-time-input');
    assert(pomodoroTimeInput.isExisting(''));
  });

  it('should have an input for setting break time', function() {
    var breakTimeInput = browser.element('#break-time-input');
    assert(breakTimeInput.isExisting(''));
  });

  it('should register the value of the input for setting pomodoro time', function() {
    var pomodoroTimeInput = browser.element('#focus-time-input');
    pomodoroTimeInput.setValue('25:00');
    assert.equal(pomodoroTimeInput.getValue(), '25:00');
  });

  it('should register the value of the input for setting pomodoro time', function() {
    var breakTimeInput = browser.element('#break-time-input');
    breakTimeInput.setValue('5:00');
    assert.equal(breakTimeInput.getValue(), '5:00');
  });

  it('should disable focus submit button if input field is empty', function() {
    var pomodoroTimeInput = browser.element('#focus-time-input');
    var buttonStatus = browser.isEnabled('#set-focus-submit');
    pomodoroTimeInput.setValue('');
    assert.equal(buttonStatus, false);
  });

  it('should disable break submit button if input field is empty', function() {
    var buttonStatus = browser.isEnabled('#set-break-submit');
    assert.equal(buttonStatus, false);
  });

  it('should enable focus submit button if input field has value', function() {
    var buttonStatus = browser.isEnabled('#set-focus-submit');
    var focusTimeInput = browser.element('#focus-time-input');
    focusTimeInput.setValue('10:00');
    assert.equal(buttonStatus, true);
  });

  it('should enable break submit button if input field has value', function() {
    var buttonStatus = browser.isEnabled('#set-break-submit');
    var breakTimeInput = browser.element('#break-time-input');
    breakTimeInput.setValue('5:00');
    assert.equal(buttonStatus, true);
  });



});
