let form = document.forms['converter'];
let input = form.number;
let select = form.select;
let dateSelect = form.date;
let resultContainer = document.querySelector('.result-container');
let results;

let currency = ['byn', 'usd', 'eur', 'cny', 'rub'];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

coeff = {
    byn: { usd: 0.3, eur: 0.27, cny: 1.9, rub: 36.3 },
    usd: { byn: 3.3, eur: 0.9, cny: 6.3, rub: 120 },
    eur: { usd: 1.11, byn: 3.667, cny: 7, rub: 133.333 },
    cny: { usd: 0.16, eur: 0.14, byn: 0.52, rub: 19 },
    rub: { byn: 0.0083, usd: 0.0075, eur: 0.0526, cny: 0.0275 }
};

days = new Array(14);

function generateDays() {
    let newDay = {}
    for (k in coeff) {
        newDay[k] = Object.assign({}, coeff[k]);
        for (j in coeff[k]) {
            newDay[k][j] = coeff[k][j] + (coeff[k][j] * getRandomArbitrary(-0.1, 0.1));
        }
    }
    return newDay;
}

for (let i = 0; i < days.length; i++) {
    days[i] = generateDays();
}

console.log(days)

function createOptions() {
    for ( let i = 0; i < currency.length; i++) {
        select.appendChild(new Option(currency[i], currency[i]));
    }
}

function createLabels() {
    for ( let i = 0; i < select.length; i++) {
        if (currency[i] != select.value) {
            resultContainer.insertAdjacentHTML('beforeend', 
                `<div>
                    <span class="currency">${currency[i]}</span>
                    <span class="result ${currency[i]}"></span>
                </div>`
            )
        }
    }
}

function addLabels() {
    if (resultContainer.children.length > 0) { 
        Array.from(resultContainer.children).forEach(el => el.remove());
    }
    createLabels();
}

function getCoeff() {
    return newCoeff = (dateSelect.value == 0) ? coeff : days[dateSelect.value];
}

function converter() {
    results = document.querySelectorAll('.result');
    let labelCurrency;
    switch(select.value) {
        case currency[0]:   ////////byn
            for (result of results) {
                labelCurrency = result.classList[1];
                result.innerHTML = (input.value * getCoeff()[currency[0]][labelCurrency]).toFixed(3);
            }
            break
        case currency[1]:   ////////usd
            for (result of results) {
                labelCurrency = result.classList[1];
                result.innerHTML = (input.value * getCoeff()[currency[1]][labelCurrency]).toFixed(3);
            }
            break
        case currency[2]:   ////////eur
            for (result of results) {
                labelCurrency = result.classList[1];
                result.innerHTML = (input.value * getCoeff()[currency[2]][labelCurrency]).toFixed(3);
            }
            break
        case currency[3]:   ////////cny
            for (result of results) {
                labelCurrency = result.classList[1];
                result.innerHTML = (input.value * getCoeff()[currency[3]][labelCurrency]).toFixed(3);
            }
            break
        case currency[4]:   ////////rub
            for (result of results) {
                labelCurrency = result.classList[1];
                result.innerHTML = (input.value * getCoeff()[currency[4]][labelCurrency]).toFixed(3);
            }
            break
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createOptions();
    addLabels();
    results = document.querySelectorAll('.result');
    converter();
});

input.oninput = converter;
select.addEventListener('change', () => {
    addLabels();
    converter();
});

dateSelect.addEventListener('change', () => {
    addLabels();
    converter();
});
