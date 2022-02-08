import './css/styles.css';
import Notiflix from 'notiflix'
import 'notiflix/dist/notiflix-3.2.4.min.css'
import debounce from 'lodash.debounce'
import { fetchCountries } from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchInput.addEventListener('input', onSearch);

function onSearch(event) {
    event.preventDefault();

   const searchQuery = searchInput.value.trim();

    if (searchQuery === '') {
        return (countryList = ''), (countryInfo = '')
    }
    
    fetchCountries(name)
        

    

}

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertVeryBigChoice() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}