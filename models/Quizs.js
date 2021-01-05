'use strict';

const request = require('request');

const options = {
    url: 'https://opentdb.com/api.php?amount=10',
    method: 'GET',
    json: true
}

module.exports = {
    init() {
        return new Promise ((resolve, reject) => {
            request(options, (error, res, body) => {
                const quiz = new Quiz(body);
                resolve(quiz.dataJSON);
            });
        });
    }
}

class Quiz {
    constructor(data) {
        this.data = data;
        this.dataJSON = '';
        this.parseJSON();
    }
    parseJSON() {
        this.dataJSON = JSON.stringify(this.data);
    }
}