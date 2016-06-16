import { Meteor } from 'meteor/meteor';

import { QuizIndex } from '../imports/api/quizIndex.js';
import { Questions} from '../imports/api/questions.js';
Meteor.methods({
	updateState: function() {
	var qIndex = QuizIndex.findOne({id:"qIndex"});

    if(qIndex.state === 2){
     QuizIndex.update({id:"qIndex"}, {$set: {state: 0}});
    } else {
      QuizIndex.update({id:"qIndex"}, {$inc: {state: 1}});
    }

    qIndex = QuizIndex.findOne({id:"qIndex"});
    
    if(qIndex.state === 0) {
      if(qIndex.currentIndex===qIndex.maxLength) {
		QuizIndex.update({id:"qIndex"}, {$set: {currentIndex: 0}});
     }else{
 		QuizIndex.update({id:"qIndex"}, {$inc: {currentIndex: 1}});
     }
    }
	},
	
    incrementGuesses: function(alternative) {

        var qIndex = QuizIndex.findOne({"id":"qIndex"});

        Questions.update({"id":qIndex.currentIndex, "answers.text" : alternative}, {$inc: {"answers.$.timesGuessed": 1}});
    },
});


