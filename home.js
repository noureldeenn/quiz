// Function to load content from HTML files
function loadContent(route) {
  if (route === "home.html") {
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("content").innerHTML = "";
  } else if (route !== "home.html") {
    return fetch(route + ".html")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((html) => {
        document.getElementById("content").innerHTML = html;
        document.getElementById("quiz-container").style.display = "none";
        startQuiz(route);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        document.getElementById("content").innerHTML = `<h1>404 Not Found</h1>`;
      });
  }
}

// Function to navigate to a specific route
function navigateTo(event, route) {
  event.preventDefault(); // Prevent default link behavior
  history.pushState({}, "", route); // Update the URL in the address bar
  loadContent(route); // Load the corresponding content
}

// Handle back/forward navigation
window.addEventListener("popstate", () => {
  loadContent(window.location.pathname.split("/").pop()); // Extract the route from the URL
});

const questionsForPhysicsHard = [
  {
    question:
      "A car accelerates uniformly from rest to a speed of 20 m/s in 5 seconds. What is the distance traveled by the car during this time?",
    options: ["50 m", "100 m", "150 m", "200 m"],
    answer: 0,
  },
  {
    question:
      "In an ideal gas, if the pressure is doubled while the volume is kept constant, what happens to the temperature?",
    options: [
      " It halves",
      "It doubles",
      "It remains constant",
      "It increases by a factor of four",
    ],
    answer: 1,
  },
  {
    question:
      "What is the direction of the magnetic force on a charged particle moving in a magnetic field?",
    options: [
      "Parallel to the velocity of the particle",
      "Perpendicular to the velocity and magnetic field direction",
      "In the same direction as the magnetic field",
      "In the opposite direction to the magnetic field",
    ],
    answer: 1,
  },
  {
    question:
      "Which of the following phenomena can be explained by the wave nature of light?",
    options: [
      "Photoelectric effect",
      "Black body radiation",
      "Diffraction",
      "Compton scattering",
    ],
    answer: 2,
  },
];

const questionsForChemistryHard = [
  {
    question:
      "Which of the following factors does NOT affect the rate of a chemical reaction?",
    options: [
      "Temperature",
      "Concentration of reactants",
      "Presence of a catalyst",
      "The color of the reactants",
    ],
    answer: 3,
  },
  {
    question: "Which of the following compounds is the most acidic?",
    options: [" Ethanol", "Acetic acid", "Phenol", "Propanoic acid"],
    answer: 1,
  },
  {
    question:
      "Which of the following elements has the highest electronegativity?",
    options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"],
    answer: 0,
  },
  {
    question: "What is the pH of a 0.01 M hydrochloric acid (HCl) solution",
    options: ["1", "2", "3", "4"],
    answer: 1,
  },
];

const questionsForMathHard = [
  {
    question: "What is the greatest common divisor (GCD) of 48 and 180",
    options: ["12", "24", "36", "48"],
    answer: 0,
  },
  {
    question: "How many ways can you arrange the letters in the word 'MATH'?",
    options: ["12", "24", "16", "20"],
    answer: 1,
  },
  {
    question:
      "If a fair six-sided die is rolled, what is the probability of rolling an even number?",
    options: ["1/2", "1/3", "2/3", "1/6"],
    answer: 0,
  },
  {
    question:
      "In a simple undirected graph with 5 vertices, what is the maximum number of edges that can exist?",
    options: ["5", "10", "15", "20"],
    answer: 1,
  },
];
let crrIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let totalQuestionsAsked = 0;
let questions;
let message;

function startQuiz(rout) {
  crrIndex = 0;
  score = 0;
  timer;
  timeLeft = 30;
  totalQuestionsAsked = 0;
  displayRandomQuestion(rout);
  startTimer(rout);
}

function displayRandomQuestion(rout) {
  questions =
    rout === "physics-hard"
      ? questionsForPhysicsHard
      : rout === "chemistry-hard"
      ? questionsForChemistryHard
      : rout === "math-hard"
      ? questionsForMathHard
      : rout === "physics-medium"
      ? questionsForPhysicsHard
      : rout === "chemistry-medium"
      ? questionsForChemistryHard
      : rout === "math-medium"
      ? questionsForMathHard
      : rout === "physics-easy"
      ? questionsForPhysicsHard
      : rout === "chemistry-easy"
      ? questionsForChemistryHard
      : rout === "math-easy"
      ? questionsForMathHard
      : [];
  totalQuestionsAsked++;
  const randomIndex = Math.floor(Math.random() * questions.length);
  const questionObj = questions[randomIndex];
  crrIndex = randomIndex;

  document.getElementById("question").textContent = questionObj.question;
  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].textContent = questionObj.options[i];
  }
}

function startTimer(rout) {
  document.getElementById("message").textContent = "";
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      document.getElementById("message").textContent = "Time is Over!";
      setTimeout(() => nextQuestion(rout), 2000);
    }
  }, 1000);
}

function selectAnswer(optionIndex) {
  rout = window.location.pathname.split("/").pop();
  clearInterval(timer);
  const questionObj = questions[crrIndex];
  if (optionIndex === questionObj.answer) {
    score += 3;
  }
  console.log(score);
  nextQuestion(rout);
}

function nextQuestion(rout) {
  if (totalQuestionsAsked < questions.length) {
    displayRandomQuestion(rout);
    startTimer(rout);
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  console.log(score);
  if (score === 3) {
    message = "Bad";
  } else if (score === 6) {
    message = "Fair";
  } else if (score === 9) {
    message = "Good";
  } else {
    message = "Excellent";
  }
  document.getElementById(
    "question-box"
  ).innerHTML = `<span>Your score is ${score}</span>`;
  console.log(
    (document.getElementById(
      "question-box"
    ).innerHTML = `<span>Your score is ${score}</span>`)
  );
  document.getElementById("message").textContent = message;
  document.getElementById("options").style.display = "none";
  document.getElementById("timer").style.display = "none";
}

// window.onload = startQuiz;
