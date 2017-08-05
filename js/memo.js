//konstruktor do tworzenia kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

//tablica z linkami do karty
 var linkArray =["url('../icons/001.svg')"] //"002.svg", "003.svg", "004.svg", "005.svg", "006.svg",

var board = document.querySelector(".game_board");
var cardClicked = [];
var cardArray = [];

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
        var timeOut = setTimeout(function(){
            card1.classList.remove("clicked");
            card1.classList.add("paired");
            card2.classList.remove("clicked");
            card2.classList.add("paired");
            cardClicked = [];
        }, 1000);
    } else {
        var timeOut = setTimeout(function(){
            card1.classList.remove("clicked");
            card1.classList.toggle("card");
            card2.classList.remove("clicked");
            card2.classList.toggle("card");
            cardClicked = [];
        }, 1000);
    }
};
//funkcja do mieszania kart przed ułożeniem
function cardShuffle() {
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
    var counter = 0;
        for(var i = 0; i < pair; i++){
            for(var j = 0; j < 2; j++){
                cardArray[counter] = new Card (i, linkArray[i]);
                var newDiv = document.createElement("div");
                newDiv.classList.add("card");
                newDiv.dataset.image = cardArray[counter].image;
                newDiv.dataset.id = cardArray[counter].number;
                board.appendChild(newDiv);
                newDiv.addEventListener("click", function(event){
                    this.classList.add("clicked");
                    this.classList.remove("card");
                    this.style.backgroundImage = this.dataset.image;
                    cardClicked.push(this);
                    cardCollect();
                });
            }
        counter += 1;
        }

cardShuffle();
}


cardCreate(30);
