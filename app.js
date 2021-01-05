'use strict';

const express = require('express');
const app = express();
const quizController = require('./controllers/quizController');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', quizController.getIndexPage);

app.get('/quiz', quizController.getquizAPI);

app.listen(3000);