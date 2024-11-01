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
let phoneNumber = '';

function openQuiz() {
    quiz.classList.add('d-block');
    showQuestion();
}

function closeQuiz() {
    quiz.classList.remove('d-block');
    // openQuizBtn.classList.add('d-block');
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

    checkNextButtonStatus();
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
function handleNavigation(action) {
    switch (action) {
        case 'next':
            saveAnswer();
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                displayFinalAnswers();
                nextBtn.classList.add('d-none');
                sendBtn.textContent = 'Далі';
                sendBtn.classList.remove('d-none');
            }
            break;

        case 'prev':
            if (currentQuestion > 0) {
                currentQuestion--;

                if (currentQuestion === questions.length - 1) {
                    sendBtn.classList.add('d-none');
                    nextBtn.classList.remove('d-none');
                    answersElem.classList.remove('finall');
                }

                showQuestion();
            }
            break;

        default:
            console.error("Невідомий тип дії:", action);
    }

    // Оновлення видимості кнопки "prev"
    prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
    checkNextButtonStatus();
}

nextBtn.addEventListener('click', () => handleNavigation('next'));
prevBtn.addEventListener('click', () => handleNavigation('prev'));

function showThankYouMessage() {
    questionElem.textContent = "Дякую за відповідь!";
    answersElem.innerHTML = '';

    // Сховати кнопки навігації
    nextBtn.classList.add('d-none');
    prevBtn.classList.add('d-none');
    sendBtn.classList.add('d-none');

    // Закрити модальне вікно через 2 секунди
    setTimeout(() => {
        closeQuiz();
    }, 2000);
}

sendBtn.addEventListener('click', () => {
    if (sendBtn.textContent === 'Далі') {
        displayPhoneNumberQuestion();
    } else {
        const userName = document.getElementById('userName').value.trim();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();

        if (userName === '' || phoneNumber === '') {
            alert('Будь ласка, введіть своє ім\'я та номер телефону!');
            return;
        }

        finalAnswers.push({ 
            question: "Контактні дані", 
            answers: [
                { title: "Ім'я", value: userName },
                { title: "Номер телефону", value: phoneNumber }
            ] 
        });

        console.log('Final Answers:', finalAnswers);

        showThankYouMessage(); // Показати повідомлення подяки замість питання
    }
});





function displayFinalAnswers() {
    questionElem.textContent = "Дякуємо за проходження тесту!";
    answersElem.innerHTML = '';

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

            answerDiv.appendChild(img);
            answerDiv.appendChild(span);
            answerList.appendChild(answerDiv);
        });
        questionDiv.appendChild(answerList);
        answersElem.appendChild(questionDiv);
    });
}

function displayPhoneNumberQuestion() {
    questionElem.textContent = "Введіть номер телефону та ім'я для завершення";
    answersElem.innerHTML = '';

    // Поле для введення імені
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'userName');
    nameLabel.textContent = "Ім'я:";
    answersElem.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'userName';
    nameInput.placeholder = "Введіть своє ім'я";
    answersElem.appendChild(nameInput);

    // Поле для введення номера телефону
    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'phoneNumber');
    phoneLabel.textContent = 'Номер телефону:';
    answersElem.appendChild(phoneLabel);

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.id = 'phoneNumber';
    phoneInput.placeholder = 'Введіть номер телефону';
    answersElem.appendChild(phoneInput);

    sendBtn.textContent = 'Відправити';
}


openQuizBtn.addEventListener('click', openQuiz);
closeModalBtn.addEventListener('click', closeQuiz);
