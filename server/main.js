import { Meteor } from 'meteor/meteor';
import {Questions } from '../imports/api/questions.js';
import { QuizIndex } from '../imports/api/quizIndex.js'

Meteor.startup(() => {
 Questions.remove({});
 Questions.insert({
   id:"0",
   altLeft: [
     { text: 'Stadshuset',
      correct:"false" },
    { text: 'true',
      correct:"true" },
  ],
  altRight: [
     { text: 'Stadshuset',
      correct:"false" },
     { text: 'Stadshuset',
      correct:"false" },
  ],
  questionName: 'Vad heter Malmös största byggnad?',
 });
 Questions.insert({
    id:"1",
   altLeft: [
    { text: 'Hje',
      correct:"false",
       index:"A"},
    { text: 'VA?',
      correct:"false",
      index:"B" },
  ],
  altRight: [
    { text: 'Big Ben',
      correct:"false",
       index:"C"},
    { text: 'Stadshuset',
      correct:"true",
      index:"D" },
  ],
  questionName: 'Vad heter staden du är i?',
 });
  });
QuizIndex.remove({});
QuizIndex.insert({
	id:"quizNum",
	quizNum:"0",
  showAnswer:"dontShowAnswer",
})
