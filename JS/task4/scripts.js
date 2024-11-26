const getData = async (url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getCurrency = async (baseCurrency) => {
  const data = await getData(` https://v6.exchangerate-api.com/v6/63541ba2a3195fa2537793ad/latest/${baseCurrency}`)
  return data.conversion_rates["RUB"]
}

const currency = ["USD", "EUR", "CAD", "CNY", "CHF", "SGD"]
const currencyBlock = document.getElementById("currency")

const createCurrency = async (baseCurrency) => {
  const rate = await getCurrency(baseCurrency)
  currencyBlock.insertAdjacentHTML('afterbegin', `<div class="currency__block">
                <p class="baseCurrency">${baseCurrency}:</p>
                <p class="rate" id=${baseCurrency}>${rate}</p>
            </div>`);
}

setInterval(() => {
  currency.forEach(async (e) => {
    document.getElementById(e).textContent = await getCurrency(e)
  })
}, 15 * 60 * 1000);

currency.forEach(createCurrency)



