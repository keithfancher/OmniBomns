(function(b, undefined) {
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
   * Inserts given number of random objects into level. func should take a row
   * and column and return a new instance of whatever object you want to
   * insert.
   */
  b.Level.prototype.insertRandomObjects = function(num, func) {
    for(var i = 0; i < num; i++) {
      var row = b.randomInt(0, b.LEVEL_HEIGHT - 1);
      var col = b.randomInt(0, b.LEVEL_WIDTH - 1);
      this.tiles[row][col] = func(row, col);
    }
  };


  /*
   * Fill the level with objects.
   */
  b.Level.prototype.fill = function() {
    // insert walls
    this.insertRandomObjects(b.NUM_WALLS, function(row, col) {
      return new b.Wall(row, col);
    });

    // insert invulnerabilities
    this.insertRandomObjects(b.NUM_INVULNS, function(row, col) {
      return new b.Invuln(row, col);
    });
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

})(window.bomns = window.bomns || {});
