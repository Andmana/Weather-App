import { getLocationOptions } from "./apiHandler.js";

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

const debounce = (callback, delay = 300) => {
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

        const options = await getLocationOptions(input.value);
        optionContainer.innerHTML = options
            .map(
                (option) => `
                    <li>
                        <button type="submit" class="input-option"
                            data-latitude="${option.latitude}"
                            data-longitude="${option.longitude}">
                            ${option.name}, ${option.country}
                        </button>
                    </li>`
            )
            .join("");
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
    alert(triggerBtn.dataset.latitude + " " + triggerBtn.dataset.longitude);
};
