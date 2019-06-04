import getDate from '../helpers/getDate'
import getTime from '../helpers/getTime'

/// CONSOLE.LOG REPLACEMENT THAT PREPENDS DATE AND TIME
// const originalConsoleLog = console.log;
// const consoleLogWithDateAndTime = function log() {
//   originalConsoleLog.apply(console, [getDate(),getTime(), ...arguments]);
// };

/// EXPORT
// module.exports = consoleLogWithDateAndTime


const originalConsoleLog = console.log;
console.log = function log() {
  originalConsoleLog.apply(console, [getDate(),getTime(), ...arguments]);
};
