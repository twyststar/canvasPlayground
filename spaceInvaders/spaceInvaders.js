//Script for checking keydown from tutorial
$(function () {
  window.keydown = {};

  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
      String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind("keydown", function (event) {
    keydown[keyName(event)] = true;
  });

  $(document).bind("keyup", function (event) {
    keydown[keyName(event)] = false;
  });
});

/** Utility straight from tutorial to stop player from moving off screen
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * <pre>
 * (x * 255).clamp(0, 255)
 * </pre>
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

// Create canvas element and append to spaceInvaders div
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
  "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo("#spaceCanvas");

// Create player object and draw on screen
var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  sprite: Sprite("player"),

  draw: function () {
    this.sprite.draw(canvas, this.x, this.y);
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
  },
  shoot: function () {
    console.log("Pew pew");
    var bulletPosition = this.midpoint();

    playerBullets.push(Bullet({
      speed: 5,
      x: bulletPosition.x,
      y: bulletPosition.y
    }));
  },
  midpoint: function () {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }
};

// Set interval to redraw screen
var FPS = 30;
setInterval(function () {
  update();
  draw();
}, 1000 / FPS);

//Variables for initial text test
// var textX = 50;
// var textY = 50;
// function update() {
 //With initial test in draw function, adds to position to create movement
//   textX += 1;
//   textY += 1;
// }

function update() {

  if (keydown.space) {
    player.shoot();
  }

  if (keydown.left) {
    player.x -= 5;
  }

  if (keydown.right) {
    player.x += 5;
  }

  // if (keydown.up) {
  //   player.y -= 5;
  // }

  // if (keydown.down) {
  //   player.y += 5;
  // }

  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);

  playerBullets.forEach(function (bullet) {
    bullet.update();
  });

  playerBullets = playerBullets.filter(function (bullet) {
    return bullet.active;
  });

  enemies.forEach(function(enemy) {
    enemy.update();
  });

  enemies = enemies.filter(function(enemy) {
    return enemy.active;
  });

  if (Math.random() < 0.1) {
    enemies.push(Enemy());
  }
}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
  playerBullets.forEach(function (bullet) {
    bullet.draw();
  });
  enemies.forEach(function (enemy) {
    enemy.draw();
  });
  //Initial test, this creates text that wanders off screen
  // canvas.fillStyle = "#000"; // Set color to black
  // canvas.fillText("Sup Bro!", textX, textY);
 }

var playerBullets = [];

function Bullet(I) {
  I.active = true;

  I.xVelocity = 0;
  I.yVelocity = -I.speed;
  I.width = 3;
  I.height = 3;
  I.color = "#aadbff";

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

enemies = [];

function Enemy(I) {
  I = I || {};

  I.active = true;
  I.age = Math.floor(Math.random() * 128);

  I.color = "#A2B";
  I.sprite = Sprite("enemy");

  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
  I.y = 0;
  I.xVelocity = 0
  I.yVelocity = 2;

  I.width = 32;
  I.height = 32;

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    this.sprite.draw(canvas, this.x, this.y);
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function () {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

    I.age++;

    I.active = I.active && I.inBounds();
  };

  return I;
};
