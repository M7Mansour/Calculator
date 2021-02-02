let total = 0;
let temp = 0;
let operators = new Array();
let point = false;
let sClear = true;
let oprCon = true;

function operate(operator) {
    if (operator == 'c') {
        clearAll();
        return;
    }
    if (!oprCon) {
        operators.shift();
        operators.push(operator);
        return;
    }
    point = false;
    if (operator != "=" && operators.length == 0) {
        operators.push(operator);
        total = screen.value == "Error" ? 0 : parseFloat(screen.value);
        oprCon = false;
        sClear = true;
        return;
    }
    if (operator == "=" && operators.length == 0)
        return;
    temp = parseFloat(screen.value);
    switch (operators[0]) {
        case '+':
            add(temp);
            break;
        case '-':
            subtract(temp);
            break;
        case '*':
            multiply(temp);
            break;
        case '/':
            divide(temp);
            break;
    }
    if (screen.value == "Error")
        return;
    screen.value = total;
    operators.shift();
    sClear = true;
    if (operator === '=') {
        oprCon = true;
        return;
    }
    operators.push(operator);
    oprCon = false;
}

function add(num) {
    total += num;
}

function subtract(num) {
    total -= num;
}

function multiply(num) {
    total *= num;
}

function divide(num) {
    if (num == 0) {
        clearAll();
        screen.value = "Error";
        sClear = true;
        return;
    }
    total /= num;
}

function screenNumbers(num) {
    oprCon = true;
    if (sClear) {
        screen.value = num;
        if (num == ".")
            point = true;
        sClear = false;
        return;
    }
    if (num == ".") {
        if (point)
            return;
        point = true;
    }
    screen.value += num;
}

function toggler() {
    let value = parseFloat(screen.value);
    if (Number.isNaN(value))
        return;
    if (Number.isInteger(value))
        point = false;
    screen.value = -value;
    total = -total;
}

function clearAll() {
    total = 0;
    temp = 0;
    screen.value = "0";
    operators = new Array();
    sClear = true;
    oprCon = true;
    point = false;
}

function converte(operation) {
    let current = screen.value == "Error" ? 0 : screen.value;
    clearAll();
    switch (operation) {
        case "sh-us":
            current *= 0.31;
            break;
        case "us-sh":
            current *= 1 / 0.31;
            break;
        case "sh-eu":
            current *= 0.25;
            break;
        case "eu-sh":
            current *= 1 / 0.25;
            break;
    }
    screen.value = current;
}