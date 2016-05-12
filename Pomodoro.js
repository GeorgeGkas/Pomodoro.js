/*
 * George G. Gkasdrogkas - georgegkas@gmail.com
 * Version: 1.00 (currently stable), 12/05/2016
 *
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 George G. Gkasdrogkas
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var PomodoroClock = (function() {
    'use strict';
    'esversion: 6';

    // Where to output the clock values
    var hOutput = null;
    var mOutput = null;
    var sOutput = null;

    // constructor
    function PomodoroClock(Output) {
        hOutput = Output.hoursOutput;
        mOutput = Output.minutesOutput;
        sOutput = Output.secondsOutput;
    }

    var countdownWorkId = null;

    // Total number of work-break pairs to repeat
    var RepeatsToDo;

    // Number of current repeat
    var currRepeats;

    // Working time length
    var workingTime;

    // Long break time length
    var longBreakTime;

    // Short break time length
    var shortBreakTime;

    // Shows after how many repeats should 
    var repeatsUntilLongBreak;

    // Input:  seconds
    // Return: array of transformed seconds to [H,M,S]
    var beautifySeconds = (secs) => {
        var sec_num = parseInt(secs, 10);
        var hours = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        return [hours, minutes, seconds]
            .map(v => v < 10 ? '0' + v : v);
    };

    // Purpose: A visual countdown clock.
    //          Decrease the time one second in
    //          each repeat and update the front end 
    //          with the new time. 
    //          Repeat until time goes to zero.
    var countdownWork = function(timeLenght) {
        var d = $.Deferred();
        var m = timeLenght;
        var doDecreaseTime = function() {
            m--;
            var strOutput = beautifySeconds(m);
            $(hOutput).text(strOutput[0]);
            $(mOutput).text(strOutput[1]);
            $(sOutput).text(strOutput[2]);
            if (m !== 0) {
                countdownWorkId = setTimeout(doDecreaseTime, 1000);
            } else {
                d.resolve();
             }
        };
        doDecreaseTime();
        return d.promise();
    };

    // Purpose: Checks if a parameter was added by the user
    // Return: true/false
    var isParam = (param, obj) => {
        if (obj.hasOwnProperty(param)) {
            if (obj[param].length !== 0) {
                return true;
            }
        }
        return false;
    };

    // Purpose: Checks which parameters was added
    //          by the user and update the appropriate 
    //          variables else it keeps the default values
    var setValues = function(obj) {
        if (obj) {
            if (isParam('workingTime', obj)) {
               workingTime = obj.workingTime * 60;
            } else {
                workingTime = 25 * 60;
            }
            if (isParam('shortBreakTime', obj)) {
                shortBreakTime = obj.shortBreakTime * 60;
            } else {
                shortBreakTime = 5 * 60;
            }
            if (isParam('repeats', obj)) {
                RepeatsToDo = obj.repeats;
            } else {
                RepeatsToDo = 1;
            }
            if (isParam('longBreakTime', obj)) {
                longBreakTime = obj.longBreakTime * 60;
            } else {
                longBreakTime = 15 * 60;
            }
            if (isParam('repeatsUntilLongBreak', obj)) {
                repeatsUntilLongBreak = obj.repeatsUntilLongBreak;
            } else {
                repeatsUntilLongBreak = 4;
            }
        } else {
            workingTime = 25 * 60;
            shortBreakTime = 5 * 60;
            RepeatsToDo = 1;
            longBreakTime = 15 * 60;
            repeatsUntilLongBreak = 4;
        }
        currRepeats = 0;
    };

    // Purpose: Main method that starts the clock
    PomodoroClock.prototype.start = function(clockOptions, callback) {
        setValues(clockOptions);    // initialize the values of the clock
        var remainingToLongBreak = 0;

        // Purpose: Check if we need to do another
        //          one repeat or we have finished
        //          our clock so the callback() function
        //          is executed if set.
        var checkWorkState = function() {
            // Has the clock ended yet?
            if (currRepeats != RepeatsToDo) {
                work();
            } else {
                clearTimeout(countdownWorkId);
                typeof callback === "function" && callback();
            }
        };

        // Purpose: This function holds the work time
        //          as well as the break time that needs
        //          to be executed.
        //          It also checks how many times we have
        //          to repeat our process.
        var work = function() {
            currRepeats++;
            remainingToLongBreak++;
            // It's work time!
            countdownWork(workingTime).then(function() {
                if (remainingToLongBreak == repeatsUntilLongBreak) {
                    remainingToLongBreak = 0;
                    // It's long break time!
                    countdownWork(longBreakTime).then(function() {
                        checkWorkState();
                    });
                } else {
                    // It's short break time!
                    countdownWork(shortBreakTime).then(function() {
                        checkWorkState();
                    });
                }
            });
        };

        work();
    };

    // Purpose: Main method that sets the clock to zero values
    //          reseting the clock states
    PomodoroClock.prototype.reset = function() {
        $(hOutput).text('00');
        $(mOutput).text('00');
        $(sOutput).text('00');
        clearTimeout(countdownWorkId);
    };

    return PomodoroClock;
})();
