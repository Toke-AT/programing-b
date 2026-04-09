// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//make ref to collection
var quotesRef = db.collection('quotes_data')
console.log('set up ref see quote data')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //THE GREAT REASON: ONSNAPSHOT
    quotesRef.onSnapshot( snap => {
        console.log('recived snap', snap.size)
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        });
    })
}

function keyPressed(){
    //console. log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select('#newQuote').value()
        if(q == ""){
            confirm('skriv venligst noget før du trykker enter')
            return
        }
        //nu skal vi gemme det nye quote i firestore
        //funktionen add() på en collectionref
        //opretter en ny collection hvis den ikke findes
        quotesRef.add({
            text: q,
            timestamp: firebase.firestore.fieldValue.serverTimestamp()
            //.then kaldes asynkront når add er færdig
        })
    }
}