(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Alien1 = Asteroids.Alien1 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Alien1.COLOR;
    this.radius = Alien1.RADIUS;
    this.velocity = Asteroids.Util.randomVec(3);
    this.img = new Image();
    this.img.src = 'planets/alien1.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;
    this.planet2Timer = 0;
    this.quoteimg = new Image();
    this.quoteimg.src = 'quotes/quote4.png';

  };


  Asteroids.Util.inherits(Alien1, Asteroids.MovingObject);


  Alien1.prototype.draw = function(ctx) {
  
    if(this.planet2Timer > 0) {
      ctx.drawImage(this.quoteimg, this.position[0] + 50, this.position[1] - 60, 80, 80);
      this.planet2Timer -= 1;
    }
    ctx.drawImage(this.img, this.position[0], this.position[1], 80, 80);
  };


  Alien1.COLOR = "#00FF00";
  Alien1.RADIUS = 30;

  Alien1.prototype.collideWith = function(otherObject) {


  };

})();
