function playSound(funnySound) {
  let bruhSound = new Audio("../sounds/Bruh-Sound-Effect.mp3");
  let boomSound = new Audio("../sounds/vine-boom.mp3");
  let pickup1Sound = new Audio("../sounds/pickup1.mp3");
  let pickup2Sound = new Audio("../sounds/pickup2.mp3");
  let pickup3Sound = new Audio("../sounds/pickup3");
  let backupSound = new Audio("../sounds/backup.mp3");
  switch (funnySound) {
    case "bruh":
      bruhSound.play();
      break;
    case "boom":
      boomSound.play();
      break;
    case "pickup":
      let rand = Math.floor(Math.random() * 3);
      switch (rand) {
        case 1:
          pickup1Sound.play();
          break;
        case 2:
          pickup2Sound.play();
          break;
        case 3:
          pickup3Sound.play();
          break;
      }
      break;
    case "backup":
      backupSound.play();
  }
}

let load = () => {
  let elem = document.querySelector(".bar");
  let loadPercentEl = document.querySelector(".load-percent");
  let loadingScreenEl = document.querySelector(".loading-screen");
  let width = 0;
  let loadingInterval = setInterval(() => {
    if (width < 90) {
      width += Math.random().toFixed(1) * 10;
      elem.style.width = width + "%";
      loadPercentEl.textContent = width + "%";
      console.log(width);
    } else {
      width = 100;
      elem.style.width = width + "%";
      loadPercentEl.textContent = "100%";
      loadingScreenEl.style.transition = "opacity 1s linear 0s";
      loadingScreenEl.style.opacity = 0;
      let interval = false
      playSound("bruh");
      let fadeInterval = setInterval(() => {
        if(interval) {
          loadingScreenEl.style.display = "none";
          clearInterval(fadeInterval);
        }
        interval = true;
        
      }, 1000);
      clearInterval(loadingInterval);
    }
  }, 200);
};

load();

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        if (prev === 9 && current === 10) computation = 21;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay =
        integerDigits.toLocaleString("en", { maximumFractionDigits: 0 }) +
        " deez nuts";
    }

    if (decimalDigits != null) {
      return `${integerDisplay.slice(0, -10)}.${decimalDigits} deez nuts`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (
      this.currentOperandTextElement.innerText === "420 deez nuts" ||
      this.currentOperandTextElement.innerText === "69 deez nuts"
    ) {
      this.currentOperandTextElement.innerText =
        "HAHAHAHAHAHAHAAHAHAHAHAHAHAHAHAHAHAHAHA FUNNY NUMBER HAHAHAHAHAHAHAHAHAHAHAHAHA";
      console.log("69 or 420");
    }
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    playSound("pickup");
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();

    playSound("pickup");
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
  playSound("boom");
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();

  playSound("pickup");
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();

  playSound("backup");
});
