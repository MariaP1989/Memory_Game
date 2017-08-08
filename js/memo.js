var button = document.querySelector(".submit");
var linkArray = [];
var score = 10;

//listener pozwalajacy na zaakceptowanie i przekazanie wybranej ilości par do gry
button.addEventListener("click", function(event){
    event.preventDefault();
    var input = document.querySelector("#pair_number");
        if(parseInt(input.value,10) > 0 && parseInt(input.value, 10) <= 30) {
            pair = parseInt(input.value, 10);
            input.value = "";
            document.querySelector(".game_start").style.display = "none";
            document.querySelector(".game_end").style.display = "none";
        } else {
            input.value = "";
            return false;
        }

//pętla tworząca tablicę z linkami do kart memory
    for(var i = 1; i <= pair; i++){
        if(i < 10){
            linkArray.push("url(./icons/00"+i+".svg)");
        } else {
            linkArray.push("url(./icons/0"+i+".svg)");
        }
    };
    cardCreate(pair);
});

//konstruktor kart memory
var Card = function(cardNumber, cardImage){
    this.number = cardNumber;
    this.image = cardImage;
}

var board = document.querySelector(".game_board");
var cardClicked = [];
var cardArray = [];

//funkcja zbierająca wybrane karty
function cardCollect (){
    if(cardClicked.length === 2){
        storeCard(cardClicked[0],cardClicked[1]);
        cardClicked = [];
    };
};

//obliczanie i wyświetlanie wyniku
var score = 100;
var span_score = document.querySelector("#result");
span_score.innerText = score;
// w zależności od czasu poszukiwania karty
// var second = 0;
// function countUp (){
//     second++;
// }
// var counterId = setInterval(function(){
//     countUp();
// }, 1000);

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
            score += 10;
            span_score.innerText = score;
            var finish = document.querySelectorAll(".card");
            console.log(finish.length);
            if(finish.length == 0){
                document.querySelector(".game_end").style.display = "block";
                document.querySelector(".game_board").style.display = "none";
                document.querySelector(".game_end #result").innerText = score;
            }
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
        score -= 10;
        span_score.innerText = score;
    }
};


//funkcja do mieszania kart przed ułożeniem na planszy
var parent = document.querySelector(".game_board");

function cardShuffle() {
    var frag = document.createDocumentFragment();
    while (parent.children.length) {
        frag.appendChild(parent.children[Math.floor(Math.random() * parent.children.length)]);
    }
    parent.appendChild(frag);
}

//funkcja tworząca różną szerokośc stołu do gry w zależnośi od wybranel liczny par
function styleCardDisplay(pair){
    if(pair <= 10) {
        parent.classList.add("board_small");
    } else if (pair > 10 && pair <= 20 ){
        parent.classList.add("board_middle");
    } else if (pair >20 && pair <= 30 )
        parent.classList.add("board_big");
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
    styleCardDisplay(pair);
cardShuffle();
};

//koniec gry, restart strony
function myFunction() {
    location.reload();
}
