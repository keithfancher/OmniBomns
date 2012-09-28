(function(window, s, undefined) {
  'use strict';

  /*
   * Set everything up: create the canvas, create the player, start the game
   * loop.
   */
  (function main() {
    var game = new s.Game('world');
    if(game.initCanvas()) {
//      game.initListeners();
//      game.initEnemies(10); // 10 initial enemies
      game.start();
    }
    else {
      // something better later!
      alert("OH SHIT THERE'S A HORSE IN THE HOSPITAL");
    }
  })();

})(window, window.bomns = window.bomns || {});
