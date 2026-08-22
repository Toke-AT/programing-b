// Dine genbrugelige API-funktioner kommer her.


//Demands an HTML element with id="toast"
function showToast(txt, timeout=2000, type="notify"){
    var toast = select('#toast')
    toast.html(txt)
    toast.addClass(type)
    toast.addClass('toastShow')
    setTimeout(()=>{
        toast.removeClass(type)
        toast.removeClass('toastShow')
    }, timeout)
}

// timer API
var timerInterval = null
var seconds = 0
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
    console.log('timer started')
}

function stopTimer() {
    clearInterval(timerInterval)
    console.log('timer done')
}

//mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
var client

    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('online')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('online')
            toast.removeClass('toastShow')
        }, 2000)
    })

    client.subscribe('toke')
    client.subscribe('toke/page')

    //Her får vi beskeder på forskellige topics vi abonnerer på 
    client.on('message', (topic, msg) => {
        console.log(topic, msg.toString())
        msg = msg.toString()
        if(topic == 'toke/page'){
            console.log('nu skal der skiftes side')
            //ER DET ET TAL?
            msg = '#page' + msg
            shiftPage(msg)
        }
        //NU SKAL DER SKE NOGET SPÆNDENDE
        if(topic == 'toke'){
            select('#msg').elt.textContent = 'Besked på topic ' + topic + ' med teksten ' + msg
        }
    })

    client.publish('programmering/page', '1')

    var currentPage = "#page1"

function shiftPage(newPage){
    if( !select(newPage) ) return
    select(currentPage).removeClass('show')
    currentPage = newPage
    select(currentPage).addClass('show')
}