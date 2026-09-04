var client
var topic = "karaktervalg"
var me

function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.
    //init mqtt
    client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', () => {
        showToast('Forbundet til MQTT')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast(`Modtog besked: ${ms.toString()}`)
        var msObject = JSON.parse(ms.toString())
        console.log(msObject.name)

        if (msObject.action == "choose charecter") {
            if (select(`#player${msObject.name}`)) {
                select(`#player${msObject.name}`).hide()
            }
        }
    })


    select('#playerA').mousePressed(() => choosePlayer('A'))
    select('#playerB').mousePressed(() => choosePlayer('B'))
}

function choosePlayer(n) {
    me = n
    var obj = {
        "name": n,
        "action": "choose charecter"
    }
    ojb = JSON.stringify(obj)
    client.publish(topic, obj)
    select('#name').html(` I am ${me} ` )
    shiftPage('#choose')

}
