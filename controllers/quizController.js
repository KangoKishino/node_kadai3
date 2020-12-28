'use strict';

var request = require('request');

var options = {
    url: 'https://opentdb.com/api.php?amount=10',
    method: 'GET',
    json: true
}

exports.getIndexPage = (req, res) => {
    res.render('index');
};

exports.getquizAPI = (req, res) => {
    request(options, (error, response, body) => {
        res.json(body);
    });
}