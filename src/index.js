import './css/styles.css';
import Notiflix from 'notiflix'
import 'notiflix/dist/notiflix-3.2.4.min.css'
import debounce from 'lodash.debounce'
import { fetchCountries } from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    event.preventDefault();

   const name = searchInput.value.trim();

    if (name === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
        }
    
    fetchCountries(name)
        .then(countries => {
            countryList.innerHTML = ''
            countryInfo.innerHTML = ''
            if (countries.length === 1) {
                countryList.insertAdjacentHTML('beforeend', renderList(countries))
                countryInfo.insertAdjacentHTML('beforeend', renderInfo(countries))
            } else if (countries.length >= 10) {
                alertVeryBigChoice();
            } else {
                countryList.insertAdjacentHTML('beforeend', renderList(countries))
            }
        })
       .catch(onFetchError) 
}

function renderList(countries) {
    const markup = countries.map(({ name, flags }) =>{
        return `<li class="country-list__item">
        <img class="country-list__flag" src="${flags.svg}" alt="Flag ${name.official}" width=30px heigth=30px>
        <h2 class="country-list_name">${name.official}</h2>
        </li> `
    }).join('')
    return markup
}

function renderInfo(countries) {
    const markup = countries.map(({ capital, population, languages }) => {
        return `<ul class="country-info__list"
                    <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
                    <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
                    <li class="country-info__item"><p><b>Languages: </b>${languages}</p></li>
                </ul>`
    }).join('')
    return markup
}

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function alertVeryBigChoice() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name')
}