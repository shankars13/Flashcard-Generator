
//Constructor for creating ClozeCard. Prototypes used to attach methods.

var ClozeCard = function (text, cloze) {
	if (this instanceof ClozeCard) {
		this.text=text;
		this.cloze=cloze;
	
	}
	else
		return new ClozeCard(text, cloze); 
};

ClozeCard.prototype.fullText = function() {
	return (this.text);
}

ClozeCard.prototype.clozeText = function() {
	return (this.cloze);
}


//Remove 'cloze' text from the fullText field and return ...... to hide the answer
ClozeCard.prototype.partialText = function() {

	var txtFound = this.text.toLowerCase().search(this.cloze.toLowerCase());
	// console.log('txtFound : ' + txtFound);
	if (txtFound >= 0) {
		var partialText = this.text.replace(this.cloze, "......")
		return (partialText);
	}
}

/*
var firstPresidentCloze = ClozeCard("George Washington was the first president of the United States.", "George Washington");
console.log(firstPresidentCloze.cloze); 
console.log(firstPresidentCloze.partial());
*/

module.exports=ClozeCard;