(function(window, b, undefined) {
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

})(window, window.bomns = window.bomns || {});
