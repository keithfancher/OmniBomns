(function(b, undefined) {
  'use strict';

  // some useful "constants"
  b.SCREEN_WIDTH = 900; // in pixels
  b.SCREEN_HEIGHT = 600; // in pixels
  b.TILE_SIZE = 15;
  b.LEVEL_WIDTH = b.SCREEN_WIDTH / b.TILE_SIZE; // in tiles
  b.LEVEL_HEIGHT = b.SCREEN_HEIGHT / b.TILE_SIZE; // in tiles
  b.FPS = 60;

  // player constants
  b.PLAYER_ONE = 1;
  b.PLAYER_TWO = 2;

  // number of initial objects in level
  b.NUM_WALLS = 100;
  b.NUM_INVULNS = 10;
  b.NUM_POWERUPS = 30;
  b.NUM_POWERDOWNS = 30;
  b.NUM_HEALTH = 30;

})(window.bomns = window.bomns || {});
