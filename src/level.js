(function(window, b, undefined) {
  'use strict';

  /*
   * The Level -- where shit happens.
   */
  b.Level = function() {
    this.tiles = [];
  };


  /*
   * Initialize empty tiles in the level.
   */
  b.Level.prototype.init = function() {
    for(var row = 0; row < b.LEVEL_HEIGHT; row++) {
      var newRow = [];
      for(var col = 0; col < b.LEVEL_WIDTH; col++) {
        newRow.push(new b.LevelObject(row, col));
      }
      this.tiles.push(newRow);
    }
  };


  /*
   * Fill the level with objects.
   */
  b.Level.prototype.fill = function() {
    // insert walls
    for(var i = 0; i < b.NUM_WALLS; i++) {
      var row = b.randomInt(0, b.LEVEL_HEIGHT - 1);
      var col = b.randomInt(0, b.LEVEL_WIDTH - 1);
      this.tiles[row][col] = new b.Wall(row, col);
    }

    // insert invulnerabilities
    for(var i = 0; i < b.NUM_INVULNS; i++) {
      var row = b.randomInt(0, b.LEVEL_HEIGHT - 1);
      var col = b.randomInt(0, b.LEVEL_WIDTH - 1);
      this.tiles[row][col] = new b.Invuln(row, col);
    }
  };


  /*
   * Draw the level!
   */
  b.Level.prototype.draw = function(context) {
    for(var row = 0; row < b.LEVEL_HEIGHT; row++) {
      for(var col = 0; col < b.LEVEL_WIDTH; col++) {
        this.tiles[row][col].draw(context);
      }
    }
  };

})(window, window.bomns = window.bomns || {});
