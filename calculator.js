let result = ""

document.addEventListener("DOMContentLoaded", function() {
    let numberButtons = document.getElementsByClassName('number');
    [...numberButtons].forEach(button => button.addEventListener('click', function() {
        let buttonValue = button.getAttribute('value');
        document.getElementById('results').value += buttonValue;
        console.log(buttonValue);
    }))
})

document.addEventListener("DOMContentLoaded", function() {
    let opButtons = document.getElementsByClassName('operation');
    [...opButtons].forEach(button => button.addEventListener('click', function() {
        let buttonValue = button.getAttribute('value');
        operation(buttonValue);
    }))
})

document.addEventListener("DOMContentLoaded", function() {
    let evalButton = document.getElementById('evaluate');
    evalButton.addEventListener('click', function() {
        evaluate()
    })
})

document.addEventListener("DOMContentLoaded", function() {
    let clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', function() {
        clearResultBar()
    })
})

function clearResultBar() {
    document.getElementById('results').value = "";
}

// Convert to rpn expression
function parseResult(result) {
    result = result.split("+").join(" + ").split("-").join(" - ").split("×").join(" × ").split("/").join(" / ").split(" ")
    let rpn = "";
    let stack = [];
    let precedence = {
        "+": 1,
        "-": 1,
        "×": 2,
        "/": 2
    }
    for (let i = 0; i < result.length; i++) {
        let char = result[i];
        if (char == "+" || char == "-" || char == "×" || char == "/") {
            while (stack.length > 0 && precedence[stack[stack.length - 1]] >= precedence[char]) {
                rpn += stack.pop()
                rpn += " "
            }
            stack.push(char)
        } else {
            rpn += char
            rpn += " "
        }
    }
    while (stack.length > 0) {
        rpn += stack.pop()
        rpn += " "
    }
    console.log(rpn)
    return rpn;
}

function evaulateRPN(rpn) {
    rpn = rpn.trim().split(" ")
    let rpnStack = []
    console.log("rpn: ", rpn)
    for (let i = 0; i < rpn.length; i++) {
        console.log(rpn[i])
        if (rpn[i] == "+" || rpn[i] == "-" || rpn[i] == "×" || rpn[i] == "/") {
            let operand2 = parseInt(rpnStack.pop())
            let operand1 = parseInt(rpnStack.pop())
            let result
            if (rpn[i] == "+") {
                result = operand1 + operand2
            } else if (rpn[i] == "-") {
                result = operand1 - operand2
            } else if (rpn[i] == "×") {
                result = operand1 * operand2
            } else if (rpn[i] == "/") {
                result = operand1 / operand2
            }
            rpnStack.push(result)
        } else {
            rpnStack.push(parseInt(rpn[i]))
        }
    }
    console.log(rpnStack)
    return rpnStack.pop()
}

function operation(value) {
    if (value == "+" || value == "-" || value == "×" || value == "/") {
        result += document.getElementById('results').value + value
        clearResultBar();
    } 
}


function evaluate() {
    result += document.getElementById('results').value
    let parsedResult = parseResult(result);
    let answer = evaulateRPN(parsedResult);
    console.log(answer)
    document.getElementById('results').value = answer;
    result = ""
}


