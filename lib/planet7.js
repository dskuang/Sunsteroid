(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var Planet7 = Asteroids.Planet7 = function(args) {
    Asteroids.MovingObject.call(this, args);
    this.color = Planet7.COLOR;
    this.radius = Planet7.RADIUS;
    this.velocity = Asteroids.Util.randomVec(3);
    this.img = new Image();
    this.img.src = 'planets/planet7.png';
    this.game = args.game;
    this.isWrappable = true;
    this.ship = args.ship;
    this.planet2Timer = 0;
    this.quoteimg = new Image();
    this.quoteimg.src = 'quotes/quote3.png';


  };


  Asteroids.Util.inherits(Planet7, Asteroids.MovingObject);


  Planet7.prototype.draw = function(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.position[0], this.position[1], 34,  2* Math.PI, false);
    // context.fillStyle = 'green';
    // ctx.fill();
    // ctx.stroke();
    if(this.planet2Timer > 0) {
      ctx.drawImage(this.quoteimg, this.position[0] - 60, this.position[1] - 50, 80, 80);
      this.planet2Timer -= 1;
    }
    ctx.drawImage(this.img, this.position[0], this.position[1], 80, 80);
  };


  Planet7.COLOR = "#00FF00";
  Planet7.RADIUS = 33;

  Planet7.prototype.collideWith = function(otherObject) {


  };

})();
