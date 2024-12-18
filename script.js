let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    api_key = '250d8198dcaf602952d44571e3b4b88b';

function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(() => {
        alert(`failed to fetch ${cityName}`);
    });
}

searchBtn.addEventListener('click', getCityCoordinates);