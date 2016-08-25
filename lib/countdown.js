'use strict';

var $ = require('jQuery');

function countDown(seconds, callback){
  $('#display-count-down').html(seconds);
  seconds--;
  callback(seconds);
}

function handleTime(seconds){
  if(seconds >= 0){
  setTimeout(countDown, 1000, seconds, handleTime);
  }
}

countDown(10,handleTime);

module.exports = Countdown;
  
