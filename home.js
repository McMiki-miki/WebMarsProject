// -----------------------------
// ЕЛЕМЕНТИ
// -----------------------------
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

const timerEl = document.getElementById("time");
const correctCountEl = document.getElementById("correctCount");

let current = 0;
let score = 0;
let timeLeft = 20;
let timer;

// -----------------------------
// ПИТАННЯ (15)
// -----------------------------
const quiz = [
  { q: "Який елемент домінує в атмосфері Марса?", a: ["CO₂", "N₂", "Ar", "CH₄"], correct: 0 },
  { q: "Чому Марс втратив магнітне поле?", a: ["Охолодження ядра", "Астероїд", "Метан", "Сонячний вітер"], correct: 0 },
  { q: "Яка гора є найвищою у Сонячній системі?", a: ["Олімп", "Еверест", "Монс Арсія", "Монс Павоніс"], correct: 0 },
  { q: "Середня гравітація на Марсі:", a: ["0.38 g", "0.62 g", "0.12 g", "1.0 g"], correct: 0 },
  { q: "Скільки триває марсіанський рік?", a: ["687 днів", "432 дні", "1024 дні", "365 днів"], correct: 0 },
  { q: "Чому вода не може бути рідкою на Марсі?", a: ["Тонка атмосфера", "Холод", "CO₂", "Магнітне поле"], correct: 0 },
  { q: "Яка температура на Марсі?", a: ["-63°C", "-10°C", "+5°C", "-120°C"], correct: 0 },
  { q: "Що таке 'сол'?", a: ["Марсіанський день", "Марсіанський рік", "Одиниця тиску", "Тип бурі"], correct: 0 },
  { q: "Який газ замерзає на полюсах Марса?", a: ["CO₂", "O₂", "N₂", "H₂"], correct: 0 },
  { q: "Який марсохід працював найдовше?", a: ["Opportunity", "Curiosity", "Spirit", "Sojourner"], correct: 0 },
  { q: "Який діаметр Марса?", a: ["6792 км", "12000 км", "5400 км", "8900 км"], correct: 0 },
  { q: "Що спричиняє пилові бурі?", a: ["Сезонні зміни CO₂", "Магнітні бурі", "Вулкани", "Метеорити"], correct: 0 },
  { q: "Який колір неба на Марсі?", a: ["Жовто-рожевий", "Синій", "Чорний", "Зелений"], correct: 0 },
  { q: "Який тиск на Марсі?", a: ["0.6% земного", "10% земного", "50% земного", "100%"], correct: 0 },
  { q: "Який супутник Марса може впасти на нього?", a: ["Фобос", "Деймос", "Обидва", "Жоден"], correct: 0 }
];

// -----------------------------
// РАНДОМІЗАЦІЯ ВІДПОВІДЕЙ
// -----------------------------
function shuffleAnswers(question) {
    const answers = question.a.map((text, index) => ({
        text,
        index
    }));

    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
}

// -----------------------------
// ПЛАВНИЙ СТАРТ КВІЗУ
// -----------------------------
function startQuiz() {
    // Анімація зникнення стартового екрану
    startScreen.style.animation = "fadeOutJS 0.6s forwards ease";

    setTimeout(() => {
        startScreen.style.display = "none";

      
        document.querySelector(".quiz-info").style.display = "flex";

    
        quizScreen.classList.remove("hidden");
        quizScreen.style.display = "block";
        quizScreen.style.opacity = "0";
        quizScreen.style.animation = "fadeInJS 0.6s forwards ease";

        loadQuestion();
    }, 600);
}


// -----------------------------
// ЗАВАНТАЖЕННЯ ПИТАННЯ
// -----------------------------
function loadQuestion() {
    resetTimer();

    const q = quiz[current];
    questionEl.textContent = q.q;

    answersEl.innerHTML = "";

    const shuffled = shuffleAnswers(q);

    shuffled.forEach(item => {
        const btn = document.createElement("div");
        btn.classList.add("answer");
        btn.textContent = item.text;

        btn.onclick = () => checkAnswer(btn, item.index);

        answersEl.appendChild(btn);
    });
}

// -----------------------------
// ТАЙМЕР
// -----------------------------
function resetTimer() {
    timeLeft = 20;
    timerEl.textContent = timeLeft;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// -----------------------------
// ПЕРЕВІРКА ВІДПОВІДІ
// -----------------------------
function checkAnswer(btn, index) {
    clearInterval(timer);

    const q = quiz[current];

    if (index === q.correct) {
        btn.classList.add("correct");
        score++;
        correctCountEl.textContent = score;
    } else {
        btn.classList.add("wrong");

        [...answersEl.children].forEach(a => {
            if (a.textContent === q.a[q.correct]) {
                a.classList.add("correct");
            }
        });
    }

    document.querySelectorAll(".answer").forEach(a => a.style.pointerEvents = "none");

    setTimeout(nextQuestion, 900);
}

// -----------------------------
// ПЕРЕХІД ДО НАСТУПНОГО ПИТАННЯ
// -----------------------------
function nextQuestion() {
    current++;
    if (current < quiz.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// -----------------------------
// ФІНАЛЬНИЙ РЕЗУЛЬТАТ
// -----------------------------
function showResult() {
    quizScreen.style.display = "none";

    resultScreen.classList.remove("hidden");
    resultScreen.style.display = "block";
    resultScreen.style.opacity = "0";
    resultScreen.style.animation = "fadeInJS 0.6s forwards ease";

    scoreEl.textContent = `Правильних відповідей: ${score} / ${quiz.length}`;
}

// -----------------------------
// КНОПКИ
// -----------------------------
startBtn.onclick = startQuiz;
restartBtn.onclick = () => location.reload();




