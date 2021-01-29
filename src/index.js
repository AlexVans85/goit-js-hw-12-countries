import './styles.css';

import './js/template'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import '../src/js/fetch'
import countriesFlagTemp from '../src/templates/country-flag.hbs'
import countriesListTemp from '../src/templates/country-list.hbs'
import debounce from '../node_modules/lodash.debounce/index.js'




const x = document.querySelector('.exper')
const countriesList =  document.querySelector('#js-contries')



x.addEventListener('input' , debounce(findCountry, 500));

function findCountry (event){


    const inputValue = event.target.value
    if (inputValue.length >= 1) {
    countriesList.innerHTML = ''
    fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`)
    .then(response => response.json())
    .then((countries) => {

        if (countries.length === 1) {
        console.log(inputValue);
        console.log(countries);
        const markup = countriesFlagTemp(...countries)
        countriesList.insertAdjacentHTML('beforeend', markup)}


        if (countries.length > 1) {
        x.innerHTML = ''
        const markup = countriesListTemp(countries)
        countriesList.insertAdjacentHTML('beforeend', markup)}

        if (countries.length > 10){
            x.innerHTML = ''
            showErrorMessage()
        }

        

    })
  .catch(error => {
    // alert('something')
    // countriesList.insertHTML(<p>Something went wrong</p>)
    
    console.log(error)});
} else {
    countriesList.innerHTML = ''
}

}






function showErrorMessage () {
    error({
    text: 'Дружищщще, введи больше букв!!!'
  })};



  


