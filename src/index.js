'use strict';
import './sass/main.scss';
import debounce from 'lodash.debounce'
import { error, } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import API from './js/fetchCountries';
import oneCountryInf from './templates/oneCountryInf.hbs'

const countriesList = document.createElement('ul');
const refs = {
  input: document.querySelector('#input'),
  box: document.querySelector('#box')
}
refs.input.addEventListener('input', debounce(getInputText, 500))

function getInputText() {
  refs.box.innerHTML = '';
  countriesList.innerHTML = '';

  API.fetchCountries(refs.input.value)
    .then(arr => {
      if (arr.length > 10) {
        return error({
          text: 'Too many matches found. Please enter a more specific query!'
        })
      } else if (arr.length === 1) {
        return refs.box.innerHTML = oneCountryInf(...arr)
      } 
        return createListCountries(arr)
    })
    .catch(err => console.log(err));
  };

function createListCountries(arr) {
  refs.box.appendChild(createCountryName(arr))
};

function createCountryName(arr) {
  arr.forEach(el => {
    const countryNameElem = document.createElement('li');
    countryNameElem.textContent = el.name;
    countriesList.appendChild(countryNameElem);
  })
  return countriesList
};


