import getDate from '../shared/getDate'
import getTime from '../shared/getTime'

/// CONSOLE.LOG REPLACEMENT THAT PREPENDS DATE AND TIME
const originalConsoleLog = console.log;
console.log = function log() {
  originalConsoleLog.apply(console, [getDate(), getTime(), ...arguments]);
};



