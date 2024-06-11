/**
 * This module provides a function to fetch exchange rates from an external API.
 * It uses the axios library to make HTTP requests and requires an API key for authentication.
 * The function `getExchangeRate` fetches exchange rates for a specified base currency and date.
 * 
 * Dependencies:
 * - `axios`: A promise-based HTTP client for making requests to external services.
 * - `./config`: A module that exports a `loadConfig` function to load configuration settings, including the API key.
 * 
 * The module exports:
 * - `getExchangeRate`: A function to fetch exchange rates for a given currency and date.
 */
const fs = require('fs');

/**
 * Reads the `config.json` file from the current directory, parses it as JSON, and returns the configuration object.
 * 
 * @returns {Object} The parsed configuration object from `config.json`.
 * @throws {Error} Throws an error if the file cannot be read or if the JSON is invalid.
 */
const loadConfig = () => {
  return JSON.parse(fs.readFileSync('config.json'));
};

module.exports = { loadConfig };