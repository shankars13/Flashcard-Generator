var BasicCard = require("./BasicCard.js");

var inquirer = require("inquirer");
var fs = require("fs");
var chalk = require("chalk");

var userOptions = [
	{
		type:"list",
		name:"userChoice",
		message:"What is your option for flash card ?",
		choices:["Create","View","Delete"]
	}
];


function runUserOption() {

	inquirer.prompt(userOptions)

	.then(function(user) {

		switch(user.userChoice.toLowerCase()) {
			
			case "create" : createCard();
							break;

			case "view" : 	viewCard();
							break;

			case "delete" : deleteCard();
							break;


		}
	});
}


function createCard(){

	console.log();
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


function viewCard() {
	console.log();
	console.log("BASIC CARD VIEW");
	console.log();

	fs.readFile("cards.txt","utf-8", function(error,data){
		if (!error) {
			var cards=data.split("\n");
			var count=0;
			var info = ["Card Front : ", "\n Card Back : "]
			cards.forEach(function(card) {
				count++;
				if (card.length > 30) {
					card= JSON.parse(card);
					var title = chalk.red.bold("Flash card " + count) + " (" + card.type + ")\n";

					var card = BasicCard(card.front, card.back);
					console.log(title + " "
								+chalk.blue(info[0])+card.showFront()
								+chalk.blue(info[1])+card.showBack()+"\n");
				}
			});
		}

		// console.log(data);
	});
}

function deleteCard() {

	var cardArray=[];

	fs.readFile("cards.txt","utf-8", function(error,data){
		if (!error) {
			var cards=data.split("\n");
			cards.forEach(function(card) {
				if (card.length > 30) {
					card = JSON.parse(card);
					if (card.type === 'Basic') {
						cardArray.push(card.front);
						// console.log(cardArray)
					}
				}
					// console.log(cardArray.length);
			});
		

		inquirer.prompt([
		{
			name:'selectedCard',
			type:'list',
			message: 'Which card do you want to delete ?',
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


runUserOption();