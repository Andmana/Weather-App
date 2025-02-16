export function getDateTimeNow() {
    const d = new Date();

    const pad = (num) => num.toString().padStart(2, "0");

    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1); // Months are 0-indexed, so add 1
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());

    // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
}

export function getHour(time) {
    const d = new Date(time);
    return d.getHours();
}

export function filterObject(obj) {
    const { current, hourly } = obj;
    const hour = getHour(current.time);

    return {
        time: current.time,
        is_day: current.is_day,
        temperature: current.temperature_2m,
        apparent_temperature: current.apparent_temperature,
        weather_code: current.weather_code,
        wind_speed: current.wind_speed_10m,
        humidity: current.relative_humidity_2m,
        chance_of_rain: hourly.precipitation_probability[hour],
    };
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    // Use toLocaleString with options to get the desired format
    const options = {
        weekday: "long", // "Sunday"
        month: "short", // "Feb"
        day: "numeric", // "23"
        year: "numeric", // "2025"
        hour: "2-digit", // "00"
        minute: "2-digit", // "00"
        hour12: true, // AM/PM format
    };

    // Format the date
    return date.toLocaleString("en-US", options);
}
