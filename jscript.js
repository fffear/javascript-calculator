const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
  
function operate(a, operator, b) {
  return operator == "+" ? add(a, b)
  : operator == "-" ? subtract(a, b)
  : operator == "*" ? multiply(a, b)
  : operator == "/" ? divide(a, b)
  : "error";
}
