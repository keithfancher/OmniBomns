(function(b, undefined) {
  'use strict';

  /*
   * Draw text with given specs to given context.
   */
  b.drawText = function(context, text, x, y, size, color) {
    context.font = size + ' courier';
    context.fillStyle = color;
    context.fillText(text, x, y);
  };


  /*
   * Return random integer between min and max (inclusive!).
   */
  b.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  /*
   * Round given value to nearest tenth... necessary since adding and
   * subtracting 0.1 seems to be occasionally imprecise.
   */
  b.roundToTenth = function(num) {
    return Math.round(num * 10) / 10;
  };

})(window.bomns = window.bomns || {});
