// Store user progress in session storage
function saveProgress() {
  const progress = {};
  document.querySelectorAll("input[type='radio']:checked").forEach((input) => {
    progress[input.name] = input.value;
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Retrieve user progress from session storage
function loadProgress() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  document.querySelectorAll("input[type='radio']").forEach((input) => {
    if (progress[input.name] === input.value) {
      input.checked = true;
    }
  });
}

// Submit quiz and calculate score
function submitQuiz() {
  let score = 0;
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q, index) => {
    if (progress[`question-${index}`] === q.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;
}

// Render questions
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", saveProgress);
      
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    
    questionsElement.appendChild(questionElement);
  }
  loadProgress();
}

document.getElementById("submit").addEventListener("click", submitQuiz);
renderQuestions();
