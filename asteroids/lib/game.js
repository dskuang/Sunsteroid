(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(context) {
    this.ctx = context;
    var canvas = document.getElementById("game-canvas");
    this.bullets = [];
    this.asteroids = [];
    this.amount = 0;
    this.total = 5;
    this.score = 0;
    this.bulletSpeed = 2000;
    this.backgroundImgs = [];
    this.addBackgroundImages();
    this.createAsteroids(this.bulletSpeed);
    this.makeLargeAsteroids = false;

    this.shield = new Asteroids.Shield({pos: [(canvasEl.width ) / 2, (canvasEl.height) / 2], game: this});
    this.ship = new Asteroids.Ship({ pos: [(canvas.width ) / 2, (canvas.height) / 2], game: this});
    this.addAsteroids();
    this.asteroidPos = [];



  };

  Game.prototype.createAsteroids = function(time) {
    this.createInterval = setInterval(function() {
      if(this.amount < this.total) {
        this.addAsteroids();
      }
    }.bind(this), time);
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 1;

  Game.prototype.addAsteroids = function() {

    var newPos = this.randomAsteroidPos();
    // if (this.makeLargeAsteroids === true) {
    var rand = this.getRandomInt(0, 1);
    if (rand == 0){
      var asteroid = new Asteroids.largeAsteroid({ pos: newPos, game: this, ship: this.ship });
    } else {
      var asteroid = new Asteroids.Asteroid({ pos: newPos, game: this, ship: this.ship });
    }

    asteroid.velocity = Asteroids.Util.asteroidNorm(this.ship.position, newPos)
    this.add(asteroid);
    this.amount += 1;
  };

  Game.prototype.getRandomInt = function(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
  };




  Game.prototype.randomAsteroidPos = function() {
    var canvas = document.getElementById("game-canvas");
    var x = Math.random() * canvas.width;
    while (x >= canvas.width/5 && x <= (canvas.width/5) * 4) {
      x = Math.random() * canvas.width;
    }
    var y = Math.random() * canvas.height;
    return [x, y];
  }

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.addBackgroundImages = function() {

    this.backgroundImgs.push(new Asteroids.Planet2({pos: this.randomPosition(), game: this}));

    this.backgroundImgs.push(new Asteroids.Planet4({pos: this.randomPosition(), game: this}));

    this.backgroundImgs.push(new Asteroids.Planet7({pos: this.randomPosition(), game: this}));

    this.backgroundImgs.push(new Asteroids.Alien1({pos: this.randomPosition(), game: this}));
    this.backgroundImgs.push(new Asteroids.Alien2({pos: this.randomPosition(), game: this}));

  };


  Game.prototype.draw = function(ctx, gameView) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    gameView.onload();
    this.allObjects().forEach(function(asteroid) {
      asteroid.draw(ctx);
    }.bind(this));
  };


  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(asteroid) {
      asteroid.move();
    });
  };


  Game.prototype.wrap = function(pos) {
    var newX = (pos[0] + Game.DIM_X) % Game.DIM_X;
    var newY = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return [newX, newY];
  };


  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(obj) {
    if(obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj), 1);
    } else if(obj instanceof Asteroids.largeAsteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj), 1);
    }
  };

  Game.prototype.allObjects = function() {
    return this.bullets.concat(this.asteroids).concat([this.ship]).concat(this.backgroundImgs);
  };

  Game.prototype.add = function(obj) {
    if(obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if(obj instanceof Asteroids.largeAsteroid) {
      this.asteroids.push(obj);
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y ||
      pos[0] < 0 || pos[1] < 0 );

  };

  Game.prototype.lose = function() {
    return this.ship.health <= 0;
  };





})();
