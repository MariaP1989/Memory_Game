//konstruktor do tworzenia kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

var board = document.querySelector(".game_board");
var cardClicked = [];

//funkcja zbierająca wybrane karty
function cardCollect (){
    if(cardClicked.length === 2){
        storeCard(cardClicked[0],cardClicked[1]);
    } else if (cardClicked.length > 2) {
        cardClicked = [];
    }
}
//funkcja do porównywania czy wybrane karty są parą
function storeCard(card1, card2){
    if(card1.dataset.id === card2.dataset.id){
        card1.classList.add("hidden");
        card1.classList.remove("clicked");
        card2.classList.add("hidden");
        card2.classList.remove("clicked");
        cardClicked = [];
    } else {
        card1.style.backgroundColor = "white";
        card2.style.backgroundColor = "white";
        cardClicked = [];
    }
};
//funkcja do mieszania kart przed ułożeniem
function cardSuffle() {
    var parent = document.querySelector(".game_board");
    console.log(parent);
    var frag = document.createDocumentFragment();
    while (parent.children.length) {
        frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
    }
    parent.appendChild(frag);
}
//funkcja tworząca odpowiednią ilość kart w zależności od wpisanej przez użytkownika wartości par
function cardCreate(pair){
    var cardNumber = 2 * pair;
    var cardArray = [];
    var counter = 0;
        for(var i = 0; i < pair; i++){
            for(var j = 0; j < 2; j++){
                cardArray[counter] = new Card (i, "karta o numerze " + i);
                var eventObject = cardArray[counter];
                var newDiv = document.createElement("div");
                newDiv.classList.add("card");
                newDiv.innerText = cardArray[counter].image;
                newDiv.dataset.id = cardArray[counter].number;
                board.appendChild(newDiv);
                newDiv.addEventListener("click", function(event){
                    this.style.backgroundColor = "black";
                    this.classList.add("clicked");
                    cardClicked.push(this);
                    cardCollect();
                });
                counter += 1;
            }
        }

cardSuffle();
}
cardCreate(20);
