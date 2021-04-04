// variable for the ajax that helps my functions connect to an API
let ajax = new XMLHttpRequest();
// this function creates a new deck and shuffles it
// Note: It uses Cookies to get the deck's ID for the draw function to work
function shuffle(e) {
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let deckSetup = JSON.parse(this.responseText);
            let deckId = deckSetup.deck_id;
            let remainingCards = deckSetup.remaining;
            console.log(`Deck ID: ${deckId}`);
            document.getElementById(`deckId`).innerText = `Deck ID: ${deckId}`;
            document.getElementById(`remainingCardsCounter`).innerText = `Remaining Cards: ${remainingCards}`;
            Cookies.set(`deckIdentification`, deckId);
            if (deckSetup.success) {
                document.getElementById(`shuffleMessage`).innerText = `The Deck has been Shuffled`
            } else if (!deckSetup.success) {
                document.getElementById(`shuffleMessage`).innerText = `Yeah, your Computer dropped the Cards... sorry`
            }
        }
    } 
    ajax.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", true);
    ajax.send();
}
// this variable + event listener allows the shuffle button to work
let shuffleButton = document.getElementById(`shuffleButton`);
shuffleButton.addEventListener("click", shuffle);

// this function draws a card from the deck
function draw(e) {
    let newDeckId = Cookies.get(`deckIdentification`);
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // these variables allow the function to access all the variables the API of "draw" gives
            let drawSetup = JSON.parse(this.responseText);
            let remainingCards = drawSetup.remaining;
            // this loop allows the function to change the amount of numbers within the deck on the HTML page, with a condition if there are no cards left
            if (drawSetup.success) {
                document.getElementById(`remainingCardsCounter`).innerText = `Remaining Cards: ${remainingCards}`; 
            } else if (!drawSetup.success) {
                document.getElementById(`remainingCardsCounter`).innerText = `No Cards Remaining`;
            }

            let cardsVariable = drawSetup.cards;
            for (var i=0; i>cardsVariable.length; i++) {
                console.log(cardsVariable[i]);
                // supposidly, this loop is supposed to state what card you drew, but I still haven't figured that part out
            }
        } 
    } 
    ajax.open("GET", `https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=1`, true);
    ajax.send();
}
// this variable + event listener allows the draw button to work
let drawButton = document.getElementById(`drawCardButton`);
drawButton.addEventListener(`click`, draw)