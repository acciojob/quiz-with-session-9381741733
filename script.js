document.addEventListener("DOMContentLoaded", () => {
    // Quiz questions and answers
    const questions = [
        { question: "What is the capital of France?", options: ["London", "Paris", "Rome", "Berlin"], answer: 1 },
        { question: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 2 },
        { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answer: 2 },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 }
    ];

    const quizContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    // Load previous score from local storage
    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
        scoreDisplay.textContent = `Last Score: ${savedScore} out of 5`;
    }

    // Load progress from session storage
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

    // Render quiz questions
    function renderQuiz() {
        quizContainer.innerHTML = "";

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            q.options.forEach((option, i) => {
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = i;
                input.id = `q${index}_o${i}`;

                // Restore saved answers from session storage
                if (progress[index] == i) {
                    input.checked = true;
                }

                input.addEventListener("change", () => saveProgress(index, i));

                const label = document.createElement("label");
                label.setAttribute("for", `q${index}_o${i}`);
                label.textContent = option;

                questionDiv.appendChild(input);
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement("br"));
            });

            quizContainer.appendChild(questionDiv);
        });
    }

    // Save user progress in session storage
    function saveProgress(questionIndex, selectedOption) {
        progress[questionIndex] = selectedOption;
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }

    // Calculate and display score
    function submitQuiz() {
        let score = 0;

        questions.forEach((q, index) => {
            if (progress[index] == q.answer) {
                score++;
            }
        });

        scoreDisplay.textContent = `Your score is ${score} out of 5`;
        localStorage.setItem("score", score);
    }

    // Load quiz on page load
    renderQuiz();
    submitButton.addEventListener("click", submitQuiz);
});
