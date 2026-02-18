// ------------------------------------------------------------------
// UNDERVISNINGS-MANUSKRIPT: ML & KNN (Chart.js Version)
// ------------------------------------------------------------------
// MÅL FOR TIMEN:
// 1. Indlæse data fra CSV
// 2. Rense data og konvertere til objekter
// 3. Visualisere data med Chart.js (Scatter plot)
// 4. Implementere KNN algoritmen (Afstand, Sortering, Afgørelse)
// ------------------------------------------------------------------

// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js

// INDSTILLINGER FOR DATA
var filename = 'assets/work_from_home_burnout_dataset.csv'
var colX = 'breaks_taken'     // X-aksen: Variabel 1 (input)
var colY = 'sleep_hours'      // Y-aksen: Variabel 2 (input)
var colLabel = 'burnout_risk' // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "Burnout Risk Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "Angiv antal pauser og søvntimer:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'magenta', 'teal']

function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable(filename, 'csv', 'header')
}

function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)

    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------
    var rows = table.rows
    rows = shuffle(rows).slice(0, 1000) // Vi begrænser til 1000 punkter for hastighedens skyld

    data = rows.map(row => {
        // Hent værdier fra de kolonner vi valgte i toppen
        // HUSK: Alt fra CSV er tekst, så vi bruger Number() til tallene
        var x = Number(row.get(colX))
        var y = Number(row.get(colY))
        var label = row.get(colLabel)
        
        // Tjek om data er gyldig (ikke NaN og har en label)
        if (!isNaN(x) && !isNaN(y) && label) {
            return { x, y, label }
        }
    }).filter(p => p) // Fjern tomme pladser i arrayet

    console.log("Data klar:", data.length, "punkter")
    console.log(data, "her er det færdige array")

    //Nu skal vi forberede data til at blive vist med chart.js 
    //Vi skal have fat i de unikke labels for hver gruppe i data
    var uniqueLabels = []
    data.map( point => {
        //Vi kigger på punktets label. HVIS vi ikke har set det label før., så må det bre et UNIKT NYT ET
        if(!uniqueLabels.includes(point.label)){
            uniqueLabels.push(point.label)
        } 
    } )
    console.log('vi kiggede alle punkter igennem og fandt disse labels', uniqueLabels)
    //Man kunne sortere labels alfabetisk
    //uniqueLabels.sort()

    //Omdan data til grupper ud fra de forskellige labels 
    var datasets = uniqueLabels.map( (label, index) =>{
        //Filter funktionen giver os en gruppe med et bestemt label
        var groupData = data.filter( point => {
            return point.label == label
        })
        var col = colorList[index]

        //returner den FÆRDIGE gruppe med alle datapunkterne for hvert label til DATASETS
        return {
            label:label,
            data: groupData,
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8
        }
    } )
    console.log('Så fik vi lavet dataset grupperne', datasets)
}

