$(document).ready(function(){
	var c = document.getElementById("canvas");
	var ct = c.getContext("2d");
	ct.strokeStyle = "black";


	$("#categoryHeader,#changeCategory").hide();
	var guessesLeft = 7;
	var randomWord;
	var randomNum = Math.floor(Math.random() * 10);
	var search_start = 0;
	var lettersLeft;
	var clearC = false;
	var categorySelect = false;
	var fruits = ["BANANA",
				  "ORANGE",
				  "MANGO",
				  "LIME",
				  "PINEAPPLE",
				  "APPLE",
				  "GRAPE",
				  "BLUEBERRY",
				  "CHERRY",
				  "COCONUT",
				  "KIWI"];
	var colors = ["AQUA",
				  "BEIGE",
				  "VIOLET",
				  "FUCHSIA",
				  "CRIMSON",
				  "INDIGO",
				  "IVORY",
				  "LAVENDER",
				  "MAROON",
				  "SCARLET",
				  "TEAL"];
	var animals = ["SQUIRREL",
					"RABBIT",
					"PEACOCK",
					"PARROT",
					"ALLIGATOR",
					"MEERKAT",
					"TURTLE",
					"GIRAFFE",
					"ELEPHANT",
					"TIGER",
					"BEAR"];

	console.log(randomNum);
	$("#guessesLeft").html(guessesLeft);


	function catSelect(){
		if(categorySelect==false){
			confirm("Please select a Category First!");
		}
	}
	//CATEGORY SELECTION
	
	
	 // FUNCTION TO HANDLE ANIMAL SELECTION
	$("#animals").click(function(){
			categorySelect = true;
			randomWord = animals[randomNum];
			$("#animals,#colors,#fruits").hide();
			$("#selectCat").hide();
			$("#category").html("ANIMALS");
			$("#categoryHeader,#changeCategory").show();
			//ct.clearRect(0,0,c.width,c.height);
			$("button:not(#animals,#fruits,#colors,#changeCategory)").attr("disabled",false);
			numSpaces();
	});
	// FUNCTION TO HANDLE COLOR SELECTION
	$("#colors").click(function(){
			categorySelect = true;
			randomWord = colors[randomNum];
			$("#animals,#colors,#fruits").hide();
			$("#selectCat").hide();
			$("#category").html("COLORS");
			$("#categoryHeader,#changeCategory").show();
			//ct.clearRect(0,0,c.width,c.height);
			$("button:not(#animals,#fruits,#colors,#changeCategory)").attr("disabled",false);
			numSpaces();
	});
	
	// FUNCTION TO HANDLE FRUIT SELECTION
	$("#fruits").click(function(){
			categorySelect = true;
			randomWord = fruits[randomNum];
			$("#animals,#colors,#fruits").hide(); //GIVE ALL THESE ITEMS SAME CLASS FOR LESS CODE
			$("#selectCat").hide();
			$("#category").html("FRUITS");
			$("#categoryHeader,#changeCategory").show();
			//ct.clearRect(0,0,c.width,c.height);
			$("button:not(#animals,#fruits,#colors,#changeCategory)").attr("disabled",false);
			numSpaces();
	});
		
		// FUNCTION TO HANDLE CHANGE CATEGORY SELECTION
	$("#changeCategory").click(function(){
			categorySelect = false;
			$("#colors,#animals,#fruits").show();
			$(this).hide();
			randomWord="";
			randomNum = Math.floor(Math.random() * 10);
			$("#guesswordbox").empty();
			$("button:not(#animals,#fruits,#colors,#changeCategory)").css({"background":"#EAEAEA","color":"black"});
			$("button:not(#animals,#fruits,#colors,#changeCategory)").attr("disabled","disabled");
			guessesLeft = 7;
			search_start = 0;
			$("#guessesLeft").html(guessesLeft);
			//ct.clearRect(0,0,c.width,c.height);
			//clearC = true;
			//console.log(clearC);
	});


	//console.log("Letters left: " + lettersLeft);
	// CALCULATE THE AMOUNT OF SPACES TO INPUT
	function numSpaces(){
		console.log(randomWord);
		lettersLeft = randomWord.length;
		for(i=0;i<randomWord.length;i++){
			$("#guesswordbox").append("<span style=font-size:50px>_</span>&nbsp;&nbsp;");
		
		}

	}

	// FUNCTION TO RUN WHEN A LETTER IS PRESSED
	$("button:not(#animals,#fruits,#colors,#changeCategory)").click(function(){
		//console.log(clearC);
		catSelect();
		var letter = $(this).html();
		var indexNum = randomWord.indexOf(letter);
		
		console.log(indexNum);
		
		if(indexNum == -1){
			guessesLeft -= 1;
			$("#guessesLeft").html(guessesLeft);
			if(guessesLeft == 6){
				//if(clearC){
				//ct.clearRect(0,0,c.width,c.height);
				//}
				//DRAWING THE TOP HOOK
				ct.moveTo(100,0);
				ct.lineTo(100,30);
				ct.stroke();
				
			}else if(guessesLeft == 5){
				//DRAWING THE HEAD
				ct.beginPath();
				ct.arc(100,60,30,0,2 * Math.PI);
				ct.stroke();
			}else if(guessesLeft == 4){
				//DRAWING THE BODY
				ct.moveTo(100,90);
				ct.lineTo(100,200);
				ct.stroke();
			}else if(guessesLeft == 3){
				//DRAWING LEFT ARM
				ct.moveTo(100,110);
				ct.lineTo(150,90);
				ct.stroke();
			}else if(guessesLeft == 2){
				
				//DRAWING RIGHT ARM
				ct.moveTo(100,110);
				ct.lineTo(50,90);
				ct.stroke();
			}else if(guessesLeft == 1){
				//DRAWING THE LEFT LEG
				ct.moveTo(100,200);
				ct.lineTo(150,220);
				ct.stroke();
			}
			if(guessesLeft <= 0){
			
				//DRAWING THE RIGHT LEG
				ct.moveTo(100,200);
				ct.lineTo(50,220);
				ct.stroke();
				//LOSING ALERT
			confirm("You ran out of guesses!! You Lose! Let's Try Again. The word was " + randomWord);
			location.reload();
			}else{
			confirm(letter + " is not in the word! Guess another letter!");
			}
			$(this).css({"background-color": "red","color":"white"});
			$(this).attr("disabled","disabled");
			
			
			
		}else{
			//IF LETTER IS IN THE WORD, THIS WILL RUN
			while(randomWord.indexOf(letter,search_start) != -1){
			var indexNumber = randomWord.indexOf(letter,search_start);
			$("#guesswordbox span:nth-child(" + (indexNumber+1) + ")").html(letter);
			search_start = indexNumber + letter.length;
			lettersLeft -= 1;
			console.log("index :" + indexNumber);
			}
			$(this).css({"background-color": "green","color":"white"});
			$(this).attr("disabled","disabled");
			//$(this).css("color","white");
			search_start = 0;
			
		
		}
		// WINNER ALERT
		if(lettersLeft <= 0){
			confirm("You won! Let's play again!");
			location.reload();
		}
		
		
		

	});


});