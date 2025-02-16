import { getDateTimeNow, filterObject } from "./utils.js";

export async function getGeoLocations(query = "lon") {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
        );
        const dataObj = await response.json();
        // console.log(dataObj);
        let data = [];
        if (Object.hasOwn(dataObj, "results")) {
            data = dataObj.results.map((obj) => ({
                name: obj.name,
                admin: obj.admin1,
                country: obj.country,
                latitude: obj.latitude,
                longitude: obj.longitude,
            }));
        }
        // console.log(data);
        return data;
    } catch (e) {
        console.log(`error : ` + e.message);
    }
}

export async function getWeatherForcasts(latitude = "51.5072", longitude = "0.1276") {
    const today = getDateTimeNow();
    const url = `
        https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m&timezone=auto&forecast_days=1
        `;
    try {
        const response = await fetch(url);
        const dataObj = await response.json();
        const data = filterObject(dataObj);
        // console.log(dataObj);
        // console.log(data);
        return data;
    } catch (e) {
        console.log(`error : ` + e.message);
    }
}
