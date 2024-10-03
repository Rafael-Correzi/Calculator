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
  
  else return null;
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
const flipSign  = document.querySelector("#flips-sign");
const clear = document.querySelector("#clear");

for (const number of arrNumbers) {
  number.addEventListener("click", function(){
    if (operator == null) {
      operandA += arrNumbers.indexOf(number).toString;
    }
    else  {
      operandB += arrNumbers.indexOf(number).toString;
    }
  });
}

addition.addEventListener("click", function(){
  if (operator == null) {
    operator = "+"
  }
})

subtraction.addEventListener("click", function(){
  if (operator == null) {
    operator = "-"
  }
});

multiplication.addEventListener("click", function(){
  if (operator == null) {
    operator = "*"
  }
});

division.addEventListener("click", function(){
  if (operator == null) {
    operator = "*"
  }
});
