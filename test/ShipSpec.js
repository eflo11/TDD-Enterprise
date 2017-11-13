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
    let targetOne = {
        distance: 5,
        id: 'blahh',
        hit: sinon.stub()
      },
      targetTwo = {
        distance: 2,
        id: 'bluhh',
        hit: sinon.stub()
      };

    it('should process a round', () => {
      assert.isFunction(ship.nextRound, 'should be a method on ship');
      assert.strictEqual(ship.round, 0, 'should start the round at 0');
      ship.nextRound();
      assert.strictEqual(ship.round, 1, 'should increment the round');
    });

    it('should move all the missiles in flight', () => {
      ship.fireMissile(targetOne);
      ship.fireMissile(targetTwo);

      assert.strictEqual(ship.submodules.missileLauncher.missilesLaunched.length, 2, 'should have two missiles launched');

      ship.nextRound();

      assert.strictEqual(targetOne.distance, 4, 'should have moved one unit closer');
      assert.strictEqual(targetTwo.distance, 1, 'should have moved one unit closer');
    });

    it('should invoke the hit function when target has been reached by the missile', () => {
      ship.fireMissile(targetOne);
      ship.fireMissile(targetTwo);

      ship.nextRound();
      ship.nextRound();

      assert.isFalse(targetOne.hit.called, 'should not have hit the first target yet');
      assert.isTrue(targetTwo.hit.calledOnce, 'should have hit the second target');
      assert.strictEqual(ship.submodules.missileLauncher.missilesLaunched.length, 1, 'should have removed the hit missile');
      assert.deepEqual(ship.submodules.missileLauncher.missilesLaunched[0], targetOne, 'should still have the first missile in route');
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
      let target = {
        distance: 5,
        id: 'blahh',
        hit: () => {}
      };

      assert.isFunction(ship.fireMissile, 'should have a fireMissile on ship');
      ship.fireMissile(target);
      assert.strictEqual(ship.submodules.missileLauncher.missilesLaunched.length, 1, 'should have one missile launched');
      assert.deepEqual(ship.submodules.missileLauncher.missilesLaunched[0], target, 'should have the missile target passed in');
    });

    it('should still fire missiles under extreme duress but damage the ship hull', () => {
      ship.submodules.missileLauncher.status = 'DAMAGED';
      ship.fireMissile();

      assert.strictEqual(ship.hitpoints, 99, 'should have done 1 damage to the hull');
      assert.strictEqual(ship.submodules.missileLauncher.missilesLaunched.length, 1, 'should have one missile launched');
    });

    it('should not fire missiles if the launcher has been destroyed', () => {
      ship.submodules.missileLauncher.status = 'DESTROYED';
      ship.fireMissile();

      assert.strictEqual(ship.hitpoints, 100, 'should not damage the hull');
      assert.strictEqual(ship.submodules.missileLauncher.missilesLaunched.length, 0, 'should have zero missile launched');
    });

  });

});
