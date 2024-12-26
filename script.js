const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
  {
    question: "What is the capital of Italy?",
    options: ["Madrid", "Paris", "Rome", "Berlin"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 2,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
    correctAnswer: 2,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Hg", "Pb"],
    correctAnswer: 0,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Pound"],
    correctAnswer: 0,
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Korea", "Japan", "Vietnam"],
    correctAnswer: 2,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "What is the freezing point of water in Fahrenheit?",
    options: ["0°F", "32°F", "100°F", "212°F"],
    correctAnswer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

const questionCounter = document.getElementById("question-counter");
const scoreCounter = document.getElementById("score");
const questionText = document.getElementById("question-text");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-button");
const scoreboard = document.querySelector(".scorecard");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

const startQuizButton = document.getElementById("start-quiz-button");
const quizContainer = document.querySelector(".quiz-container");

startQuizButton.addEventListener("click", () => {
  startQuizButton.parentElement.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
});

nextButton.disabled = true;

let optionClicked = false;

function loadQuestion() {
  if (currentQuestion < questions.length) {
    questionCounter.textContent = `Question ${currentQuestion + 1}/${
      questions.length
    }`;
    questionText.textContent = questions[currentQuestion].question;

    options.forEach((option, index) => {
      option.textContent = questions[currentQuestion].options[index];
      option.style.backgroundColor = "white";
      option.style.pointerEvents = "auto";
      option.onclick = function () {
        handleOptionClick(index);
      };
    });

    nextButton.disabled = !optionClicked;
  } else {
    showScoreboard();
  }
}

function handleOptionClick(selectedOptionIndex) {
  const correctAnswerIndex = questions[currentQuestion].correctAnswer;

  options.forEach((option) => {
    option.style.pointerEvents = "none";
    option.onclick = null;
  });

  if (selectedOptionIndex === correctAnswerIndex) {
    options[selectedOptionIndex].style.backgroundColor = "green";
    score++;
    scoreCounter.textContent = `Score: ${score}`;
  } else {
    options[selectedOptionIndex].style.backgroundColor = "red";
    options[correctAnswerIndex].style.backgroundColor = "green";
  }

  optionClicked = true;
  nextButton.disabled = false;
}

function showScoreboard() {
  scoreboard.style.display = "block";
  finalScore.textContent = score;
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  optionClicked = false;
  nextButton.disabled = true;
  loadQuestion();
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreboard.style.display = "none";
  loadQuestion();
  scoreCounter.textContent = "Score: 0";
  optionClicked = false;
});

loadQuestion();
