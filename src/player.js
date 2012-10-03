(function(b, undefined) {
  'use strict';

  /*
   * The Player object -- the player of the game! Constructor takes player
   * number, color, and initial row and column of the player.
   */
  b.Player = function(playerNum, color, row, col) {
    this.row = row; // position in TILES, not pixels
    this.col = col;
    this.playerNum = playerNum;
    this.color = color;
    this.health = b.MAX_HEALTH;
    this.bomns = b.MAX_BOMNS;
    this.bomnRadius = 1;
    this.invulnerable = false;
    this.invulnerabilityTimer = 0;
    this.moved = {}; // used to track pressed keys, force players to "tap"
    this.dead = false;

    // images and DOM elements
    this.healthElement = {}; // the HTML element in which to display health
    this.bomnsElement = {}; // the HTML element in which to display bomns
    this.defaultImage = {};
    this.currentImage = {};
    this.invulnImage = {};
    this.healthImage = {}; // image for the HUD
    this.bomnImage = {}; // image for the HUD
  };


  /*
   * Load the images for the player... takes default image and invulnerability
   * image objects.
   */
  b.Player.prototype.initImages = function(defImage, invulnImage, healthImage, bomnImage) {
    this.defaultImage = defImage;
    this.invulnImage = invulnImage;
    this.currentImage = this.defaultImage;
    this.healthImage = healthImage;
    this.bomnImage = bomnImage;

    // make sure proper health and bomns are displayed on load
    this.updateHealthElement();
    this.updateBomnsElement();
  };


  /*
   * Update the player's state.
   */
  b.Player.prototype.update = function() {
    if(this.invulnerable) {
      // countdown their invulnerability time, 10 seconds
      if(Date.now() - this.invulnerabilityTimer >= 10000) {
        this.invulnerable = false;
        this.invulnerabilityTimer = 0;
        this.currentImage = this.defaultImage;
      }
    }
    return;
  };


  /*
   * Update the health element to reflect player's... health!
   */
  b.Player.prototype.updateHealthElement = function() {
    var healthString = '';
    for(var i = 0; i < this.health; i++) {
      healthString += '<img src="' + this.healthImage.src + '" /> ';
    }
    this.healthElement.innerHTML = healthString;
  };


  /*
   * Update the bomns element to reflect player's... bomns!
   */
  b.Player.prototype.updateBomnsElement = function() {
    var bomnsString = '';
    for(var i = 0; i < this.bomns; i++) {
      bomnsString += '<img src="' + this.bomnImage.src + '" /> ';
    }
    this.bomnsElement.innerHTML = bomnsString;
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
   * Should this take the level? Player needs access to it here somehow. Same
   * with otherPlayer... we need to be able to punch our rival, as well as
   * determine their position.
   */
  b.Player.prototype.processKeyPress = function(keyCode, level, otherPlayer) {
    // if the button has been pressed but not yet released, can't move!
    if(this.moved[keyCode]) {
      return;
    }
    else {
      // now we can't move that direction till we release the key!
      this.moved[keyCode] = true;
    }

    if(keyCode === b.P1_MOVE_RIGHT || keyCode === b.P2_MOVE_RIGHT) {
      this.move(this.row, this.col + 1, level, otherPlayer);
    }
    if(keyCode === b.P1_MOVE_LEFT || keyCode === b.P2_MOVE_LEFT) {
      this.move(this.row, this.col - 1, level, otherPlayer);
    }
    if(keyCode === b.P1_MOVE_UP || keyCode === b.P2_MOVE_UP) {
      this.move(this.row - 1, this.col, level, otherPlayer);
    }
    if(keyCode === b.P1_MOVE_DOWN || keyCode === b.P2_MOVE_DOWN) {
      this.move(this.row + 1, this.col, level, otherPlayer);
    }
    if(keyCode === b.P1_BOMN || keyCode === b.P2_BOMN) {
      if(this.bomns > 0) {
        level.dropBomn(this.row, this.col, this.bomnRadius);
        this.bomns--;
        this.updateBomnsElement();
      }
    }
  };


  /*
   * Process the release of keys... useful to force players to tap!
   */
  b.Player.prototype.processKeyRelease = function(keyCode) {
    this.moved[keyCode] = false;
  };


  /*
   * Move the player! Takes destination row, column, level object, and the
   * other player object.
   */
  b.Player.prototype.move = function(row, col, level, otherPlayer) {
    // don't move offscreen
    if(!this.destOffScreen(row, col)) {
      // check for other player before anything else
      if(row === otherPlayer.row && col === otherPlayer.col) {
        otherPlayer.harm(1); // "punching" the other player does 1 damage
      }
      // destination is NOT solid object
      else if(!level.tiles[row][col].solid) {
        this.row = row;
        this.col = col;
        this.pickUp(level);
      }
      // if it *is* solid, see if it's a warp
      else {
        if(level.tiles[row][col] instanceof b.Warp) {
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
    // TODO: don't land on other player... or telefrag?
    while(666) {
      warpRow = b.randomInt(0, b.LEVEL_HEIGHT - 1);
      warpCol = b.randomInt(0, b.LEVEL_WIDTH - 1);
      var destTile = level.tiles[warpRow][warpCol];
      if(!destTile.solid) {
        break;
      }
    }

    this.row = warpRow;
    this.col = warpCol;
    this.pickUp(level); // make sure to pick up whatever item we landed on
  };


  /*
   * Pick up the object, if any, that lives on our current position in the
   * level.
   */
  b.Player.prototype.pickUp = function(level) {
    var tile = level.tiles[this.row][this.col];
    var pickedUp = false; // sometimes we can't pick something up! (health, etc.)

    if(tile instanceof b.Invuln) {
      // can't get multiple invulnerabilities or extend the time
      if(!this.invulnerable) {
        this.invulnerable = true;
        this.invulnerabilityTimer = Date.now();
        this.currentImage = this.invulnImage;
        pickedUp = true;
      }
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
        this.updateHealthElement(); // update HUD
        pickedUp = true;
      }
    }
    else if(tile instanceof b.BomnPowerUp) {
      if(this.bomns < b.MAX_BOMNS) {
        this.bomns++;
        this.updateBomnsElement(); // update HUD
        pickedUp = true;
      }
    }

    // clear out that tile if we picked up the item
    if(pickedUp) {
      level.tiles[this.row][this.col] = new b.LevelObject(this.row, this.col);
    }
  };


  /*
   * Harms the player the given amount.
   */
  b.Player.prototype.harm = function(damage) {
    if(!this.invulnerable) {
      this.health -= damage;
      if(this.health <= 0) {
        this.health = 0;
        this.dead = true;
      }
      this.updateHealthElement(); // change health in HUD
    }
  };


  /*
   * Draw the player to the given context.
   */
  b.Player.prototype.draw = function(context) {
    context.drawImage(this.currentImage, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };

})(window.bomns = window.bomns || {});
