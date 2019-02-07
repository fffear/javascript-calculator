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
 
  for (i = 0; i < tokens.length; i++ ) {
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
      while (inputs.length > 0) {
        if (inputs[inputs.length - 1] != "(") {
        outputQueue.push(inputs.pop());
        } else if (inputs[inputs.length - 1] == "(") { 
          inputs.pop();
          break;

        } 
      }
    } else if (tokens[i] === "=") {
      while (inputs.length > 0) {
        outputQueue.push(inputs.pop());
      }
      let resultStack = [];
      for (let i = 0; i < outputQueue.length; i++) {
        if (isNumeric(outputQueue[i])) {
          resultStack.push(outputQueue[i]);
        }
        if (!isNumeric(outputQueue[i])) {
          let b = resultStack.pop();
          let a = resultStack.pop();
          if (/\+/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (outputQueue[i].search(/\-$/) == 0) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/[\*]/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\//.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\^/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
          if (/\%/.test(outputQueue[i])) {
            resultStack.push(operators[outputQueue[i]].operation(parseFloat(a), parseFloat(b)));
          }
        }
      } 
    displayValue = Number(Math.round(resultStack[0] + "e2") + "e-2");
    if (resultStack[0] == Infinity || resultStack[0] == -Infinity) {
      displayValue = "Infinity! Can't divide by 0!";
    } 
    updateDisplay(); 
    } 
  }
}

const display = document.getElementById("calculatorDisplay");
const display2 = document.getElementById("equationDisplay");
let displayValue = "0";
updateDisplay();

const calculatorContainer = document.querySelector("#calculatorGridContainer");

function updateDisplay() {
  display.textContent = displayValue;
  return;
}

function updateDisplay2() {
  display2.textContent = displayValue;
  return;
}

function inputDigit(digit) {
  if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue += digit;
  }
}

function inputDecimal(decimal) {
  if (/[\(\)\%\^\+\*\/\-]\s$/.test(displayValue)) {
    displayValue += 0 + decimal;
  } else if (/\.\d*$/.test(displayValue)) {
    return;
  } else if (displayValue === 0 || /\d*$/.test(displayValue)) {
    displayValue += decimal;
    return;
  }
}

function inputOperator(operator) {
  if (/\d$/.test(displayValue) || /\.$/.test(displayValue)) {
    displayValue += " " + operator + " ";
  } else if (/\)\s$/.test(displayValue)) {
    displayValue += operator + " ";
  } else { return; }
}

