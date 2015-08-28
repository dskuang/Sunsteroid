(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Asteroid = Asteroids.Planet1 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
    this.img = new Image();
    this.img.src = 'planets/plan.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;

  };


  Asteroids.Util.inherits(Planet1, Asteroids.MovingObject);


  Planet1.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.position[0], this.position[1], 80, 80);
  };


  Planet1.COLOR = "#00FF00";
  Planet1.RADIUS = 11;

  Planet1.prototype.collideWith = function(otherObject) {


  };

})();
