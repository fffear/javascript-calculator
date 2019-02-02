const operators = {
  "+": {
    name: "add",
    precedence: 1,
    associativity: "left",
    operation: function (a, b) {return a + b;},
  },
  "-": {    
  name: "subtract",
  precedence: 1,
  associativity: "left",
  operation: function (a, b) {return a - b;},
  },
  "*": {
    name: "multiply",
    precedence: 2,
    associativity: "left",
    operation: function (a, b) {return a * b;},
  },
  "/": {
    name: "divide",
    precedence: 2,
    associativity: "left",
    operation: function (a, b) {return a / b;},
  },
  "^": {
    name: "exponent",
    precedence: 3,
    associativity: "right",
    operation: function (a, b) {return Math.pow(a, b);},
  },
  "%": {
    name: "mod",
    precedence: 3,
    associativity: "right",
    operation: function (a, b) {return a % b;},
  },
}

function isNumeric(x) {
  return isFinite(x) && !isNaN(parseFloat(x));
}

function operate() {
  let inputs = [];
  let outputQueue = []; 

  let tokens = displayValue.split(" ");
  tokens.splice(tokens.length - 1, 1);
  console.log(tokens);
 
  for ( i = 0; i < tokens.length; i++ ) {
    let token = tokens[i];
    let o1 = inputs[inputs.length -1];

    if (isNumeric(token)) {
      outputQueue.push(token);
    } else if (/[\%\^\+\*\/\-]/.test(token)) {
    
      for (o1 = inputs[inputs.length -1];
          (/[\%\^\+\*\/\-]/.test(o1) && ((operators[token].precedence < operators[o1].precedence && operators[token].associativity == "right") ||
          (operators[token].precedence <= operators[o1].precedence && operators[token].associativity == "left")));
          o1 = inputs[inputs.length -1]) {
            outputQueue.push(o1);  
            inputs.pop();
      }
      inputs.push(token);
    } else if (token === "(") {
      inputs.push(token);
    } else if (token === ")") {
      while (inputs[inputs.length - 1] != "(") {
        outputQueue.push(inputs.pop());
      } 
      inputs.pop();
    } else if (tokens[i] === "=") {
      while (inputs.length > 0) {
        outputQueue.push(inputs.pop());
      }
      let resultStack = [];
      for (i = 0; i < outputQueue.length; i++) {
        if (isNumeric(outputQueue[i])) {
          resultStack.push(outputQueue[i]);
        }
        if (!isNumeric(outputQueue[i])) {
          let b = resultStack.pop();
          let a = resultStack.pop();
          if (/\+/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
          if (/\-/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
          if (/[\*]/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
          if (/\//.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
          if (/\^/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
          if (/\%/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
            console.log(resultStack);
          }
        }
      }
    displayValue = Number(Math.round(resultStack[0] + "e2") + "e-2");
    updateDisplay();
    }
  }
  console.log(inputs);
  console.log(outputQueue);
}

const display = document.getElementById("calculatorDisplay");
let displayValue = "0";
updateDisplay();

const calculatorButtons = document.querySelector("calculatorGridContainer");

function updateDisplay() {
  display.textContent = displayValue;
  return;
}

function inputDigit(digit) {
  if (displayValue === "0") {
    displayValue = digit;
  } else if (displayValue !== "0") {
    displayValue += digit;
  }
}

function inputDecimal(decimal) {
  if (displayValue.search(/\./) == -1) {
    displayValue += decimal;
  } else { return;}
}

function inputOperator(operator) {
  if (/\d$/.test(displayValue) || /\.$/.test(displayValue)) {
    displayValue += " " + operator + " ";
  } else if (/\)\s$/.test(displayValue)) {
    displayValue += operator + " ";
  } else { return; }
}

function inputBrackets(brackets) {
  if (displayValue == 0 || /[\%\^\+\*\/\-]\s$/.test(displayValue)) {
    displayValue += brackets + " ";
  } else if (/\d$|\.$/.test(displayValue)) {
    displayValue += " " + brackets + " ";
  }
}

function inputMod(mod) {
  if (displayValue == 0) {
    return;
  } else {
    displayValue += " " + mod + " ";
  }
}

function negateNumber() {
  let tokenArray = displayValue.split(" ");
  if (isNumeric(tokenArray[tokenArray.length - 1])) {
    let ele1 = (tokenArray.pop() * -1).toString();
    tokenArray.push(ele1);
    displayValue = tokenArray.join(" ");
  }
}

function clearDisplay() {
  displayValue = "0";
}

function deleteDisplay() {
  let tempDisplayValue = displayValue.split("");
  
    
  if (displayValue == "") {
    displayValue = "0";
  } else if (/[\%\^\+\*\/\-]\s$/.test(displayValue)) {
  tempDisplayValue.splice(-3, 3);
  displayValue = tempDisplayValue.join("");
  } else {
    tempDisplayValue.splice(-1, 1);
    displayValue = tempDisplayValue.join("");
  }                                   
}

calculatorGridContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains("number")) {
    inputDigit(e.target.value);
    updateDisplay();
  }

  if (e.target.classList.contains("decimal")) {
    inputDecimal(e.target.innerText);
    updateDisplay();
  }
 
  if (e.target.classList.contains("operator")) {
    inputOperator(e.target.innerText);
    updateDisplay();
    operate();
  }
  
  if (e.target.classList.contains("brackets")) {
    inputBrackets(e.target.innerText);
    updateDisplay();
    operate();
  }

  if (e.target.classList.contains("modulus")) {
    inputMod(e.target.innerText);
    updateDisplay();
    operate();
  }

  if (e.target.classList.contains("clear")) {
    clearDisplay();
    updateDisplay();
  }

  if (e.target.classList.contains("delete")) {
    deleteDisplay();
    updateDisplay();
  }

  if (e.target.classList.contains("negation")) {
    negateNumber();
    updateDisplay();
  }
});

