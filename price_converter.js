// Using axios to make API calls
const axios = require('axios');

// APIs used for this project. All keys are retrieved for free from respective source.
// Exchange Rates: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// Stock Price: https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=f02d97317321d926e73f2343ac8a5b65


/**
 * Retrieves currency data through fixer API, and uses EUR to exchange between given currencies.
 * API does not include error handling, so throw included with dynamic error.
 * @param {*} fromCurrency 
 * @param {*} toCurrency 
 * @returns float exchange rate
 */
const getExchangeRate = async (fromCurrency, toCurrency) => {
    // Calling API through axios
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exRate = euro * rate[toCurrency];

    // Checking if the resulting exchange rate is a number
    if ( isNaN(exRate) ) {
        throw new Error ( `Unable to get exchange rate between ${fromCurrency} and ${toCurrency}.` )
    }

    return exRate;
}


/**
 * Retrieves the current price of a stock through the FMP API.
 * API does not included required error handling, included throw.
 * @param {*} stockSymbol 
 * @returns float price
 */
const getPrice = async (stockSymbol) => {
    // Calling API through axios
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${stockSymbol}?apikey=f02d97317321d926e73f2343ac8a5b65`);

    // Checking if data contains any values
    if ( response.data.length == 0 ) {
        throw new Error ( `Unable to retrieve price data for ${stockSymbol}.` )
    } 

    return response.data[0]['price'];
}


/**
 * Calls getExchangeRate and getPrice functions and converts the stock price using the exchange rate.
 * @param {*} fromCurrency 
 * @param {*} toCurrency 
 * @param {*} stockSymbol 
 * @returns float converted price
 */
const convertPrice = async (fromCurrency, toCurrency, stockSymbol) => {
    // Getting exchange rate
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    // Getting price of desired stock
    const stockPrice = await getPrice(stockSymbol);
    // Converting price and rounding to 2 decimals
    const convertedPrice = (stockPrice * exchangeRate).toFixed(2);

    return `${stockSymbol} converted from ${fromCurrency} to ${toCurrency} is priced at ${convertedPrice}.`;
}


// Calling convert price and printing result to console.
convertPrice('USD', 'EUR', 'AAPL')
    .then((message) => { // waiting
        console.log(message)
    }).catch((error) => { // catching if error
        console.log(error.message)
    });