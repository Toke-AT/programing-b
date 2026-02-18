// Array med quizspørgsmål i JSON
let questions = [
  {
    "spørgsmål": "Hummere har 'ubetydelig senescens', hvilket betyder, at de ikke ældes biologisk på samme måde som mennesker.",
    "svar": true
  },
  {
    "spørgsmål": "Den 'udødelige vandmand' (Turritopsis dohrnii) kan vende sin livscyklus og blive til en polyp igen.",
    "svar": true
  },
  {
    "spørgsmål": "Hummere stopper med at vokse, når de når en vis alder.",
    "svar": false
  },
  {
    "spørgsmål": "Vandmænd har en central hjerne, der styrer alle deres bevægelser.",
    "svar": false
  },
  {
    "spørgsmål": "En hummer kan regenerere (gendanne) en tabt klo.",
    "svar": true
  },
  {
    "spørgsmål": "Vandmænd trækker vejret gennem lunger.",
    "svar": false
  },
  {
    "spørgsmål": "Hummere tisser ud af deres ansigt (ved bunden af antennerne).",
    "svar": true
  },
  {
    "spørgsmål": "Alle vandmænd er farlige for mennesker.",
    "svar": false
  },
  {
    "spørgsmål": "En hummers blod er blåt på grund af kobber.",
    "svar": true
  },
  {
    "spørgsmål": "Vandmænd har eksisteret i havene i længere tid end dinosaurerne.",
    "svar": true
  }
]

var q = 0
var score = 0

function setup(){
    noCanvas() 
    select('#startGame').mousePressed(()=>{
      shiftPage('#page2')
      showQ()
    })

    //Hvis man klikker på true, kalder vi funktionen
    //CheckAnswer med argumentet true
    select('#trueBtn').mousePressed(()=>checkAnswer(true))
    select('#falseBtn').mousePressed(()=>checkAnswer(false))

}

function showQ(){
  //Vi vælger html element med id "question" og 
  //indsætter først objekts "spørgsmål" i den
  select("#question").html(questions[q].spørgsmål)
}

function checkAnswer(bool){
  if(questions[q].svar == bool){
    score++
  }
  q++
  if(questions.length == q){
    select('#result').html(`Yay, du fik ${score} point`)
    shiftPage('#page3')
    return
  }
  showQ()
}

function shiftPage(id){
    selectAll('.page').map(e => e.removeClass('show'))
    select(id).addClass('show')
}
