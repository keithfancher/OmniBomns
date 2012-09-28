(function(window, document, b, undefined) {
  'use strict';

  /*
   * The Game object. This is the big banana! Contains much of the game's
   * state, logic, &c. Pass it the id of your canvas, run its init() functions,
   * start() it up, and stand back!
   */
  b.Game = function(canvasId) {
    this.canvas = {};
    this.context = {};
    this.canvasId = canvasId; // id of the canvas element
    this.playerOne = new b.Player(b.PLAYER_ONE);
    this.playerTwo = new b.Player(b.PLAYER_TWO);
    this.level = new b.Level();
  };


  /*
   * Set up canvas and context. Returns true if successful, false otherwise.
   */
  b.Game.prototype.initCanvas = function() {
    this.canvas = document.getElementById(this.canvasId);
    if(this.canvas && this.canvas.getContext) {
      this.context = this.canvas.getContext('2d');
      this.canvas.width = b.SCREEN_WIDTH;
      this.canvas.height = b.SCREEN_HEIGHT;
      this.canvas.style.position = 'absolute';
      this.canvas.style.left = (window.innerWidth - b.SCREEN_WIDTH) * 0.5 + 'px';
      this.canvas.style.top = (window.innerHeight - b.SCREEN_HEIGHT) * 0.5 + 'px';
      return true;
    }
    else {
      return false;
    }
  };


  /*
   * Callback to handle key press.
   */
  b.Game.prototype.keyDownHandler = function(event) {
    this.playerOne.processKeyPress(event.keyCode);
    this.playerTwo.processKeyPress(event.keyCode);
  };


  /*
   * Set up event listener(s).
   */
  b.Game.prototype.initListeners = function() {
    var that = this;
    document.addEventListener('keydown', function(event){that.keyDownHandler(event);});
  };


  /*
   * Main event loop, called every frame.
   */
  b.Game.prototype.mainLoop = function() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, b.SCREEN_WIDTH, b.SCREEN_HEIGHT);

    this.level.draw(this.context);

    this.playerOne.draw(this.context);
    this.playerTwo.draw(this.context);
  };


  /*
   * Set the magic in motion!
   */
  b.Game.prototype.start = function() {
    // initialize the level
    this.level.init();
    this.level.fill();

    var that = this;
    setInterval(function() {that.mainLoop();}, 1000 / b.FPS);
  };

})(window, document, window.bomns = window.bomns || {});
