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

// Create canvas element and append to spaceInvaders div
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
  "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo("#spaceCanvas");

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
  if (keydown.left) {
    player.x -= 2;
  }

  if (keydown.right) {
    player.x += 2;
  }

  if (keydown.up) {
    player.y -= 2;
  }

  if (keydown.down) {
    player.y += 2;
  }
}

function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
  //Initial test, this creates text that wanders off screen
  // canvas.fillStyle = "#000"; // Set color to black
  // canvas.fillText("Sup Bro!", textX, textY);
 }

//simple player object, will draw player in initial position as plain rect
var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,
  draw: function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};
