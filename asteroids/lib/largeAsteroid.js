(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var largeAsteroid = Asteroids.largeAsteroid = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = largeAsteroid.COLOR;
    this.radius = largeAsteroid.RADIUS;
    this.img = new Image();
    this.img.src = 'asteroid.png';
    this.game = args.game;
    this.isWrappable = false;
    this.ship = args.ship;
    this.health = 3;

  };


  Asteroids.Util.inherits(largeAsteroid, Asteroids.MovingObject);


  largeAsteroid.prototype.draw = function(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.position[0], this.position[1], 29,  2* Math.PI, false);
    // context.fillStyle = 'green';
    // ctx.fill();
    // ctx.stroke();
    ctx.drawImage(this.img, this.position[0], this.position[1], 60, 60);
  };


  largeAsteroid.COLOR = "#00FF00";
  largeAsteroid.RADIUS = 29;

  largeAsteroid.prototype.collideWith = function(otherObject) {
    var canvas = document.getElementById("game-canvas");
    this.ctx = this.game.ctx;

    if (otherObject instanceof Asteroids.Ship) {
      this.ship.health -= 12;
      this.game.shield.timer = 8;
      if(this.ship.health >= 0) {
        this.game.ctx.rotate(1*Math.PI/180);
        this.game.ship.hit = true;
      }

      this.game.remove(this);
    }

    // } else if (otherObject instanceof Asteroids.Bullet) {
    //
    //   this.game.remove(otherObject);
    //   this.health -= 1;
    //   if (this.health <= 0) {
    //     this.game.remove(this);
    //   }
    //
    // }



  };

})();
