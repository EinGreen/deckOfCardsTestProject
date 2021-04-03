let ajax = new XMLHttpRequest();
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

let shuffleButton = document.getElementById(`shuffleButton`);
shuffleButton.addEventListener("click", shuffle);

let newDeckId = Cookies.get(`deckIdentification`);
function draw(e) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let drawSetup = JSON.parse(this.responseText);
            let remainingCards = drawSetup.remaining;
            document.getElementById(`remainingCardsCounter`).innerText = `Remaining Cards: ${remainingCards}`;
        }
    } 
    ajax.open("GET", `https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=1`, true);
    ajax.send();
}

let drawButton = document.getElementById(`drawCardButton`);
drawButton.addEventListener(`click`, draw)