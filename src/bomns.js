require(['game', 'jquery', 'lib/jquery.colorbox'], function(Game, $) {
  'use strict';

  /*
   * Used to work around annoying browser issues. See $(document).ready()
   * below for more explanation.
   */
  var hasGameLoaded = false;


  /*
   * Set everything up: create the canvas, start the game loop, &c.
   */
  var startGame = function() {

    if (hasGameLoaded) {
      // We hit our timeout, but the game has already begun. Adios!
      return;
    }

    hasGameLoaded = true;

    // connect help text to colorbox
    $(".colorbox").colorbox({inline: true, width: "620px"});

    var game = new Game('world');
    if(game.initCanvas()) {
      game.initListeners();
      $("#loading").addClass("hidden"); // hide "loading" image
      game.start();
    }
    else {
      console.log("Failed to initialize canvas?! :'(");
    }
  };


  /*
   * We attempt to set the game to begin at window.onload, because we want to
   * start once all the assets have been loaded. However, some browsers are
   * inconsistent about whether they actually fire this event, e.g. when
   * refreshing, hitting "back", etc.
   *
   * Because of this, we have the below as a backup plan. If 3 seconds have
   * passed since the DOM is ready and the game still hasn't started... GO FOR
   * BROKE! FUCK THE CONSEQUENCES! BOOOOOOOOOOMNS!
   */
  $(document).ready(function() {
    setTimeout(
      function() {
        startGame();
      },
      3000
    );
  });


  /*
   * Note that we intentionally do *not* attach this to the jQuery document
   * ready event, since we want to wait until all images have loaded to
   * execute.
   */
  window.onload = startGame;
});
