
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

var pair = 10

//tablica z linkami do karty
var linkArray = []; //"002.svg", "003.svg", "004.svg", "005.svg", "006.svg",
for(var i = 1; i <= pair; i++){
    if(i<10){
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
        card1[1].classList.remove("clicked");
        card1[1].classList.add("paired");
        card2[1].classList.remove("clicked");
        card2[1].classList.add("paired");    

        //removing listener from guessed cards
        var old_element1 = card1[1];
        var new_element1 = card1[1].cloneNode(true);
        old_element1.parentNode.replaceChild(new_element1, old_element1);  
        var old_element2 = card2[1];
        var new_element2 = card2[1].cloneNode(true);
        old_element2.parentNode.replaceChild(new_element2, old_element2);


        // card1[1].removeEventListener('click',setListener);
        cardClicked = [];
        score = score + 10

    } else {
        console.log('pudło')
        cardClicked = [];
        var timeOut = setTimeout(function(){
            card1[1].style.backgroundImage = '';
            card2[1].style.backgroundImage = '';
            card1[1].classList.toggle("card");
            card2[1].classList.toggle("card");
            card1[1].classList.toggle("clicked");
            card2[1].classList.toggle("clicked");            
            score = score - 1
        }, 500);
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
                    // newDiv.innerText = ' ';   
                    // newDiv.dataset.id = cardArray[counter].number;
                    board.appendChild(newDiv);
                    var c = cardArray[counter];
                    function makeListener(){
                        newDiv.addEventListener("click", function(){
                            console.log(score);
                            // this.style.backgroundColor = "grey";
                            this.classList.toggle("clicked");
                            this.classList.remove("card");
                            this.style.backgroundImage = c.image;
                            // cardClicked.push(this);
                            cardClicked.push([c,newDiv]);
                            cardCollect();
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