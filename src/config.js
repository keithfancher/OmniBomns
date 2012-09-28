(function(window, b, undefined) {
  'use strict';

  // some useful "constants"
  b.SCREEN_WIDTH = 900; // in pixels
  b.SCREEN_HEIGHT = 600; // in pixels
  b.TILE_SIZE = 20;
  b.LEVEL_WIDTH = b.SCREEN_WIDTH / b.TILE_SIZE; // in tiles
  b.LEVEL_HEIGHT = b.SCREEN_HEIGHT / b.TILE_SIZE; // in tiles
  b.FPS = 60;

  // player 1 keycodes
  b.MOVE_RIGHT = 39;
  b.MOVE_LEFT = 37;
  b.MOVE_UP = 38;
  b.MOVE_DOWN = 40;
  b.BOMN = 13;

})(window, window.bomns = window.bomns || {});
