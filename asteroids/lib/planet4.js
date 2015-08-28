(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Planet4 = Asteroids.Planet4 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Planet4.COLOR;
    this.radius = Planet4.RADIUS;
    this.velocity = Asteroids.Util.randomVec(3);
    this.img = new Image();
    this.img.src = 'planets/planet4.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;
    this.planet2Timer = 0;
    this.quoteimg = new Image();
    this.quoteimg.src = 'quotes/quote2.png';

  };


  Asteroids.Util.inherits(Planet4, Asteroids.MovingObject);


  Planet4.prototype.draw = function(ctx) {
    if(this.planet2Timer > 0) {
      ctx.drawImage(this.quoteimg, this.position[0] + 58, this.position[1] - 62, 80, 80);
      this.planet2Timer -= 1;
    }
    ctx.drawImage(this.img, this.position[0], this.position[1], 80, 80);
  };


  Planet4.COLOR = "#00FF00";
  Planet4.RADIUS = 11;

  Planet4.prototype.collideWith = function(otherObject) {


  };

})();
