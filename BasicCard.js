//BasicCard constructor with two fields. Methods within the Constructor to display front and back of the flashcard.


var BasicCard = function (front,back) {
	if (this instanceof BasicCard) {
		this.front=front;
		this.back=back;

		this.showFront = function() {
			// console.log(this.front);
			return (this.front);
		}

		this.showBack = function() {
			// console.log(this.back);
			return (this.back);
		}
	}
	else
		return new BasicCard(front, back); 
};

/*
var card = BasicCard('Largest State in USA','Texas');
card.showFront();
card.showBack();
*/
module.exports=BasicCard;