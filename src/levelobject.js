(function(b, undefined) {
  'use strict';

  /*
   * LevelObject -- different kinds of objects that live in... the level! This will be overridden by the different types of object.
   */
  b.LevelObject = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.image = {};
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
    var pixelX = this.col * b.TILE_SIZE + 3;
    var pixelY = this.row * b.TILE_SIZE;
    context.textBaseline = 'top'; // text coordinates at top-left
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
    this.image = document.getElementById("powup");
  };
  b.PowerUp.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the PowerUp, yo.
   */
  b.PowerUp.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    /*
    var pixelX = this.col * b.TILE_SIZE + 4;
    var pixelY = this.row * b.TILE_SIZE - 3;
    context.textBaseline = 'top'; // text coordinates at top-left
    context.font = '15px serif';
    context.fillStyle = 'green';
    context.fillText('↑', pixelX, pixelY); // hopefully you like unicode!
    */
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * PowerDown! Inherits from LevelObject.
   */
  b.PowerDown = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.image = document.getElementById("powdown");
  };
  b.PowerDown.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the PowerDown, yo.
   */
  b.PowerDown.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    /*
    var pixelX = this.col * b.TILE_SIZE + 4;
    var pixelY = this.row * b.TILE_SIZE - 3;
    context.textBaseline = 'top'; // text coordinates at top-left
    context.font = '15px serif';
    context.fillStyle = 'red';
    context.fillText('↓', pixelX, pixelY); // hopefully you like unicode!
    */
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * Health! Inherits from LevelObject.
   */
  b.Health = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
  };
  b.Health.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Health, yo.
   */
  b.Health.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE + 1;
    var pixelY = this.row * b.TILE_SIZE;
    context.textBaseline = 'top'; // text coordinates at top-left
    context.font = '15px serif';
    context.fillStyle = 'red';
    context.fillText('❤', pixelX, pixelY); // hopefully you like unicode!
  };


  /*
   * Bomn! Inherits from LevelObject.
   */
  b.Bomn = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
  };
  b.Bomn.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Bomn, yo.
   */
  b.Bomn.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE + 1;
    var pixelY = this.row * b.TILE_SIZE - 1;
    context.textBaseline = 'top'; // text coordinates at top-left
    context.font = '15px serif';
    context.fillStyle = 'white';
    context.fillText('◉', pixelX, pixelY); // hopefully you like unicode!
  };


  /*
   * Warp! Inherits from LevelObject.
   */
  b.Warp = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = true;
  };
  b.Warp.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Warp, yo.
   */
  b.Warp.prototype.draw = function(context) {
    // convert from tile coords to pixel coords
    var pixelX = this.col * b.TILE_SIZE + 1;
    var pixelY = this.row * b.TILE_SIZE;
    context.textBaseline = 'top'; // text coordinates at top-left
    context.font = '15px serif';
    context.fillStyle = 'purple';
    context.fillText('✺', pixelX, pixelY); // hopefully you like unicode!
  };

})(window.bomns = window.bomns || {});
