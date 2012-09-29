(function(b, undefined) {
  'use strict';

  var P1_COLOR = 'red';
  var P2_COLOR = 'blue';

  /*
   * The Player object -- the player of the game!
   */
  b.Player = function(playerNum) {
    // position is in TILES, not pixels
    this.row = 0;
    this.col = 0;
    this.playerNum = playerNum;
    this.health = b.MAX_HEALTH;
    this.bomns = 10;
    this.bomnRadius = 1;
    this.invulnerable = false;
    this.moved = {}; // counting on !undefined equalling true for initial run
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {
    // TODO!
    return;
  };


  /*
   * Is the given row, col pair off-screen? Return true or false.
   */
  b.Player.prototype.destOffScreen = function(row, col) {
    if(row >= b.LEVEL_HEIGHT || row < 0 || col >= b.LEVEL_WIDTH || col < 0) {
      return true;
    }
    return false;
  };


  /*
   * Should this take the level? Player needs access to it here somehow...
   */
  b.Player.prototype.processKeyPress = function(keyCode, level) {
    // if the button has been pressed but not yet released, can't move!
    if(this.moved[keyCode]) {
      return;
    }
    else {
      // now we can't move that direction till we release the key!
      this.moved[keyCode] = true;
    }

    if(keyCode === b.P1_MOVE_RIGHT || keyCode === b.P2_MOVE_RIGHT) {
      this.move(this.row, this.col + 1, level);
    }
    if(keyCode === b.P1_MOVE_LEFT || keyCode === b.P2_MOVE_LEFT) {
      this.move(this.row, this.col - 1, level);
    }
    if(keyCode === b.P1_MOVE_UP || keyCode === b.P2_MOVE_UP) {
      this.move(this.row - 1, this.col, level);
    }
    if(keyCode === b.P1_MOVE_DOWN || keyCode === b.P2_MOVE_DOWN) {
      this.move(this.row + 1, this.col, level);
    }
  };


  /*
   * Process the release of keys... useful to force players to tap!
   */
  b.Player.prototype.processKeyRelease = function(keyCode) {
    this.moved[keyCode] = false;
  };


  /*
   * Move the player! Takes destination row, column, and level object.
   */
  b.Player.prototype.move = function(row, col, level) {
    // don't move offscreen
    if(!this.destOffScreen(row, col)) {
      // destination is NOT solid object
      if(!level.tiles[row][col].solid) {
        this.row = row;
        this.col = col;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[row][col] instanceof b.Warp) {
          this.warp(level);
        }
        // TODO: also check for other player
      }
    }
  };


  /*
   * Warp the player to a random part of the level.
   */
  b.Player.prototype.warp = function(level) {
    var warpRow;
    var warpCol;

    // keep looping until the destination is *not* a solid object
    while(666) {
      warpRow = b.randomInt(0, b.LEVEL_HEIGHT - 1);
      warpCol = b.randomInt(0, b.LEVEL_WIDTH - 1);
      var destTile = level.tiles[warpRow][warpCol];
      if(!destTile.solid) {
        break;
      }
    }

    // TODO: pick up the powerup/powerdown we land on

    this.row = warpRow;
    this.col = warpCol;
  };


  /*
   * Pick up the object, if any, that lives on the passed tile object.
   */
  b.Player.prototype.pickUp = function(level) {
    var tile = level.tiles[this.row][this.col];
    var pickedUp = false; // sometimes we can't pick something up! (health, etc.)

    if(tile instanceof b.Invuln) {
      // TODO
    }
    else if(tile instanceof b.PowerUp) {
      this.bomnRadius++;
      pickedUp = true;
    }
    else if(tile instanceof b.PowerDown) {
      if(this.bomnRadius > 1) {
        this.bomnRadius--;
        pickedUp = true;
      }
    }
    else if(tile instanceof b.Health) {
      if(this.health < b.MAX_HEALTH) {
        this.health++;
        pickedUp = true;
      }
    }
    else if(tile instanceof b.Bomn) {
      this.bomns++;
      pickedUp = true;
    }

    // clear out that tile if we picked up the item
    if(pickedUp) {
      level.tiles[this.row][this.col] = new b.LevelObject(this.row, this.col);
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
