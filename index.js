/**
 * This script is the entry point for a currency conversion application. It takes a date argument
 * in the format YYYY-MM-DD from the command line, validates the format of the provided date,
 * and then calls the `performConversion` function to handle the currency conversion process.
 * 
 * Dependencies:
 * - `process`: Node.js global object used to access the command line arguments.
 * - `./conversion`: Module that exports the `performConversion` function to perform currency conversions.
 * 
 * Usage:
 * node index.js YYYY-MM-DD
 * 
 * Where YYYY-MM-DD is the date for which the currency conversion should be performed.
 */
const { exit } = require('process');
const { performConversion } = require('./conversion');

const dateArg = process.argv[2];

// Validate the format of the date argument.
if (!dateArg || !/^\d{4}-\d{2}-\d{2}$/.test(dateArg)) {
  console.log('Date argument is required in format YYYY-MM-DD.');
  exit(1);
}

performConversion(dateArg);
