var client


function setup(){
    // mqtt is a object we get from the mqtt library in the html site
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    var toast = select('#toast')
    client.on('connect', msg => {
        console.log('connected to next mqtt server')
        select('#toast').html('connected to next mqtt server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')},20000)
    })

    client.subscribe('programmering')

    client.on('message', (topic, msg) => {
        select('#msg').html(msg.toString())
    })

    client.publish('programmering', 'is it gay to kiss the homies goodnight???')

}