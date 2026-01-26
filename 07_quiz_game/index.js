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

function setup(){
    noCanvas() 
}

function shiftPage(id){
    selectAll('.page').map(e => e.removeClass('show'))
    select(id).addClass('show')
}
