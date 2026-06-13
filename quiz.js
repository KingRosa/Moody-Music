const quizData = [
    {
        question: "What's your ideal Friday night vibe?",
        options: ["Neon lights and loud bass", "Cozy room and lo-fi beats", "Sleeping and Playing Video Games"]
    },
    {
        question: "How do you handle stress?",
        options: ["Listen to Music", "Take Nature Walks", "Dissociate"]
    },
    {
        question: "Why do you like Music?",
        options: ["It helps me gather my thoughts", "Soul Connecting", "Other Reason"]
    },
    // --- New Questions Start Here ---
    {
        question: "If you could live in any environment, where would it be?",
        options: ["A futuristic cityscape (CyberPunk)", "A Log Cabin in the forest", "Arctic Tundra"]
    },
    {
        question: "Which of these instruments resonates with you most?",
        options: ["Synthesizers and drum machines", "Acoustic guitar or piano", "Ambient soundscapes"]
    },
    {
        question: "What is your primary goal when listening to music?",
        options: ["To dance and feel energized", "To relax and decompress", "To get lost in the sound"]
    }
];

let currentQuestion = 0;

function startQuiz() {
    renderQuestion();
}

function renderQuestion() {
    const content = document.getElementById('quiz-content');
    const q = quizData[currentQuestion];

    content.innerHTML = `
        <h2 class="sub-title">${q.question}</h2>
        <div class="quiz-options">
            ${q.options.map((opt, index) => `
                <button class="btn-primary" onclick="handleAnswer(${index})">${opt}</button>
            `).join('')}
        </div>
    `;
}

let answers = []; // Stores user selections

function handleAnswer(index) {
    answers.push(index); // Save which button they clicked (0 or 1)
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

let scores = {
    "Electric Soul": 0,
    "Midnight Echo": 0,
    "Golden Acoustic": 0,
    "Neon Glitch": 0
};

function handleAnswer(profile) {
    scores[profile]++; // Add a point to the chosen profile
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        renderQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    // Find the profile with the highest score
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    const descriptions = {
        "Electric Soul": "You are the life of the party—high energy and vibrant.",
        "Midnight Echo": "You are introspective, mysterious, and deep.",
        "Golden Acoustic": "You are authentic, grounded, and timeless.",
        "Neon Glitch": "You are unpredictable, cutting-edge, and complex."
    };

    document.getElementById('quiz-content').innerHTML = `
        <h2 class="main-title">Result: ${winner}</h2>
        <p>${descriptions[winner]}</p>
        <button class="btn-primary" onclick="location.reload()">Restart</button>
    `;
}