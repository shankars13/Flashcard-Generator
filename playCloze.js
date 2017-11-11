var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");

var cardArray=[];
var index=0;
var score=0;

//Read cards.txt file, load the cardArray with records of Cloze type 
fs.readFile("cards.txt","utf-8",function(err,data){
	if (!err) {
		var cards=data.split("\n");
		var count=0;
		// var info = ["Card Front : ", "\n Card Back : "]
		cards.forEach(function(card) {
			count++;
			if (card.length > 30) {
				card= JSON.parse(card);
				if (card.type === 'Cloze')  
					cardArray.push(ClozeCard(card.text, card.cloze));
			}
		});

		// console.log(cardArray);
	}

//Recursive function to display the questions of Cloze type flashcard and get answer from user.
//Display final score after all flashcards

	var promptUser = function() {

		if (index < cardArray.length) {

			console.log(chalk.red.bold(cardArray[index].partialText()));

			inquirer.prompt([
			  {
				type: "input",
				name: "answer",
				message: "Answer : "
			  }
			]).then(function(value) {
				if (value.answer.toLowerCase().trim() === cardArray[index].cloze.toLowerCase().trim()) {
					console.log("You got it right !");
					score ++;
					index++;
				}
				else {
					console.log("Oops.. The correct answer is "+ cardArray[index].cloze);
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
	console.log("PLAY CLOZE FLASHCARD ");
	console.log();

	promptUser();
}) 
