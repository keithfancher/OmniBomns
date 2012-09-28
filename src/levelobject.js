(function(window, b, undefined) {
  'use strict';

  /*
   * LevelObject -- different kinds of objects that live in... the level! This will be overridden by the different types of object.
   */
  b.LevelObject = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.objectType = OBJ_NONE;
  };

  /*
   * Will be overridden by child object. Where are abstract function when you
   * need 'em, eh? (Just kidding, I hate polymorphism. (Just kidding.))
   */
  b.LevelObject.prototype.draw = function(context) {
    return;
  };


  /*
   * Wall! Inherits from LevelObject.
   */
  b.Wall = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = true;
    this.objectType = OBJ_WALL;
  };
  b.Wall.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the wall, yo.
   */
  b.Wall.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE;
    var pixelY = this.row * b.TILE_SIZE;
    context.fillStyle = 'gray';
    context.fillRect(pixelX, pixelY, b.TILE_SIZE, b.TILE_SIZE);
  };

})(window, window.bomns = window.bomns || {});
