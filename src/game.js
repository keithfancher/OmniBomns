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
    this.gameOver = false;
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
      this.playerOne.processKeyPress(event.keyCode, this.level, this.playerTwo);
    }
    if(P2_KEYS.indexOf(event.keyCode) !== -1) {
      this.playerTwo.processKeyPress(event.keyCode, this.level, this.playerOne);
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
   * Show the game over dialog, declaring the winner!
   */
  b.Game.prototype.showWinner = function() {
    // TODO TODO TODO
    var winnerDiv = document.getElementById('winner-message');
    if(this.playerOne.dead && this.playerTwo.dead) {
      winnerDiv.innerHTML = "<h2>It's a Tie!";
    }
    else if(this.playerOne.dead) {
      winnerDiv.innerHTML = "<h2>Player Two Wins!";
    }
    else if(this.playerTwo.dead) {
      winnerDiv.innerHTML = "<h2>Player One Wins!";
    }
    winnerDiv.innerHTML += "</h2><p>refresh to play again</p>";
  };


  /*
   * Main event loop, called every frame.
   */
  b.Game.prototype.mainLoop = function() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, b.SCREEN_WIDTH, b.SCREEN_HEIGHT);

    this.playerOne.update();
    this.playerTwo.update();
    this.level.update(this.playerOne, this.playerTwo);

    this.level.draw(this.context);
    this.playerOne.draw(this.context);
    this.playerTwo.draw(this.context);
    this.level.drawBomns(this.context); // bomns should be drawn last

    // If there are any active bomns in the level, change canvas border as an
    // alert for the players (TODO: How does this affect framerate? Almost
    // certainly better not to set every frame...)
    if(this.level.bomns.length > 0) {
      this.canvas.style.border = 'red solid 1px';
    }
    else {
      this.canvas.style.border = 'gray solid 1px';
    }

    // if either player is dead, it's game over... show the winner, dim the
    // screen... but still allow them to keep playing if they feel like it!
    if(this.playerOne.dead || this.playerTwo.dead) {
      // only set the winner text once, not every frame
      if(!this.gameOver) {
        this.showWinner();
        this.gameOver = true;
      }

      // draw a semi-transparent black rect over the screen
      this.context.fillStyle = 'rgba(0, 0, 0, 0.85)';
      this.context.fillRect(0, 0, b.SCREEN_WIDTH, b.SCREEN_HEIGHT);
    }
  };


  /*
   * Set the magic in motion!
   */
  b.Game.prototype.start = function() {
    // initialize the level
    this.level.init();
    this.level.fill();

    // grab DOM elements for player health and bomns
    this.playerOne.healthElement = document.getElementById('p1health');
    this.playerOne.bomnsElement = document.getElementById('p1bomns');
    this.playerTwo.healthElement = document.getElementById('p2health');
    this.playerTwo.bomnsElement = document.getElementById('p2bomns');

    // load player images
    this.playerOne.initImages(document.getElementById("p1img"), document.getElementById("p1invulnimg"),
                              document.getElementById("health"), document.getElementById("bomn"));
    this.playerTwo.initImages(document.getElementById("p2img"), document.getElementById("p2invulnimg"),
                              document.getElementById("health"), document.getElementById("bomn"));

    var that = this;
    setInterval(function() {that.mainLoop();}, 1000 / b.FPS);
  };

})(window, document, window.bomns = window.bomns || {});
