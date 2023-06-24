const wrapper = document.querySelector(".wrapper");
const screen = document.querySelector(".screen");
const toggleBtn = document.querySelector(".toggle-btn");
const numberBtns = document.querySelectorAll(".buttons__btn-number");
const operationBtns = document.querySelectorAll(".buttons__btn-operator");
const delBtn = document.querySelector("#del");
let buffer = "";
let previousOperation = "";
let isDark = true;

const reset = () => {
    buffer = "";
    screen.value = "0";
    previousOperation = "";
};

const calculate = (sample) => {
    buffer = eval(sample.replace(/\×/g, "*")) + "";
    screen.value = buffer;
    previousOperation = "";
};

const checkPreviousOperation = (previousOperation) => {
    if (previousOperation !== ".") {
        if (buffer.at(-1) !== " ") {
            buffer += ` ${previousOperation} `;
            screen.value = buffer;
        } else {
            buffer = buffer.slice(0, buffer.length - 3);
            buffer += ` ${previousOperation} `;
            screen.value = buffer;
        }
    } else {
        if (buffer.at(-1) !== " ") {
            buffer += `${previousOperation}`;
            screen.value = buffer;
        } else {
            buffer = buffer.slice(0, buffer.length - 3);
            buffer += `${previousOperation}`;
            screen.value = buffer;
        }
    }
};

delBtn.addEventListener("click", () => {
    if (buffer.length === 1 || buffer.length === 0) {
        buffer = "";
        screen.value = "0";
    } else if (buffer.at(-1) === " ") {
        buffer = buffer.slice(0, buffer.length - 3);
        screen.value = buffer;
    } else {
        buffer = buffer.slice(0, buffer.length - 1);
        screen.value = buffer;
    }
});

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
        buffer += numberBtn.getAttribute("id");
        screen.value = buffer;
    });
});

operationBtns.forEach((operationBtn) => {
    operationBtn.addEventListener("click", (e) => {
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
                    if (
                        (buffer.match(/\s/g)?.length === 0 &&
                            buffer.match(/\./g)?.length < 2) ||
                        buffer.match(/\s/g)?.length >
                            buffer.match(/\./g)?.length ||
                        buffer.match(/\./g)?.length === undefined
                    ) {
                        e.target.disable = false;
                        previousOperation = ".";
                        checkPreviousOperation(previousOperation);
                        break;
                    } else {
                        e.target.disable = true;
                        break;
                    }
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

toggleBtn.addEventListener("click", () => {
    wrapper.classList.toggle("light");
    toggleBtn.classList.toggle("active");

    numberBtns.forEach((numberBtn) => {
        numberBtn.classList.toggle("light");
    });

    operationBtns.forEach((operationBtn) => {
        operationBtn.classList.toggle("light");
    });

    isDark = !isDark;
});
