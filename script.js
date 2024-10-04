function add(a, b) {
  let sum = a + b;
  display.textContent = sum;
  if (operator != "") {
    operandA = sum;
  }
}

function subtract(a, b) {
  let difference = a - b;
  display.textContent = difference;
  if (operator != "") {
    operandA = difference;
  }
}

function multiply(a, b) {
  let product = a * b;
  display.textContent = product;
  if (operator != "") {
    operandA = product;
  }
}

function divide(a, b){
  let quotient = a / b;
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

const display = document.querySelector("#result");



for (const number of arrNumbers) {
  number.addEventListener("click", function(){
    let displayedNumber = arrNumbers.indexOf(number).toString();
    if (display.textContent != "" && operandA == "") {
      display.textContent = "";
    }
    if (operator == "") {
      operandA += displayedNumber;
      display.append(displayedNumber);
      
    }
    else  {
      if (operandB == "") {
        display.textContent = "";
      }
      operandB += displayedNumber;
      display.append(displayedNumber);
    }
  });
}

addition.addEventListener("click", function(){
  if (operator == "") {
    operator = "+"
    display.textContent= "+";
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
    display.textContent= "-";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent= "";
    operate(+operandA, +operandB, operator);
    operator = "-";
    operandB = "";
  }
});

multiplication.addEventListener("click", function(){
  if (operator == "") {
    operator = "*"
    display.textContent= "×";
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
    display.textContent= "÷";
  }
  else if (operator != "" && operandA != "" && operandB != "") {
    display.textContent= "";
    operate(+operandA, +operandB, operator);
    operator = "/";
    operandB = "";
  }
});

equal.addEventListener("click", function(){
  if (operator != null && operandA != null && operandB != null) {
    display.textContent= "";
    operate(+operandA, +operandB, operator);
    operator = "";
    operandA = "";
    operandB = "";
  }
} )

