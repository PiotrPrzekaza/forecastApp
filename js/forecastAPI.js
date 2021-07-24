const API = 'f5FSIBsRKQX2AA7jEWzdjGVIkfA0PSPo';

const searchLocation = async (city) =>{
    const baseSearch = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query =`?apikey=${API}&q=${city}`

    const response = await fetch(baseSearch + query);
    const data = await  response.json();

    return data[0];
};

const getWeatherCondition = async (locationKey)=>{
    const baseWeather = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${API}`;

    const response = await fetch(baseWeather+query);
    const data = await response.json();

    return data[0];
}

searchLocation('warszawa').then(({Key})=>{
        return getWeatherCondition(Key)
    })
    .then(data=>console.log(data))
