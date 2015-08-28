(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Alien2 = Asteroids.Alien2 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Alien2.COLOR;
    this.radius = Alien2.RADIUS;
    this.velocity = Asteroids.Util.randomVec(3);
    this.img = new Image();
    this.img.src = 'planets/alien2.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;
    this.quoteimg = new Image();
    this.quoteimg.src = 'quotes/quote5.png';

  };


  Asteroids.Util.inherits(Alien2, Asteroids.MovingObject);


  Alien2.prototype.draw = function(ctx) {
    if(this.planet2Timer > 0) {
      ctx.drawImage(this.quoteimg, this.position[0] + 40, this.position[1] - 50, 80, 80);
      this.planet2Timer -= 1;
    }
    ctx.drawImage(this.img, this.position[0], this.position[1], 80, 80);
  };


  Alien2.COLOR = "#00FF00";
  Alien2.RADIUS = 11;

  Alien2.prototype.collideWith = function(otherObject) {


  };

})();
