import { getGeoLocations, getWeatherForcasts } from "./apiHandler.js";
import { formatDate } from "./utils.js";

const input = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const optionContainer = document.querySelector(".options-container");
const form = document.querySelector("form");

export const attachFormEvents = async () => {
    input.addEventListener("input", handleInput);
    input.addEventListener("focus", handleInput);
    form.addEventListener("submit", handleForm);

    window.addEventListener("click", (event) => {
        // if (!input.contains(event.target) && !optionContainer.contains(event.target)) {
        if (!input.contains(event.target) && event.target !== optionContainer) {
            optionContainer.classList.add("hide");
        }
    });
};

const debounce = (callback, delay = 500) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
};

const handleInput = debounce(async () => {
    if (input.value.length >= 3) {
        optionContainer.className = "options-container";
        optionContainer.innerHTML = `<div class="loader"></div>`;

        const options = await getGeoLocations(input.value);
        if (options.length > 0) {
            optionContainer.innerHTML = options
                .map(
                    (option) => `
                <li>
                <button type="submit" class="input-option"
                data-latitude="${option.latitude}"
                data-longitude="${option.longitude}">
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
    input.value = triggerBtn.textContent.trim();
    loadWeatherContent(triggerBtn.dataset.latitude, triggerBtn.dataset.longitude);
};

const loadWeatherContent = async (latitude, longitude) => {
    const mainContainer = document.querySelector(".main");
    mainContainer.innerHTML = "";

    const weatherObj = await getWeatherForcasts(latitude, longitude);
    mainContainer.innerHTML = `
    <div id="current-weather">
        <h2 id="location">Jakarta Barat, Indonesia</h2>
        <p>${formatDate(weatherObj.time)}</p>
        <div id="weather">
            <div id="temperature">
                <h1>${weatherObj.temperature} °C</h1>
            </div>
            <div id="description">
                <img id="weather-icon" src="images/cloudy.svg" alt="" />
                <h3>Cloudy</h3>
            </div>
        </div>
        <div id="detail">
            <div>
                <img src="images/cloudy.svg" alt="" />
                <span>Feels Like</span>
                <p>${weatherObj.apparent_temperature} °C</p>
            </div>
            <div>
                <img src="images/rainy.svg" alt="" />
                <span>Chance of rain</span>
                <p>${weatherObj.chance_of_rain} %</p>
            </div>
            <div>
                <img src="images/cloudy.svg" alt="" />
                <span>Humidity</span>
                <p>${weatherObj.humidity} %</p>
            </div>
            <div>
                <img src="images/cloudy.svg" alt="" />
                <span>Wind Speed</span>
                <p>${weatherObj.wind_speed} km/h</p>
            </div>
        </div>
    </div>
    `;
};
