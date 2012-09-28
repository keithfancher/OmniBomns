(function(window, b, undefined) {
  'use strict';

  var P1_COLOR = 'red';
  var P2_COLOR = 'blue';

  // player 1 keycodes (arrows + enter)
  var P1_MOVE_RIGHT = 39;
  var P1_MOVE_LEFT = 37;
  var P1_MOVE_UP = 38;
  var P1_MOVE_DOWN = 40;
  var P1_BOMN = 13;

  // player 2 keycodes (wasd + spacebar)
  var P2_MOVE_RIGHT = 68;
  var P2_MOVE_LEFT = 65;
  var P2_MOVE_UP = 87;
  var P2_MOVE_DOWN = 83;
  var P2_BOMN = 32;

  /*
   * The Player object -- the player of the game!
   */
  b.Player = function(playerNum) {
    // position is in TILES, not pixels
    this.x = 0;
    this.y = 0;
    this.playerNum = playerNum;
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {

  };


  b.Player.prototype.processKeyPress = function(keyCode) {
    if(this.playerNum === b.PLAYER_ONE) {
      switch(keyCode) {
        case P1_MOVE_RIGHT:
          this.moveRight();
          break;

        case P1_MOVE_LEFT:
          this.moveLeft();
          break;

        case P1_MOVE_UP:
          this.moveUp();
          break;

        case P1_MOVE_DOWN:
          this.moveDown();
          break;
      }
    }

    if(this.playerNum === b.PLAYER_TWO) {
      switch(keyCode) {
        case P2_MOVE_RIGHT:
          this.moveRight();
          break;

        case P2_MOVE_LEFT:
          this.moveLeft();
          break;

        case P2_MOVE_UP:
          this.moveUp();
          break;

        case P2_MOVE_DOWN:
          this.moveDown();
          break;
      }
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
    context.fillStyle = (this.playerNum === b.PLAYER_ONE ? P1_COLOR : P2_COLOR);
    context.fill();
    context.stroke();
  };

})(window, window.bomns = window.bomns || {});
