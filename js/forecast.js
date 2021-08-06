const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchCityForm = $('form');
const weatherDisplayCard = $('.card');
const weatherDetails = $('.details');
const time = $('img.time');
const icon = $('.icon img');

const updateWeatherDisplay = (data) => {
    const { locationDetails, weather } = data;

    const fragment = `
    <h5 class="my-3">${locationDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;${weather.Temperature.Metric.Unit}</span>
    </div>
`;

    weatherDetails.innerHTML = fragment;
    const weatherConditionIcon = `assets/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', weatherConditionIcon);

    let timeOfDay = null;
    timeOfDay = weather.IsDayTime ? 'assets/img/day.svg' : 'assets/img/night.svg';
    time.setAttribute('src', timeOfDay);

    if (weatherDisplayCard.classList.contains('d-none')) {
        weatherDisplayCard.classList.remove('d-none')
    }

}


const updateLocation = async (city) => {

    const locationDetails = await searchLocation(city);
    const weather = await getWeatherCondition(locationDetails.Key);
    return {
        locationDetails,
        weather
    }
};

searchCityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchCityForm.location.value.trim();
    searchCityForm.reset();
    updateLocation(location).then(({ locationDetails, weather }) => {
        updateWeatherDisplay({ locationDetails, weather });
    });
})