define(['bomns/bomn', 'bomns/config', 'bomns/levelobject', 'bomns/util'], function(Bomn, c, obj, util) {
  'use strict';

  /*
   * The Level -- where shit happens.
   */
  var Level = function() {
    this.tiles = []; // the tiles -- a 2D array of LevelObjects
    this.bomns = []; // bomns currently active in level
  };


  /*
   * Initialize empty tiles in the level.
   */
  Level.prototype.init = function() {
    for(var row = 0; row < c.LEVEL_HEIGHT; row++) {
      var newRow = [];
      for(var col = 0; col < c.LEVEL_WIDTH; col++) {
        newRow.push(new obj.LevelObject(row, col));
      }
      this.tiles.push(newRow);
    }
  };


  /*
   * Inserts given number of random objects into level. func should take a row
   * and column and return a new instance of whatever object you want to
   * insert.
   */
  Level.prototype.insertRandomObjects = function(num, func) {
    for(var i = 0; i < num; i++) {
      var row = util.randomInt(0, c.LEVEL_HEIGHT - 1);
      var col = util.randomInt(0, c.LEVEL_WIDTH - 1);
      this.tiles[row][col] = func(row, col);
    }
  };


  /*
   * Fill the level with objects.
   */
  Level.prototype.fill = function() {
    // insert walls
    this.insertRandomObjects(c.NUM_WALLS, function(row, col) {
      return new obj.Wall(row, col);
    });

    // insert invulnerabilities
    this.insertRandomObjects(c.NUM_INVULNS, function(row, col) {
      return new obj.Invuln(row, col);
    });

    // powerups
    this.insertRandomObjects(c.NUM_POWERUPS, function(row, col) {
      return new obj.PowerUp(row, col);
    });

    // powerdowns
    this.insertRandomObjects(c.NUM_POWERDOWNS, function(row, col) {
      return new obj.PowerDown(row, col);
    });

    // health
    this.insertRandomObjects(c.NUM_HEALTH, function(row, col) {
      return new obj.Health(row, col);
    });

    // bomns
    this.insertRandomObjects(c.NUM_BOMNS, function(row, col) {
      return new obj.BomnPowerUp(row, col);
    });

    // warps
    this.insertRandomObjects(c.NUM_WARPS, function(row, col) {
      return new obj.Warp(row, col);
    });
  };


  /*
   * Wipe out the object, if any, that lives at the given row/col.
   */
  Level.prototype.clearTile = function(row, col) {
    if(row >= 0 && row < c.LEVEL_HEIGHT && col >= 0 && col < c.LEVEL_WIDTH) {
      this.tiles[row][col] = new obj.LevelObject(row, col);
    }
  };


  /*
   * Drop a bomn in the level at the specified tile, with the specified radius.
   */
  Level.prototype.dropBomn = function(row, col, radius) {
    this.bomns.push(new Bomn(row, col, radius));
  };


  /*
   * Update the level's state -- called every frame.
   */
  Level.prototype.update = function(playerOne, playerTwo) {
    // first check the state of any bomns in the level
    var bomnsToKill = []; // an array of indices of exploded bomns
    for(var i = 0; i < this.bomns.length; i++) {
      // blow up the bomns
      if(this.bomns[i].shouldExplode()) {
        this.bomns[i].explode(this.tiles);

        // check if players are in blast radius
        if(this.bomns[i].pointInRadius(playerOne.row, playerOne.col)) {
          playerOne.harm(c.BOMN_DAMAGE);
        }
        if(this.bomns[i].pointInRadius(playerTwo.row, playerTwo.col)) {
          playerTwo.harm(c.BOMN_DAMAGE);
        }
      }
      // if it's already exploded, remove from array
      if(this.bomns[i].exploded) {
        // can't do it here -- will fuck up the loop. just track the indices
        bomnsToKill.push(i);
      }
    }

    // remove the exploded bomns from the array
    for(var j = 0; j < bomnsToKill.length; j++) {
      this.bomns.splice(bomnsToKill[j], 1);
    }
  };


  /*
   * Draw the bomns in the level to the given context.
   */
  Level.prototype.drawBomns = function(context) {
    for(var i = 0; i < this.bomns.length; i++) {
      this.bomns[i].draw(context);
    }
  };


  /*
   * Draw the level!
   */
  Level.prototype.draw = function(context) {
    for(var row = 0; row < c.LEVEL_HEIGHT; row++) {
      for(var col = 0; col < c.LEVEL_WIDTH; col++) {
        this.tiles[row][col].draw(context);
      }
    }
  };


  // "export" Level object
  return Level;

});
