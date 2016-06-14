import { Meteor } from 'meteor/meteor';
import {Questions } from '../imports/api/questions.js';
import { QuizNum } from '../imports/api/quizNum.js'

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
