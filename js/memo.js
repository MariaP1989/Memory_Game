//konstruktor do tworzenia kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

//funkcja tworząca odpowiednią ilość kart w zależności od wpisanej przez użytkownika wartości par
var board = document.querySelector(".game_board");
console.log(board);


function storeCard(card){
    console.log(card.number)

};

function cardCreate(pair){
    var cardNumber = 2 * pair;
    console.log(cardNumber);

var cardArray = [];
var cardPair = [];
var counter = 0;
    for(var i = 0; i < pair; i++){
        for(var j = 0; j < 2; j++){
            counter += 1;
            cardPair[counter] = new Card (i, "karta o numerze " + i);
            cardArray.push(cardPair[counter]);
            console.log(cardArray);
            var newDiv = document.createElement("div");
            newDiv.classList.add("card");
            newDiv.innerText = cardPair[counter].image;
            board.appendChild(newDiv);
            newDiv.addEventListener("click",function(event){
                storeCard(cardArray[counter]);
            });
        }
    }
}
//console.log(cardArray);
cardCreate(10);

var cardsArray = document.querySelectorAll(".card");

for(var i = 0; i < cardsArray.length; i++){
    cardsArray[i].addEventListener("click",function(event){
        this.style.backgroundColor = "black";
    });
}
