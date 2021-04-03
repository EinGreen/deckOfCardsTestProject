function shuffle(e) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let deckSetup = JSON.parse(this.responseText);
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
shuffleButton.addEventListener("click", shuffle)