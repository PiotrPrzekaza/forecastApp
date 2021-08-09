class Forecast {
    constructor() {
        this.keyApi = 'f5FSIBsRKQX2AA7jEWzdjGVIkfA0PSPo';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.locationURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async updateLocation(city) {
        const locationDetails = await this.searchLocation(city);
        const weather = await this.getWeatherCondition(locationDetails.Key);
        return {
            locationDetails,
            weather
        }
    }

    async searchLocation(city) {
        const query = `?apikey=${this.keyApi}&q=${city}`
        const response = await fetch(this.locationURI + query);
        const data = await response.json();

        return data[0];
    }
    async getWeatherCondition(locationKey) {
        const query = `${locationKey}?apikey=${this.keyApi}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
};
