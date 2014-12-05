define(['bomns/config', 'bomns/util'], function(c, util) {
  'use strict';

  /*
   * LevelObject -- base object for different items that live in... the level!
   * This will be overridden by various "child" objects below.
   */
  var LevelObject = function(row, col) {
    this.row = row;
    this.col = col;
    this.solid = false; // by default, objects are *not* solid
  };


  /*
   * Draw the object to given context. If the child object doesn't define an
   * image, just return. This gives us nice, simple level drawing code.
   */
  LevelObject.prototype.draw = function(context) {
    if(this.image) {
      context.drawImage(this.image, this.col * c.TILE_SIZE, this.row * c.TILE_SIZE);
    }
  };


  /*
   * Wall! Inherits from LevelObject.
   */
  var Wall = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.solid = true;
    this.image = document.getElementById("wall");
  };
  Wall.prototype = new LevelObject(); // inherit!


  /*
   * Invuln(erability)! Inherits from LevelObject.
   */
  var Invuln = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("invuln");
  };
  Invuln.prototype = new LevelObject(); // inherit!


  /*
   * PowerUp! Inherits from LevelObject.
   */
  var PowerUp = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("powup");
  };
  PowerUp.prototype = new LevelObject(); // inherit!


  /*
   * PowerDown! Inherits from LevelObject.
   */
  var PowerDown = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("powdown");
  };
  PowerDown.prototype = new LevelObject(); // inherit!


  /*
   * Health! Inherits from LevelObject.
   */
  var Health = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("health");
  };
  Health.prototype = new LevelObject(); // inherit!


  /*
   * Bomn! Inherits from LevelObject.
   */
  var BomnPowerUp = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.image = document.getElementById("bomn");
  };
  BomnPowerUp.prototype = new LevelObject(); // inherit!


  /*
   * Warp! Inherits from LevelObject.
   */
  var Warp = function(row, col) {
    LevelObject.call(this, row, col); // call parent's constructor
    this.solid = true;
    this.image = document.getElementById("warp");
    this.angle = 0;
  };
  Warp.prototype = new LevelObject(); // inherit!


  /*
   * Warp gets its own draw function so it can be animated!
   */
  Warp.prototype.draw = function(context) {
    util.drawRotatedImage(context, this.image, this.col * c.TILE_SIZE,
                       this.row * c.TILE_SIZE, this.angle);
    // rotate!
    this.angle += 0.1;
    if(this.angle >= 2 * Math.PI) {
      this.angle = 0;
    }
  };


  // wrap and "export" the level objects
  var objectWrapper = {};
  objectWrapper.LevelObject = LevelObject;
  objectWrapper.Wall = Wall;
  objectWrapper.Invuln = Invuln;
  objectWrapper.PowerUp = PowerUp;
  objectWrapper.PowerDown = PowerDown;
  objectWrapper.Health = Health;
  objectWrapper.BomnPowerUp = BomnPowerUp;
  objectWrapper.Warp = Warp;
  return objectWrapper;

});
