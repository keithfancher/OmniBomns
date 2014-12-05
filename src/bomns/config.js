define(function() {
  'use strict';

  var c = {};

  // some useful "constants"
  c.SCREEN_WIDTH = 900; // in pixels
  c.SCREEN_HEIGHT = 600; // in pixels
  c.TILE_SIZE = 15;
  c.LEVEL_WIDTH = c.SCREEN_WIDTH / c.TILE_SIZE; // in tiles
  c.LEVEL_HEIGHT = c.SCREEN_HEIGHT / c.TILE_SIZE; // in tiles
  c.FPS = 60;

  // player constants
  c.PLAYER_ONE = 1;
  c.PLAYER_TWO = 2;
  c.MAX_HEALTH = 10;
  c.MAX_BOMNS = 10;
  c.BOMN_TIMER = 3000; // in milliseconds
  c.BOMN_DAMAGE = 5;

  // player 1 keycodes (arrows + enter)
  c.P1_MOVE_RIGHT = 39;
  c.P1_MOVE_LEFT = 37;
  c.P1_MOVE_UP = 38;
  c.P1_MOVE_DOWN = 40;
  c.P1_BOMN = 13;

  // player 2 keycodes (wasd + spacebar)
  c.P2_MOVE_RIGHT = 68;
  c.P2_MOVE_LEFT = 65;
  c.P2_MOVE_UP = 87;
  c.P2_MOVE_DOWN = 83;
  c.P2_BOMN = 32;

  // number of initial objects in level
  c.NUM_WALLS = 300;
  c.NUM_INVULNS = 10;
  c.NUM_POWERUPS = 30;
  c.NUM_POWERDOWNS = 30;
  c.NUM_HEALTH = 30;
  c.NUM_BOMNS = 20;
  c.NUM_WARPS = 3;

  // "export" config options
  return c;

});
