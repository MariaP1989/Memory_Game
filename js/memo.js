
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

var pair = 3;

//tablica z linkami do karty
var linkArray =[];
for(var i = 1; i <= pair; i++){
    if(i < 10){
        linkArray.push("url(./icons/00"+i+".svg)");
    } else {
        linkArray.push("url(./icons/0"+i+".svg)");
    }
};

var board = document.querySelector(".game_board");
var cardClicked = [];
var cardArray = [];
var score = 0;

//funkcja zbierająca wybrane karty
function cardCollect (){
    if(cardClicked.length === 2){
        storeCard(cardClicked[0],cardClicked[1]);
        cardClicked = [];
    };
};
//funkcja do porównywania czy wybrane karty są parą
function storeCard(card1, card2){
    if(card1[0].number === card2[0].number){
        if(card1[0] != card2[0]){
            var timeOut = setTimeout(function(){
                card1[1].removeAttribute("style");
                card2[1].removeAttribute("style");
                card1[1].removeAttribute("class");
                card1[1].classList.add("paired");
                card2[1].removeAttribute("class");
                card2[1].classList.add("paired");
            }, 500);
        }
        cardClicked = [];
    } else {
        var timeOut = setTimeout(function(){
            card1[1].removeAttribute("style");
            card2[1].removeAttribute("style");
            card1[1].classList.add("card");
            card2[1].classList.add("card");
            card1[1].classList.remove("clicked");
            card2[1].classList.remove("clicked");
        }, 1000);
        cardClicked = [];
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
                (function(){
                    cardArray[counter] = new Card (i, linkArray[i]);
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("card");
                    board.appendChild(newDiv);
                    var cardObject = cardArray[counter];

                    function makeListener(){
                    newDiv.addEventListener("click", function(event){
                        if(this.classList == "card"){
                            this.classList.add("clicked");
                            this.classList.remove("card");
                            this.style.backgroundImage = cardObject.image;
                            cardClicked.push([cardObject,newDiv]);
                            console.log(cardClicked);
                            cardCollect();
                        } else if (this.classList !== "card"){
                            alert("Wybierz kolejną kartę");
                        } else {
                            cardClicked = [];
                            this.removeAttribute("class");
                            this.removeAttribute("style");
                            this.classList.add("card");
                        }
                    });
                };
                makeListener();
            }());
        };
    counter += 1;
    };
cardShuffle();
};

cardCreate(pair);
