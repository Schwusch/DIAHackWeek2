  import { Meteor } from 'meteor/meteor';
  import { HTTP } from 'meteor/http';
  import {Questions } from '../imports/api/questions.js';
  import { QuizIndex } from '../imports/api/quizIndex.js'

  Meteor.startup(() => {

    // make sure database is empty
    Questions.remove({});
    QuizIndex.remove({});

    // fill database with questions
    var m = HTTP.call("GET",
      "http://build.dia.mah.se/ugc/00f5/testfragor",
      {}, function(error, response) {
        if(error) {
          console.log(error);
        } else {
          var questions = JSON.parse(response.content).testfragor;

          for(var i = 0; i < questions.length; i++) {
              var q = questions[i];
              
              q.answers[0].timesGuessed = 0;
              q.answers[1].timesGuessed = 0;
              q.answers[2].timesGuessed = 0;
              q.answers[3].timesGuessed = 0;
              q.id = i;

              Questions.insert(q);
          }

          // insert max nr of questions and current question index
          QuizIndex.insert({currentIndex: 0, maxLength: questions.length - 1, state: 0, id:"qIndex"});
        }
  });
 })