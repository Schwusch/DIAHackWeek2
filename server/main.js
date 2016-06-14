import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import {Questions } from '../imports/api/questions.js';
import { QuizNum } from '../imports/api/quizNum.js'

function generate_questions () {
  HTTP.call("GET",
  "http://build.dia.mah.se/pois?latitude=55.595778&longitude=13.014468&within=10000&categories=sights",
  {}, function(error, response){
    if(error){
      console.log(error);
    } else {
      JSON.parse(response.content).results[0];
    }
  });

}

Meteor.startup(() => {
 Questions.remove({});
 Questions.insert({
   id:"0",
   altLeft: [
    { text: 'Malmö' },
    { text: 'Lund' },
  ],
  altRight: [
    { text: 'Stockholm' },
    { text: 'Peking' },
  ],
  questionName: 'Vad heter Malmös största byggnad?',
 });
 Questions.insert({
    id:"1",
   altLeft: [
    { text: 'Hje' },
    { text: 'VA?' },
  ],
  altRight: [
    { text: 'Big Ben' },
    { text: 'Stadshuset' },
  ],
  questionName: 'Vad heter staden du är i?',
 });
  });
QuizNum.remove({});
QuizNum.insert({
	id:"quizNum",
	quizNum:"0",
})
