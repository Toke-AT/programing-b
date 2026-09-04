//array med alle rick and morty karaktererne
var chars = []
//mqtt "walkie talkie" kalder vi for client 
var client 
//topic er det mqtt emne vi skal bruge
var topic = "karaktervalg"

function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
    getCharacters()
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
    } )
}

async function getCharacters(){
    //Vi starter med at hente karakterne i Rick Morty API
    var characters = await getJSON('https://rickandmortyapi.com/api/character?page=1')
    showCharacters(characters.results)
}

function showCharacters(characters){
    characters.map( c => {
        var card = createCard(c.name, c.species, c.image)        
        select('#characters').child(card)
    })    
}
