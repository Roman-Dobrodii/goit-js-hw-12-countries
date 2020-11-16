import countrySearch from './services/fetchCountries';
import refs from './refs';
import currentCountry from '../templates/currentCountryTpl.hbs';
import countryList from '../templates/countriesListTpl.hbs';

import '@pnotify/core/dist/BrightTheme.css';
// import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
defaults.delay = '1000';
const debounce = require('lodash.debounce');

refs.searchForm.addEventListener(
  'input',
  debounce(countrySearchInputHandler, 500),
);

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearCountriesContainer();
  const searchQuery = e.target.value;

  countrySearch
    .fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.status === 404) {
        error({
          text:
            'No country has been found. Please enter a more specific query!',
        });
      } else if (data.length === 1) {
        buildListMarkup(data, currentCountry);
      } else if (data.length <= 10) {
        buildListMarkup(data, countryList);
      }
    })
    .catch(Error => {
      Error({
        text: 'You must enter query parameters!',
      });
      console.log(Error);
    });
}

function buildListMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  refs.countriesContainer.insertAdjacentHTML('afterbegin', markup);
}

function clearCountriesContainer() {
  refs.countriesContainer.innerHTML = '';
}
