const axios = require('axios');

// Exchange Rates: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// Countries: https://restcountries.eu/rest/v2/currency/${currencyCode}

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exRate = euro * rate[toCurrency];

    return exRate;
}

// getExchangeRate('USD', 'EUR');

const getCountries = async (toCurrency) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
    console.log(response.data);
}

getCountries('USD');