// setting game name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Mostafa Gamal`;

// Setting Game Options
let numberOfTry = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// word manage
let wordToGuess = "";
let engineering = [
  "piston",
  "turbin",
  "carbon",
  "gasket",
  "engine",
  "torque",
  "pulley",
  "nozzle",
  "silver",
  "plasma",
];
let football = [
  "neymar",
  "benzma",
  "modric",
  "osimen",
  "mbappe",
  "rashfd",
  "haalnd",
  "torres",
  "alison",
  "sancho",
  "arnold",
  "lloris",
  "lamine",
  "arthur",
  "renato",
  "alvaro",
  "danilo",
  "sabits",
  "lengle",
  "labort",
];

let footballButton = document.querySelector(".football");
let engineerButton = document.querySelector(".engineering");

let messageArea = document.querySelector(".message");
// manage hints

document.querySelector(".hint span").innerHTML = numberOfHints;

function generateInputs() {
  let inputContainer = document.querySelector(".inputs");
  // create try div
  for (let i = 1; i <= numberOfLetters; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try ${i}</span>`;

    tryDiv.classList.add("disabled-input");
    // create inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");

      tryDiv.appendChild(input);
    }

    inputContainer.appendChild(tryDiv);
  }

  // disable all inputs except first one

  let inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");

  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });

  // move from one input to the next one

  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      let nextInput = inputs[index + 1];

      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      let currentInput = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        let nextInput = currentInput + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        let PreviousInput = currentInput - 1;
        if (PreviousInput >= 0) inputs[PreviousInput].focus();
      }

      if (event.key === "Enter") {
        checkButton.click();
      }
    });
  });

  // choose category
  footballButton.addEventListener("click", catFoot);
  engineerButton.addEventListener("click", catEngineer);

  function catFoot() {
    inputContainer.children[0].classList.remove("disabled-input");
    let inputs = Array.from(inputContainer.children[0].children);

    inputs.forEach((input) => {
      input.disabled = false;
    });
    inputContainer.children[0].children[1].focus();

    wordToGuess =
      football[Math.floor(Math.random() * football.length)].toLowerCase();

    engineerButton.disabled = true;
    footballButton.disabled = true;
    messageArea.innerHTML = "";
  }
  function catEngineer() {
    inputContainer.children[0].classList.remove("disabled-input");
    let inputs = Array.from(inputContainer.children[0].children);

    inputs.forEach((input) => {
      input.disabled = false;
    });
    inputContainer.children[0].children[1].focus();
    wordToGuess =
      engineering[Math.floor(Math.random() * engineering.length)].toLowerCase();

    engineerButton.disabled = true;
    footballButton.disabled = true;
    messageArea.innerHTML = "";
  }
}

let checkButton = document.querySelector(".check");

checkButton.addEventListener("click", checkGuess);

function checkGuess() {
  let successLetter = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    let inputfield = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let letter = inputfield.value.toLowerCase();
    let actualLetter = wordToGuess[i - 1];

    // Game logic
    if (letter === actualLetter) {
      inputfield.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputfield.classList.add("not-in-place");
      successLetter = false;
    } else {
      inputfield.classList.add("wrong");
      successLetter = false;
    }
  }

  if (successLetter) {
    messageArea.innerHTML = `You Win After ${currentTry} And The Word Is <span>${wordToGuess}</span>`;

    if (numberOfHints === 2) {
      messageArea.innerHTML = `You Win After ${currentTry} And The Word Is <span>${wordToGuess}</span><p>Congratulation You Win Without Hints</p>`;
    }

    // disabled all inputs

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));

    let inputsInDisabledDiv = document.querySelectorAll(
      ".disabled-input input"
    );

    inputsInDisabledDiv.forEach((input) => {
      input.disabled = true;
    });

    // disabled check button

    checkButton.disabled = true;
    hintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    let currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );

    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;

    let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);

    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");

      el.children[1].focus();
    } else {
      messageArea.innerHTML = `<span>Game Over </span> The Word is ${wordToGuess}`;
      checkButton.disabled = true;
      hintButton.disabled = true;
    }
  }
}

let hintButton = document.querySelector(".hint");

hintButton.addEventListener("click", handleHint);

function handleHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    hintButton.disabled = true;
  }

  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    let randomInput = emptyEnabledInputs[randomIndex];
    let indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

document.addEventListener("keydown", handelBackSpace);

function handelBackSpace(event) {
  if (event.key === "Backspace") {
    let inputs = document.querySelectorAll("input:not([disabled])");
    let currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex > 0) {
      let currentInput = inputs[currentIndex];
      let prevInput = inputs[currentIndex - 1];

      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

window.onload = function () {
  generateInputs();
  messageArea.innerHTML = "Choose Category";
};
