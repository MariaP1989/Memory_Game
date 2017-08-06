
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

//tablica z linkami do karty

var pair = 3;
var linkArray =[];

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
        console.log(cardClicked);
        storeCard(cardClicked[0],cardClicked[1]);
        cardClicked = [];
    };
};
//funkcja do porównywania czy wybrane karty są parą
function storeCard(card1, card2){

//     if(card1[0].number === card2[0].number && card1[0] != card2[0]){

//         console.log('jest para') 
//         card1[1].classList.remove("clicked");
//         card1[1].classList.add("paired");
//         card2[1].classList.remove("clicked");
//         card2[1].classList.add("paired");    

//         //removing listener from guessed cards
//         var old_element1 = card1[1];
//         var new_element1 = card1[1].cloneNode(true);
//         old_element1.parentNode.replaceChild(new_element1, old_element1);  
//         var old_element2 = card2[1];
//         var new_element2 = card2[1].cloneNode(true);
//         old_element2.parentNode.replaceChild(new_element2, old_element2);


//         // card1[1].removeEventListener('click',setListener);
//         cardClicked = [];
//         score = score + 10

//     if(card1.dataset.id === card2.dataset.id){
//         var timeOut = setTimeout(function(){
//             card1.classList.remove("clicked");
//             card1.classList.add("paired");
//             card1.removeAttribute("style");
//             card2.classList.remove("clicked");
//             card2.classList.add("paired");
//             card2.removeAttribute("style");
//             cardClicked = [];
//         }, 500);

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
//             card1.classList.remove("clicked");
//             card1.classList.toggle("card");
//             card1.removeAttribute("style");
//             card2.classList.remove("clicked");
//             card2.classList.toggle("card");
//             card2.removeAttribute("style");
//             cardClicked = [];
//         }, 1000);
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

//                 cardArray[counter] = new Card (i, linkArray[i]);
//                 console.log(cardArray[counter]);
//                 var newDiv = document.createElement("div");
//                 newDiv.classList.add("card");
//                 newDiv.dataset.image = cardArray[counter].image;
//                 newDiv.dataset.id = cardArray[counter].number;
//                 board.appendChild(newDiv);
//                 console.log(newDiv);
//                 newDiv.addEventListener("click", function(event){
//                     if(this.classList == "card"){
//                         this.classList.add("clicked");
//                         this.classList.remove("card");
//                         this.style.backgroundImage = this.dataset.image;
//                         cardClicked.push(this);
//                         cardCollect();
//                     } else if (this.classList !== "card"){
//                         alert("Wybierz kolejną kartę");
//                         }
//                     else {
//                         cardClicked = [];
//                         this.removeAttribute("class");
//                         this.removeAttribute("style");
//                         this.classList.add("card");
//                     }

//                 });
//             }
        counter += 1;
        };

cardShuffle();
};

cardCreate(pair);

