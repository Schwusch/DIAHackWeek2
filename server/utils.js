	function generate_questions () {
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
	      	
	      			console.log(currRes.category);
	      		
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
					var black = {
						"question": resultArr[randQuestionIndex].description,
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