function inputBrackets(brackets) {
  if (displayValue == 0) {
    displayValue = brackets + " ";
  } else if (/\d$|\.$/.test(displayValue)) {
    displayValue += " " + brackets + " ";
  } else if (/[\(\)\%\^\+\*\/\-]\s$/.test(displayValue)) {
    displayValue += brackets + " ";
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
  display2.textContent = null;
}

function deleteDisplay() {
  let tempDisplayValue = displayValue.split("");
    
  if (/[\%\^\+\*\/\-]\s$/.test(displayValue)) {
    tempDisplayValue.splice(-3, 3);
    displayValue = tempDisplayValue.join("");
  } else if (/[\(\)]\s$/.test(displayValue)) {
    tempDisplayValue.splice(-2, 2);
    displayValue = tempDisplayValue.join("");
  } else if (/\d+\.?\d*$|-$/.test(displayValue)) {
    tempDisplayValue.splice(-1, 1);
    displayValue = tempDisplayValue.join("");
  }                           
}

let removableBtns = document.querySelectorAll("div.removable");
removableBtns.forEach((removableBtn) => {
  removableBtn.setAttribute("style", "display: block")
});

function removeButtons() {
  removableBtns.forEach((removableBtn) => {
    if (removableBtn.style.display == "block") {
      removableBtn.setAttribute("style", "display: none");
    } else {
      removableBtn.setAttribute("style", "display: block");
    }
  });
}

function displayHelp() {
  let helpBox = document.querySelector(".help-info");

  if (helpBox.style.display == "block") {
    helpBox.setAttribute("style", "display: none");
  } else {
    helpBox.setAttribute("style", "display: block");
  }
}

calculatorContainer.addEventListener("click", function(e) {
  let btns = document.querySelectorAll("div[data-key]");
  let btns2 = document.querySelectorAll("div[data-key-2]");

  function removeTransition(e) {
    if (e.propertyName) {
    e.target.classList.remove("selected");    
    }
  }

  btns.forEach(button => button.addEventListener("transitionend", removeTransition));
  btns2.forEach(button => button.addEventListener("transitionend", removeTransition));

  if (e.target.classList.contains("number")) {
    inputDigit(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("decimal")) {
    inputDecimal(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }
 
  if (e.target.classList.contains("operator")) {
    inputOperator(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    operate();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }
  
  if (e.target.classList.contains("brackets")) {
    inputBrackets(e.target.innerText);
    updateDisplay();
    updateDisplay2();
    operate();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("clear")) {
    clearDisplay();
    updateDisplay();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }

  if (e.target.classList.contains("delete")) {
    if (/^\d$/.test(displayValue) || /^[\(\)]\s$/.test(displayValue) ||
    /^0[.]$/.test(displayValue) || /^0\s[\/\%\*\+\-]\s$/.test(displayValue) ||
    /^-$/.test(displayValue)) {
      clearDisplay();
      updateDisplay();
      e.target.classList.remove("hover-over");
      e.target.classList.add("selected");
    } else {
    deleteDisplay();
    updateDisplay();
    updateDisplay2();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
    }
  }

  if (e.target.classList.contains("negation")) {
    if (displayValue === "0") {
      e.target.classList.remove("hover-over");
      e.target.classList.add("selected");
      return;
    } else {
    negateNumber();
    updateDisplay();
    updateDisplay2();   
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
    }
  }

  if (e.target.classList.contains("help")) {
    removeButtons();    
    displayHelp();
    e.target.classList.remove("hover-over");
    e.target.classList.add("selected");
  }
});

function hoverColor(e) {
  if (e.target.hasAttribute("data-key")) {
    e.target.classList.add("hover-over");
  } else if (e.target.hasAttribute("data-key-2")) {
    e.target.classList.add("hover-over");
  }
}

function removeHoverColor(e) {
  if (e.target.hasAttribute("data-key")) {
    e.target.classList.remove("hover-over");
  } else if (e.target.hasAttribute("data-key-2")) {
    e.target.classList.remove("hover-over");
  }
}

calculatorContainer.addEventListener("mouseover", hoverColor);
calculatorContainer.addEventListener("mouseout", removeHoverColor);

window.addEventListener("keydown", function(e) {
  let btn = document.querySelector(`div[data-key="${e.keyCode}"]`);
  let btn2 = document.querySelector(`div[data-key-2="${e.keyCode}"]`);

  function removeTransition(e) { 
    if (e.propertyName) {
    e.target.classList.remove("selected");
    }
  }
  
  let btns = document.querySelectorAll(`div[data-key="${e.keyCode}"]`);
  let btns2 = document.querySelectorAll(`div[data-key-2="${e.keyCode}"]`);

btns.forEach(button => button.addEventListener("transitionend", removeTransition));
btns2.forEach(button => button.addEventListener("transitionend", removeTransition));

  if (!btn && !btn2) return;

  if (e.keyCode == 8) { //clear
    clearDisplay();
    updateDisplay();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");

    
    return;
  }

  if (e.keyCode == 53 && e.shiftKey == true) { //modulus
    inputOperator("%");
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  }

  if (e.keyCode == 57 && e.shiftKey == true || e.keyCode == 48 && e.shiftKey == true) { //brackets
    inputBrackets(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");

    return;
  }

  if (e.keyCode == 13) { //equals
    inputOperator("=");
    operate();
    updateDisplay();
    updateDisplay2();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 46) { //delete
    if (/^\d$/.test(displayValue) || /^[\(\)]\s$/.test(displayValue) ||
    /^0[.]$/.test(displayValue) || /^0\s[\/\%\*\+\-]\s$/.test(displayValue) ||
    /^-$/.test(displayValue)) {
      clearDisplay();
      updateDisplay();
      btn.classList.remove("hover-over");
      btn.classList.add("selected");
    } else {
    deleteDisplay();
    updateDisplay();
    updateDisplay2();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");  
    }
  }

  if (e.keyCode == 54 && e.shiftKey == true) { //math power
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  }

  if (e.keyCode == 72) { //help
    removeButtons();
    displayHelp();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 78) { //negation
    negateNumber();
    updateDisplay();
    updateDisplay2();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 190) { //decimal
    inputDecimal(".");
    updateDisplay();
    updateDisplay2();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  } else if (e.keyCode == 110) {
    inputDecimal(".");
    updateDisplay();
    updateDisplay2();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 107) { //addition
    inputOperator("+");
    updateDisplay();
    updateDisplay2();
    operate();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  } else if (e.keyCode == 61) { 
    inputOperator("+");
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  }

  if (e.keyCode == 173) { //subtraction
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  } else if (e.keyCode == 109) {
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 56 && e.shiftKey == true) { //multiplication
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  } else if (e.keyCode == 106) {
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode == 191) { //division
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  } else if (e.keyCode == 111) {
    inputOperator(e.key);
    updateDisplay();
    updateDisplay2();
    operate();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  }

  if (e.keyCode >= 48 && e.keyCode <=57) {
    inputDigit(e.key);
    updateDisplay();
    updateDisplay2();
    btn.classList.remove("hover-over");
    btn.classList.add("selected");
    return;
  } else if (e.keyCode >= 96 && e.keyCode <=105) {
    inputDigit(e.key);
    updateDisplay();
    updateDisplay2();
    btn2.classList.remove("hover-over");
    btn2.classList.add("selected");
    return;
  }
  
});