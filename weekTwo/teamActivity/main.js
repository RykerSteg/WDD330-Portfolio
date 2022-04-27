function readInput() {
    let input = document.getElementById("text_input").value
    document.getElementById("answer").innerHTML = input
}

function addNumbers() {
    let input = document.getElementById("number_input").value
    let total = 0

    for (let i = 1; i <= input; i++) {
        total += i;
    }
    document.getElementById("answer2").innerHTML = total
}

function addMachine() {
    let input1 = parseInt(document.getElementById("number1").value)
    let input2 = parseInt(document.getElementById("number2").value)
    let total = input1 + input2
    document.getElementById("answer3").innerHTML = total
}