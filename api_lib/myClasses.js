class Ball {
  constructor(x, y, r, col){
    this.diam = r
    this.col = col
    this.velocity = createVector(0, 0)
    this.position = createVector(x, y)
  }
  update(){
    this.velocity.add(gravity)
    this.velocity.y *= friction 
    this.position.add(this.velocity)
  }
  constrain(){
    if(this.position.y > height - this.diam/2){
      this.position.y = height - this.diam/2
      this.velocity.y *= -1 
    }
  }
  jump(){
     this.velocity.y -= jumpForce
  }
  show(){
    fill(this.col)
    circle(this.position.x, this.position.y, this.diam)
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam) /2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)

    if(d <= totalR){
        console.log("balls hit")
        return true
    }
    else{
        return false
    }
  }
}

class FloatingBall extends Ball{
    constructor(x, y, r, col, jump, speed){
        //super means we inharit these from parent/superclass
        super(x, y, r, col, jump)
        //we overide OG class parent
        this.velocity = createVector(speed, 8)

    }
    update(){
        this.position.add(this.velocity)
    }
    constrain(){
        //make floatball bounce
        this.position.x = constrain(this.position.x, this.position.diam/2, windowWidth - this.diam/2 )
        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.multi(-1)
        }
    }
}