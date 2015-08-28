(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.radius = Bullet.RADIUS;
    this.color = Bullet.COLOR;
    this.img = new Image();
    this.img.src = "blue-fireball.png"

  }

  Bullet.RADIUS = 10;
  Bullet.COLOR = "#ff0000";

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
  Bullet.prototype.draw = function(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.position[0], this.position[1], 10,  2* Math.PI, false);
    // context.fillStyle = 'green';
    // ctx.fill();
    // ctx.stroke();

      ctx.drawImage(this.img, this.position[0], this.position[1], 30, 30);

  };

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.asteroidPos[0] = otherObject.position[0];
      this.game.asteroidPos[1] = otherObject.position[1];
      this.game.explosionTimer = 200;
      this.game.score += 1;
      this.game.highscore += 1;
      this.game.remove(otherObject);
      this.game.remove(this);

    } else if(otherObject instanceof Asteroids.largeAsteroid) {
      this.game.asteroidPos[0] = otherObject.position[0];
      this.game.asteroidPos[1] = otherObject.position[1];
      this.game.explosionTimer = 200;
      this.game.score += 1;
      this.game.highscore += 1;
      otherObject.health -= 1;
      if (otherObject.health <= 0) {
        this.game.remove(otherObject);
      }

      this.game.remove(this);
    } else if(otherObject instanceof Asteroids.Planet2 || otherObject instanceof Asteroids.Planet4 ||
        otherObject instanceof Asteroids.Planet7 || otherObject instanceof Asteroids.Alien1 ||
        otherObject instanceof Asteroids.Alien2) {
      otherObject.planet2Timer = 200;
      this.game.remove(this);
    }
  };




})();
