import { Meteor } from 'meteor/meteor';

import { Questions } from '../imports/api/questions.js';
import { QuizIndex } from '../imports/api/quizIndex.js';
 

Meteor.publish('questions', function questionsPublication() {
    return Questions.find({});
});
Meteor.publish('quizIndex', function questions() {
    return QuizIndex.find({});
});



