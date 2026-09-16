var gravity 
var friction
var b
var f
var points = 1
var bSound
var currentPage='#page1'

async function setup() {


  bSound = await loadSound("../api_lib/sounds/dragon-studio-censor-beep-3-372460.mp3")
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=> {
    userStartAudio() //starter lyd eller blokerer browseren for funktionaliteter. kunne fx ikke restarte uden//
    shiftPage('#page2')
  })
  // Getting 'Info' div in js hands
var info = document.getElementById('info');

// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
function tellPos(p){
  info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
}
addEventListener('mousemove', tellPos, false)


  friction = 0.99

  select('Canvas').html(points)

  b = new Ball(windowWidth/2, 600, 48, '#d8a15b', 12)
  f = new FloatingBall(100, 100, 50, '#8b5e3c',0,4)
 
 select('#restartButton').mousePressed(()=> shiftPage('#page1'))
}

function draw() {
  background('#F5EBDD')
  b.update()
  b.constrain()
  b.show()

  if(b.hit(f)){
    points --
    bSound.play()
    CheckPoints()
  }

  select('#info').html(points)

  f.update()
  f.constrain()
  f.show()
}

function CheckPoints(){
  if(points <= 0){
   shiftPage('#page3')
   points=1
  }

}

function restartGame(){


}

function keyPressed(){
  if(key == " "){
    b.jump()
    f.jump()
    gravity = createVector(0, 0.5)
  }
}
class Ball {
  constructor(startX = 10, startY = 100, r, col, jump){
    this.startX = startX;
    this.startY = startY;
    this.diam = r
    this.col = col
    this.velocity = createVector(0, 0)
    this.position = createVector(startX, startY)
    this.jumpForce = jump
  }
  update(){
    this.velocity.add(gravity)
    this.velocity.y = friction 
    this.position.add(this.velocity)

  }
  constrain(){

    if(this.position.y > height - this.diam/2){
      this.position.y =  height - this.diam/2
      this.velocity.y= -1 


    }


  }

  jump(){
    this.velocity.y -= this.jumpForce

  }
  show(){
    fill(this.col)
    circle(this.position.x, this.position.y, this.diam)
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam)/2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)

    if(d <= totalR){
       return true
    }else{
        return false
    }

  }

}


class FloatingBall extends Ball{
    constructor(x, y, r, col, jump, speed){

        super(x, y, r, col, jump)
        this.velocity = createVector(speed,0)
    }
    update(){
        this.position.add(this.velocity)
    }
    constrain(){
        this.position.x = constrain(this.position.x, this.diam/2, windowWidth - this.diam/2)
        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.x *= -1
        }
    }
}