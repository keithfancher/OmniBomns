(function(b, undefined) {
  'use strict';

  /*
   * The Level -- where shit happens.
   */
  b.Level = function() {
    this.tiles = []; // the tiles -- a 2D array of LevelObjects
    this.bomns = []; // bomns currently active in level
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

    // powerups
    this.insertRandomObjects(b.NUM_POWERUPS, function(row, col) {
      return new b.PowerUp(row, col);
    });

    // powerdowns
    this.insertRandomObjects(b.NUM_POWERDOWNS, function(row, col) {
      return new b.PowerDown(row, col);
    });

    // health
    this.insertRandomObjects(b.NUM_HEALTH, function(row, col) {
      return new b.Health(row, col);
    });

    // bomns
    this.insertRandomObjects(b.NUM_BOMNS, function(row, col) {
      return new b.BomnPowerUp(row, col);
    });

    // warps
    this.insertRandomObjects(b.NUM_WARPS, function(row, col) {
      return new b.Warp(row, col);
    });
  };


  /*
   * Wipe out the object, if any, that lives at the given row/col.
   */
  b.Level.prototype.clearTile = function(row, col) {
    if(row >= 0 && row < b.LEVEL_HEIGHT && col >= 0 && col < b.LEVEL_WIDTH) {
      this.tiles[row][col] = new b.LevelObject(row, col);
    }
  };


  /*
   * Drop a bomn in the level at the specified tile, with the specified radius.
   */
  b.Level.prototype.dropBomn = function(row, col, radius) {
    this.bomns.push(new b.Bomn(row, col, radius));
  };


  /*
   * Update the level's state -- called every frame.
   */
  b.Level.prototype.update = function(playerOne, playerTwo) {
    // first check the state of any bomns in the level
    var bomnsToKill = []; // an array of indices of exploded bomns
    for(var i = 0; i < this.bomns.length; i++) {
      // blow up the bomns
      if(this.bomns[i].shouldExplode()) {
        this.bomns[i].explode(this.tiles);

        // check if players are in blast radius
        if(this.bomns[i].pointInRadius(playerOne.row, playerOne.col)) {
          playerOne.harm(b.BOMN_DAMAGE);
        }
        if(this.bomns[i].pointInRadius(playerTwo.row, playerTwo.col)) {
          playerTwo.harm(b.BOMN_DAMAGE);
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
  b.Level.prototype.drawBomns = function(context) {
    for(var i = 0; i < this.bomns.length; i++) {
      this.bomns[i].draw(context);
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

})(window.bomns = window.bomns || {});
