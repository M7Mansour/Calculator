let total = 0;
let temp = 0;
let operators = new Array();
// for determine if the number on the screen already have a point or not
let point = false;
// determine if we want to add the number we click to the number on the screen or replace it instead
let sClear = true;
// for handling multiple operators without operands
let oprCon = true;

// function for handling the operators click action
function operate(operator) {
    if (operator == 'c') {
        // clear screen
        clearAll();
        return;
    }
    // if another operator is clicked without any operand before it remove the old operator and add the new one
    if (!oprCon) {
        operators.shift();
        operators.push(operator);
        return;
    }
    // the number on the screen can take a point now
    point = false;
    // add an operator if the operators array is empty
    if (operator != "=" && operators.length == 0) {
        operators.push(operator);
        // if there is an error in calculations set the total number to 0 other wise set it to the number on the screen
        total = screen.value == "Error" ? 0 : parseFloat(screen.value);
        // the next operator doesn't have operand before it
        oprCon = false;
        // make the next number we enter replace the number on the screen
        sClear = true;
        return;
    }
    // if the operator is = we will not do any thing , the same value will still on the screen
    if (operator == "=" && operators.length == 0)
        return;
    // store the number on the screen temporarily to make calculation on it
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
    // if there is an old error in calculations we will not do any other calculations
    if (screen.value == "Error")
        return;
    // after calculations we will put the result on the screen
    screen.value = total;
    // finally we remove the old operator from the array to be perpared for the new operator and calculations
    operators.shift();
    // make the next number we enter replace the number on the screen
    sClear = true;
    // if the old operator is = we can add a new operator without any addition steps
    if (operator === '=') {
        oprCon = true;
        return;
    }
    // add the new operator the array to calculate result next time if a number has been intered
    operators.push(operator);
    // the next operator doesn't have operand before it so we have to replace the old one with it
    oprCon = false;
}

// add the number to total
function add(num) {
    total += num;
}

// subtract number from total
function subtract(num) {
    total -= num;
}

// multiply number with total
function multiply(num) {
    total *= num;
}

// divide total by number
function divide(num) {
    // if the devisor is 0 there will be an error
    if (num == 0) {
        clearAll();
        screen.value = "Error";
        sClear = true;
        return;
    }
    total /= num;
}

// handling the numbers click action
function screenNumbers(num) {
    // we can add an operator now because there is an operand before it
    oprCon = true;
    // if we want to replace the old number on the screen 
    if (sClear) {
        // set the value on the screen to number
        screen.value = num;
        // if the number is . we set the condition that the number can't accept another point any more
        if (num == ".")
            point = true;
        // after number is clicked the next number will be add next to it
        sClear = false;
        return;
    }
    // if the number is . we set the condition that the number can't accept another point any more
    if (num == ".") {
        // if the number has a point we will not add this point
        if (point)
            return;
        point = true;
    }
    // add the number next to the number on the screen
    screen.value += num;
}

// handle togle the number between negative or positive
function toggler() {
    let value = parseFloat(screen.value);
    // if screen value is not a number don't togle it to prevent error
    if (Number.isNaN(value))
        return;
    // if the number is integer (doesn't have floating point) allow to add a point next time 
    // this handles the situation when the point is in the end of the number and there is no fractions
    if (Number.isInteger(value))
        point = false;
    // toggle the number on the screen and the total number
    screen.value = -value;
    total = -total;
}

// reset the calculator by clearing the screen and total and reset every other condition
function clearAll() {
    total = 0;
    temp = 0;
    screen.value = "0";
    operators = new Array();
    sClear = true;
    oprCon = true;
    point = false;
}

// handle the currency buttons when clicked
function converte(operation) {
    // if there is an error in calculations set the total number to 0 other wise set it to the number on the screen
    let current = screen.value == "Error" ? 0 : screen.value;
    // reset calculator
    clearAll();
    // convert to the specified currency
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
    // put the converted ammount on the screen
    screen.value = current;
}