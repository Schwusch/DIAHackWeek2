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
    var quizIndex = Session.get("quizIndex");
    return Questions.findOne({id:quizIndex.toString()});
      }
  });

Template.phoneScreen.helpers({
  quizInfo(){
    var quizIndex1 = QuizIndex.findOne({id:"quizNum"});
    return Questions.findOne({id:quizIndex1.quizNum});
      }
  });
Template.phoneScreen.onCreated(function(){
   Meteor.subscribe('questions');
   Meteor.subscribe('quizIndex');
});
Template.mainScreen.onCreated(function(){
   Meteor.subscribe('questions');
});
Template.body.onCreated(function(){
  Session.set("quizIndex",0);
  Session.set("showCorrect","dontShowAnswer");
});

Template.countDown.onRendered(function(){
   countdown.start(function() {
    var index = Session.get("quizIndex");
    var showAnser = Session.get("showCorrect");
    if(showAnser == "dontShowAnswer"){
      Session.set("showCorrect","showAnswer");
      Meteor.call('setShowCorrect', "showAnswer");
       console.log(showAnser);
    }else{
        console.log(showAnser);
      if(index==1){
      Meteor.call('setQuizNum', "0");
      Session.set("quizIndex",0);

     }else{
      Meteor.call('setQuizNum', "1");
      Session.set("quizIndex",1);
     }
     Session.set("showCorrect","dontShowAnswer");
     Meteor.call('setShowCorrect', "dontShowAnswer");
    }
    
    countdown.start();
});
});

 var countdown = new ReactiveCountdown(10);

Template.body.events({
  'click'(event) {
    const target = event.target;
    $(".selected").not(".showAnswer").removeClass("selected");
    $(target).not(".showAnswer").addClass("selected");
    var sessionIndex = Session.get("questionIndex");
    var dbIndex = QuizIndex.findOne({id:"quizNum"}).quizNum;
   // if(sessionIndex != dbIndex){
   
         var list = [];
        $("input[data").each(function(){
          console.log("Loop");
         var data =  $(this).attr("data");
         var question = $(this).val();
         var answer = $(this).hasClass("selected");
        list.push({
          "data":data,
          "question":question,
          "answer":answer
         });
        })
        console.log(list);
        Session.set("questionIndex", dbIndex);
     // }
    },
});

Template.countDown.helpers({
	getCountdown: function() {
		var time = countdown.get()
		return time;
	},
});
Template.phoneScreenAlt.helpers({
  showAnswer: function() {
    var quizIndex1 = QuizIndex.findOne({id:"quizNum"});
    return quizIndex1.showAnswer;
  },
});

Template.charts.onRendered(function(){
  console.log("value");
});