const input = document.querySelector("input");
const optionContainer = document.querySelector(".options-container");

export const attachFormEvents = () => {
    input.addEventListener("input", async function () {
        if (input.value.length >= 3) {
            optionContainer.className = "options-container";
        }
    });

    window.addEventListener("click", (event) => {
        if (!input.contains(event.target) || !optionContainer.contains(EventTarget)) {
            optionContainer.className = "options-container hide";
        }
    });
};
