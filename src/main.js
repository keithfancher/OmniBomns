(function(window, $, b, undefined) {
  'use strict';

  /*
   * Set everything up: create the canvas, start the game loop, &c. Note that
   * we intentionally do *not* attach this to the jQuery document ready event,
   * since we want to wait until all images have loaded to execute.
   */
  window.onload = function() {
    // connect help text to colorbox, hide "loading" image
    $(".colorbox").colorbox({inline: true, width: "620px"});
    $("#loading").addClass("hidden");

    var game = new b.Game('world');
    if(game.initCanvas()) {
      game.initListeners();
      game.start();
    }
    else {
      // something better later!
      alert("OH SHIT THERE'S A HORSE IN THE HOSPITAL");
    }
  };

})(window, jQuery, window.bomns = window.bomns || {});
