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
  b.MAX_HEALTH = 10;
  b.MAX_BOMNS = 10;
  b.BOMN_TIMER = 3; // in seconds
  b.BOMN_DAMAGE = 5;

  // player 1 keycodes (arrows + enter)
  b.P1_MOVE_RIGHT = 39;
  b.P1_MOVE_LEFT = 37;
  b.P1_MOVE_UP = 38;
  b.P1_MOVE_DOWN = 40;
  b.P1_BOMN = 13;

  // player 2 keycodes (wasd + spacebar)
  b.P2_MOVE_RIGHT = 68;
  b.P2_MOVE_LEFT = 65;
  b.P2_MOVE_UP = 87;
  b.P2_MOVE_DOWN = 83;
  b.P2_BOMN = 32;

  // number of initial objects in level
  b.NUM_WALLS = 300;
  b.NUM_INVULNS = 10;
  b.NUM_POWERUPS = 30;
  b.NUM_POWERDOWNS = 30;
  b.NUM_HEALTH = 30;
  b.NUM_BOMNS = 20;
  b.NUM_WARPS = 3;

})(window.bomns = window.bomns || {});
