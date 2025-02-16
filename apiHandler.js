export async function getLocationOptions(query = "lon") {
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
        // console.log(data);
        return data;
    } catch (e) {
        console.log(`error : ` + e.message);
    }
}
