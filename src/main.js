(function(b, undefined) {
  'use strict';

  /*
   * Set everything up: create the canvas, create everything else, start the
   * game loop.
   */
  (function main() {
    var game = new b.Game('world');
    if(game.initCanvas()) {
      game.initListeners();
      game.start();
    }
    else {
      // something better later!
      alert("OH SHIT THERE'S A HORSE IN THE HOSPITAL");
    }
  })();

})(window.bomns = window.bomns || {});
