function Molecule(radius) {
  var m = this;

  function calculateMass(r) {
    return 4 / 3 * Math.PI * Math.pow(r, 3);
  }

  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.r = radius;
  this.mass = calculateMass(radius);
  this.fx = 0;
  this.fy = 0;

  this.draw = function(context) {
    context.beginPath();
    context.arc(m.x, m.y, m.r, 0, Math.PI * 2.0);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = 'red';
    context.closePath();
    //context.fill();

    /*
    context.beginPath();
    context.font = m.r*3/2 + 'px Arial';
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText(symbol, m.x, m.y + m.r / 2);
    context.closePath();
    */

    var forceLength = Math.sqrt(m.fx * m.fx + m.fy * m.fy);
    var normalizedForce = {
      x: m.fx / forceLength,
      y: m.fy / forceLength
    };

    context.beginPath();
    context.moveTo(m.x, m.y);
    context.lineTo(m.x + normalizedForce.x * m.r * 2, m.y + normalizedForce.y * m.r * 2);
    context.strokeStyle = 'red';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(m.x, m.y);
    context.lineTo(m.x + m.vx, m.y + m.vy);
    context.strokeStyle = 'blue';
    context.stroke();
    context.closePath();
  };

  this.update = function(delta) {
    m.x += m.vx * delta;
    m.y += m.vy * delta;
  };
}

module.exports = Molecule;
