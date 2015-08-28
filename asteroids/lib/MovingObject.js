(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var mo = Asteroids.MovingObject = function(args) {
    this.position = args.pos;
    this.velocity = args.vel;
    this.radius = args.radius;
    this.game = args.game;
    this.color = args.color;
  };

  mo.prototype.isWrappable = true;

  mo.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.position[0],
      this.position[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };


  mo.prototype.isCollidedWith = function(otherObject) {
    var distance = Asteroids.Util.distance(this.position, otherObject.position);
    var radii = this.radius + otherObject.radius;
    return distance < radii;
  };

  mo.prototype.collideWith = function(otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  }

  mo.prototype.move = function() {
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
    if (this.game.isOutOfBounds(this.position) && this.isWrappable) {
      this.position = this.game.wrap(this.position);
    } else if (this.game.isOutOfBounds(this.position)) {
      this.game.remove(this);
    }
  };








})();
