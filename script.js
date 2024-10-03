function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b){
  return a / b;
}

let operandA;

let operandB;

let operator;

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
  
  else return null;
}

const zero = document.querySelector("#");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four  = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const  = document.querySelector("#sum");
const  = document.querySelector("#subtraction");
const  = document.querySelector("#multiplication");
const  = document.querySelector("#division");
const  = document.querySelector("#equal");
const  = document.querySelector("#point");
const  = document.querySelector("#backspace");
const  = document.querySelector("#flips-sign");
const  = document.querySelector("#clear");