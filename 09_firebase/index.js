// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//make ref to collection
var testRef = db.collection('test')
console.log('set up ref to test')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //THE GREAT REASON: ONSNAPSHOT
    testRef.onSnapshot( snap => {
        console.log('recived snap', snap.size)
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        });
    })
}

