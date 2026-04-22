// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//make ref to collection
var quotesRef = db.collection('quotes_data')
console.log('set up ref see quote data')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE: ONSNAPSHOT 
    quotesRef.onSnapshot( snap => {
        select('#quotes').html('')
        console.log('Modtog snap', snap.size)
        //ryd quotes div og sæt de nye quotes ind
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
            // Opret quote kort med knapper
            select('#quotes').child(
                createDiv().addClass('card').child(
                    createDiv(d.text)
                ).child(
                    createDiv(d.timestamp.toDate().toLocaleDateString("da-DK",{
                        month: "short",
                        weekday:"long",
                        year: "numeric"
                    })).addClass('date')
                ).child(
                    createImg('./assets/delete.svg')
                    .addClass('delete')
                    .mousePressed( ()=>{
                        if(confirm("ER du nu sikker på at du vil slette - permanent og uopretteligt - dit quote: " + d.text)){
                            quotesRef.doc(doc.id).delete()
                        }
                    } )
                )
            )
        })
    })
}

//key pressed er en indbygget p5.js funktion 
function keyPressed(){
    //console.log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select('#newQuote').value()
        if(q == "") {
            confirm('skriv venligst noget FØR DU TRYKKER ENTER')
            return
        }
        //nu skal vi gemme det nye quote i firestore
        //funktionen add() på en collectionref 
        //OPRETTER en ny collection hvis den IKKE findes 
        quotesRef.add({
            text: q,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            //.then kaldes asynkront NÅR add er færdig
        }).then(
            console.log('Quote gemt i databasen', q)
        )
        select('#newQuote').html('')
    }
}