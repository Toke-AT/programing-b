var client 

function setup(){
    //Skift til den aktuelle side 
    shiftPage('#page5')

    //lav et kort med funktionen createCard
    createCard("Her er teksten", "https://cdn.mos.cms.futurecdn.net/ARWms77gyVZ5u2MZkQqcKc-1256-80.jpg", "#cards")


    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })

    client.subscribe('simon')
    client.subscribe('simon/page')

    //Her får vi beskeder på forskellige topics vi abonnerer på 
    client.on('message', (topic, msg) => {
        console.log(topic, msg.toString())
        msg = msg.toString()
        if(topic == 'simon/page'){
            console.log('nu skal der skiftes side')
            //ER DET ET TAL?
            msg = '#page' + msg
            shiftPage(msg)
        }
        //NU SKAL DER SKE NOGET SPÆNDENDE
        if(topic == 'simon'){
            select('#msg').elt.textContent = 'Besked på topic ' + topic + ' med teksten ' + msg
        }
    })

    client.publish('programmering/page', '1')

}

var currentPage = "#page5"

function shiftPage(newPage){
    if( !select(newPage) ) return
    select(currentPage).removeClass('show')
    currentPage = newPage
    select(currentPage).addClass('show')
}

function createCard(text, img, destId){
    console.log(img)
    var containerDiv = createDiv().addClass('container')
    var topDiv = createDiv().addClass('top')
    var newImg = createImg(img, "alternativ tekst")
    topDiv.child(newImg)
    var bottomDiv = createDiv(text).addClass('bottom')
    containerDiv.child(topDiv)
    containerDiv.child(bottomDiv)
    select(destId).child(containerDiv)
}



