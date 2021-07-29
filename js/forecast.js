const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchCityForm = $('form');



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
    updateLocation(location).then(({locationDetails, weather}) =>{
        console.log(locationDetails);
        console.log(weather);
    });
})
