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
const axios = require('axios');
const { loadConfig } = require('./config');

const { apiKey } = loadConfig();

/**
 * Fetches exchange rates for a given base currency and date from an external API.
 * 
 * @param {string} base - The base currency code (3-letter ISO code).
 * @param {string} date - The date for which to fetch exchange rates, in YYYY-MM-DD format.
 * @returns {Promise<Object|null>} A promise that resolves with the exchange rates data as an object,
 *                                  or null if an error occurs or the data is not available.
 * @throws {Error} Throws an error if the date is invalid or if no data is found for the specified currency.
 */
const getExchangeRate = async (base, date) => {
    base = base.toUpperCase();
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
        throw new Error('Invalid date value');
    }
    const formattedDate = validDate.toISOString().split('T')[0];
    try {
        const response = await axios.get(`https://api.fastforex.io/fetch-all?from=${base}&date=${formattedDate}&api_key=${apiKey}`);
        
        if (!response.data || typeof response.data !== 'object' || !response.data.results || Object.keys(response.data.results).length === 0) {
            throw new Error(`No exchange rate data found for ${base} on ${formattedDate}`);
        }
        
        if (!response.data.results[base]) {
            throw new Error(`Invalid currency code or no data for ${base}`);
        }
        return response.data.results;
    }  catch (error) {
        if (error.response && error.response.status === 400) {
           
            console.error("Please enter a valid currency code");
            return null; 
        } else {           
            console.error("An error occurred while fetching exchange rates");
            return null;
        }
    }
};

module.exports = { getExchangeRate };