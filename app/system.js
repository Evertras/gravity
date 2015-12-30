var Molecule = require('./molecule');

function System(startingMoleculeCount, width, height) {
  var s = this;

  this.molecules = [];

  function makeEarthSystem() {
    var initialV = 150;
    var earth = new Molecule(100);
    earth.x = width / 2;
    earth.y = height / 2;

    var moon = new Molecule(6);

    moon.x = width / 2 + 200;
    moon.y = height / 2;

    moon.vy = initialV;
    earth.vy = -(initialV * moon.mass / earth.mass);

    s.molecules.push(earth);
    s.molecules.push(moon);
  }

  this.draw = function(context) { for (var i = 0; i < s.molecules.length; ++i) {
      s.molecules[i].draw(context);
    }
  };
  
  function calculateForceFor(thisMolecule) {
    return s.molecules.reduce(function(f, molecule) {
      if (molecule.x === thisMolecule.x && molecule.y === thisMolecule.y) {
        return f;
      }

      var dSqrd = Math.max(Math.pow(thisMolecule.x - molecule.x, 2) + Math.pow(thisMolecule.y - molecule.y, 2), 16);
      var d = Math.sqrt(dSqrd);

      var totalForce = molecule.mass / dSqrd;

      var directionalVector = {
        x: (molecule.x - thisMolecule.x) / d,
        y: (molecule.y - thisMolecule.y) / d
      };

      f.x += directionalVector.x * totalForce;
      f.y += directionalVector.y * totalForce;

      return f;
    }, { x: 0, y: 0 });
  }

  this.update = function(delta) {
    var i;

    for (i = 0; i < s.molecules.length; ++i) {
      var thisMolecule = s.molecules[i];

      var force = calculateForceFor(thisMolecule);

      thisMolecule.vx += force.x * delta;
      thisMolecule.vy += force.y * delta;

      thisMolecule.fx = force.x;
      thisMolecule.fy = force.y;
    }

    for (i = 0; i < s.molecules.length; ++i) {
      s.molecules[i].update(delta);
    }
  };

  this.addMolecule = function(size, x, y, maxSpeed) {
    var molecule = new Molecule(size);

    if (!maxSpeed) {
      maxSpeed = 0;
    }

    molecule.x = x;
    molecule.y = y;

    molecule.vx = Math.random() * maxSpeed - maxSpeed * 0.5;
    molecule.vy = Math.random() * maxSpeed - maxSpeed * 0.5;

    s.molecules.push(molecule);
  };
}

module.exports = System;
