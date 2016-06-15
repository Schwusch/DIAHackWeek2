import {Questions } from '../imports/api/questions.js';

export default function generate_questions () {
	HTTP.call("GET",

		// in case we want to generate questions based on places
		// we will need a algorithm calculating mid-point of an area
	//"http://build.dia.mah.se/places?latitude=55.595778&longitude=13.014468&within=10000&limit=5000",

	// search on google maps via latitud & longitud
	//

	"http://build.dia.mah.se/pois?latitude=55.595778&longitude=13.014468&within=10000&limit=5000",

	{}, function(error, response){
		if(error){
			console.log(error);
		} else {

			var resultArr = JSON.parse(response.content).results;
			var resLength = Math.min(20, resultArr.length);
			var doneQs = [];

			console.log(resultArr.length);

			for(var i = 0; i < resLength; i++){
				// random question in results
				var randQuestionIndex = Math.floor(Math.random() * resLength) + 0;
				var correctAnswer = "";

				var currRes = resultArr[randQuestionIndex];


				// while current question dont have a description, find a new question
				while(!currRes.description || currRes.category.sub === "toilets" ||
				currRes.category.sub === "station") {

					randQuestionIndex = Math.floor(Math.random() * resLength) + 0;
					currRes = resultArr[randQuestionIndex];
				}

				// save correct answer
				correctAnswer = resultArr[randQuestionIndex].name;

				// randomize position where correct answer should be
				var corrAnswerIndex = Math.floor(Math.random() * 4) + 0;

				// array containing the different answers
				var answerArr = ["", "", "", ""];

				answerArr[corrAnswerIndex] = correctAnswer;

				// fill alternate answers
				for(var j = 0; j < 3; j++) 	{
					var randAnswer = Math.floor(Math.random() * resLength) + 0;
					var randAnswerIndex = Math.floor(Math.random() * 4) + 0;

					while(answerArr[randAnswerIndex] != "") {
						randAnswerIndex =  Math.floor(Math.random() * 4) + 0;
					}

					answerArr[randAnswerIndex] = resultArr[randAnswer].name;
				}

				// replace name separate words with "..."
				var nameSplitArr = correctAnswer.split(" ");
				var replacedQuestion = resultArr[randQuestionIndex].description;
				nameSplitArr.forEach(function (split) {
					replacedQuestion = replacedQuestion.replace(split, "...");
				});

				// Shorten question to a Twitter message in size
				if(replacedQuestion.length > 140) {
					subStart = Math.floor((replacedQuestion.length / 2) - 70);
					subStop = subStart + 140;
					replacedQuestion = "..." + replacedQuestion.substring(subStart,	subStop)
					+ "...";
				}

				doneQs.push( {
					"question": replacedQuestion,
					"answers": [
						{"text": answerArr[0],
						"correct": ((corrAnswerIndex === 0) ? "true" : "false")},
						{"text": answerArr[1],
						"correct": ((corrAnswerIndex === 1) ? "true" : "false")},
						{"text": answerArr[2],
						"correct": ((corrAnswerIndex === 2) ? "true" : "false")},
						{"text": answerArr[3],
						"correct": ((corrAnswerIndex === 3) ? "true" : "false")}
						] ,
					"coords": resultArr[randQuestionIndex].geometry.coordinates,
					"category": resultArr[randQuestionIndex].category,
					"sub": resultArr[randQuestionIndex].category.sub
				});
			}

			var n = Questions.insert(doneQs);
			console.log(n);

		}
	});

}
