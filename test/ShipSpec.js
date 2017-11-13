'use strict';

let sinon = require('sinon');
let assert = require('chai').assert;
let Ship = require('../src/Ship');

/**
 * The most important file in this project, the ship spec.
 */
describe('Ship', () => {

 let ship;

 beforeEach(() => {
    ship = new Ship();
  });

 describe('Some ship feature', () => {

   it('should do something', () => {
      // What should it do?
    });


 });

 describe('Round', () => {

   it('should process a round', () => {
      assert.isFunction(ship.nextRound, 'should be a method on ship');
    });

 });

 describe('Hull', () => {

   it('should have hitpoints', () => {
      assert.isNumber(ship.hitpoints, 'should have hitpoints');
      assert.strictEqual(ship.hitpoints, 100, 'should have initialized 100 hitpoints');
    });

   it('should be damageable', () => {
      assert.isFunction(ship.damageShip, 'should be a method damageShip');
      ship.damageShip(25);
      assert.strictEqual(ship.hitpoints, 75, 'should have 75 hitpoints left');
   });
  });

 describe('SubModules - Foundation', () => {

   describe('should have a SubModules property', () => {
      it('should be an object', () => {
        assert.isObject(ship.submodules);
      });

   });

   it('should have a damageSubmodule function', () => {
     assert.isFunction(ship.damageSubmodule, 'should be function');
     assert.strictEqual(ship.submodules.missileLauncher.status, 'OK', 'should have an OK status');
     ship.damageSubmodule('missileLauncher');
     assert.strictEqual(ship.submodules.missileLauncher.status, 'DAMAGED', 'should have degraded status of submodule');
     ship.damageSubmodule('missileLauncher');
     assert.strictEqual(ship.submodules.missileLauncher.status, 'DESTROYED', 'submodule should have been DESTROYED');
     ship.damageSubmodule('missileLauncher');
     assert.strictEqual(ship.submodules.missileLauncher.status, 'DESTROYED', 'should remain at the DESTROYED state');
   });

   it('should have a submodule for missileLauncher', () => {
     assert.isObject(ship.submodules.missileLauncher, 'should have a submodule for missileLauncher');
     assert.strictEqual(ship.submodules.missileLauncher.status, 'OK', 'should have a status object on the missileLauncher');
     assert.isArray(ship.submodules.missileLauncher.missilesLaunched, 'should be an array');
   });

   it('should fireMissile at target', () => {
     assert.isFunction(ship.fireMissile, 'should have a fireMissile on ship');
     ship.fireMissile({
       
     });
   });

 });

});
