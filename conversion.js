/**
 * This module provides a function to perform currency conversions based on user input.
 * It interacts with the user through the console, allowing them to input the amount,
 * base currency, and target currency for conversion. The conversion rates are fetched
 * from an external service. The results of the conversion, along with the date of conversion,
 * are saved to a JSON file named after the conversion date.
 * 
 * Dependencies:
 * - `./input`: A module that exports a `promptInput` function for reading user input and `rl` for readline interface.
 * - `./exchangeService`: A module that exports a `getExchangeRate` function to fetch exchange rates for currencies.
 * - `fs`: Node.js File System module for reading from and writing to files.
 * - `path`: Node.js Path module for handling file paths.
 */
const { promptInput, rl } = require('./input');
const { getExchangeRate } = require('./exchangeService');
const fs = require('fs');
const path = require('path');

/**
 * Asynchronously performs currency conversions based on user inputs.
 * The user is prompted to enter an amount (with up to two decimal places),
 * a base currency code (3-letter ISO code), and a target currency code.
 * The function fetches the exchange rate for the given date, calculates the converted amount,
 * and logs the result. The conversion details are saved to a JSON file named with the conversion date.
 * 
 * @param {string} date - The date for which to fetch the exchange rate, in YYYY-MM-DD format.
 */
const performConversion = async (date) => {
  while (true) {
    let amountStr = await promptInput('');
    if (amountStr.toUpperCase() === 'END') break;   
    if (!/^\d+(\.\d{1,2})?$/.test(amountStr)) {
      console.log('Please enter a valid amount with up to two decimal places.');
      continue;
    }
    let amount = parseFloat(amountStr);
    if (isNaN(amount)) {
      console.log('Please enter a valid amount.');
      continue;
    }

    let rates = null;
    let base = '';
    while (true) {
      let baseInput = await promptInput('');
      base = baseInput.toUpperCase();
      if (base === 'END') return; 
      if (!/^[A-Z]{3}$/.test(base)) {
        console.log('Please enter a valid currency code.');
        continue; 
      }
    
      rates = await getExchangeRate(base, date);
      if (!rates) {
        continue; 
      }
      break;
    }

    let target = '';
    while (true) {
      let targetInput = await promptInput('');
      target = targetInput.toUpperCase();
      if (target === 'END') return; 
      if (!/^[A-Z]{3}$/.test(target) || !rates[target]) {
        console.log('Please enter a valid currency code');
        continue; 
      }
      break; 
    }

    let rate = rates[target];
    const convertedAmount = (amount * rate).toFixed(2);
    console.log(`${amount} ${base} is ${convertedAmount} ${target}`);

    const conversionResult = { base, target, amount, convertedAmount, date: new Date().toISOString().split('T')[0] };
    const fileName = `conversions_${conversionResult.date}.json`;
    const filePath = path.join(__dirname, fileName);

    let data = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath);
      data = JSON.parse(fileContent.toString());
    }
    data.push(conversionResult);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  rl.close();
};

module.exports = { performConversion };