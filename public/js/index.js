'use strict';

const title = document.getElementById('title');
const question = document.getElementById('question');
const start = document.getElementById('start');

start.addEventListener('click', () => {
    title.textContent = '取得中';
    question.textContent = '少々お待ちください';
    start.style.display = 'none';
    runQuestion();
});

const runQuestion = () => {
    fetch('/quiz')
        .then(res => {
            return res.json();
        })
        .then(data => {
            new Quiz(data);
        })
        .catch(error => {
            console.log(error);
        });
}

class Quiz {
    constructor(data) {
        this.data = data;
        this.answerCount = 0;
        this.round = 0;
        this.quizStatus = document.getElementById('quiz-status');
        this.answerButton = document.getElementById('answer-button');
        this.createQuestion();
    }

    createQuestion() {
        this.clearQuestion();
        this.displayQuestion(this.data);
    }

    clearQuestion(){
        while (this.quizStatus.firstChild) {
            this.quizStatus.removeChild(this.quizStatus.firstChild);
        }
        while (this.answerButton.firstChild) {
            this.answerButton.removeChild(this.answerButton.firstChild);
        }
    }
    
    displayQuestion() {
        title.innerHTML = `問題${this.round + 1}`;
        const make_category = document.createElement('h3');
        make_category.textContent = `[ジャンル]${this.data.results[this.round].category}`;
        this.quizStatus.appendChild(make_category);
        const make_difficulty = document.createElement('h3');
        make_difficulty.textContent = `[難易度]${this.data.results[this.round].difficulty}`;
        this.quizStatus.appendChild(make_difficulty);
        question.innerText = this.data.results[this.round].question;
        this.createAnswerList();
    }

    createAnswerList() {
        let questionChoices = this.data.results[this.round].incorrect_answers;
        questionChoices.push(this.data.results[this.round].correct_answer);
        const questionNumber = questionChoices.length;
        for (let i = 0; i < questionNumber; i++) {
            const questionChoice = questionChoices.splice(Math.floor(Math.random() * questionChoices.length),1)[0];
            const makeButton = document.createElement('button');
            makeButton.textContent = questionChoice;
            this.answerButton.appendChild(makeButton);
            makeButton.addEventListener('click', (event) => {
                this.judgeAnswer(event);
            });
        }
    }

    judgeAnswer(event) {
        if (this.data.results[this.round].correct_answer === event.target.textContent) {
            this.answerCount++;
        }
        this.round++;
        if (this.round < 10) {
            this.createQuestion(this.data);
        } else {
            this.outputFinalResult();
        }
    }

    outputFinalResult() {
        this.clearQuestion();
        title.textContent = `あなたの正答数は${this.answerCount}です！！`;
        question.textContent = '再度チャレンジしたい場合は以下をクリック！！';
        const makeButton = document.createElement('button');
        makeButton.textContent = 'ホームに戻る';
        this.answerButton.appendChild(makeButton);
        makeButton.addEventListener('click', () => {
            title.textContent = 'ようこそ';
            question.textContent = '以下のボタンをクリック';
            makeButton.style.display = 'none';
            start.style.display = 'block';
        });
    }
}
