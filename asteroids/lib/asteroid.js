(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroid = Asteroids.Asteroid = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
    this.img = new Image();
    this.img.src = 'asteroid.png';
    this.game = args.game;
    this.isWrappable = false;
    this.ship = args.ship;

  };


  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.position[0], this.position[1], 30, 30);
  };


  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 11;

  Asteroid.prototype.collideWith = function(otherObject) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = this.game.ctx;

    if (otherObject instanceof Asteroids.Ship) {
      this.ship.health -= 10;
      this.game.shield.timer = 7;
      this.game.ctx.rotate(1*Math.PI/180);
      this.game.ship.hit = true;
    }
    this.game.remove(this);
  

  };

})();
