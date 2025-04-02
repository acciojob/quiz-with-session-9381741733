const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        answer: "Harper Lee"
    },
    {
        question: "What is the square root of 16?",
        choices: ["2", "3", "4", "5"],
        answer: "4"
    }
];

// Function to load questions and restore selections
function loadQuestions() {
    const questionContainer = document.getElementById("questions");
    questionContainer.innerHTML = "";

    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.choices.forEach(choice => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="q${index}" value="${choice}" ${progress[index] === choice ? "checked" : ""}>
                ${choice}
            `;
            label.querySelector("input").addEventListener("change", () => saveProgress(index, choice));
            questionDiv.appendChild(label);
        });

        questionContainer.appendChild(questionDiv);
    });

    // Load the last stored score if available
    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        document.getElementById("score").textContent = `Your last score was ${storedScore} out of 5.`;
    }
}

// Function to save progress to session storage
function saveProgress(index, choice) {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[index] = choice;
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Function to calculate and display the score
function submitQuiz() {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    let score = 0;

    questions.forEach((q, index) => {
        if (progress[index] === q.answer) {
            score++;
        }
    });

    document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
}

// Event listener for submitting the quiz
document.getElementById("submit").addEventListener("click", submitQuiz);

// Load questions on page load
document.addEventListener("DOMContentLoaded", loadQuestions);
