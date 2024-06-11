/**
 * This module provides utility functions for prompting user input from the console.
 * It leverages Node.js's readline module to create an interface for reading input from stdin
 * and writing output to stdout. It exports a function `promptInput` for prompting the user
 * with a question and awaiting their input, and the readline interface `rl` itself for direct access if needed.
 * 
 * Dependencies:
 * - `readline`: Node.js module used for reading from and writing to the console.
 */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompts the user with a question and returns their input as a promise.
 * 
 * @param {string} question - The question to prompt the user with.
 * @returns {Promise<string>} A promise that resolves with the user's input.
 */
const promptInput = (question) => new Promise((resolve) => rl.question(question, resolve));

module.exports = { promptInput, rl };