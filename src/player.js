(function(b, undefined) {
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
    this.row = 0;
    this.col = 0;
    this.playerNum = playerNum;
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {

  };


  /*
   * Should this take the level? Player needs access to it here somehow...
   */
  b.Player.prototype.processKeyPress = function(keyCode, level) {
    if(this.playerNum === b.PLAYER_ONE) {
      switch(keyCode) {
        case P1_MOVE_RIGHT:
          this.moveRight(level);
          break;

        case P1_MOVE_LEFT:
          this.moveLeft(level);
          break;

        case P1_MOVE_UP:
          this.moveUp(level);
          break;

        case P1_MOVE_DOWN:
          this.moveDown(level);
          break;
      }
    }

    if(this.playerNum === b.PLAYER_TWO) {
      switch(keyCode) {
        case P2_MOVE_RIGHT:
          this.moveRight(level);
          break;

        case P2_MOVE_LEFT:
          this.moveLeft(level);
          break;

        case P2_MOVE_UP:
          this.moveUp(level);
          break;

        case P2_MOVE_DOWN:
          this.moveDown(level);
          break;
      }
    }
  };


  /*
   * Move the player!
   */
  b.Player.prototype.moveRight = function(level) {
    // can't move off the screen
    if(this.col < b.LEVEL_WIDTH - 1) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row][this.col + 1].solid) {
        this.col++;
      }
    }
  };

  b.Player.prototype.moveLeft = function(level) {
    // can't move off the screen
    if(this.col > 0) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row][this.col - 1].solid) {
        this.col--;
      }
    }
  };

  b.Player.prototype.moveUp = function(level) {
    // can't move off the screen
    if(this.row > 0) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row - 1][this.col].solid) {
        this.row--;
      }
    }
  };

  b.Player.prototype.moveDown = function(level) {
    // can't move off the screen
    if(this.row < b.LEVEL_HEIGHT - 1) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row + 1][this.col].solid) {
        this.row++;
      }
    }
  };


  /*
   * Draw the player to the given context.
   */
  b.Player.prototype.draw = function(context) {
    // Mult by tile size to get the right pixel coordinates, then add half
    // because we're giving *center* coordinates for a circle... at least for
    // now.
    var centerX = (this.col * b.TILE_SIZE) + (b.TILE_SIZE / 2);
    var centerY = (this.row * b.TILE_SIZE) + (b.TILE_SIZE / 2);

    context.beginPath();
    context.arc(centerX, centerY, b.TILE_SIZE / 2, 0, 2 * Math.PI, false);
    context.fillStyle = (this.playerNum === b.PLAYER_ONE ? P1_COLOR : P2_COLOR);
    context.fill();
    context.stroke();
  };

})(window.bomns = window.bomns || {});
