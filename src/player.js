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
      this.moveRight(level);
    }
    if(keyCode === b.P1_MOVE_LEFT || keyCode === b.P2_MOVE_LEFT) {
      this.moveLeft(level);
    }
    if(keyCode === b.P1_MOVE_UP || keyCode === b.P2_MOVE_UP) {
      this.moveUp(level);
    }
    if(keyCode === b.P1_MOVE_DOWN || keyCode === b.P2_MOVE_DOWN) {
      this.moveDown(level);
    }
  };


  /*
   * Process the release of keys... useful to force players to tap!
   */
  b.Player.prototype.processKeyRelease = function(keyCode) {
    this.moved[keyCode] = false;
  };


  /*
   * Move the player!
   */
  b.Player.prototype.move = function(row, col) {
    // TODO TODO FIXME FIXME
    // if dest !offscreen
    // if dest !solid
    // if it's solid and a warp
    // if it's solid and another player
    // TODO: delete move* functions... too much repetition
  };

  b.Player.prototype.moveRight = function(level) {
    // can't move off the screen
    if(this.col < b.LEVEL_WIDTH - 1) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row][this.col + 1].solid) {
        this.col++;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[this.row][this.col + 1] instanceof b.Warp) {
          this.warp(level);
        }
      }
    }
  };

  b.Player.prototype.moveLeft = function(level) {
    // can't move off the screen
    if(this.col > 0) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row][this.col - 1].solid) {
        this.col--;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[this.row][this.col - 1] instanceof b.Warp) {
          this.warp(level);
        }
      }
    }
  };

  b.Player.prototype.moveUp = function(level) {
    // can't move off the screen
    if(this.row > 0) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row - 1][this.col].solid) {
        this.row--;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[this.row - 1][this.col] instanceof b.Warp) {
          this.warp(level);
        }
      }
    }
  };

  b.Player.prototype.moveDown = function(level) {
    // can't move off the screen
    if(this.row < b.LEVEL_HEIGHT - 1) {
      // only move if destination is not filled with solid object
      if(!level.tiles[this.row + 1][this.col].solid) {
        this.row++;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[this.row + 1][this.col] instanceof b.Warp) {
          this.warp(level);
        }
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
