#Pomodoro JS
![](https://img.shields.io/badge/version-1.0%20stable-2980b9.svg?style=flat-square) ![](https://img.shields.io/badge/ECMAScript-2015%20/%20v6-1abc9c.svg?style=flat-square) ![](https://img.shields.io/badge/license-MIT-3498db.svg?style=flat-square) 

####A javascript time management library for busy humans.
----------

## What this project is

> The Pomodoro Technique is a time management method developed by
> Francesco Cirillo in the late 1980s. The technique uses a timer to
> break down work into intervals, traditionally 25 minutes in length,
> separated by short breaks.
> *--from [Wikipedia's article](https://en.wikipedia.org/wiki/Pomodoro_Technique)*


**Pomodoro.js** allows you to visualize the above technic in your browser.

##Installation

You only need to download  the **Pomodoro.js** file from this project. 

[Download the project file.](https://github.com/GeorgeGks/Pomodoro.js/archive/master.zip)

or via git clone

`git clone https://github.com/GeorgeGks/Pomodoro.js.git`


##Getting Started

Create a new class instance and fill the output object keys with the ids (or classes) of the html elements you want the time to be shown.
```javascript
var Pclock = new PomodoroClock({
    hoursOutput': '#hours',
    'minutesOutput': '.minutes',
    'secondsOutput': '#seconds'
});
```
You can fill only some of the above values. So if you want to show only minutes you do the follwoing:
```javascript
var Pclock = new PomodoroClock({
    'minutesOutput': '.minutes'
});
```
###Basic usage

![](http://storage6.static.itmages.com/i/16/0512/h_1463068910_6833375_5046a0e223.png)

To start the timer with the default values type:

    Pclock.start();

This will start a countdown clock with one working period of 25 minutes following by a break of 5 minutes.

If you want to reset the timer to zero in the middle of the process use the bellow line:

    Pclock.reset();

###Advance usage

The power of this library lies in the customization of the clock parameters. 
You can start a custom clock like this:
```javascript
    Pclock.start({
        'workingTime': 25,
        'shortBreakTime': 5,
        'longBreakTime': '15',
        'repeats':  1,
        'repeatsUntilLongBreak': '4'
    });
```
Note that the above values are represent minutes and **should be** numbers or string numbers. Also the above values are the default values of the clock. You can also not use all the fields. 

Let's say we want to change only the short break time to 10 minutes. We type:
```javascript
    Pclock.start({
       'workingTime': '',
       'shortBreakTime': 10
    });
```
The other values left untouched so the result would be to make a  25 time work and 10 time break for one repeat. 

Also note that if we pass an empty string the program, it uses the default value (useful for html input fields that are left bank).


####**Callback support**

You can pass a callback function if you line in the `.start()` method like this:
```javascript
    Pclock.start(function() {
         alert('The lock has finished');           
    });
```
The above example will run a default clock and will alert a message on end. 

##License

Copyright (c) 2016 George G. Gkasdrogkas
Licensed under the MIT license.


