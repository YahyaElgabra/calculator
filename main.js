const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const screen = document.querySelector("#screen");
const buttonArray  = [...document.querySelector("#buttons").children];

buttonArray.forEach(btn => {
    btn.addEventListener("click", e => {
        id = e.target.id;
        if (id == "DEL") {
            screen.textContent = screen.textContent.slice(0, -1)
        } else if (id == "AC") {
            screen.textContent = ""
        } else if (id == "=") {
            screen.textContent = operate();
        } else {
            screen.textContent += id;
        }
        btn.classList.add("activated");
        setTimeout(() => btn.classList.remove("activated"), 50)
    })
})

function operate() {
    let expression = screen.textContent;
    expression = manageSqrts(expression);
    expression = manageExpo(expression);
    expression = manageDivMul(expression);
    expression = manageAddSub(expression);
    return expression;
}

function manageSqrts(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "√") {
            let num = getRightNumber(expression, i);
            let prefix = getLeftNumber(expression, i)
            if (isNaN(prefix[0])) {
                prefix[0] = 1;
            }
            let value = prefix[0] * Math.sqrt(num[0]);
            expression = expression.slice(0, prefix[1]) + value +
                expression.slice(num[1], expression.length);
        }
    }
    return expression;
}

function manageExpo(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == "^") {
            let base = getLeftNumber(expression, i);
            let exp = getRightNumber(expression, i);
            let value = base[0] ** exp[0];
            console.log(value)
            expression = expression.slice(0, base[1]) + value +
                expression.slice(exp[1], expression.length);
            i = 0;
        }
    }
    return expression
}

function manageDivMul(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == "×" || expression[i] == "÷") {
            let left = getLeftNumber(expression, i);
            let right = getRightNumber(expression, i);
            if (expression[i] == "×") {
                value = left[0] * right[0];
            } else {
                value = left[0] / right[0];
            }
            expression = expression.slice(0, left[1]) + value +
                expression.slice(right[1], expression.length);
            i = 0;
        }
    }
    return expression
}

function manageAddSub(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == "+" || expression[i] == "-") {
            let left = getLeftNumber(expression, i);
            let right = getRightNumber(expression, i);
            if (expression[i] == "+") {
                value = left[0] + right[0];
            } else {
                value = left[0] - right[0];
            }
            expression = expression.slice(0, left[1]) + value +
                expression.slice(right[1], expression.length);
            i = 0;
        }
    }
    return expression
}

function getRightNumber(expression, i) {
    let number = "";
    let j = i + 1;
    for (; j < expression.length; j++) {
        if (numbers.includes(expression[j])) {
            number += expression[j];
        } else {
            break;
        }
    }
    if (number == "") {
        number = "l"
    }
    return [Number(number), j];
}

function getLeftNumber(expression, i) {
    let number = "";
    let j = i - 1;
    for (; j > -1; j--) {
        if (numbers.includes(expression[j])) {
            number = expression[j] + number;
        } else {
            break;
        }
    }
    if (number == "") {
        number = "l"
    }
    return [Number(number), j + 1];
}