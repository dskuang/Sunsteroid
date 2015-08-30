(function(){
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(args){
    Asteroids.MovingObject.call(this, args);
    this.radius = Ship.RADIUS;
    this.color = Ship.COLOR;
    this.velocity = args.vel || [0,0];
    this.img = document.createElement("img");
    this.img.src = 'sun.png';

    this.health = 100;
    this.hit = false;
    var canvasEl = document.getElementById("game-canvas");
    this.fired = false;
    canvasEl.addEventListener("click", this.getMousePos.bind(this));

  };

  Ship.RADIUS = 25;
  Ship.COLOR = "#ff0000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function(ctx) {
    if(this.health <= 0) {
      this.img = new Image();
      this.img.src = '';
    } else {
      this.img.src = 'sun.png'
    }
    var canvas = document.getElementById("game-canvas");
    this.position[0] = (canvas.width ) / 2;
    this.position[1] = (canvas.height) / 2;
    ctx.drawImage(this.img, this.position[0] - 30, this.position[1] - 30, 70, 70);

  };


  // Ship.prototype.relocate = function () {
  //   this.position = this.game.randomPosition();
  //   this.velocity = [0, -1];
  // };

  // Ship.prototype.power = function(impulse) {
  //   if (this.bulletVelocity[0] == -1 || this.bulletVelocity[0] == 0 || this.bulletVelocity[0] == 1) {
  //     this.bulletVelocity[0] += impulse[0];
  //
  //   } else {
  //     this.bulletVelocity[0] = 0;
  //     this.bulletVelocity[0] += impulse[0];
  //
  //   }
  //
  //   if (this.bulletVelocity[1] == -1 || this.bulletVelocity[1] == 0 || this.bulletVelocity[1] == 1) {
  //     this.bulletVelocity[1] += impulse[1];
  //
  //   } else {
  //     this.bulletVelocity[1] = 0;
  //     this.bulletVelocity[1] += impulse[1];
  //
  //   }
  // };

  Ship.prototype.getMousePos = function(e) {

    this.cursorX = e.clientX;
    this.cursorY = e.clientY;
    this.fireBullet();
  };


  Ship.prototype.fireBullet = function() {

      var bullet = new Asteroids.Bullet({pos: [this.position[0] - 16,
                                          this.position[1] - 14],
                                         game: this.game
                                       });
      bullet.velocity = Asteroids.Util.asteroidNorm([this.cursorX,
                            this.cursorY], this.position.slice(0));
      bullet.velocity[0] *= 3;
      bullet.velocity[1] *= 3;

      this.game.add(bullet);

  }

})();
