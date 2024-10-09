function add(a, b) {
  let sum = a + b;
  if (sum.toString().length < 14) {
  display.textContent = sum;
  }
  else {
  display.textContent = myExponential(sum);

  }
  if (operator != "") {
    operandA = sum;
  }
}

function subtract(a, b) {
  let difference = a - b;
  if (difference.toString().length < 14) {
    display.textContent = difference;
    }
  else {
    display.textContent = myExponential(difference);
  }
  if (operator != "") {
    operandA = difference;
  }
}

function multiply(a, b) {
  let product = a * b;
  if (product.toString().length < 14) {
    display.textContent = product;
    }
  else {
    display.textContent = myExponential(product);
  }
  if (operator != "") {
    operandA = product;
  }
}

function divide(a, b){
  let quotient = a / b;
  if (quotient.toString().length < 14) {
    display.textContent = quotient;
    }
  else {
    display.textContent = myExponential(quotient);
  }
  if (operator != "") {
    operandA = quotient;
  }
}

function myExponential(num) {
  //because I can't figure out how to avoid useless decimal zeroes using toExponential(x)
  let scientificNotation;
  let coefficient;
  let exponent;
  let numLength;
  let approximately = "";
  if (!num.toString().includes("e")) {
    numLength = num.toString().length - 1;
    coefficient = parseFloat((num / Math.pow(10, numLength)).toFixed(6));
  }
  else { 
    numLength = num.toString().split("+")[1];
    coefficient = parseFloat(num.toString().split("e")[0].slice(0, 8));
    }
  while (coefficient < 1 ) {
    //at this point I figured out I can just multiply and divide my toExponential(x) by the same number to get rid of zeroes, so most of the things here are unnecessary :(
    //I will use my function anyway
    coefficient = parseFloat(coefficient*10).toFixed(6)*10/10;
    numLength -= 1;
  }
  if (coefficient * Math.pow(10, numLength) !== num) {
    approximately = "≈"
  }
  console.log(numLength);
  console.log(coefficient);
  exponent = numLength;
  scientificNotation = `${approximately}${coefficient}e+${exponent}`;
  return scientificNotation;
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
    if (display.textContent != "" && operandA == "") {
      display.textContent = "";
    }
    if (operator == "" && operandA.length < 13) {
      operandA += displayedNumber;
      display.append(displayedNumber);
      
    }
  });
}

for (const number of arrNumbers) {
  number.addEventListener("click", function(){
    let displayedNumber = arrNumbers.indexOf(number).toString();
    if (operator != "" && operandB == "") {
        display.textContent = "";
    }
    if (operator != "" && operandB.length < 13) {
      operandB += displayedNumber;
      display.append(displayedNumber);
      }
    }
  )
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
    display.textContent = operandA;
  }
  else if (operandB != "") {
    operandB *= -1;
    display.textContent = operandB;
  }

})

point.addEventListener("click", function(){
  if (operandA != "" && operandB == "" && !operandA.toString().includes(".")) {
    operandA += ".";
    display.append(".");
  }
  else if (operandB != "" && !operandB.toString().includes(".")) {
    operandB += ".";
    display.append(".");
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
  if (operator != "") {
    operandB = operandB.toString().slice(0, -1);
    display.textContent = operandB;
  }
})