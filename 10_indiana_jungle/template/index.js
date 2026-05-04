// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0


// Rum 2: antal fundne symboler
var symbolsFound = 0

// Rum 5: rigtig rækkefølge og tæller
var cloudAnswer = ['cloud1', 'cloud3', 'cloud2']
var cloudStep = 0

// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage('#start')
    loadHighScores()

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Hotspots ----
    select('#room1 #symbol0').mousePressed(() => {
        console.log('Symbol presssed')
        findSymbol('#room1 #symbol0')
    })
    select('#room1 #room1-submit').mousePressed(() => {
        checkRoom1Answer()
    })

    // ---- RUM 2: Hotspots ----
    select('#room2 #symbol1').mousePressed(() => takePath('#room2 #symbol1'))
    select('#room2 #symbol2').mousePressed(() => findSymbol('#room2 #symbol2'))
    select('#room2 #symbol3').mousePressed(() => takePath('#room2 #symbol3'))

    // ---- RUM 5: Skyer ----
    select('#room5 #cloud1').mousePressed(() => clickCloud('cloud1'))
    select('#room5 #cloud2').mousePressed(() => clickCloud('cloud2'))
    select('#room5 #cloud3').mousePressed(() => clickCloud('cloud3'))

    select('#room5 #room5-submit').mousePressed(() => {
        checkRoom5Answer()
    })

    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

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
    shiftPage('#room1')
}

// ============================================
// RUM 1: Grab the artifact
// ============================================
function findSymbol(id) {
    console.log('function called')
    select(id).hide()
    symbolsFound++
    console.log('sybol', symbolsFound)
    select('#room1-found').html('Fundet: ' + symbolsFound + ' / 1')

    if (symbolsFound === 1) {
        gameState = 1
        console.log('shiftpage called')
        select('#room1 #room1-code').addClass('show')
    }
}

function checkRoom1Answer() {
    var answer = select('#room1 #room1-answer').value().toLowerCase()
    if (answer.includes('time')) {
        gameState = 2
        startTimer()
        shiftPage('#room2')
    } else {
        select('#room1 #room1-error').html('Ikke helt - prøv igen!')
    }
}
// ============================================
// RUM 2: pick an escape rute
// ============================================
function takePath(id) {
    select(id).show()
    if ('#symbol1')
        shiftPage('#room4')
    
    
    if ('#symbol3')
        shiftPage('#room3')
    
}
//make 2 hotspots on map-like background
//force pick one 
//then shiftpage to picked room path
// ============================================
// RUM 3: river path
// ============================================

//show 2 choice paths: swim over river or climb tree
//if click swim over river then play swimming sound and shiftpage to loop video of croc eating you 
//then shiftpage to gameover screen

//if click climb tree then shiftpage to treetop and make "call helicopter" button 
//if "call helicopter" pressed then show captcha-like puzzle with helicopters and planes
//hint "click on the helicopter"
//if correct then play helicopter sounds and shiftpage to win screen
//if wrong shiftpage to video of planecrash gameover screen

// ============================================
// RUM 4: canyon bridge
// ============================================

//cross bridge by clicking on hotspot arrow foreward
//create timed event with 3 sek countdown
//click on hotspot 8 times before 3 sek to cross bridge
//if fail shiftpage to gameover screen
//if crossed bridge shift page to room 5

// ============================================
// RUM 5: KLIK SKYER I RÆKKEFØLGE
// ============================================
function clickCloud(id) {
    if (id === cloudAnswer[cloudStep]) {
        cloudStep++
    } else {
        cloudStep = 0
    }

    if (cloudStep === cloudAnswer.length) {
        select('#room5 #room5-code').addClass('show')
    }
}
//answer riddle "helicopter"
//then shiftpage to win screen 

function checkRoom5Answer() {
    var answer = select('#room5 #room5-answer').value().toLowerCase()
    if (answer.includes('kort')) {
        gameState = 3
        stopTimer()
        select('#final-time').html('Din tid: ' + seconds + ' sekunder')
        shiftPage('#complete')
    } else {
        select('#room5 #room5-error').html('Ikke helt - prøv igen!')
    }
}

// ============================================
// RUM W: Win screen AKA saved by helicopter 
// ============================================


// ============================================
// RUM X: GAMEOVER screen with unike background
// ============================================

//match death to gameover background
//dumb ways to die: crocodile, plane crash, bridge colapse, 

// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    // Udkommenter linjen herunder når firebase.js er sat op:
    // scoresRef.add({ name: name, seconds: seconds }).then(() => {
    //     select('#btn-save').attribute('disabled', true)
    //     select('#btn-save').html('Gemt!')
    // })
}

// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')


    // Nulstil rum 1
    select('#room1-found').html('Fundet: 0 / 1')
    select('#room1-hint').html('grab the artifact')
    select('#room1 #symbol0').show()
    select('#room1 #room1-code').removeClass('show')
    select('#room1 #room1-answer').value('')
    select('#room1 #room1-error').html('')


    // Nulstil rum 2
    select('#room2-found').html('Fundet: 0 / 3')
    select('#room2-hint').html('Find de 3 skjulte symboler i junglen...')
    select('#room2 #symbol1').show()
    select('#room2 #symbol2').show()
    select('#room2 #symbol3').show()

    // Nulstil rum 5
    select('#room5 #room5-code').removeClass('show')
    select('#room5 #room5-answer').value('')
    select('#room5 #room5-error').html('')

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')
}
