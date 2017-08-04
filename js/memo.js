//konstruktor do tworzenia kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

//funkcja tworząca odpowiednią ilość kart w zależności od wpisanej przez użytkownika wartości par
var board = document.querySelector(".game_board");
var cardClicked = [];

function cardCollect (){
    if(cardClicked.length === 2){
        storeCard(cardClicked[0],cardClicked[1]);
    } else if (cardClicked.length > 2) {
        cardClicked = [];
    }
}
function storeCard(card1, card2){
    console.log(card1);
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
                    console.log(cardClicked);
                    cardCollect();
                });
                counter += 1;
            }
        }
}
cardCreate(14);
