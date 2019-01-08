import React from 'react';

// APIXU Info
const apiKey = '&APPID=6f2c26f2eea8cdaefefd94729d081acf';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/';
const weatherIconUrl = 'https://openweathermap.org/img/w/';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $currentWeather = $('#weatherNow');
const zipcode = 60661;
let weatherParameter;
let latitude;
let longitude;


const WeatherAPI = {
    // AJAX functions
    getCurrentForecast() {
        const urlToFetch = forecastUrl + 'weather?' + weatherParameter + '&units=imperial' + apiKey;
    
        try {
            let response = await fetch(urlToFetch);
            if (response.ok) {
                let jsonResponse = await response.json();
                console.log(jsonResponse);
                let currentDay = jsonResponse;
                return currentDay;
            }
        } catch(error) {
            console.log(error);
        }
    }

    // Render functions
    getLocation() {
        try {
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(showPosition) ? weatherParameter = `lat=${Math.round(latitude)}&lon=${Math.round(longitude)}` : weatherParameter = `zip=${zipcode},us`;
            } 
        } catch(error) {
            // Geolocation is not supported by this browser.
            console.log(error);
        }
    }
      
    showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(`Lat: ${latitude}    Lon: ${longitude}`);
    }
    
    renderCurrentForecast(currentDay) {    
        const currentTemp = Math.round(currentDay.main.temp);
        const today = weekDays[(new Date(currentDay.dt * 1000).getDay())-1];
        let weatherContent =
        '<h2>' + currentTemp + ' F&deg; </h2>' +
        '<img src="' + weatherIconUrl + currentDay.weather[0].icon +
        '.png" class="weathericon" />' +
        '<h3>' + currentDay.weather[0].description + '</h3>' +
        '<h2>' + today + '</h2>';
        
        $currentWeather.append(weatherContent);
    }
    
    executeGeolocationWeather() {
        getLocation();
        $weatherDivs.forEach(day => day.empty());
        getCurrentForecast().then(forecast => renderCurrentForecast(forecast));
        return false;
    }
    
    executeSearch() {
        weatherParameter = `q=${$input.val()}`;
        $currentWeather.empty();
        $weatherDivs.forEach(day => day.empty());
        getCurrentForecast().then(forecast => renderCurrentForecast(forecast));
        return false;
    }
    
    executeGeolocationWeather();
    $submit.click(executeSearch);
}


export default WeatherAPI;
