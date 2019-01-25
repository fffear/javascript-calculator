function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
      return a - b;
  }
  
  function multiply(a, b) {
      return a * b;
  }
  
  function divide(a, b) {
      return a / b;
  }
  
  function operate(a, operator, b) {
    return operator == "+" ? add(a, b)
    : operator == "-" ? subtract(a, b)
    : operator == "*" ? multiply(a, b)
    : operator == "/" ? divide(a, b)
    : "error";
}
