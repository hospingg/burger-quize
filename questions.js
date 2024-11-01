export const questions = [
    {
        question: "Якого кольору бургер?",
        answers: [
            { title: 'Стандарт', url: './image/burger.png' },
            { title: 'Чорний', url: './image/black-burger.webp' }
        ],
        type: 'radio'
    },
    {
        question: "З якого м'яса котлета?",
        answers: [
            { title: 'Курка', url: './image/chicken-leg.png' },
            { title: 'Яловичина', url: './image/beef-steak.png' },
            { title: 'Свинина', url: './image/chop.png' }
        ],
        type: 'radio'
    },
    {
        question: "Додаткові інгредієнти?",
        answers: [
            { title: 'Помідор', url: './image/tomato.png' },
            { title: 'Огірок', url: './image/cucumber.png' },
            { title: 'Салат', url: './image/salad.png' },
            { title: 'Цибуля', url: './image/onion.png' }
        ],
        type: 'checkbox'
    },
    {
        question: "Додати соус?",
        answers: [
            { title: 'Гірчичний', url: './image/mustard.png' },
            { title: 'Томатний', url: './image/tomato-sauce.png' },
            { title: 'Гострий', url: './image/hot-sauce.png' }
        ],
        type: 'radio'
    }
];