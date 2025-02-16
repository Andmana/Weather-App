import { attachFormEvents, loadWeatherContent } from "./form.js";
attachFormEvents();

document.addEventListener(
    "DOMContentLoaded",
    loadWeatherContent("6.1805", "106.8284", "Central Jakarta, Indonesia")
);
