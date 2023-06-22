const screen = document.querySelector(".screen");
const numberBtns = document.querySelectorAll(".buttons__btn-number");
const operationBtns = document.querySelectorAll(".buttons__btn-operator");
const delBtn = document.querySelector("#del");
let buffer = "";
let previousOperation = "";

const reset = () => {
    buffer = "";
    screen.textContent = "0";
    previousOperation = "";
};

const calculate = (sample) => {
    buffer = eval(sample.replace(/\×/g, "*")) + "";
    screen.textContent = buffer;
    previousOperation = "";
};

const checkPreviousOperation = (previousOperation) => {
    if (previousOperation !== ".") {
        if (buffer.at(-1) !== " ") {
            buffer += ` ${previousOperation} `;
            screen.textContent = buffer;
        } else {
            buffer = buffer.slice(0, buffer.length - 3);
            buffer += ` ${previousOperation} `;
            screen.textContent = buffer;
        }
    } else {
        if (buffer.at(-1) !== " ") {
            buffer += `${previousOperation}`;
            screen.textContent = buffer;
        } else {
            buffer = buffer.slice(0, buffer.length - 3);
            buffer += `${previousOperation}`;
            screen.textContent = buffer;
        }
    }
};

delBtn.addEventListener("click", () => {
    if (buffer.length === 1 || buffer.length === 0) {
        buffer = "";
        screen.textContent = "0";
    } else if (buffer.at(-1) === " ") {
        buffer = buffer.slice(0, buffer.length - 3);
        screen.textContent = buffer;
    } else {
        buffer = buffer.slice(0, buffer.length - 1);
        screen.textContent = buffer;
    }
});

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
        buffer += numberBtn.getAttribute("id");
        screen.textContent = buffer;
    });
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", () => {
        if (buffer.length < 1) {
            operationBtn.disable = true;
        } else {
            switch (operationBtn.getAttribute("id")) {
                case "+":
                    previousOperation = "+";
                    checkPreviousOperation(previousOperation);
                    break;
                case "-":
                    previousOperation = "-";
                    checkPreviousOperation(previousOperation);
                    break;
                case "×":
                    previousOperation = "×";
                    checkPreviousOperation(previousOperation);
                    break;
                case "/":
                    previousOperation = "/";
                    checkPreviousOperation(previousOperation);
                    break;
                case ".":
                    previousOperation = ".";
                    checkPreviousOperation(previousOperation);
                    break;
                case "reset":
                    reset();
                    break;
                case "=":
                    calculate(buffer);
                    break;
            }
        }
    });
});
