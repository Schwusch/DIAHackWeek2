import { Meteor } from 'meteor/meteor';

import { Questions } from '../imports/api/questions.js';
 

Meteor.publish('questions', function questionsPublication() {
    return Questions.find({});
});



