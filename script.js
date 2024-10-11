function add(a, b) {
  let sum = outputParser(a + b);
  display.textContent = sum;
  if (operator != "") {
    operandA = sum;
  }
}

function subtract(a, b) {
  let difference = outputParser(a - b);
  display.textContent = difference;
  if (operator != "") {
    operandA = difference;
  }
}

function multiply(a, b) {
  let product = outputParser(a * b);
  display.textContent = product;
  if (operator != "") {
    operandA = product;
  }
}

function divide(a, b){
  let quotient = outputParser(a / b);
  display.textContent = quotient;
  if (operator != "") {
    operandA = quotient;
  }
}

let operandA = "";

let operandB= "";

let operator= "";

function operate(operandA, operandB, operator){
  if (operator === "+") {
    add(operandA, operandB);
  }
  else if (operator === "-") {
    subtract(operandA, operandB);
  }

  else if (operator === "*") {
    multiply(operandA, operandB);
  }
  
  else if (operator === "/") {
   divide(operandA, operandB);
  }
}


function lengthParser(value, appendedVal){
  let lengthMax = 13;
  if (appendedVal === ".") {
    lengthMax = 12;
  }
  if (value.toString().length < lengthMax) {
    value += appendedVal;
  }
  return value;
}

function outputParser(value) {
  let beforePoint;
  let afterPoint;
  beforePoint = value.toString().split(".")[0];
  afterPoint = value.toString().split(".")[1];
  if (value == Infinity || value == -Infinity) {
    return "WHAT HAVE Y-"
  }
  if (value.toString().includes("e") && value.toString().includes(".")){
    return exponentiator(value, 1);
  }
  if (value.toString().includes("e")){
    return exponentiator(value, 0)
  }
  if (afterPoint === undefined && beforePoint.length < 14) {
    return value; 
  }
  if (beforePoint.length >= 14) {
    return exponentiator(value, 0);
  }
  if (beforePoint.length + afterPoint.length < 13){
    return value;
  }
  if (beforePoint.length + afterPoint.length >= 13) {
    return parseFloat(value.toFixed(12-beforePoint.length));
  }
}

//todo dividir por 0

function exponentiator(value, bool){
  if (bool === 1){
    //
    let beforeExpo = Number(value.toString().split("e")[0]);
    let afterExpo = Number(value.toString().split("e")[1]);
    beforeExpo = parseFloat(beforeExpo.toFixed(7));
    if (beforeExpo == 10 || beforeExpo == -10) {
      beforeExpo = 1;
      afterExpo += 1;
    }
    return `${beforeExpo}e${afterExpo}`
  }
  if (bool === 0) {
    return exponentiator(value.toExponential(7), 1);
  }
}

const arrNumbers = [];
arrNumbers[0] = document.querySelector("#zero");
arrNumbers[1] = document.querySelector("#one");
arrNumbers[2] = document.querySelector("#two");
arrNumbers[3] = document.querySelector("#three");
arrNumbers[4] = document.querySelector("#four");
arrNumbers[5] = document.querySelector("#five");
arrNumbers[6] = document.querySelector("#six");
arrNumbers[7] = document.querySelector("#seven");
arrNumbers[8] = document.querySelector("#eight");
arrNumbers[9] = document.querySelector("#nine");

const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");
const equal = document.querySelector("#equal");
const point = document.querySelector("#point");
const backspace = document.querySelector("#backspace");
const flipSign  = document.querySelector("#flip-sign");
const clear = document.querySelector("#clear");

const display = document.querySelector("#result");



for (const number of arrNumbers) {
  number.addEventListener("click", function(){
    let displayedNumber = arrNumbers.indexOf(number).toString();
    if (display.textContent != "" && operandA === "") {
      display.textContent = "";
    }
    if (operator == "") {
      operandA = lengthParser(operandA, displayedNumber);
      display.textContent = operandA;
      
    }
    else  {
      if (operandB == "") {
        display.textContent = "";
      }
      operandB = lengthParser(operandB, displayedNumber);
      display.textContent = operandB;
    }
  });
}

addition.addEventListener("click", function(){
  if (operator == "") {
    operator = "+"
    display.textContent= "";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent= "";
    operate(+operandA, +operandB, operator);
    operator = "+";
    operandB = "";
  }
})

subtraction.addEventListener("click", function(){
  if (operator == "") {
    operator = "-"
    display.textContent= "";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent = "";
    operate(+operandA, +operandB, operator);
    operator = "-";
    operandB = "";
  }
});

multiplication.addEventListener("click", function(){
  if (operator == "") {
    operator = "*"
    display.textContent = "";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent= "";
    operate(+operandA, +operandB, operator);
    operator = "*";
    operandB = "";
  }
});

division.addEventListener("click", function(){
  if (operator == "") {
    operator = "/"
    display.textContent= "";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent = "";
    operate(+operandA, +operandB, operator);
    operator = "/";
    operandB = "";
  }
});

equal.addEventListener("click", function(){
  if (operator != "" && operandA != "" && operandB != "") {
    display.textContent = "";
    operate(+operandA, +operandB, operator);
    operator = "";
    operandB = "";
  }
} )

flipSign.addEventListener("click", function() {
  if (operandA != "" && operandB == "") {
    operandA *= -1;
    display.textContent = outputParser(operandA);
  }
  else if (operandB != "") {
    operandB *= -1;
    display.textContent = outputParser(operandB);
  }

})

point.addEventListener("click", function(){
  if (operandA != "" && operandB == "" && !operandA.toString().includes(".")) {
    operandA = lengthParser(operandA, ".");
    display.textContent = operandA;
  }
  else if (operandB != "" && !operandB.toString().includes(".")) {
    operandB = lengthParser(operandB, ".");
    display.textContent = operandB;
  }

})

clear.addEventListener("click", function(){
  operandA = "";
  operandB = "";
  operator = "";
  display.textContent = "";
})

backspace.addEventListener("click", function(){
  if (operator == "") {
    operandA = operandA.toString().slice(0, -1);
    display.textContent = operandA;
  }
  if (operator != "" && operandB != "" ) {
    operandB = operandB.toString().slice(0, -1);
    display.textContent = operandB;
  }
})