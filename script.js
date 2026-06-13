// This replaces your previous fetch logic
import { quizData } from './quizData.js'; // You'll create this file next

let currentQuestionIndex = 0;
let userAnswers = [];

const questionEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options-container');

function startQuiz() {
    currentQuestionIndex = 0;
    renderQuestion();
}

function renderQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    questionEl.innerText = question.text;
    optionsEl.innerHTML = '';
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option.text;
        btn.className = 'btn-primary';
        btn.onclick = () => selectAnswer(option.result);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(result) {
    userAnswers.push(result);
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Logic to count which result appears most often
    const counts = userAnswers.reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {});
    const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    
    document.querySelector('.container').innerHTML = `
        <div class="card">
            <h2>Your Vibe is: ${quizData.results[winner].title}</h2>
            <p>${quizData.results[winner].description}</p>
            <ul>${quizData.results[winner].playlist.map(song => `<li>${song}</li>`).join('')}</ul>
        </div>
    `;
}

// Attach to your "Start Quiz" button
document.getElementById('start-btn').onclick = startQuiz;