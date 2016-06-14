import { Meteor } from 'meteor/meteor';

import { QuizNum } from '../imports/api/quizNum.js';

Meteor.methods({
    setQuizNum: function (message) {
    Chats.update({id:"quizNum"},{quizNum:message});
  }
});


