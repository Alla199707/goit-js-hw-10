import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetch-countries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
console.log(countryInput);

countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput(e) {
  const name = e.target.value.trim();
  console.log(name);
  if (name.length === 1) {
    alertTooManyMatches();
  } else if (name.length === 2) {
    fetchCountries(name).then(renderCountryList).catch(alertWrongName);
  } else if (name.length >= 3) {
    fetchCountries(name).then(renderCountryInfo).catch(alertWrongName);
  } else if (name === '') {
    onClear();
  }
}

function renderCountryList(countries) {
  onClear();
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="list country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markup);
}

function renderCountryInfo(countries) {
  onClear();
  const markup = countries
    .map(({ name, capital, flag, population, languages }) => {
      const nameLanguages = languages.map(language => language.name);
      return `
        <div class="country_title">
            <img src='${flag}' width="50" height="30"/>
            <h1 class="title"><b>${name}</b></h1>
        </div>
        <ul class="list country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${nameLanguages.join(
              ', '
            )}</p></li>
        </ul>
        `;
    })
    .join('');
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

function onClear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
