(function(window, document, b, undefined) {
  'use strict';

  // arrays of the players' keybindings, useful for telling which player to
  // route keypresses to
  var P1_KEYS = [b.P1_MOVE_RIGHT, b.P1_MOVE_LEFT, b.P1_MOVE_UP, b.P1_MOVE_DOWN, b.P1_BOMN];
  var P2_KEYS = [b.P2_MOVE_RIGHT, b.P2_MOVE_LEFT, b.P2_MOVE_UP, b.P2_MOVE_DOWN, b.P2_BOMN];

  // player colors
  var P1_COLOR = 'red';
  var P2_COLOR = 'blue';


  /*
   * The Game object. This is the big banana! Contains much of the game's
   * state, logic, &c. Pass it the id of your canvas, run its init() functions,
   * start() it up, and stand back!
   */
  b.Game = function(canvasId) {
    this.canvas = {};
    this.context = {};
    this.canvasId = canvasId; // id of the canvas element
    this.playerOne = new b.Player(b.PLAYER_ONE, P1_COLOR, 0, 0);
    this.playerTwo = new b.Player(b.PLAYER_TWO, P2_COLOR, 0, b.LEVEL_WIDTH - 1);
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
    // don't bother handling invalid keypresses!
    if(P1_KEYS.indexOf(event.keyCode) !== -1) {
      this.playerOne.processKeyPress(event.keyCode, this.level);
    }
    if(P2_KEYS.indexOf(event.keyCode) !== -1) {
      this.playerTwo.processKeyPress(event.keyCode, this.level);
    }
  };


  /*
   * Callback to handle key release.
   */
  b.Game.prototype.keyUpHandler = function(event) {
    if(P1_KEYS.indexOf(event.keyCode) !== -1) {
      this.playerOne.processKeyRelease(event.keyCode);
    }
    if(P2_KEYS.indexOf(event.keyCode) !== -1) {
      this.playerTwo.processKeyRelease(event.keyCode);
    }
  };


  /*
   * Set up event listener(s).
   */
  b.Game.prototype.initListeners = function() {
    var that = this;
    document.addEventListener('keydown', function(event){that.keyDownHandler(event);});
    document.addEventListener('keyup', function(event){that.keyUpHandler(event);});
  };


  /*
   * Main event loop, called every frame.
   */
  b.Game.prototype.mainLoop = function() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, b.SCREEN_WIDTH, b.SCREEN_HEIGHT);

    this.playerOne.update();
    this.playerTwo.update();

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
