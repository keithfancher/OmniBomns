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
   * Fill the level with object.
   */
  b.Level.prototype.fill = function() {
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
