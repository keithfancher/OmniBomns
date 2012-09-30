(function($, b, undefined) {
  'use strict';

  /*
   * Set everything up: create the canvas, create everything else, start the
   * game loop, &c.
   */
  $(function() {
    // connect help text to colorbox
    $(".colorbox").colorbox({inline: true, width: "50%"});

    var game = new b.Game('world');
    if(game.initCanvas()) {
      game.initListeners();
      game.start();
    }
    else {
      // something better later!
      alert("OH SHIT THERE'S A HORSE IN THE HOSPITAL");
    }
  });

})(jQuery, window.bomns = window.bomns || {});
