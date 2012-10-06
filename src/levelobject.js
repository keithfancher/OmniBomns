(function(document, b, undefined) {
  'use strict';

  /*
   * LevelObject -- base object for different items that live in... the level!
   * This will be overridden by various "child" objects below.
   */
  b.LevelObject = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false; // by default, objects are *not* solid
  };


  /*
   * Draw the object to given context. If the child object doesn't define an
   * image, just return. This gives us nice, simple level drawing code.
   */
  b.LevelObject.prototype.draw = function(context) {
    if(this.image) {
      context.drawImage(this.image, this.col * b.TILE_SIZE, this.row * b.TILE_SIZE);
    }
  };


  /*
   * Wall! Inherits from LevelObject.
   */
  b.Wall = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.solid = true;
    this.image = document.getElementById("wall");
  };
  b.Wall.prototype = new b.LevelObject(); // inherit!


  /*
   * Invuln(erability)! Inherits from LevelObject.
   */
  b.Invuln = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("invuln");
  };
  b.Invuln.prototype = new b.LevelObject(); // inherit!


  /*
   * PowerUp! Inherits from LevelObject.
   */
  b.PowerUp = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("powup");
  };
  b.PowerUp.prototype = new b.LevelObject(); // inherit!


  /*
   * PowerDown! Inherits from LevelObject.
   */
  b.PowerDown = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("powdown");
  };
  b.PowerDown.prototype = new b.LevelObject(); // inherit!


  /*
   * Health! Inherits from LevelObject.
   */
  b.Health = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("health");
  };
  b.Health.prototype = new b.LevelObject(); // inherit!


  /*
   * Bomn! Inherits from LevelObject.
   */
  b.BomnPowerUp = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("bomn");
  };
  b.BomnPowerUp.prototype = new b.LevelObject(); // inherit!


  /*
   * Warp! Inherits from LevelObject.
   */
  b.Warp = function(row, col) {
    b.LevelObject.call(this, row, col); // call parent's constructor
    this.solid = true;
    this.image = document.getElementById("warp");
    this.angle = 0;
  };
  b.Warp.prototype = new b.LevelObject(); // inherit!


  /*
   * Warp gets its own draw function so it can be animated!
   */
  b.Warp.prototype.draw = function(context) {
    b.drawRotatedImage(context, this.image, this.col * b.TILE_SIZE,
                       this.row * b.TILE_SIZE, this.angle);
    // rotate!
    this.angle += 0.1;
    if(this.angle >= 2 * Math.PI) {
      this.angle = 0;
    }
  };

})(document, window.bomns = window.bomns || {});
