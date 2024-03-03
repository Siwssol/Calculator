function operation(value) {
    if (value == "+" || value == "-" || value == "×" || value == "/") {
        document.getElementById('results').value = "";
    } 
}


document.addEventListener("DOMContentLoaded", function() {
    console.log("Something");
    let numberButtons = document.getElementsByClassName('number');
    [...numberButtons].forEach(button => button.addEventListener('click', function() {
        let buttonValue = button.getAttribute('value');
        document.getElementById('results').value += buttonValue;
        console.log(buttonValue);
    }))
})

document.addEventListener("DOMContentLoaded", function() {
    console.log("Something");
    let opButtons = document.getElementsByClassName('operation');
    [...opButtons].forEach(button => button.addEventListener('click', function() {
        let buttonValue = button.getAttribute('value');
        operation(buttonValue);
    }))
})

