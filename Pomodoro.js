/*
 * George Gkasdrogkas - georgegkas@gmail.com
 * Version: 2.0.0 (in development), 21/8/2017
 * Project Page: https://github.com/GeorgeGkas/Pomodoro.js/tree/version2
 *
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 George Gkasdrogkas
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function (exports) {
  const hOutput = Symbol('hO');
  const mOutput = Symbol('mO');
  const sOutput = Symbol('sO');

  class Pomodoro {
    constructor({ hours = null, minutes = null, seconds = null } = {}) {
      this[hOutput] = hours;
      this[mOutput] = minutes;
      this[sOutput] = seconds;
    }

    static toString() {
      return Pomodoro.prototype[Symbol.toStringTag];
    }
  }

  Pomodoro.prototype[Symbol.toStringTag] = 'Pomodoro';

  exports.Pomodoro = Pomodoro;
}(typeof window !== 'undefined' ? window : module.exports));
