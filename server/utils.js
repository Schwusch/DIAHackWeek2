export default function generate_questions () {
	HTTP.call("GET",
	"http://build.dia.mah.se/pois?latitude=55.595778&longitude=13.014468&within=10000&limit=5000",
	{}, function(error, response){
		if(error){
			console.log(error);
		} else {

			var resultArr = JSON.parse(response.content).results;
			var resLength = Math.min(50, resultArr.length);
			var doneQs = [];

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
					subStart = Math.floor((replacedQuestion.length / 2) - 12);
					subStop = subStart + 140;
					replacedQuestion = "..." + replacedQuestion.substring(subStart,	subStop)
					+ "...";
				}

				var black = {
					"question": replacedQuestion,
					"answers": answerArr,
					"corrAnswerIndex": corrAnswerIndex
				}
				doneQs.push(black);
			}

			var n = Questions.insert(doneQs);
			console.log(n);

		}
	});

}
