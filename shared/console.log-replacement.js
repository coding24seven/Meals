import getDate from '../shared/get-date'
import getTime from '../shared/get-time'

/// CONSOLE.LOG REPLACEMENT THAT PREPENDS DATE AND TIME
const originalConsoleLog = console.log;
console.log = function () {
  originalConsoleLog.apply(console, [getDate(), getTime(), ...arguments]);
};
