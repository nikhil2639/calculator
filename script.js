function addTwoNum(a, b){
    return a + b;
}
function subtractTwoNum(a, b){
  return a - b;
}
function multiplyTwoNum(a, b){
  return a * b;
}
function divideTwoNum(a , b){
  if (b === 0)
    return 'Nice try😏';
  return (a/b);
}
function operate(operator, firstNum, secondNum){
  switch(operator){
    case '+' : return addTwoNum(firstNum, secondNum);
    case '-' : return subtractTwoNum(firstNum, secondNum);
    case '*' : return multiplyTwoNum(firstNum, secondNum);
    case '/' : return divideTwoNum(firstNum, secondNum);
    default: return 'Invalid operator';            
  };
}
let firstNumber =  "",
    secondNumber = "", 
    operator = "";
    currentNumber = "",
    shouldResetDisplay = false;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

function updateDisplay(value){
  display.textContent = value;
}

function inputNumber(number){
  if(shouldResetDisplay){
    currentNumber = "";
    shouldResetDisplay = false;
  }
  if(currentNumber === "0"){
    currentNumber = number;
  }
  else{
    currentNumber += number;
  }
  
  updateDisplay(currentNumber);
}

function inputDecimal(){
  if(shouldResetDisplay){
    currentNumber = "0";
    shouldResetDisplay = false;
    updateDisplay(currentNumber);
    return;
  }
  if(currentNumber.includes(".")){
    return;
  }
  if(currentNumber === ""){
    currentNumber = "0.";
  }else{
    currentNumber += ".";
  }

  updateDisplay(currentNumber);
}

function inputOperator(nextOperator){
  if(currentNumber === "" && firstNumber === ""){
    return;
  }
  if(operator !== "" && currentNumber !== ""){
    secondNumber = Number(currentNumber);
    let result = operate(operator , Number(firstNumber), secondNumber);
    if(typeof result === "string"){
      updateDisplay(result);
      firstNumber ="";
      secondNumber = "";
      operator = "";
      currentNumber = "";
      shouldResetDisplay = true;
      return;
    }
    result = roundResult(result);
    updateDisplay(result);
    firstNumber = String(result);
    currentNumber = "";
    
  }
  else if(currentNumber !== ""){
    firstNumber = currentNumber;
    currentNumber  = "";
  }
  operator = nextOperator;
  shouldResetDisplay = false;
}

function calculateResult(){
  if(firstNumber === "" ||
    operator === "" ||
    currentNumber === ""
  ){
    return;
  }
  secondNumber = Number(currentNumber);
  let result = operate(operator, Number(firstNumber), secondNumber);
  if(typeof result === "string"){
    updateDisplay(result);
    firstNumber ="";
      secondNumber = "";
      operator = "";
      currentNumber = "";
      shouldResetDisplay = true;
    return;
  }
  result = roundResult(result);
  updateDisplay(result);
  firstNumber = String(result);
  currentNumber = "";
  shouldResetDisplay = true;
}

function roundResult(number){
  if(!Number.isFinite(number)){
    return number;
  }
  return Math.round(number * 100000000) / 100000000;

}
function clearCalculator(){
  firstNumber ="";
      secondNumber = "";
      operator = "";
      currentNumber = "";
      shouldResetDisplay = false;
      updateDisplay("0");
}
function backspace(){
  if(shouldResetDisplay){
    return;
  }
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === ""){
    updateDisplay("0");

  }else{
    updateDisplay(currentNumber);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', ()=>{
    const value = button.textContent;
    if(!isNaN(value) && value !== ""){
      inputNumber(value);
    }
    else if(value === '+' || value === '-' || value === '*' || value === '/'){
              inputOperator(value);
              updateDisplay(value);
             }
    else if(value === "="){
      calculateResult();
    }         
    else if(value === "CLE"){
      clearCalculator();

    }
    else if(value === "."){
      inputDecimal();
    } 
    else if (value === "⌫") {
      backspace();
    }
  });
});
document.addEventListener("keydown", event =>{
  const key = event.key;
  if(key >= "0" && key <= "9"){
    inputNumber(key);
  }
  else if (
    key === "+" ||
     key === "-" ||
      key === "*" ||
       key === "/" 
  ){
    inputOperator(key);
    // updateDisplay(key);
  }
  else if(key === "Backspace"){
    backspace();
  }
  else if(key === "Enter"){
    calculateResult();
  }
  else if(key === "Escape"){
    clearCalculator();
  }
  else if(key === "."){
    inputDecimal();
  }
});


