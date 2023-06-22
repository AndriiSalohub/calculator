const screen = document.querySelector(".screen");
const numberBtns = document.querySelectorAll(".buttons__btn-number");
const operationBtns = document.querySelectorAll(".buttons__btn-operator");
let buffer = "";
let previousOperation;

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
        buffer += numberBtn.getAttribute("id");
        screen.textContent = buffer;
    });
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => {
        switch (operationBtn.getAttribute("id")) {
            case "+":
                previousOperation = "+";
                buffer += " + ";
                screen.textContent = buffer;
                break;
            case "-":
                previousOperation = "-";
                buffer += " - ";
                screen.textContent = buffer;
                break;
            case "×":
                previousOperation = "×";
                buffer += " × ";
                screen.textContent = buffer;
                break;
            case "/":
                previousOperation = "/";
                buffer += " / ";
                screen.textContent = buffer;
                break;
            case ".":
                previousOperation = ".";
                buffer += ".";
                screen.textContent = buffer;
        }
    });
});
