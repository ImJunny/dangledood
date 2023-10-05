const displayContainer = document.getElementById("display-container");
const wordContainer = document.getElementById("word-container");
const lettersContainer = document.getElementById("letters-container");
const counterDisplay = document.getElementById("counter");
const page = document.getElementById("page");
const resetButton = document.getElementById("reset-button");
const winScreen = document.getElementById("win-screen");
const image = document.getElementById("image");
const winScreenOverlay = document.getElementById("win-screen-overlay");

let word = "word";
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let current = null;
let counter = 0;
let check = false;
let backup = null;

function newWord() {
  if (backup !== null) {
    word = backup;
    current = Array(word.length).fill("_");
    updateWord();
  } else {
    fetchWord().then((res) => {
      word = res.toUpperCase().split("");
      current = Array(word.length).fill("_");
      updateWord();
    });
  }

  fetchWord().then((res) => {
    backup = res.toUpperCase().split("");
  });
}

function fetchWord() {
  return fetch("https://api.api-ninjas.com/v1/randomword", {
    method: "GET",
    headers: { "X-Api-Key": "f1/TINTtuN8SQIrleyvehQ==zxp27B1nVkTmKCFW" },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.word;
    });
}

function updateWord() {
  wordContainer.innerHTML = "";
  current.forEach((item) => {
    let letter = document.createElement("span");
    letter.setAttribute("class", "word");
    letter.innerHTML = item;
    wordContainer.appendChild(letter);
  });
}

alphabet.forEach((item) => {
  let letter = document.createElement("span");
  letter.setAttribute("class", "letter");
  letter.innerHTML = item;
  letter.addEventListener("click", () => {
    if (!letter.classList.contains("disable")) {
      checkLetter(item);
      letter.classList.add("disable");
    }
  });
  lettersContainer.appendChild(letter);
});

function checkLetter(guess) {
  word.forEach((letter, index) => {
    if (guess === letter) {
      current[index] = letter;
      updateWord();
      check = true;
    }
  });
  const elementsToReset = document.querySelectorAll(".letter");
  if (check === false) {
    counter++;
    switch (counter) {
      case 1:
        image.src = "images/wrong1.png";
        break;
      case 2:
        image.src = "images/wrong2.png";
        break;
      case 3:
        image.src = "images/wrong3.png";
        break;
      case 4:
        image.src = "images/wrong4.png";
        break;
      case 5:
        image.src = "images/wrong5.png";
        break;
      case 6:
        image.src = "images/wrong6.png";
        winScreen.innerHTML = "You Died! The word was " + word.join("");
        winScreen.style.visibility = "visible";
        winScreenOverlay.style.visibility = "visible";
        winScreenOverlay.style.opacity = "0.5";
        winScreen.style.top = "170px";
        elementsToReset.forEach((element) => element.classList.add("disable"));
        break;
    }
  }
  check = false;
  if (current.toString() === word.toString()) {
    winScreen.innerHTML = "You won with " + counter + " errors!";
    winScreen.style.visibility = "visible";
    winScreenOverlay.style.visibility = "visible";
    winScreenOverlay.style.opacity = "0.5";
    winScreen.style.top = "170px";
    elementsToReset.forEach((element) => element.classList.add("disable"));
  }
}

function reset() {
  newWord();
  const elementsToReset = document.querySelectorAll(".disable");
  elementsToReset.forEach((element) => element.classList.remove("disable"));
  counter = 0;
  image.src = "images/default.png";
  winScreen.style.visibility = "hidden";
  winScreen.style.top = "-95px";
  winScreenOverlay.style.visibility = "hidden";
  winScreenOverlay.style.opacity = "0";
}

newWord();
image.src = "images/default.png";
