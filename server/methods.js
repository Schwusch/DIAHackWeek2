import { Meteor } from 'meteor/meteor';

import { QuizIndex } from '../imports/api/quizIndex.js';
import { Result } from '../imports/api/result.js';

Meteor.methods({
    setQuizNum: function (message) {
    QuizIndex.update({id:"quizNum"},{$set:{quizNum:message}});
  },
  setShowCorrect: function (state) {
    QuizIndex.update({id:"quizNum"},{$set:{showAnswer:state}});
	},
	setResult: function (question) {
    Result.insert({question});
	},
});


