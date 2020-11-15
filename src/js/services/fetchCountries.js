const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}${searchQuery}`).then(res => res.json());
  },
};
