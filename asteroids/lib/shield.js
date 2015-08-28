(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Shield = Asteroids.Shield = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Shield.COLOR;
    this.radius = Shield.RADIUS;
    this.img = new Image();
    this.img.src = 'shield.png';
    this.game = args.game;
    this.isWrappable = false;
    this.ship = this.game.ship;
    this.timer = 0;
  };


  Asteroids.Util.inherits(Shield, Asteroids.MovingObject);



  Shield.prototype.draw = function(ctx) {

   ctx.drawImage(this.img, this.game.ship.position[0] - 46, this.game.ship.position[1] - 46, 100, 100);

  };


  Shield.COLOR = "#00FF00";
  Shield.RADIUS = 11;

  Shield.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {

    }
  };

})();
