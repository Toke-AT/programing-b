var gravity 
var friction  
var b
var f
var points = 1
var bSound
var currentPage='#page1'
var startX
var slingshotPos;
var maxDragDist = 100; // Hvor langt man maksimalt kan trække slangebøssen tilbage


async function setup() {
  bSound = await loadSound("../api_lib/sounds/dragon-studio-censor-beep-3-372460.mp3")
  var c = createCanvas(windowWidth, windowHeight)

  // skydeboldens startposition
  slingshotPos = createVector(windowWidth/2, 650);

  select('#page2').child(c)

  select('#startButton').mousePressed(()=> {
    userStartAudio() //starter lyd eller blokerer browseren for funktionaliteter. kunne fx ikke restarte uden//
    shiftPage('#page2')
  })
    select('#saveHighscore').mousePressed(()=> {
    var n = select('#name').value()
    console.log(n, points)
    fb.save(n, points)
  })

  // Getting 'Info' div in js hands
var info = document.getElementById('info');

// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
function tellPos(p){
  info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
}

addEventListener('mousemove', tellPos, false)
  gravity = createVector(0, 0)
  friction = 1
  select('canvas').html(points)

   // Opret en bold, der starter i slangebøssen
  b = new Ball(slingshotPos.x, slingshotPos.y, 40, '#d8a15b', 12);
  f = new FloatingBall(100, 100, 50, '#8b5e3c',0,4)

  b.hasHit = false
  b.isFlying = false
  b.isDragging = false
  b.hasCharged = false
  
  var fb = new Firebase('highscores')
  fb.listen(updateHighscore, 5, 'points', 'asc')
 
 select('#restartButton').mousePressed(()=> shiftPage('#page1'))
 
}

function updateHighscore(scores){
 console.log('got result',scores)
var HS = select('#highScore')
  HS.html('')
  scores.map(p => {
    HS.child(
      createElement('p', `${p.name}: ${p.points}`)
    )
  })
  select('#name').value('')
}

function draw() {
  background('#F5EBDD')

b.update()

if (
  b.isFlying &&
  (
    b.position.x < -b.diam / 2 ||
    b.position.x > width + b.diam / 2 ||
    b.position.y < -b.diam / 2 ||
    b.position.y >= height - b.diam / 2
  )
) {
  resetBall()
}

b.constrain()
b.show()

f.update()
f.constrain()
f.show()

  // Håndter træk i bolden
  if (!b.isFlying && !b.hasCharged) {
    if (mouseIsPressed) {
      var mousePos = createVector(mouseX, mouseY)

      if (
        b.isDragging ||
        p5.Vector.dist(mousePos, slingshotPos) < 50
      ) {
        b.isDragging = true

        var dragVec = p5.Vector.sub(
          mousePos,
          slingshotPos
        )

        if (dragVec.mag() > maxDragDist) {
          dragVec.setMag(maxDragDist)
        }

        b.position = p5.Vector.add(
          slingshotPos,
          dragVec
        )

        var launchVel = p5.Vector
          .sub(slingshotPos, b.position)
          .mult(0.15)
      }
    }
  }

  // Kollisionskontrol
  if (
    b.isFlying &&
    !b.hasHit &&
    b.hit(f)
  ) {
    points--
    b.hasHit = true

    if (bSound) {
      bSound.play()
    }

    CheckPoints()
  }


  select('#info').html(points)
}


function mouseReleased() {
  if (b.isDragging) {
    b.velocity = p5.Vector
      .sub(slingshotPos, b.position)
      .mult(0.15)
    b.isFlying = true
    b.isDragging = false
    gravity = createVector(0, 0.1)
  }
}

function CheckPoints() {
  if (points <= 0) {
    shiftPage('#page3')
    points = 1
  }
}
  

function resetBall() {
  console.log('resetBall bliver kaldt')
  b.position = slingshotPos.copy()
  b.velocity = createVector(0, 0)
  b.isFlying = false
  b.isDragging = false
  b.hasHit = false
  gravity = createVector(0, 0)
}