(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Planet2 = Asteroids.Planet2 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Planet2.COLOR;
    this.radius = Planet2.RADIUS;
    this.velocity = Asteroids.Util.randomVec(3);
    this.img = new Image();
    this.img.src = 'planets/planet2.png';
    this.quoteimg = new Image();
    this.quoteimg.src = 'quotes/quote1.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;
    this.planet2Timer = 0;

  };


  Asteroids.Util.inherits(Planet2, Asteroids.MovingObject);


  Planet2.prototype.draw = function(ctx) {

    if(this.planet2Timer > 0) {
      ctx.drawImage(this.quoteimg, this.position[0] + 33, this.position[1] - 70, 80, 80);
      this.planet2Timer -= 1;
    }
    ctx.drawImage(this.img, this.position[0], this.position[1], 100, 60);
  };


  Planet2.COLOR = "#00FF00";
  Planet2.RADIUS = 32;
  Planet2.prototype.collideWith = function(otherObject) {};

})();
