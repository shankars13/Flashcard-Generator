//Packages for Flashcard Generator

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");
var cardType = ''


//User options to choose from : Create/View/Delete
var userOptions = [
	{
		type:"list",
		name:"userChoice",
		message:"What is your option for flash card ?",
		choices:["Create","View","Delete"]
	}
];

//Type of Card : Basic/Cloze
var cardOptions = [
	{
		type:"list",
		name:"cardChoice",
		message:"What type of flash card do you want ?",
		choices:["BASIC","CLOZE"]
	}
];

//Function to choose kind of card
function cardChoiceOption() {
	inquirer.prompt(cardOptions)

	.then(function(card){
		switch(card.cardChoice) {
			case "BASIC" : cardType = 'Basic';
							runUserOption();
							break;
			case "CLOZE" : cardType = 'Cloze';
							runUserOption();
							break;
		}
	})
}


//Switch statement in function to select operation and call the respective function
function runUserOption() {

	inquirer.prompt(userOptions)

	.then(function(user) {

		switch(user.userChoice) {
			
			case "Create" : createCard();
							break;

			case "View" : 	viewCard();
							break;

			case "Delete" : deleteCard();
							break;


		}
	});
}

//Create a flash card for Basic/Cloze and store it in card.txt file 
function createCard(){

	console.log();
		
	if (cardType === 'Basic') {
		console.log("BASIC CARD CREATE");
		console.log();
		inquirer.prompt([
		 {
			type: "input",
			name: "front",
			message: "Front of the card data :",
			validate: function (data) {
				if (!data)
					return "Data cannot be empty..";
				else
					return true;
			}
		 },
		 { 
			type:"input",
			name: "back",
			message:"Back of the card :",
			validate: function (data) {
				if (!data)
					return "Data cannot be empty..";
				else
					return true;		
			}
		 }
		]).then(function(card) {
			var appendText = {
				type:"Basic",
				front:card.front,
				back:card.back
			}
			fs.appendFile("cards.txt",JSON.stringify(appendText)+"\n");
		})
	}
	else if (cardType === 'Cloze') {
		console.log("CLOZE CARD CREATE");
		console.log();
		inquirer.prompt([
		 {
			type: "input",
			name: "text",
			message: "Full text of the card :",
			validate: function (data) {
				if (!data)
					return "Data cannot be empty..";
				else
					return true;
			}
		 },
		 { 
			type:"input",
			name: "cloze",
			message:"Cloze text of the card :",
			validate: function (data) {
				if (!data)
					return "Data cannot be empty..";
				else
					return true;		
			}
		 }
		]).then(function(card) {
			var appendText = {
				type:"Cloze",
				text:card.text,
				cloze:card.cloze
			}
			fs.appendFile("cards.txt",JSON.stringify(appendText)+"\n");
		})


	}
}

//View all the flash cards for Basic/Cloze depending on cardType chosen earlier
function viewCard() {
	console.log();
	if (cardType === 'Basic')
		console.log("BASIC CARD VIEW");
	else if (cardType === 'Cloze')
		console.log("CLOZE CARD VIEW");
	console.log();

	fs.readFile("cards.txt","utf-8", function(error,data){
		if (!error) {
			var cards=data.split("\n");
			var count=0;
			var info = [" Card Front : ", "\n Card Back : ", " Full Text : ", "\n Cloze Text : ", "\n Partial Back : "]
			cards.forEach(function(card) {
				// console.log(cardType);
				if (card.length > 30) {
					count++;
					card= JSON.parse(card);
				var title = chalk.red.bold("Flash card " + count) + " (" + card.type + ")\n";
				
// console.log(card.type + '----' + cardType)
				switch (card.type) {

				case 'Basic'	: if (cardType === 'Cloze') break;
						var card = BasicCard(card.front, card.back)
						console.log(title 
									+ chalk.blue(info[0])+card.showFront()
									+ chalk.blue(info[1])+card.showBack() + "\n")
						break;
				case 'Cloze'	: if (cardType === 'Basic') break;
						var card = ClozeCard(card.text, card.cloze)
						console.log(title 
									+ chalk.blue(info[2])+card.fullText()
									+ chalk.blue(info[3])+card.clozeText()
									+ chalk.blue(info[4])+card.partialText()+"\n")
						break;
				}

				}
			});
		}

		// console.log(data);
	});
}

//Delete flashcard for Basic/Cloze. Load file into an array, displays list and deletes the user selected record.
function deleteCard() {

	var cardArray=[];

	console.log();
	if (cardType === 'Basic')
		console.log("BASIC CARD DELETE");
	else if (cardType === 'Cloze')
		console.log("CLOZE CARD DELETE");
	console.log();

	fs.readFile("cards.txt","utf-8", function(error,data){
		if (!error) {
			var cards=data.split("\n");
			cards.forEach(function(card) {
				if (card.length > 30) {
					card = JSON.parse(card);
					if (card.type === 'Basic' && cardType === 'Basic') 
						cardArray.push(card.front);
					if (card.type === 'Cloze' && cardType === 'Cloze')
						cardArray.push(card.text);
						// console.log(cardArray)
					
				}
					// console.log(cardArray.length);
			});
		

		inquirer.prompt([
		{
			name:'selectedCard',
			type:'list',
			message: 'Which card do you want to delete ? \n',
			choices: cardArray
		}
		]).then(function(cardDelete){
		var index=null;
		for (var i=0;i< cards.length;i++) {
			if (cards[i].match(cardDelete.selectedCard)) {
				index=i;
			}
		}
		// array.splice(index, 1);
		(index !== null) ? 
			(cards.splice(index,1),
			// (delete cards[index],
			 fs.writeFile("cards.txt",cards.join("\n")),
			 console.log(chalk.green("Deleted the card"))
			) :
			 console.log(chalk.red("Cannot delete this card"));
	})
	}
  });
}

//Run the prompt for user to make card choice the first time
cardChoiceOption();
