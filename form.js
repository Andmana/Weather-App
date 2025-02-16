import { getGeoLocations, getWeatherForcasts } from "./apiHandler.js";
import { formatDate } from "./utils.js";

const input = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const optionContainer = document.querySelector(".options-container");
const form = document.querySelector("form");

export const attachFormEvents = async () => {
    input.addEventListener("input", handleInput);
    // input.addEventListener("focus", handleInput);
    form.addEventListener("submit", handleForm);

    window.addEventListener("click", (event) => {
        // if (!input.contains(event.target) && !optionContainer.contains(event.target)) {
        if (!input.contains(event.target) && event.target !== optionContainer) {
            optionContainer.classList.add("hide");
        }
    });
};

const debounce = (callback, delay = 400) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
};

const handleInput = debounce(async () => {
    optionContainer.className = "options-container";
    optionContainer.innerHTML = `<div class="loader"></div>`;
    if (input.value.length >= 3) {
        const options = await getGeoLocations(input.value);
        if (options.length > 0) {
            optionContainer.innerHTML = options
                .map(
                    (option) => `
                <li>
                <button type="submit" class="input-option"
                data-latitude="${option.latitude}"
                data-longitude="${option.longitude}"
                data-location="${option.name}, ${option.admin}, ${option.country}">
                ${option.name}, ${option.admin}, ${option.country}
                </button>
                </li>`
                )
                .join("");
        } else {
            optionContainer.innerHTML = `<div class="error"> Place not found or not available<br> Try search other locations  </div>`;
        }
    } else {
        optionContainer.className = "options-container hide";
    }
}, 300);

const handleForm = (event) => {
    event.preventDefault();
    const triggerBtn = event.submitter;

    //set update searchButton
    searchBtn.dataset.latitude = triggerBtn.dataset.latitude;
    searchBtn.dataset.longitude = triggerBtn.dataset.longitude;
    searchBtn.dataset.location = triggerBtn.dataset.location;
    input.value = triggerBtn.dataset.location;

    loadWeatherContent(
        triggerBtn.dataset.latitude,
        triggerBtn.dataset.longitude,
        triggerBtn.dataset.location
    );
};

const loadWeatherContent = async (latitude, longitude, location) => {
    const mainContainer = document.querySelector(".main");
    mainContainer.innerHTML = `<div class="loader"></div>`;

    const weatherObj = await getWeatherForcasts(latitude, longitude);

    changeImgStyle(weatherObj.is_day);

    mainContainer.innerHTML = `
    <div id="current-weather">
        <h2 id="location">${location}</h2>
        <p>${formatDate(weatherObj.time)}</p>
        <div id="weather">
            <div id="temperature">
                <h1>${weatherObj.temperature} °C</h1>
            </div>
            <div id="description">
                <img id="weather-icon" src="${weatherObj.image}" alt="" />
                <h3>${weatherObj.description}</h3>
            </div>
        </div>
        <div id="detail">
            <div>
                <img src="images/temperature.svg" alt="" />
                <span>Feels Like</span>
                <p>${weatherObj.apparent_temperature} °C</p>
            </div>
            <div>
                <img src="images/rain.svg" alt="" />
                <span>Chance of rain</span>
                <p>${weatherObj.chance_of_rain} %</p>
            </div>
            <div>
                <img src="images/humidity.svg" alt="" />
                <span>Humidity</span>
                <p>${weatherObj.humidity} %</p>
            </div>
            <div>
                <img src="images/wind.svg" alt="" />
                <span>Wind Speed</span>
                <p>${weatherObj.wind_speed} km/h</p>
            </div>
        </div>
    </div>
    `;
};

function changeImgStyle(is_day) {
    const logo = document.querySelector(".hero img");
    const hero = document.querySelector(".hero");

    logo.src = is_day ? "images/sun.svg" : "images/moon.svg";
    hero.style.color = is_day ? "skyblue" : "#ffd27d";

    document.body.style.backgroundImage = `url("images/bg-${is_day}.jpg")`;
}
