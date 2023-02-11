// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const fields = 'fields=name,capital,population,flags,languages';

// function fetchCountries(name) {
//   return fetch(`${BASE_URL}${name}?${fields}`)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }
// // console.log(fetchCountries);
// export default fetchCountries;

export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages
  `).then(response => response.json());
};
