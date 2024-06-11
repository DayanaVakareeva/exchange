# Exchange App

## Overview

Exchange Rate  is a Node.js application that provides utilities for fetching and displaying exchange rates from an external API by date. It allows users to query exchange rates for a specific base currency and date.

## Features

- Fetch exchange rates for any given currency and date.
- Prompt user input for dynamic query generation.
- Load application configuration, including API keys, from a JSON file.

## Installation

Before you begin, ensure you have Node.js installed on your system. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

1. Clone the repository to your local machine: git clone https://github.com/DayanaVakareeva/exchange.git

2. Navigate to the application directory:
  cd exchange

3. Install the required dependencies:
   npm install


## Configuration

1. Rename `config.example.json` to `config.json`.
2. Open `config.json` and update the `apiKey` with your API key from the exchange rate service provider.

## Usage

To start the application, run the following command in your terminal:

Follow the on-screen prompts to enter the base currency and date for which you want to fetch exchange rates.

## Dependencies

- `axios`: For making HTTP requests to the exchange rate API.
- `readline`: For reading input from the console.
- `express`: Used as the web server framework to handle HTTP requests and responses.

### Creator

This application was developed by Dayana Vakareeva.
