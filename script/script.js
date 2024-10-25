import { questions } from '../questions.js';


const openQuizBtn = document.querySelector('#btnOpenModal');
const quiz = document.querySelector('#modalBlock');
const closeModalBtn = document.querySelector('#closeModal');
const questionElem = document.getElementById("question");
const answersElem = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const sendBtn = document.getElementById("send");

let currentQuestion = 0;
const finalAnswers = [];



function openQuiz() {
    quiz.classList.add('d-block');
    showQuestion();
}

function closeQuiz() {
    quiz.classList.remove('d-block');
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    questionElem.textContent = questionData.question;
    answersElem.innerHTML = '';

    questionData.answers.forEach((answer, index) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column', 'align-items-center');

        const input = document.createElement('input');
        input.type = questionData.type;
        input.id = `answerItem${index}`;
        input.name = 'answer';
        input.classList.add('d-none');
        input.value = answer.title;

        if (finalAnswers[currentQuestion] && 
            finalAnswers[currentQuestion].answers.some(a => a.title === answer.title)) {
            input.checked = true;
        }

        input.addEventListener('change', checkNextButtonStatus);

        const label = document.createElement('label');
        label.setAttribute('for', `answerItem${index}`);
        label.classList.add('d-flex', 'flex-column', 'align-items-center');

        const img = document.createElement('img');
        img.classList.add('answerImg');
        img.src = answer.url;
        img.alt = answer.title;

        const span = document.createElement('span');
        span.textContent = answer.title;

        label.appendChild(img);
        label.appendChild(span);
        answerItem.appendChild(input);
        answerItem.appendChild(label);
        answersElem.appendChild(answerItem);
    });

    checkNextButtonStatus(); // Перевірка кнопки "Next"
    prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
}

function saveAnswer() {
    const selectedAnswers = Array.from(answersElem.querySelectorAll('input'))
        .filter(input => input.checked)
        .map(input => ({
            title: input.value,
            url: questions[currentQuestion].answers.find(ans => ans.title === input.value).url
        }));

    finalAnswers[currentQuestion] = { question: questions[currentQuestion].question, answers: selectedAnswers };
}

function checkNextButtonStatus() {
    const hasCheckedAnswer = Array.from(answersElem.querySelectorAll('input')).some(input => input.checked);
    nextBtn.disabled = !hasCheckedAnswer;
}

nextBtn.addEventListener('click', () => {
    saveAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        displayFinalAnswers();
        nextBtn.classList.add('d-none');
        sendBtn.classList.remove('d-none');
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;

        if (currentQuestion === questions.length - 1) {
            sendBtn.classList.add('d-none');
            nextBtn.classList.remove('d-none');
            answersElem.classList.remove('finall')
        }

        showQuestion();
    }
});

sendBtn.addEventListener('click', () => {
    alert("Ваші відповіді були надіслані!");
    console.log('Final Answers:', finalAnswers);
    closeQuiz();
});

function displayFinalAnswers() {
    questionElem.textContent = "Дякуємо за проходження тесту!";
    answersElem.textContent = `Ваші відповіді`;
    
    finalAnswers.forEach((item, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('final-answer');
        
        const questionTitle = document.createElement('h4');
        questionTitle.textContent = `${idx + 1}. ${item.question}`;
        questionDiv.appendChild(questionTitle);

        const answerList = document.createElement('div');
        answerList.classList.add('final-answer-list');
        item.answers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('final-answer-item');
            
            answersElem.classList.add('finall')
            const img = document.createElement('img');
            img.classList.add('answerImg');
            img.src = answer.url;
            img.alt = answer.title;

            const span = document.createElement('span');
            span.textContent = answer.title;
            answerList.appendChild(answerDiv)
            answerDiv.appendChild(img);
            answerDiv.appendChild(span);
            questionDiv.appendChild(answerList);
        });

        answersElem.appendChild(questionDiv);
    });
}

openQuizBtn.addEventListener('click', openQuiz);
closeModalBtn.addEventListener('click', closeQuiz);
