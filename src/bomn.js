(function(b, undefined) {
  'use strict';

  var EXPLOSION_LENGTH = 1000; // in milliseconds

  /*
   * The Bomn object -- it'll blow you up!
   */
  b.Bomn = function(row, col, radius) {
    this.row = row;
    this.col = col;
    this.timer = Date.now();
    this.blastRadius = radius;
    this.image = {};
    this.exploding = false;
    this.exploded = false;
    this.explosionTimer = 0; // used to control explosion animation
  };


  /*
   * Checks the bomn's timer and returns true if it should explode, false
   * otherwise.
   */
  b.Bomn.prototype.shouldExplode = function() {
    // if we're already exploding, don't explode!
    if(!this.exploding) {
      // b.BOMN_TIMER is in seconds, we want milliseconds...
      if((Date.now() - this.timer) >= (b.BOMN_TIMER * 1000)) {
        return true;
      }
    }
    return false;
  };


  /*
   * LOOK OUT! Wipes out the area in the blast radius. Takes the level's tiles
   * as a parameter.
   */
  b.Bomn.prototype.explode = function(tiles) {
    this.exploding = true;
    this.explosionTimer = Date.now();

    // calculate the tiles in the blast radius
    var explosionSize = (2 * this.blastRadius) + 1;
    var startRow = this.row - this.blastRadius;
    var startCol = this.col - this.blastRadius;

    for(var row = startRow; row < startRow + explosionSize; row++) {
      for(var col = startCol; col < startCol + explosionSize; col++) {
        // check if it's onscreen, then clear
        if(row >= 0 && row < b.LEVEL_HEIGHT && col >= 0 && col < b.LEVEL_WIDTH) {
          // warps are indestructable!
          if(!(tiles[row][col] instanceof b.Warp)) {
            tiles[row][col] = new b.LevelObject(row, col);
          }
        }
      }
    }
  };


  /*
   * Checks if the given row,col pair is within the bomn's radius. Returns true
   * or false.
   */
  b.Bomn.prototype.pointInRadius = function(row, col) {
    if(row >= (this.row - this.blastRadius) && row <= (this.row + this.blastRadius) &&
       col >= (this.col - this.blastRadius) && col <= (this.col + this.blastRadius)) {
      return true;
    }
    return false;
  };


  /*
   * Draw the bomn to the given context. Or if the bomn is exploding, draw the
   * explosion.
   */
  b.Bomn.prototype.draw = function(context) {
    if(this.exploding) {
      // convert our explosion "radius" into the square that it actually is
      var explosionSize = (2 * this.blastRadius) + 1;
      var startRow = this.row - this.blastRadius;
      var startCol = this.col - this.blastRadius;

      for(var row = startRow; row < startRow + explosionSize; row++) {
        for(var col = startCol; col < startCol + explosionSize; col++) {
          // adjust row,col values to pixel values
          var pixelX = col * b.TILE_SIZE;
          var pixelY = row * b.TILE_SIZE;

          // The alpha value for the explosion adjusts as time passes to fade
          // the explosion away. Over the course of EXPLOSION_LENGTH, the alpha
          // needs to go from 1 (opaque) to 0 (transparent).
          var elapsed = Date.now() - this.explosionTimer;
          var alphaValue = (1 - (elapsed / EXPLOSION_LENGTH));
          if(alphaValue > 1) { alphaValue = 1; }
          if(alphaValue < 0) { alphaValue = 0; }

          context.fillStyle = 'rgba(255, 165, 0, ' + alphaValue + ')';
          context.fillRect(pixelX, pixelY, b.TILE_SIZE, b.TILE_SIZE);
        }
      }

      // once we've drawn the explosion, this bomn is spent and can die...
      // after the explosion hangs out on-screen for EXPLOSION_LENGTH ms
      if(Date.now() - this.timer >= (b.BOMN_TIMER * 1000) + EXPLOSION_LENGTH) {
        this.exploded = true;
      }
    }

    // not exploding, draw the ticking timer
    else {
      var elapsedTime = Date.now() - this.timer;
      var display = 0;
      if(elapsedTime <= 3000 && elapsedTime >= 2001) {
        display = 1;
      }
      if(elapsedTime <= 2000 && elapsedTime >= 1001) {
        display = 2;
      }
      if(elapsedTime <= 1000 && elapsedTime >= 0) {
        display = 3;
      }
      context.textBaseline = 'top'; // text coordinates at top-left
      context.font = '14px monospace';
      context.fillStyle = 'orange';
      context.fillText(display, this.col * b.TILE_SIZE+3, this.row * b.TILE_SIZE);
    }
  };

})(window.bomns = window.bomns || {});