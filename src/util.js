(function(b, undefined) {
  'use strict';

  /*
   * Return random integer between min and max (inclusive!).
   */
  b.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  /*
   * Draws the image to the given context, but rotated by 'angle' radians.
   */
  b.drawRotatedImage = function(context, image, x, y, angle) {
    context.save(); // we'll need this!
    context.translate(x + (image.width / 2), y + (image.height / 2));
    context.rotate(angle);
    context.drawImage(image, -(image.width / 2), -(image.height / 2));
    context.restore(); // back to normal...
  };

})(window.bomns = window.bomns || {});
