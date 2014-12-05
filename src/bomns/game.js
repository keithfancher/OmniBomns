define(['config', 'level', 'player'], function(c, Level, Player) {
  'use strict';

  // arrays of the players' keybindings, useful for telling which player to
  // route keypresses to
  var P1_KEYS = [c.P1_MOVE_RIGHT, c.P1_MOVE_LEFT, c.P1_MOVE_UP, c.P1_MOVE_DOWN, c.P1_BOMN];
  var P2_KEYS = [c.P2_MOVE_RIGHT, c.P2_MOVE_LEFT, c.P2_MOVE_UP, c.P2_MOVE_DOWN, c.P2_BOMN];

  // player colors
  var P1_COLOR = 'red';
  var P2_COLOR = 'blue';


  /*
   * The Game object. This is the big banana! Contains much of the game's
   * state, logic, &c. Pass it the id of your canvas, run its init() functions,
   * start() it up, and stand back!
   */
  var Game = function(canvasId) {
    this.canvas = {};
    this.context = {};
    this.canvasId = canvasId; // id of the canvas element
    this.playerOne = new Player(c.PLAYER_ONE, P1_COLOR, 0, 0);
    this.playerTwo = new Player(c.PLAYER_TWO, P2_COLOR, 0, c.LEVEL_WIDTH - 1);
    this.level = new Level();
    this.gameOver = false;
  };


  /*
   * Set up canvas and context. Returns true if successful, false otherwise.
   */
  Game.prototype.initCanvas = function() {
    this.canvas = document.getElementById(this.canvasId);
    if(this.canvas && this.canvas.getContext) {
      this.context = this.canvas.getContext('2d');
      this.canvas.width = c.SCREEN_WIDTH;
      this.canvas.height = c.SCREEN_HEIGHT;
      return true;
    }
    else {
      return false;
    }
  };


  /*
   * Callback to handle key press.
   */
  Game.prototype.keyDownHandler = function(event) {
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
  Game.prototype.keyUpHandler = function(event) {
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
  Game.prototype.initListeners = function() {
    var that = this;
    document.addEventListener('keydown', function(event){that.keyDownHandler(event);});
    document.addEventListener('keyup', function(event){that.keyUpHandler(event);});
  };


  /*
   * Show the game over dialog, declaring the winner!
   */
  Game.prototype.showWinner = function() {
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
  Game.prototype.mainLoop = function() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, c.SCREEN_WIDTH, c.SCREEN_HEIGHT);

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
      this.context.fillRect(0, 0, c.SCREEN_WIDTH, c.SCREEN_HEIGHT);
    }
  };


  /*
   * Set the magic in motion!
   */
  Game.prototype.start = function() {
    // initialize the level
    this.level.init();
    this.level.fill();
    this.level.clearTile(this.playerOne.row, this.playerOne.col);
    this.level.clearTile(this.playerTwo.row, this.playerTwo.col);

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
    setInterval(function() {that.mainLoop();}, 1000 / c.FPS);
  };


  // "export" the Game object
  return Game;

});
