import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './js/fetch-countries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.getElementById('search-box');
const countryList = document.getSelection('country-list');
const countryInfo = document.getSelection('country-info');

countryInput.addEventListener(
  'input',
  debounce(onCountryInput, DEBOUNCE_DELAY)
);

function onCountryInput() {
  const name = countryInput.value.trim();

  //   console.log(inputCurrent);
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }
  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      if (countries.length === 1) {
        countryList.insertAdjacentHTML(
          'beforeend',
          renderCountryList(countries)
        );
        countryInfo.insertAdjacentHTML(
          'beforeend',
          renderCountryInfo(countries)
        );
      } else if (countries.length >= 10) {
        alertTooManyMatches();
      } else {
        countryList.insertAdjacentHTML(
          'beforeend',
          renderCountryList(countries)
        );
      }
    })
    .catch(alertWrongName);
}

function renderCountryList(countries) {}

function renderCountryInfo(countries) {}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}
