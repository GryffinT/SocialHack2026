'use strict';

const path = require('path') // need ts to access handlers reliably

// handlers for the task api are going in ./handlers, look there for further implementation info!
const { registerTaskHandlers } = require(path.join(__dirname, 'handlers', 'taskHandlers.js'));

//  Calls handler registerers for further use OUTSIDE 
const registerHandlers = () => {

  registerTaskHandlers(); // from above

};

module.exports = { registerHandlers }; // exports registerHandlers so it can be used elsewhere (who knows where)
