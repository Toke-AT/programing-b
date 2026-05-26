// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0

// Rum 1: antal fundne symboler
var symbolsFound = 0

// Rum 2: rigtig rækkefølge og tæller
var cloudAnswer = ['cloud1', 'cloud3', 'cloud2']
var cloudStep = 0



// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage('#start')


    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Hotspots ----
    select('#room1 #symbol1').mousePressed(() => findSymbol('#room1 #symbol1'))
    select('#room1 #symbol2').mousePressed(() => findSymbol('#room1 #symbol2'))
    select('#room1 #symbol3').mousePressed(() => findSymbol('#room1 #symbol3'))

    // ---- RUM 2: Skyer ----
    select('#room2 #cloud1').mousePressed(() => clickCloud('cloud1'))
    select('#room2 #cloud2').mousePressed(() => clickCloud('cloud2'))
    select('#room2 #cloud3').mousePressed(() => clickCloud('cloud3'))



    // ---- SLUTSIDE ----

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
function startTimer() {
    seconds = 0
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
}

// ============================================
// START SPIL
// ============================================
function startGame() {
    gameState = 0
    symbolsFound = 0
    cloudStep = 0
    startTimer()
    shiftPage('#room1')
}

// ============================================
// RUM 1: FIND SYMBOLER I JUNGLEN
// ============================================
function findSymbol(id) {
    select(id).hide()
    symbolsFound++
    select('#room1-found').html('Fundet: ' + symbolsFound + ' / 3')

    if (symbolsFound === 3) {
        gameState = 1
        shiftPage('#room2')
    }
}

// ============================================
// RUM 2: KLIK SKYER I RÆKKEFØLGE
// ============================================
function clickCloud(id) {
    if (id === cloudAnswer[cloudStep]) {
        cloudStep++
    } else {
        cloudStep = 0
    }

    if (cloudStep === cloudAnswer.length) {
        stopTimer()
        select('#final-time').html('Din tid: ' + seconds + ' sekunder')
        shiftPage('#complete')
    }
}




// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')

    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 3')
    select('#room1-hint').html('Find de 3 skjulte symboler i junglen...')
    select('#room1 #symbol1').show()
    select('#room1 #symbol2').show()
    select('#room1 #symbol3').show()

    // Nulstil rum 2


    // Nulstil slutside


    shiftPage('#start')
}
