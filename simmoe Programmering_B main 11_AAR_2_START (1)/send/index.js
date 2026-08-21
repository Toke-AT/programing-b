var client 

function setup(){
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

    select('#btn1').mousePressed( ()=>{
        client.publish('simon/page', '1')
    })
    select('#btn2').mousePressed( ()=>{
        client.publish('simon', 'open')
    })
    select('#btn3').mousePressed( ()=>{
        client.publish('simon/page', '2')
    })

}
