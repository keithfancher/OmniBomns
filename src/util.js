(function(b, undefined) {
  'use strict';

  /*
   * Return random integer between min and max (inclusive!).
   */
  b.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

})(window.bomns = window.bomns || {});
