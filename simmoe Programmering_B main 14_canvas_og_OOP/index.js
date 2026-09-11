var gravity 
var friction  
var b
var f
var points = 1000
var bSound




async function setup() {
  bSound = await loadSound("api_lib/sounds/u_edtmwfwu7c-metal-pipe-329305.mp3")
  var c = createCanvas(windowWidth, windowHeight)
  select('page2').child(c)
  gravity = createVector(0, 0.5)
  friction = 0.99

  select('#info').html(points)

  b = new Ball(windowWidth/2, 0, 100, "orange", 12)
  f = new FloatingBall(100, 0, 50, "lightblue", 0, 4)
}

function draw() {
  background(100)

  b.update()
  b.constrain()
  b.show()
  b.hit(f)

  if(b.hit(f)){
    points--
    bSound.play()
  }

  f.update()
  f.constrain()
  f.show()
}

function keyPressed(){
  if(key == " "){
    b.jump()
    f.jump()
  }
}

