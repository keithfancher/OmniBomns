(function(b, undefined) {
  'use strict';

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
  };


  /*
   * Checks the bomn's timer and returns true if it should explode, false
   * otherwise.
   */
  b.Bomn.prototype.shouldExplode = function() {
    // b.BOMN_TIMER is in seconds, we want milliseconds...
    if((Date.now() - this.timer) >= (b.BOMN_TIMER * 1000)) {
      return true;
    }
    return false;
  };


  /*
   * LOOK OUT! Wipes out the area in the blast radius. Takes the level's tiles.
   */
  b.Bomn.prototype.explode = function(tiles) {
    this.exploding = true;
    // clear the blast radius
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
   * Draw the bomn to the given context.
   */
  b.Bomn.prototype.draw = function(context) {
    // draw the bomn, or if it's exploding, draw the explosion
    if(this.exploding) {
      var explosionSize = (2 * this.blastRadius) + 1;
      var startRow = this.row - this.blastRadius;
      var startCol = this.col - this.blastRadius;
      for(var row = startRow; row < startRow + explosionSize; row++) {
        for(var col = startCol; col < startCol + explosionSize; col++) {
          var pixelX = col * b.TILE_SIZE;
          var pixelY = row * b.TILE_SIZE;
          context.fillStyle = 'orange';
          context.fillRect(pixelX, pixelY, b.TILE_SIZE, b.TILE_SIZE);
        }
      }

      // once we've drawn the explosion, this bomn is spent and can die...
      // after the explosion hangs out for another second
      if(Date.now() - this.timer >= (b.BOMN_TIMER * 1000) + 1000) {
        this.exploded = true;
      }
    }

    // not exploding, just draw normally
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
