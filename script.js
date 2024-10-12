const addition = document.querySelector("#addition");
const subtraction = document.querySelector("#subtraction");
const multiplication = document.querySelector("#multiplication");
const division = document.querySelector("#division");
const equal = document.querySelector("#equal");
const point = document.querySelector("#point");
const backspace = document.querySelector("#backspace");
const signFlipper  = document.querySelector("#flip-sign");
const clear = document.querySelector("#clear");
const display = document.querySelector("#result");

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

let operandA = "";
let operandB = "";
let operator = "";

addition.addEventListener("click", () => setOperation("+", 0));
subtraction.addEventListener("click", () => setOperation("-", 0));
multiplication.addEventListener("click", () => setOperation("*", 0));
division.addEventListener("click", () => setOperation("/", 0));
equal.addEventListener("click", () => setOperation("", 1));
point.addEventListener("click", setPoint);
backspace.addEventListener("click", eraseLast);
signFlipper.addEventListener("click", flipSign);
clear.addEventListener("click", clearDisplay);
window.addEventListener("keydown", (e) => detectKeys(e));

for (const number of arrNumbers){
  number.addEventListener("click", () => findInputSource("screen", arrNumbers.indexOf(number).toString()))
}

function findInputSource(source, char){
  let appendedVal;
  if (source === "keyboard") {
    appendedVal = getLastKey(char);
  }
  else {
    appendedVal = char;  
  }
  displayInput(appendedVal);
}

function detectKeys(e){
  if (e.isComposing || e.keyCode === 229) {
    return;
  }
  findInputSource("keyboard", e.key);
}

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
  if (char === "+" || char === "-" || char === "*" || char === "/") {
    setOperation(char, 0);
    return null;
  }
  if (char === "=" || char === "Enter") {
    setOperation("", 1);
    return null;
  }
   return null;
}

function inputParser(value, appendedVal){
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

function setPoint(){
  if (operandA !== "" && operandB === "" && !operandA.toString().includes(".")) {
    operandA = inputParser(operandA, ".");
    display.textContent = operandA;
  }
  else if (operandB !== "" && !operandB.toString().includes(".")) {
    operandB = inputParser(operandB, ".");
    display.textContent = operandB;
  }
}

function flipSign() {
  if (operandB !== "") {
    operandB *= -1;
    display.textContent = outputParser(operandB);
  }
  else if (operandA !== "" && operator === "") {
    operandA *= -1;
    display.textContent = outputParser(operandA);
  }
}

function displayInput(appendedVal){
  if (appendedVal === null){
    return;
  }
  if (operator === "") {
    operandA = inputParser(display.textContent, appendedVal);
    display.textContent = operandA;
  }
  else  {
    if (operandB === "") {
      display.textContent = "";
    }
    operandB = inputParser(display.textContent, appendedVal);
    display.textContent = operandB;
  }
}

function eraseLast(){
  if (display.textContent.includes("e")){
    return;
  }
  if (operator === "") {
    operandA = operandA.toString().slice(0, -1);
    display.textContent = operandA;
  }
  if (operator !== "" && operandB !== "" ) {
    operandB = operandB.toString().slice(0, -1);
    display.textContent = operandB;
  }
}

function clearDisplay() {
  operandA = "";
  operandB = "";
  operator = "";
  display.textContent = "";
}

function setOperation(newOp, isEqual){
  if (operandA !== "" && operator === "" && isEqual === 0) {
    operator = newOp;
    display.textContent = "";
    styleButton();
  }
  if (operator !== "" && operandA !== "" && operandB !== "") {
    operate(+operandA, +operandB, operator);
    operator = newOp;
    operandB = "";
    styleButton();
  }
  
}

function operate(operandA, operandB, operator){
  let result;
  switch(operator){
  case "+":
    result = (operandA + operandB);
    break;
  case "-":
    result = (operandA - operandB);
    break;
  case "*":
    result = (operandA * operandB);
    break;
  case "/":
    result = (operandA / operandB);
  }
  result = outputParser(result);
  outputResult(result);
  addition.style.backgroundColor = "rgb(255, 255, 0)";
  subtraction.style.backgroundColor = "rgb(255, 255, 0)";
  multiplication.style.backgroundColor = "rgb(255, 255, 0)";
  division.style.backgroundColor = "rgb(255, 255, 0)";

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
  if (value === Infinity || value === -Infinity) {
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


function exponentiator(value, bool){
  if (bool === 1){
    //
    let beforeExpo = Number(value.toString().split("e")[0]);
    let afterExpo = Number(value.toString().split("e")[1]);
    beforeExpo = parseFloat(beforeExpo.toFixed(7));
    if (beforeExpo === 10 || beforeExpo === -10) {
      beforeExpo = 1;
      afterExpo += 1;
    }
    return `${beforeExpo}e${afterExpo}`
  }
  if (bool === 0) {
    return exponentiator(value.toExponential(7), 1);
  }
}

function outputResult(result) {
  display.textContent = result;
  if (operator !== "") {
    operandA = result;
  }
}

function styleButton(){ 
    switch(operator) {
      case "+":
        addition.style.backgroundColor = "rgb(180, 180, 0)";
        break;
      case "-":
        subtraction.style.backgroundColor = "rgb(180, 180, 0)";
        break;
      case "*":
        multiplication.style.backgroundColor = "rgb(180, 180, 0)";
        break;
      case "/":
        division.style.backgroundColor = "rgb(180, 180, 0)";
    }
  }