// Dine genbrugelige API-funktioner kommer her.


// Kræver et HTML-element med id="toast".
// Parametre: txt = tekst, timeout = tid i millisekunder, type = CSS-klasse
function showToast(txt, timeout=2000, type='notify'){
    var toast = select('#toast')
        toast.html(txt)
        toast.addClass('toastShow')
        toast.addClass(type)
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, timeout)
}

// Skifter til en ny side uden andre ting
// Parametre: newId = id på den nye side, der skal vises, fromId = id på den side, der skiftes fra, className = den CSS-class der bruges til at vise siden
function shiftPage(newId, fromId = currentPage, className = 'show'){
    select(fromId).removeClass(className)
    select(newId).addClass(className)
    currentPage = newId
}

// Returnerer et tilfældigt element fra et array.
// Parameter: list = det array, der skal vælges fra 
function randomFrom(list) {
    return random(list)
}

// Laver HTML-elementer ud fra et array
// Parametre: list = det array, der skal vises, containerId = id'et på den HTML-container, elementerne skal placeres i, className = CSS-klasse
function createList(list, containerId, className){
    var dest = select('#' + containerId) // Finder containeren ud fra dens id og gemmer den i variablen dest (destinationen)
    dest.html('') // Tømmer den nuværende container
    list.map((item) => { // gennemgår hvert element i arrayet ved hjælp af map()-metode (bruges også til at oprette nyt array efter fx filter())
        var div = createDiv(item) // Opretter en div med elementet fra arrayet
        div.addClass(className) // Tilføjer den valgte CSS-klasse til div'en
        dest.child(div) // Sætter div'en ind i den valgte container
    })
}

// timer API
var timerInterval = null

//parametre: seconds = så mange sekunder timeren skal tælle ned, displayId=id på den container, hvor sekunderne vises 
function startTimer(seconds, displayId) {
    var currentSeconds = seconds // Den aktuelle tid sættes til de indtastede sekunder
    select('#' + displayId).html(currentSeconds + ' sek') //display skal vise den indstillet tid + sekunder
    timerInterval = setInterval(() => {
        currentSeconds-- //der skal tælles 1 ned hvert sekund fra de indtastede sekunder
        select('#' + displayId).html(currentSeconds + ' sek') //nedtælling skal vises
        if(currentSeconds <= 0){
            stopTimer() //timer skal stoppe når den rammer 0
        }
    }, 1000) //timeren skal opdateres hvert sekund
    console.log('timer started')
}

function stopTimer() {
    clearInterval(timerInterval)
    console.log('timer done')
}





