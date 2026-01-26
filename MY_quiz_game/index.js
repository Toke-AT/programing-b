let index = 0
let score = 0

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
    select('#startGame').mousePressed(() => shiftPage('#page2'))
    select('#trueBtn').mousePressed(() => checkAnswer(true))
    select('#falseBtn').mousePressed(() => checkAnswer(false))
    select('#restartBtn').mousePressed(restartGame)
    showQuestion()
}

function showQuestion(){
    select('#question').html(questions[index].spørgsmål)
}

function checkAnswer(answer){
    if(questions[index].svar == answer) score++
    index++
    if(index < questions.length) showQuestion()
    else showResult()
}

function showResult(){
    let resultDiv = select('#result')
    resultDiv.html(`<h4 class="sticky-header">Du fik ${score} ud af ${questions.length} rigtige</h4>`)
    
    questions.map(q => {
        createElement('div', q.spørgsmål)
        .addClass(q.svar ? 'true' : 'false')
        .parent(resultDiv)
    })
    shiftPage('#page3')
}

function restartGame(){
    index = 0
    score = 0
    showQuestion()
    shiftPage('#page1')
}

function shiftPage(id){
    selectAll('.page').map(e => e.removeClass('show'))
    select(id).addClass('show')
}
