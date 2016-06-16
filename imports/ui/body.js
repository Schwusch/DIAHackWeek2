import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Questions} from '../api/questions.js';
import { QuizIndex} from '../api/quizIndex.js'
 
import './body.html';
import './question.html';
import './alternativ.html';
import './countDown.html';
import './mainScreen.html';
import './phoneScreen.html';
import './phoneScreenAlt.html';
import './charts.html';
 
Template.mainScreen.helpers({
  quizInfo(){
    var qIndex = QuizIndex.findOne({id:"qIndex"});
    var obj = Questions.findOne({id:qIndex.currentIndex});

    obj.answer_a = obj.answers[0].text;
    obj.answer_b = obj.answers[1].text;
    obj.answer_c = obj.answers[2].text;
    obj.answer_d = obj.answers[3].text;

    return obj;
      }
  });

Template.phoneScreen.helpers({
  quizInfo(){
    var qIndex = QuizIndex.findOne({id:"qIndex"});
    var obj = Questions.findOne({id:qIndex.currentIndex});

    console.log(obj);

    obj.answer_a = obj.answers[0].text;
    obj.answer_b = obj.answers[1].text;
    obj.answer_c = obj.answers[2].text;
    obj.answer_d = obj.answers[3].text;

    return obj;
      },
      showAnswer() {
        var state = Session.get('state');
        if(state == 1) {
          return "showAnswer";
        } else {
          return "";
        }
      },
  });


Template.phoneScreen.onRendered(function() {

    var state = Session.get('state');
    if(state === 0) { // question changed
        
                $(".button").removeClass("showAnswer").removeClass("selected");
                $(".button").click(function() {


              });

              } else if (state === 1) { // show result

                $(".button").unbind();
        
                $(".button").addClass("showAnswer");
 
              } else { // show chart
                  console.log(state);
              }
});

Template.phoneScreen.events({
"click": function(event) {
      var target = event.target;
      $(".selected").removeClass("selected");
      $(target).not(".showAnswer").addClass("selected");
}
});

Template.phoneScreen.onCreated(function(){
   Meteor.subscribe('questions');
   Meteor.subscribe('quizIndex', {
    onReady: function() {

      QuizIndex.find({id:"qIndex"}).observeChanges({
        changed: function(id, fields) {

          if(fields.currentIndex == undefined) {
            var state = fields.state;
            Session.set('state', state);

              
    }     

    },
  });
    },
   });
});
Template.mainScreen.onCreated(function(){
   Meteor.subscribe('questions');
   Meteor.subscribe('quizIndex');
});

Template.countDown.onRendered(function(){
   countdown.start(function() {
    
    Meteor.call("updateState");

    countdown.start();
});
});

var totalTime = 5;
var countdown = new ReactiveCountdown(totalTime, {
	interval: 10,
	steps: 0.01,

});
Template.countDown.helpers({

		getCountdown: function() {
		var time = Math.floor(countdown.get())
	return time; },
		progressNow: function() {
			var time = countdown.get()
			return Math.floor((time / totalTime) * 100);
		},
});
Template.charts.onRendered(function(){
  console.log("value");
});
