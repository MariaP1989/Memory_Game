//konstruktor do tworzenia kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

var board = document.querySelector(".game_board");
var cardClicked = [];
var cardArray = [];
var score = 0

//funkcja zbierająca wybrane karty
function cardCollect (){
    console.log(cardClicked)
    if(cardClicked.length === 2){
        storeCard(cardClicked[0],cardClicked[1]);
        cardClicked = [];
    };
};
//funkcja do porównywania czy wybrane karty są parą
function storeCard(card1, card2){
    if(card1[0].number === card2[0].number && card1[0] != card2[0]){
        console.log('jest para')        
        card1[1].style.backgroundColor = "blue";
        card2[1].style.backgroundColor = "blue";
        card1[1].classList.toggle("clicked");
        card2[1].classList.toggle("clicked");
        cardClicked = [];
        score = score + 10
        
    } else {
        console.log('pudło')
        cardClicked = [];
        var timeOut = setTimeout(function(){
            card1[1].innerText = "";
            card2[1].innerText = "";
            card1[1].style.backgroundColor = "white";
            card2[1].style.backgroundColor = "white";
            card1[1].classList.toggle("clicked");
            card2[1].classList.toggle("clicked");
            
            score = score - 1
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
                (function(){
                    cardArray[counter] = new Card (i, "karta o numerze " + i);
                    var eventObject = cardArray[counter];
                    var newDiv = document.createElement("div");
                    newDiv.classList.add("card");
                    newDiv.innerText = ' ';   
                    // newDiv.dataset.id = cardArray[counter].number;
                    board.appendChild(newDiv);
                    var c = cardArray[counter]

                    function makeListener(){
                        newDiv.addEventListener("click", function(){
                            console.log(score)
                            this.style.backgroundColor = "grey";
                            this.classList.toggle("clicked");
                            this.innerText = c.image;
                            // cardClicked.push(this);
                            cardClicked.push([c,newDiv]);
                            cardCollect();
                        });
                    };
                    makeListener()
                }());
            };
        counter += 1;
        };

cardShuffle();
};


cardCreate(12);