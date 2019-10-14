'use strict';

const Question = require('../models/question');

module.exports = class QuestionController {

    static showExample() {
        let question = new Question();
        console.log(question.example());
        return question.example();
    }
};