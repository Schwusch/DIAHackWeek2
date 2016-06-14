import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

import { Questions} from '../api/questions.js'
 
import './body.html';
import './question.html';
import './alternativ.html';
import './countDown.html';
 
Template.body.helpers({
  quizInfo(){
    var quizIndex = Session.get("Hej");
    return Questions.findOne({id:quizIndex.toString()});
      }
  });
Template.body.onCreated(function(){
  Meteor.subscribe('questions');
  Session.set("Hej",0);
});

Template.countDown.onCreated(function(){
 
})
 var countdown = new ReactiveCountdown(5);

  countdown.start(function() {
      Session.set("Hej",1);
    countdown.start();
});

Template.countDown.helpers({
	getCountdown: function() {
		var time = countdown.get()
		return time;
	},
});