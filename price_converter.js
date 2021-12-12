const axios = require('axios');

// Exchange Rates: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// Stock Price: https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${APIkey}
// API key: f02d97317321d926e73f2343ac8a5b65

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exRate = euro * rate[toCurrency];

    return exRate;
}

// console.log(getExchangeRate('USD', 'EUR'));

const getPrice = async (stockSymbol) => {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${stockSymbol}?apikey=f02d97317321d926e73f2343ac8a5b65`);
    return response.data[0]['price'];
}

// console.log(getPrice('AAPL'));

const convertPrice = async (fromCurrency, toCurrency, stockSymbol) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const stockPrice = await getPrice(stockSymbol);
    const convertedPrice = (stockPrice * exchangeRate).toFixed(2);

    return `${stockSymbol} converted from ${fromCurrency} to ${toCurrency} is priced at ${convertedPrice}.`;
}

convertPrice('USD', 'HRK', 'AAPL')
    .then((message) => {
        console.log(message)
    });