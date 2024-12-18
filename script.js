let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    api_key = '250d8198dcaf602952d44571e3b4b88b';
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0];


function getweatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
       <div class="current-weather">
                        <div class="deatils">
                            <p>Now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weathericon">
                        </div>
                    </div>
                    <hr>
                    <div class="card-footer">
                        <p><i class="fa-light fa-calender"></i>${days[date.getDay()]},${date.getDate()},${months[date.getMonth()]},${date.getFullYear()}</p>
                        <p><i class="fa-light fa-location-dot"></i>${name},${country}</p>
                    </div>
                </div>
                `;
    }).catch(() => {
        alert(`failed to fectch weather deyails`);
    });
}
function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let { name, lat, lon, country, state } = data[0];
        getweatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`failed to fetch ${cityName}`);
    });
}

searchBtn.addEventListener('click', getCityCoordinates);