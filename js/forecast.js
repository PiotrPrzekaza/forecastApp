const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchCityForm = $('form');
const weatherDisplayCard = $('.card');
const weatherDetails = $('.details');

const updateWeatherDisplay = (data) =>{
    const location = data.locationDetails;
    const weather = data.weather;

    weatherDetails.innerHTML = `
         <h5 class="my-3">${location.EnglishName}</h5>
         <div class="my-3">${weather.WeatherText}</div>
         <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;${weather.Temperature.Metric.Unit}</span>
         </div>
    `
}


const updateLocation = async(city) => {

    const locationDetails = await searchLocation(city);
    const weather = await getWeatherCondition(locationDetails.Key);
    return {
        locationDetails,
        weather
    }
};

searchCityForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchCityForm.location.value.trim();
    searchCityForm.reset();
    updateLocation(location).then((data) =>{
        updateWeatherDisplay(data);
    });
})
