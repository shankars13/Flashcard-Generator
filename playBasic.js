var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");

var cardArray=[];
var index=0;
var score=0;

//Read cards.txt file, load the cardArray with records of Basic type 
fs.readFile("cards.txt","utf-8",function(err,data){
	if (!err) {
		var cards=data.split("\n");
		var count=0;
		// var info = ["Card Front : ", "\n Card Back : "]
		cards.forEach(function(card) {
			count++;
			if (card.length > 30) {
				card= JSON.parse(card);
				if (card.type === 'Basic') 
					cardArray.push(BasicCard(card.front, card.back));
			}
		});

		// console.log(cardArray);
	}

//Recursive function to display the questions of Basic type flashcard and get answer from user.
//Display final score after all flashcards

	var promptUser = function() {

		if (index < cardArray.length) {

			console.log(chalk.red.bold(cardArray[index].showFront()));

			inquirer.prompt([

			  {
				type: "input",
				name: "answer",
				message: "Answer : "
			  }
			]).then(function(value) {
				if (value.answer.toLowerCase().trim() === cardArray[index].back.toLowerCase().trim()) {
					console.log("You got it right !");
					score ++;
					index++;
				}
				else {
					console.log("Oops.. The correct answer is "+cardArray[index].back);
					index++;
				}
				promptUser();
			})

		}
		else {
			console.log(chalk.blue.bold('Game Over !!'));
			console.log(chalk.red.bold('Score : ' + score + '/' + cardArray.length));
		}
	}

	console.log();
	console.log("PLAY BASIC FLASHCARD ");
	console.log();

	promptUser();
}) 
