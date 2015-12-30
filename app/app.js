var Molecule = require('./molecule');
var System = require('./system');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fps = 120;
var tickRate = 1000 / fps;
var system = new System(2, canvas.width, canvas.height);

function fillGrid() {
  for (var x = 0; x < canvas.width; x += 40) {
    for (var y = 0; y < canvas.height; y += 40) {
      system.addMolecule(10, x, y, 0);
    }
  }
}

function fillSpiral() {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;

  for (var r = Math.min(canvas.width, canvas.height) / 2; r > 0; r -= 10) {
    system.addMolecule(10, centerX + Math.cos(r / 10) * r, centerY + Math.sin(r / 10) * r);
  }
}

function fillCircle(ratio) {
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var r = Math.min(canvas.width, canvas.height) / 2 * ratio;

  for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 16) {
    system.addMolecule(10, centerX + Math.cos(theta) * r, centerY + Math.sin(theta) * r);
  }
}

/*
fillCircle(1);
fillCircle(0.9);
fillCircle(0.8);
fillCircle(0.7);
*/

canvas.onmousedown = function(e) {
  var rect = canvas.getBoundingClientRect();

  system.addMolecule(10, e.clientX - rect.left, e.clientY - rect.top, 0);
};

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  system.draw(context);
}

function update() {
  system.update(tickRate / 1000);
}

setInterval(function() {
  update();
  draw();
}, tickRate);
