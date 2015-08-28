(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var GameView = Asteroids.GameView = function(game, ctx){
    this.bindKeyHandlers();
    this.game = game;
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = 'space2.png';
    var canvasEl = document.getElementById("game-canvas");
    this.stage = new createjs.Stage(canvasEl);
    this.round = 1;
    this.startButton = $(".start-button")[0];
    this.startButton.addEventListener("click", this.startGame.bind(this));
    this.roundTimer = 200;
    this.pauseValue = false;
    this.explosionTimer = 0;
    // document.addEventListener("mouseover", this.getMousePos.bind(this));
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('space', function(){
      if(this.pauseValue === true) {
        this.pauseValue = false;
      } else {
        this.pauseValue = true;
      }
      this.pause();

    }.bind(this));

  };


  GameView.prototype.checkExplosionTimer = function() {
    if(this.game.explosionTimer > 0) {
      var image = new Image();
      image.src = "explosion.png";
      this.game.ctx.drawImage(image, this.game.asteroidPos[0] + 5, this.game.asteroidPos[1] + 5, 60, 60);
      this.game.explosionTimer -= 1;
    }
  };

  GameView.prototype.checkShieldTimer = function() {
    if (this.game.shield.timer > 0) {
      this.game.shield.draw(this.ctx);
      this.game.shield.timer -= 1;
    }
  };

  GameView.prototype.checkShipHit = function() {
    if(this.game.ship.hit === true) {
      setTimeout(this.ctx.rotate(-1*Math.PI/180), 700);
      this.game.ship.hit = false;
    }
  };

  GameView.prototype.displayScore = function() {
    this.ctx.fillStyle = "white";
    this.ctx.font = 20+"pt Arial ";
    this.ctx.fillText("Score " + this.game.score ,canvasEl.width - 150, 80);

  };

  GameView.prototype.displayLoseMessage = function() {

    this.game.ship.health = 0;

    this.ctx.fillStyle = "white";
    this.ctx.font = "italic "+30+"pt Arial ";
    this.ctx.fillText("You Lose", 20, 150);
    clearInterval(this.handle);

  };


  GameView.prototype.displayNextRound = function() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "italic "+30+"pt Arial ";
    this.ctx.fillText("Round " + this.round , canvasEl.width/2 - 64, 100);
    this.roundTimer -= 1;
  };


  GameView.prototype.onload = function() {
    this.ctx.drawImage(this.img, 0, 0, canvasEl.width, canvasEl.height);

  };

  GameView.prototype.pause = function() {
    if (this.pauseValue === true) {
      clearInterval(this.handle);
    } else {
      this.startGame();
    }
  };

  GameView.prototype.setNextRound = function() {
    this.game.addAsteroids();
    clearInterval(this.game.createInterval);
    this.game.bulletSpeed -= 300;
    this.game.createAsteroids(this.game.bulletSpeed);
    this.round += 1;
    this.roundTimer = 200;
    this.game.amount = 0;
    this.game.total += 10;
  };



  GameView.prototype.showHealth = function() {
    this.ctx.fillStyle = "white"
    this.ctx.font = 20+"pt Arial";
    this.ctx.fillText("Health " + this.game.ship.health, 50 ,80)
  };



  GameView.prototype.startGame = function() {
    $(".background-img").addClass("remove-img");
    $(".start-screen").addClass("remove-img");

    this.handle = setInterval(function(){
      this.game.step();

      this.game.draw(this.ctx, this);

      this.checkShipHit();
      this.checkShieldTimer();
      this.checkExplosionTimer();
      if(this.game.asteroids.length === 0) {
        this.setNextRound();
      }

      if(this.roundTimer > 0) {
        this.displayNextRound();
      }

      if (this.game.lose()){

        this.displayLoseMessage();
        // this.game.draw(this.ctx, this);
      }
      this.showHealth();
      this.displayScore();

    }.bind(this), 20);
    // debugger
    // if(this.game.lose()) {
    //   debugger
      // this.ctx.rotate(-1*Math.PI/180);
    // }


  };








  // GameView.prototype.drawLine = function() {
  //
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(this.game.ship.position[0], this.game.ship.position[1]);
  //   this.ctx.lineTo(this.cursorX, this.cursorY)
  //   this.ctx.stroke();
  // };






    //
    //
    // GameView.prototype.getMousePos = function(e) {
    //
    //   this.cursorX = e.clientX;
    //   this.cursorY = e.clientY;
    //
    // };



})();
