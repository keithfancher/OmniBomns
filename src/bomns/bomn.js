define(['bomns/config', 'bomns/levelobject'], function(c, obj) {
  'use strict';

  var EXPLOSION_LENGTH = 1000; // in milliseconds

  /*
   * The Bomn object -- it'll blow you up!
   */
  var Bomn = function(row, col, radius) {
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
  Bomn.prototype.shouldExplode = function() {
    // if we're already exploding, don't explode!
    if(!this.exploding) {
      if(Date.now() - this.timer >= c.BOMN_TIMER) {
        return true;
      }
    }
    return false;
  };


  /*
   * LOOK OUT! Wipes out the area in the blast radius. Takes the level's tiles
   * as a parameter.
   */
  Bomn.prototype.explode = function(tiles) {
    this.exploding = true;
    this.explosionTimer = Date.now();

    // calculate the tiles in the blast radius
    var explosionSize = (2 * this.blastRadius) + 1;
    var startRow = this.row - this.blastRadius;
    var startCol = this.col - this.blastRadius;

    for(var row = startRow; row < startRow + explosionSize; row++) {
      for(var col = startCol; col < startCol + explosionSize; col++) {
        // check if it's onscreen, then clear
        if(row >= 0 && row < c.LEVEL_HEIGHT && col >= 0 && col < c.LEVEL_WIDTH) {
          // warps are indestructable!
          if(!(tiles[row][col] instanceof obj.Warp)) {
            tiles[row][col] = new obj.LevelObject(row, col);
          }
        }
      }
    }
  };


  /*
   * Checks if the given row,col pair is within the bomn's radius. Returns true
   * or false.
   */
  Bomn.prototype.pointInRadius = function(row, col) {
    if(row >= (this.row - this.blastRadius) && row <= (this.row + this.blastRadius) &&
       col >= (this.col - this.blastRadius) && col <= (this.col + this.blastRadius)) {
      return true;
    }
    return false;
  };


  /*
   * Draw bomn explosion to given context.
   */
  Bomn.prototype.drawExplosion = function(context) {
    // convert our explosion "radius" into the square that it actually is
    var explosionSize = (2 * this.blastRadius) + 1;
    var startRow = this.row - this.blastRadius;
    var startCol = this.col - this.blastRadius;

    for(var row = startRow; row < startRow + explosionSize; row++) {
      for(var col = startCol; col < startCol + explosionSize; col++) {
        // adjust row,col values to pixel values
        var pixelX = col * c.TILE_SIZE;
        var pixelY = row * c.TILE_SIZE;

        // The alpha value for the explosion adjusts as time passes to fade
        // the explosion away. Over the course of EXPLOSION_LENGTH, the alpha
        // needs to go from 1 (opaque) to 0 (transparent).
        var elapsed = Date.now() - this.explosionTimer;
        var alphaValue = (1 - (elapsed / EXPLOSION_LENGTH));
        if(alphaValue > 1) { alphaValue = 1; }
        if(alphaValue < 0) { alphaValue = 0; }

        context.fillStyle = 'rgba(255, 165, 0, ' + alphaValue + ')';
        context.fillRect(pixelX, pixelY, c.TILE_SIZE, c.TILE_SIZE);
      }
    }

    // once we've drawn the explosion, this bomn is spent and can die...
    // after the explosion hangs out on-screen for EXPLOSION_LENGTH ms
    if(Date.now() - this.timer >= c.BOMN_TIMER + EXPLOSION_LENGTH) {
      this.exploded = true;
    }
  };


  /*
   * Draw bomn countdown timer to given context.
   */
  Bomn.prototype.drawCountdown = function(context) {
    var elapsed = Date.now() - this.timer;
    if(elapsed <= 3000 && elapsed >= 2001) {
      this.image = document.getElementById('exploding1');
    }
    if(elapsed <= 2000 && elapsed >= 1001) {
      this.image = document.getElementById('exploding2');
    }
    if(elapsed <= 1000 && elapsed >= 0) {
      this.image = document.getElementById('exploding3');
    }

    context.drawImage(this.image, this.col * c.TILE_SIZE, this.row * c.TILE_SIZE);
  };


  /*
   * Draw the bomn to the given context. Or if the bomn is exploding, draw the
   * explosion.
   */
  Bomn.prototype.draw = function(context) {
    if(this.exploding) {
      this.drawExplosion(context);
    }
    else {
      this.drawCountdown(context);
    }
  };


  // "export" Bomn object
  return Bomn;

});
