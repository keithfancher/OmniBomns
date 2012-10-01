(function(b, undefined) {
  'use strict';

  /*
   * LevelObject -- different kinds of objects that live in... the level! This
   * will be overridden by the different types of object.
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
    this.image = document.getElementById("wall");
  };
  b.Wall.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the wall, yo.
   */
  b.Wall.prototype.draw = function(context) {
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * Invuln(erability)! Inherits from LevelObject.
   */
  b.Invuln = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.image = document.getElementById("invuln");
  };
  b.Invuln.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Invuln, yo.
   */
  b.Invuln.prototype.draw = function(context) {
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
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
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * Health! Inherits from LevelObject.
   */
  b.Health = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.image = document.getElementById("health");
  };
  b.Health.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Health, yo.
   */
  b.Health.prototype.draw = function(context) {
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * Bomn! Inherits from LevelObject.
   */
  b.Bomn = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false;
    this.image = document.getElementById("bomn");
  };
  b.Bomn.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Bomn, yo.
   */
  b.Bomn.prototype.draw = function(context) {
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };


  /*
   * Warp! Inherits from LevelObject.
   */
  b.Warp = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = true;
    this.image = document.getElementById("warp");
  };
  b.Warp.prototype = new b.LevelObject(); // inherit!

  /*
   * Draw the Warp, yo.
   */
  b.Warp.prototype.draw = function(context) {
    context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
  };

})(window.bomns = window.bomns || {});
