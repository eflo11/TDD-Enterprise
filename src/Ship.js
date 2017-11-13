'use strict';

/**
 * Implement your tasks here using TDD.
 */
class Ship {

 constructor() {

  this.hitpoints = 100;
  this.submodules = {
    missileLauncher: {
      status: 'OK',
      missilesLaunched: []
    }
  };
  this.round = 0;
}

 // Method

  nextRound() {
    ++this.round;
    this.submodules.missileLauncher.missilesLaunched.forEach((target, index) => {
      --target.distance;

      // hit target and remove missiles
      if (target.distance === 0) {
        target.hit();
        this.submodules.missileLauncher.missilesLaunched.splice(index);
      }
    });
  }

  damageShip(dmg) {
    this.hitpoints -= dmg;
  }

  damageSubmodule(submodule) {
     switch(this.submodules[submodule].status) {
       case 'OK':
        this.submodules[submodule].status = 'DAMAGED';
        break;
      case 'DAMAGED':
        this.submodules[submodule].status = 'DESTROYED';
        break;
      default:
        break;
     }
  }

  fireMissile(target) {
    if (this.submodules.missileLauncher.status === 'DAMAGED') {
      --this.hitpoints;
    } else if (this.submodules.missileLauncher.status === 'DESTROYED') {
      return;
    }

    this.submodules.missileLauncher.missilesLaunched.push(target);
  }

}

module.exports = Ship;
