(function(window, b, undefined) {
  'use strict';

  /*
   * The Player object -- the player of the game!
   */
  b.Player = function() {
    this.x = 10;
    this.y = 10;
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {

  };


  /*
   * Move the player to coordinates specified.
   */
  b.Player.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
  };


  /*
   * Draw the player to the given context.
   */
  b.Player.prototype.draw = function(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
  };

})(window, window.bomns = window.bomns || {});
