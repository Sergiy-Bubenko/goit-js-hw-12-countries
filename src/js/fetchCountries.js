function fetchCountries(countryName) {
  if (countryName === '' && countryName === ' ') return 
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => response.json());
  
}
export default { fetchCountries }

