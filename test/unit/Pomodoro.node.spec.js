import { suite, test } from 'mocha';
import { assert } from 'chai';
import { Pomodoro } from '../../Pomodoro';

suite('Pomodoro.js - Unit Tests', () => {
  suite('constructor resolution', () => {
    test('should return constructor', () => {
      assert.isFunction(Pomodoro);
    });
    test('constructor name should be Pomodoro', () => {
      assert.strictEqual(Pomodoro.name, 'Pomodoro');
      assert.strictEqual(Pomodoro.toString(), 'Pomodoro');
    });
  });

  suite('constructor arguments', () => {
    test('should instantiate without passing arguments', () => {
      assert.doesNotThrow(() => new Pomodoro());
    });
    test('instantiate without passing arguments should create Symbol properties with null values', () => {
      const PomodoroInstance = new Pomodoro();
      const PomodoroSymbols = Object.getOwnPropertySymbols(PomodoroInstance);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[0]], null);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[1]], null);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[2]], null);
    });
    test('passing arguments when instantiate should create Symbol properties with passed values', () => {
      const values = { hours: 'h', minutes: 'm', seconds: 's' };
      const PomodoroInstance = new Pomodoro(values);
      const PomodoroSymbols = Object.getOwnPropertySymbols(PomodoroInstance);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[0]], values.hours);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[1]], values.minutes);
      assert.strictEqual(PomodoroInstance[PomodoroSymbols[2]], values.seconds);
    });
  });

  suite('instance identity', () => {
    const PomodoroInstance = new Pomodoro();

    test('should be type of Pomodoro', () => {
      assert.typeOf(PomodoroInstance, 'Pomodoro');
    });
    test('should be identified as instance of Pomodoro in toString()', () => {
      assert.instanceOf(PomodoroInstance, Pomodoro);
      assert.strictEqual(PomodoroInstance.toString(), '[object Pomodoro]');
      assert.strictEqual(Object.prototype.toString.call(PomodoroInstance), '[object Pomodoro]');
    });
  });
});
