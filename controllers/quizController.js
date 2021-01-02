'use strict';

const Quizs = require('../models/Quizs');

exports.getIndexPage = (req, res) => {
    res.render('index');
};

exports.getquizAPI = (req, res) => {
    Quizs.init().then((result) => {
        res.send(result);
    });
}