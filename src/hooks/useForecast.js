import { useState } from 'react';
import axios from 'axios';

const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=`;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${GEO_URL}`;
const REQUEST_WEATHER = `${CROSS_DOMAIN}/${WEATHER_URL}`;
const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    const getGeoData = async location => {
        const { data } = await axios(`${REQUEST_URL}${location}&appid=7a979182ac101e909d48672baa3a0d0a`);

        if (!data || data.length === 0) {
            setError('There is no such location!');
            setLoading(false);
            return;
        }

        return data;
    };

    const getForecastData = async coordinates => {
        const { data } = await axios(
            `${REQUEST_WEATHER}lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&appid=7a979182ac101e909d48672baa3a0d0a`
        );
        if (!data || data.length === 0) {
            setError('Something went wrong!');
            setLoading(false);
            return;
        }
        return data;
    };

    //call the applicable_date
    const submitRequest = async location => {
        setLoading(true);
        setError(false);
        const response = await getGeoData(location);
        if (!response) return;

        const data = await getForecastData(response);

        if (!data) return;

        console.log({ response });
    };

    return {
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};

export default useForecast;
