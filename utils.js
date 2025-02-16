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
        description: getDescription(current.is_day, current.weather_code),
        image: getImage(current.is_day, current.weather_code),
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

export function getDescription(is_day, code) {
    const time = is_day === 1 ? "day" : "night";
    return description[code.toString()][time].description;
    // return description[code.toString()].day;
}

export function getImage(is_day, code) {
    const time = is_day === 1 ? "day" : "night";
    return description[code.toString()][time].image;
    // return description[code.toString()].day;
}

const description = {
    0: {
        day: {
            description: "Sunny",
            image: "http://openweathermap.org/img/wn/01d@2x.png",
        },
        night: {
            description: "Clear",
            image: "http://openweathermap.org/img/wn/01n@2x.png",
        },
    },
    1: {
        day: {
            description: "Mainly Sunny",
            image: "http://openweathermap.org/img/wn/01d@2x.png",
        },
        night: {
            description: "Mainly Clear",
            image: "http://openweathermap.org/img/wn/01n@2x.png",
        },
    },
    2: {
        day: {
            description: "Partly Cloudy",
            image: "http://openweathermap.org/img/wn/02d@2x.png",
        },
        night: {
            description: "Partly Cloudy",
            image: "http://openweathermap.org/img/wn/02n@2x.png",
        },
    },
    3: {
        day: {
            description: "Cloudy",
            image: "http://openweathermap.org/img/wn/03d@2x.png",
        },
        night: {
            description: "Cloudy",
            image: "http://openweathermap.org/img/wn/03n@2x.png",
        },
    },
    45: {
        day: {
            description: "Foggy",
            image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
            description: "Foggy",
            image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
    },
    48: {
        day: {
            description: "Rime Fog",
            image: "http://openweathermap.org/img/wn/50d@2x.png",
        },
        night: {
            description: "Rime Fog",
            image: "http://openweathermap.org/img/wn/50n@2x.png",
        },
    },
    51: {
        day: {
            description: "Light Drizzle",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Light Drizzle",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    53: {
        day: {
            description: "Drizzle",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Drizzle",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    55: {
        day: {
            description: "Heavy Drizzle",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Heavy Drizzle",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    56: {
        day: {
            description: "Light Freezing Drizzle",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Light Freezing Drizzle",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    57: {
        day: {
            description: "Freezing Drizzle",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Freezing Drizzle",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    61: {
        day: {
            description: "Light Rain",
            image: "http://openweathermap.org/img/wn/10d@2x.png",
        },
        night: {
            description: "Light Rain",
            image: "http://openweathermap.org/img/wn/10n@2x.png",
        },
    },
    63: {
        day: {
            description: "Rain",
            image: "http://openweathermap.org/img/wn/10d@2x.png",
        },
        night: {
            description: "Rain",
            image: "http://openweathermap.org/img/wn/10n@2x.png",
        },
    },
    65: {
        day: {
            description: "Heavy Rain",
            image: "http://openweathermap.org/img/wn/10d@2x.png",
        },
        night: {
            description: "Heavy Rain",
            image: "http://openweathermap.org/img/wn/10n@2x.png",
        },
    },
    66: {
        day: {
            description: "Light Freezing Rain",
            image: "http://openweathermap.org/img/wn/10d@2x.png",
        },
        night: {
            description: "Light Freezing Rain",
            image: "http://openweathermap.org/img/wn/10n@2x.png",
        },
    },
    67: {
        day: {
            description: "Freezing Rain",
            image: "http://openweathermap.org/img/wn/10d@2x.png",
        },
        night: {
            description: "Freezing Rain",
            image: "http://openweathermap.org/img/wn/10n@2x.png",
        },
    },
    71: {
        day: {
            description: "Light Snow",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Light Snow",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    73: {
        day: {
            description: "Snow",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Snow",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    75: {
        day: {
            description: "Heavy Snow",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Heavy Snow",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    77: {
        day: {
            description: "Snow Grains",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Snow Grains",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    80: {
        day: {
            description: "Light Showers",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Light Showers",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    81: {
        day: {
            description: "Showers",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Showers",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    82: {
        day: {
            description: "Heavy Showers",
            image: "http://openweathermap.org/img/wn/09d@2x.png",
        },
        night: {
            description: "Heavy Showers",
            image: "http://openweathermap.org/img/wn/09n@2x.png",
        },
    },
    85: {
        day: {
            description: "Light Snow Showers",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Light Snow Showers",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    86: {
        day: {
            description: "Snow Showers",
            image: "http://openweathermap.org/img/wn/13d@2x.png",
        },
        night: {
            description: "Snow Showers",
            image: "http://openweathermap.org/img/wn/13n@2x.png",
        },
    },
    95: {
        day: {
            description: "Thunderstorm",
            image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
            description: "Thunderstorm",
            image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
    },
    96: {
        day: {
            description: "Light Thunderstorms With Hail",
            image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
            description: "Light Thunderstorms With Hail",
            image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
    },
    99: {
        day: {
            description: "Thunderstorm With Hail",
            image: "http://openweathermap.org/img/wn/11d@2x.png",
        },
        night: {
            description: "Thunderstorm With Hail",
            image: "http://openweathermap.org/img/wn/11n@2x.png",
        },
    },
};
