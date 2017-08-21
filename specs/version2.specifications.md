# Specification notes for Version 2

## Public API

### Create a new instance

New timers are created using `new PomodoroClock()`. The constructor takes one optional argument: an object whose property values indicate the HTML element/s to be used for output by the timer. The properties of this object are shown bellow:
- *hoursOutput*
- *minutesOutput*
- *secondsOutput*


Each property value is a string that contain the id or the class of an HTML element. The conversion that is used is the same with the jQuery library. 

Example:
```javascript
const Pclock = new PomodoroClock({
  hoursOutput: '#hours', // output hours in the HTML element with id 'hours'
  minutesOutput: '.minutes', // output minutes in all HTML elements with class 'minutes'
  secondsOutput: '#seconds' // output seconds in the HTML element with id 'seconds'
});
```

All properties are optional. For instance, if you want to show only the minutes you can do:

```javascript
const Pclock = new PomodoroClock({
  minutesOutput: '.minutes', // output minutes in all HTML elements with class 'minutes'
});
```

You are also allowed not to pass any argument in the `PomodoroClock` constructor, if you just want to use the timer functionality of this library and not to print anything.

```javascript
const Pclock = new PomodoroClock;
```

### Start the timer

To start a `PomodoroClock` instance, use the `start()` method. The `start()` method is passed an object that accepts the following properties:
- *workingTime*
- *shortBreakTime*
- *longBreakTime*
- *repeats*
- *repeatsUntilLongBreak*

The default values for each property are:
- *workingTime*: 25
- *shortBreakTime*: 5
- *longBreakTime*: 15
- *repeats*: 1
- *repeatsUntilLongBreak*: 4

**workingTime**, **shortBreakTime** and **longBreakTime** property values are represented in minutes.

All property values must be type of number. For the corresponding property values that don't met the first criteria, the default values will be used instead.`-0` and `0` are behave as equals.

Examples:
```javascript
// ...start a default timer.
Pclock.start();

// ...equivalent as above.
Pclock.start({
  workingTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  repeats:  1,
  repeatsUntilLongBreak: '4'
});

// ...with false values.
Pclock.start({
  workingTime: '3', // default value will be used instead.
  shortBreakTime: 9,
  longBreakTime: -0, // will be treaded as 0.
  repeats:  null, // default value will be used instead.
  // 'repeatsUntilLongBreak' property is not set. Default value will be used instead.
});
```

The return value of `start()` method is a promise that fulfills when timer ends successfully.

Example:
```javascript
Pclock.start().then(() => {
  // fulfillment
  console.log('Timer ended successfully.')
});
```

Invokes on `start()` method in a running timer that has not finished yet results in throwing `Error` object. If you want to restart a running clock, you must reset it first.

Example:
```javascript
function rejectHandler(err) {
  console.log(err.message); // => Error: You have to reset the current timer first. 
}

Pclock.start().catch(rejectHandler);

Pclock.start(); // will throw here.
```

### Reset the timer

To stop and reset a `PomodoroClock` instance, use the `reset()` method.

Unlike `start()`, the `reset()` method is not a promise. It returns `true` if the timer stopped successfully, or `false` otherwise (in case that the timer is not running). 

Example:
```javascript
Pclock.start().then(() => console.log('Timer ended successfully.'));

Pclock.reset(); // => true

Pclock.reset(); // => false (timer is already stopped)
```

### Check the timer state

You can use `isRunning()` method to check whether the timer is activated or not. The method returns a boolean value that indicate the current state of the timer.

 Example:
```javascript
Pclock.isRunning() // => false

Pclock.start().then(() => console.log('Timer ended successfully.'));

Pclock.isRunning() // => true
```