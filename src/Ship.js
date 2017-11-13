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
}

 // Method

 nextRound() {

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
    this.missileLauncher.missilesLaunched.push(target);
  }

}

module.exports = Ship;
