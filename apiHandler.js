export async function getLocationOptions(query = "lon") {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
        );
        const dataObj = await response.json();
        const data = dataObj.results.map((obj) => ({
            name: obj.name,
            country: obj.country,
            latitude: obj.latitude,
            longitude: obj.longitude,
        }));
        // const data = await dataObj.results;
        // console.log(data);
        return data;
    } catch (e) {
        console.log(`error : ` + e.message);
    }
}
