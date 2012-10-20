require(['game', 'jquery', 'lib/jquery.colorbox'], function(Game, $) {
  'use strict';

  /*
   * Set everything up: create the canvas, start the game loop, &c. Note that
   * we intentionally do *not* attach this to the jQuery document ready event,
   * since we want to wait until all images have loaded to execute.
   */
  window.onload = function() {
    // connect help text to colorbox
    $(".colorbox").colorbox({inline: true, width: "620px"});

    var game = new Game('world');
    if(game.initCanvas()) {
      game.initListeners();
      $("#loading").addClass("hidden"); // hide "loading" image
      game.start();
    }
    else {
      // TODO: does anything actually need to go here?
    }
  };

});
