(function(window, b, undefined) {
  'use strict';

  // player 1 keycodes
  var MOVE_RIGHT = 39;
  var MOVE_LEFT = 37;
  var MOVE_UP = 38;
  var MOVE_DOWN = 40;
  var BOMN = 13;

  /*
   * The Player object -- the player of the game!
   */
  b.Player = function() {
    // position is in TILES, not pixels
    this.x = 0;
    this.y = 0;
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {

  };


  b.Player.prototype.processKeyPress = function(keyCode) {
    switch(keyCode) {
      case MOVE_RIGHT:
        this.moveRight();
        break;

      case MOVE_LEFT:
        this.moveLeft();
        break;

      case MOVE_UP:
        this.moveUp();
        break;

      case MOVE_DOWN:
        this.moveDown();
        break;
    }
  };


  /*
   * Move the player!
   */
  b.Player.prototype.moveRight = function() {
    if(this.x < b.LEVEL_WIDTH - 1) {
      this.x++;
    }
  };

  b.Player.prototype.moveLeft = function() {
    if(this.x > 0) {
      this.x--;
    }
  };

  b.Player.prototype.moveUp = function() {
    if(this.y > 0) {
      this.y--;
    }
  };

  b.Player.prototype.moveDown = function() {
    if(this.y < b.LEVEL_HEIGHT - 1) {
      this.y++;
    }
  };


  /*
   * Draw the player to the given context.
   */
  b.Player.prototype.draw = function(context) {
    // Mult by tile size to get the right pixel coordinates, then add half
    // because we're giving *center* coordinates for a circle... at least for
    // now.
    var centerX = (this.x * b.TILE_SIZE) + (b.TILE_SIZE / 2);
    var centerY = (this.y * b.TILE_SIZE) + (b.TILE_SIZE / 2);

    context.beginPath();
    context.arc(centerX, centerY, b.TILE_SIZE / 2, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
  };

})(window, window.bomns = window.bomns || {});
