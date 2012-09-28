(function(b, undefined) {
  'use strict';

  /*
   * LevelObject -- different kinds of objects that live in... the level! This will be overridden by the different types of object.
   */
  b.LevelObject = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
  };

  /*
   * Will be overridden by child object. Where are abstract function when you
   * need 'em, eh? (Just kidding, I hate polymorphism. (Just kidding again.))
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


  /*
   * Invuln(erability)! Inherits from LevelObject.
   */
  b.Invuln = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
  };
  b.Invuln.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Invuln, yo.
   */
  b.Invuln.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE + 3; // +-3 centers text better
    var pixelY = this.row * b.TILE_SIZE - 3; // obviously will remove later
    context.font = '15px serif';
    context.fillStyle = 'yellow';
    context.fillText('!!', pixelX, pixelY);
  };


  /*
   * PowerUp! Inherits from LevelObject.
   */
  b.PowerUp = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
  };
  b.PowerUp.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the PowerUp, yo.
   */
  b.PowerUp.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE + 3; // +-3 centers text better
    var pixelY = this.row * b.TILE_SIZE - 3; // obviously will remove later
    context.font = '15px serif';
    context.fillStyle = 'green';
    context.fillText('↑', pixelX, pixelY); // hopefully you like unicode!
  };

})(window.bomns = window.bomns || {});
