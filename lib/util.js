(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function() {
  };

  Util.distance = function(vec1, vec2) {
    var dx = vec1[0] - vec2[0];
    var dy = vec1[1] - vec2[1];
    return Math.sqrt((dx * dx) + (dy * dy));
  };

  Util.asteroidNorm = function(vec1, vec2) {
    var distance = this.distance(vec1, vec2);
    var dx = vec1[0] - vec2[0];
    var dy = vec1[1] - vec2[1];
    return [(dx/distance) * 2, (dy/distance) * 2]

  };

  Util.norm = function(vec) {
    return this.distance([0,  0], vec);
  };

  Util.randomVec = function(length) {
    var dx = (Math.random() * 2) - 1;
    var dy = (Math.random() * 2) - 1;
    dx = dx / this.norm([dx, dy]) * Math.sqrt(length);
    dy = dy / this.norm([dx, dy]) * Math.sqrt(length);
    return [dx, dy];
  };

  Util.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };
})();
