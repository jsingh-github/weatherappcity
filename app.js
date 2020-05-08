// select Elements

const form = document.querySelector("form");
const cityElement = document.querySelector("input")
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");



// App Data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//App consts and Vars
const KELVIN = 273;

//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";


form.addEventListener("submit", e => {
    e.preventDefault();

    const myCity = cityElement.value;
    //Get weather from API
    
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${key}`

   
        fetch(api)
            .then(function (response) {
                let data = response.json();
                return data;
            })
            .then(function (data) {
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
            })
            .then(function () {
                displayWeather();
            });
    
});
    //Display waether to UI

    function displayWeather() {
        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    }

// C to F conversion

function celsiusToFahreneit(temperature) {
    return (temperature * 9/5) + 32;
}

//When the user clicks on the Temperature Element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === 'celsius'){
        let fahrenheit = celsiusToFahreneit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});




