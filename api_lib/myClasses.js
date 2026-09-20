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
    this.velocity.y *= friction 
    this.position.add(this.velocity)
  }

  constrain(){    
    if(this.position.y > height - this.diam/2){
      this.position.y =  height - this.diam/2
      this.velocity.y *= -1 
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

class Firebase {
  constructor(collection) {
    this.ref = db.collection(collection)
  }

  save(name, points, limit, sort) {
    this.ref.add({
      name: name,
      points: points,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  listen(onUpdate, limit, sort, dir='desc') {
    this.ref.orderBy(sort, dir).limit(limit).onSnapshot(snap => {
      var list = []
      snap.forEach(doc => list.push(doc.data()))
      onUpdate(list)
    })
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