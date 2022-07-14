const calcBtns = document.querySelectorAll(".calc__btn");
const calcNums = document.querySelectorAll(".calc__num");
const calcOperators = document.querySelectorAll(".calc__operator");
const calcScreen = document.querySelector(".calc__screen");
const calcDisplay = document.querySelector(".calc__display");
const operatorIndicator = document.querySelector(".operator__indicator");
const calcEqaulBtn = document.querySelector("#equal_btn");
const calcDelBtn = document.querySelector("#del_btn");
const calcResetBtn = document.querySelector("#reset_btn");

let result = 0;
let operation = "";
let num1 = num2 = 0;
let hasClickedEqualBtn = false;
let history = [];
let historyIndex = 0;
let inputType = "";
let inputIndex = 0;
history[historyIndex] = {
  input: [],
  result: ""
};

const toNumber = num => parseFloat(num);
const resetDisplay = () => calcDisplay.textContent = "";

let checkOperation = (operator) => {
  switch (operator) {
    case "+":
      operation = "add"
      break;

    case "-":
      operation = "sub"
      break;

    case "/":
      operation = "div"
      break;

    case "x":
    case "*":
      operation = "mul"
      break;

    default:
      operation = "add"
      break;
    }
    updateCalcHistory(operator, "operator")
    resetDisplay();
}

let calculate = () => {
  num1 = toNumber(calcDisplay.textContent);
  switch (operation) {
    case "add":
      result = num2 + num1;
      break;

    case "sub":
      result = num2 - num1;
      break;

    case "mul":
      result = num2 * num1;
      break;

    case "div":
      result = num2 / num1;
      break;

      default:
        result = num1;
        break;
    }
    num2 = result;
    num1 = 0;
}

let deleteNum = () => calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);

let updateCalcHistory = (value, type) => {
  history[historyIndex].input[inputIndex] = value;
  if (type !== inputType) {
    inputType = type;
    inputIndex++;
  }
}

const solveArithemetic = () => {
  if (!num2) return;

  calculate();
  updateCalcHistory(calcDisplay.textContent, "result");
  calcDisplay.textContent = result;
  hasClickedEqualBtn = true;
  num1 = 0;
  num2 = 0;
  operation = "";
  history[historyIndex].result = result;
  historyIndex++;
  history.push({
    input: [],
    result: ""
  });
  operatorIndicator.textContent = "";
}


const addOperator = (operator) => {
  if (calcDisplay.textContent) {
    updateCalcHistory(calcDisplay.textContent, "num");
    calculate();
  }

  let operatorVal = !operator.textContent ? operator : operator.textContent;
  operatorIndicator.textContent = operatorVal;

  checkOperation(operatorVal);
}

calcNums.forEach(calcNum => calcNum.addEventListener("click", () => {
    if (calcNum.textContent === "." && calcDisplay.textContent.includes(".")) return;
    if (calcNum.textContent === "." && calcDisplay.textContent === "") calcDisplay.textContent = "0";
   
    if (hasClickedEqualBtn) {
      calcDisplay.textContent = calcNum.innerText;
    } else {
      calcDisplay.textContent += calcNum.innerText;
    }
    hasClickedEqualBtn = false;    
}));

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "+":
    case "-":
    case "*":
    case "/":
      addOperator(e.key);
      break;

    case "Enter":
    case "=":
      solveArithemetic();
      break;

    case "Backspace":
      calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);
      break;

    case "Delete":
      num1 = 0;
      num2 = 0;
      result = 0;
      operation = "";
      resetDisplay();
      break;

    case ".":
      if (calcDisplay.textContent === "") calcDisplay.textContent = "0";
      if (!calcDisplay.textContent.includes(".")) calcDisplay.textContent += e.key;
      break;

      default:
        break;
    }

    if (e.key.match(/^[0-9]$/)) {
      if (hasClickedEqualBtn) {
        calcDisplay.textContent = e.key;
      } else {
        calcDisplay.textContent += e.key;
      }
      hasClickedEqualBtn = false;      
    }
});

calcOperators.forEach(operator => operator.addEventListener("click", () => addOperator(operator)));

calcDelBtn.onclick = deleteNum;

calcResetBtn.onclick = () => {
  num1 = 0;
  num2 = 0;
  result = 0;
  operation = "";
  resetDisplay();
}

calcEqaulBtn.onclick = solveArithemetic;