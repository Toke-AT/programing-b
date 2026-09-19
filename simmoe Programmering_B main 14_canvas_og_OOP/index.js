var gravity 
var friction  
var b
var f 
var points = 1000
var bSound
var blomkaal
var roedkaal

async function setup() {
  blomkaal = await loadImage('./assets/blomkaal.png')
  roedkaal = await loadImage('./assets/roedkaal.png')
  bSound = await loadSound("../api_lib/sounds/u_edtmwfwu7c-metal-pipe-329305.mp3")
  shiftPage('#page1')
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=>
    {

      startGame()
      shiftPage('#page2')
    })
  select('#restartButton').mousePressed(()=>{    
    startGame()
    shiftPage('#page2')
  })
    select('#saveHighscore').mousePressed(()=> {
    var n = select('#name').value()
    console.log(n, points)
    fb.save(n, points)
  })
  
  gravity = createVector(0, 0.5)
  friction = 0.99

  select('#info').html(points)

  b = new Ball(windowWidth/2, 0, 160, blomkaal, 12)
  f = new FloatingBall(100, 100, 110, roedkaal, 0, 12)
  frameRate(0)

  var fb = new Firebase('jumping_cabbage_data')
  fb.listen(updateHighscore, 5, 'points', 'asc')
}

//callback fra listen som har returneret et array
function updateHighscore(scores){
  console.log('Got result', scores)
  var HS = select('#highScore')
  HS.html('')
  scores.map(p => {
    HS.child(
      createElement('p', `${p.name}: ${p.points}`)
    )
  })
  select('#name').value('')
}

function startGame(){
  frameRate(60)
  points = 1000
    startTimer(1, 12, 'top-right', ()=>{
      select('#stats').html(`<h1>${points} point</h1>`)
      shiftPage('#page3')
    }, './assets/roedkaal.png')
}

function draw() {
  clear()
  
  b.update()
  b.constrain()
  b.show()

  if(b.hit(f)){
    points--
    bSound.play()
  }

  select('#info').html(points)

  f.update()
  f.constrain()
  f.show()

}

function keyPressed(){
  if(key == " "){
    b.jump()
  }
}

