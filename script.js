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

let operandB = "";

let operator = "";

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
  if (value.toString().includes("e")){
    return value;
  }
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
  let beforePointLength = beforePoint.length;
  if (beforePoint < 0) {
    beforePointLength -= 1;
  }
  if (value == Infinity || value == -Infinity) {
    return "WHAT HAVE Y-"
  }
  if (value.toString().includes("e") && value.toString().includes(".")){
    return exponentiator(value, 1);
  }
  if (value.toString().includes("e")){
    return exponentiator(value, 0)
  }
  if (afterPoint === undefined && beforePointLength < 14) {
    return value; 
  }
  if (beforePointLength >= 14) {
    return exponentiator(value, 0);
  }
  if (beforePointLength + afterPoint.length < 13){
    return value;
  }
  if (beforePointLength + afterPoint.length >= 13) {
    return parseFloat(value.toFixed(12-beforePointLength));
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
display.addEventListener("mousewheel", (e) => e.blur());

for (const number of arrNumbers){
  number.addEventListener("click", () =>
    findInputSource("screen", arrNumbers.indexOf(number).toString()))
}

addition.addEventListener("click", () => setOperation("+", 0), );

subtraction.addEventListener("click", () => setOperation("-", 0));

multiplication.addEventListener("click", () => setOperation("*", 0));

division.addEventListener("click", () => setOperation("/", 0));

equal.addEventListener("click", () => setOperation("", 1));

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

point.addEventListener("click", setPoint);

clear.addEventListener("click", function(){
  operandA = "";
  operandB = "";
  operator = "";
  display.textContent = "";
});

backspace.addEventListener("click", eraseLast);

window.addEventListener("keydown", (e) => {
  findInputSource("keyboard", e.key);
});

function findInputSource(source, char){
  let appendedVal;
  if (source === "keyboard") {
    appendedVal = getLastKey(char);
  }
  else {
    appendedVal = char;  
  }
  displayNumber(appendedVal);
}

function eraseLast(){
  if (display.textContent.includes("e")){
    return;
  }
  if (operator == "") {
    operandA = operandA.toString().slice(0, -1);
    display.textContent = operandA;
  }
  if (operator != "" && operandB != "" ) {
    operandB = operandB.toString().slice(0, -1);
    display.textContent = operandB;
  }
}

function displayNumber(appendedVal){
  if (appendedVal === null){
    return;
  }
  if (operator == "") {
    operandA = lengthParser(display.textContent, appendedVal);
    display.textContent = operandA;
    console.log(operandA);
  }
  else  {
    if (operandB == "") {
      display.textContent = "";
    }
    operandB = lengthParser(display.textContent, appendedVal);
    display.textContent = operandB;
  }
};

function getLastKey(char){
  let valueLength = display.textContent.length;
  let charCode = char.charCodeAt(0)
  if (charCode >= 48 && charCode <=57) {
    //0~9
    return char;
  }
  if (charCode === 45 && valueLength === 0) {
    //negative sign
    return char;
  }
  if (char === "Backspace") {
    eraseLast();
    return null;
  }
  if ((char === "." || char === ",") && !display.textContent.includes(".")) {
    setPoint()
    return null
  }
  if (char === "+" || char === "-" || char === "*" || char === "/" || char === "="){
    setOperation(char);
    return null;
  }
   return null;
}

function setOperation(newOp, isEqual){
  if (operator == "" && isEqual == 0) {
    operator = newOp;
    display.textContent = "";
  }
  if (operator != "" && operandA != "" && operandB != "") {
    operate(+operandA, +operandB, operator);
    operator = newOp;
    operandB = "";
  }
  
}

function setPoint(){
  if (operandA != "" && operandB == "" && !operandA.toString().includes(".")) {
    operandA = lengthParser(operandA, ".");
    display.textContent = operandA;
  }
  else if (operandB != "" && !operandB.toString().includes(".")) {
    operandB = lengthParser(operandB, ".");
    display.textContent = operandB;
  }
}