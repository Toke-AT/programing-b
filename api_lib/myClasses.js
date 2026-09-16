class Ball {
  constructor(x, y, r, img, jump){ 
    this.diam = r
    this.img = img
    this.velocity = createVector(0, 0)
    this.position = createVector(x, y)
    this.jumpForce = jump
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
    this.velocity.y -= this.jumpForce
  }
  
  show(){
    imageMode(CENTER)
    image(this.img, this.position.x, this.position.y, this.diam, this.diam)
  }
  hit(anotherBall){
    var b = anotherBall
    var totalR = (this.diam + b.diam) / 2
    var d = dist(this.position.x, this.position.y, b.position.x, b.position.y)

    if(d <= totalR){
        return true
    }else{
        return false
    }
  }
}

class FloatingBall extends Ball{
    constructor(x, y, r, img, jump, speed){
        //super betyder at vi overtager disse argumenter fra "super" klassen (Ball)
        super(x, y, r, img, jump)
        //vi overskriver velocity vektoren med en lokal der flytter sig på x aksen 
        this.velocity = createVector(speed, 0)
    }
    update(){
        this.position.add(this.velocity)
    }

    constrain(){
        //sørg for at floatingball bouncer på siderne
        this.position.x = constrain(this.position.x, this.diam/2, windowWidth - this.diam/2) 

        if(this.position.x <= this.diam/2 || this.position.x >= windowWidth - this.diam/2){
            this.velocity.mult(-1)
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