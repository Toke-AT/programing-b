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

    // -------------------------------------------------------------
    // TRIN 3: FORBERED CHART.JS DATASETS
    // (Forklar: Chart.js vil have data delt op i grupper baseret på label)
    // -------------------------------------------------------------
    
    // 3a. Find alle unikke labels (f.eks. High, Medium, Low)
    var uniqueLabels = []
    data.map(p => {
        // Hvis vi ikke har set denne label før, så gem den i listen
        if (!uniqueLabels.includes(p.label)) {
            uniqueLabels.push(p.label)
        }
    })
    uniqueLabels.sort() // Sorter alfabetisk

    // 3b. Omdan labels til datasets
    var datasets = uniqueLabels.map((label, i) => {
        // Find kun de punkter der hører til denne label
        var groupData = data.filter(p => p.label === label)
        
        // Vælg en farve fra listen
        var col = colorList[i]

        // Returner konfigurationsobjektet til Chart.js
        return {
            label: label,
            data: groupData, 
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8
        }
    })

    
    // 3c. Tilføj en ekstra gruppe til "Brugerens Gæt"
    // Den starter med standardpunktet (0, 0)
    datasets.push({
        label: 'Dit Gæt',
        data: [{ x: 0, y: 0 }], 
        pointStyle: 'crossRot', 
        pointRadius: 12,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 4
    })
    
    console.log(datasets)

    // -------------------------------------------------------------
    // TRIN 4: OPRET GRAFEN
    // -------------------------------------------------------------
    // ctx (context) peger på <canvas id="chartCanvas"> i HTML.
    // Chart.js bruger dette canvas til at tegne alle punkter.
    const ctx = document.getElementById('chartCanvas');
    
    // new Chart(...) opretter selve graf-objektet og gemmer det i myChart,
    // så vi senere kan opdatere grafen (fx når brugeren gætter).
    myChart = new Chart(ctx, {
        // type 'scatter' = punktdiagram i 2D (x, y)
        type: 'scatter',
        // datasets er de grupper vi byggede ovenfor (én pr. label + "Dit Gæt")
        data: { datasets: datasets },
        options: {
            // scales styrer akserne (navne, visning, min/max mm.)
            scales: {
                // x-akse titel hentes dynamisk fra variablen colX
                x: { title: { display: true, text: colX } },
                // y-akse titel hentes dynamisk fra variablen colY
                y: { title: { display: true, text: colY } }
            }
        }
    });

    // 5. Start op GUI funktionalitet (Knapper og sliders)
    setupControlSliders()
}

// -------------------------------------------------------------
// TRIN 5: KNN ALGORITMEN (Nearest Neighbor)
// (Dette sker når man klikker på knappen)
// -------------------------------------------------------------

function classifyUnknown() {
    // 1. Aflæs input fra sliderne
    var inputX = Number(select('#input-x').value())
    var inputY = Number(select('#input-y').value())

    // 2. Opdater grafen med det nye punkt
    // Det sidste dataset er "Dit Gæt"
    var guessDataset = myChart.data.datasets[myChart.data.datasets.length - 1]
    guessDataset.data = [{x: inputX, y: inputY}]
    
    // 3. Beregn afstande fra input-punktet til ALLE punkter i data
    // Vi bruger map til at skabe en NY liste hvor hvert punkt har en .distance
    data = data.map(p => {
        // Pythagoras på 2D: dist(x1, y1, x2, y2)
        p.distance = dist(inputX, inputY, p.x, p.y)
        return p
    })
    
    // 4. Sorter data så de mindste afstande kommer først
    data.sort((a, b) => a.distance - b.distance)

    // 5. Find de K nærmeste naboer
    var k = Number(select('#k-slider').value())
    var neighbors = data.slice(0, k) // Tag de første K
    
    // 6. Tæl stemmer (Voting)
    var votes = {}
    neighbors.map(n => {
        // Hvis vi IKKE har set denne label før, opretter vi den med 0 stemmer.
        if (votes[n.label] === undefined) {
            votes[n.label] = 0
        }

        // Læg én stemme til den label naboen tilhører.
        votes[n.label] = votes[n.label] + 1
    })

    // 7. Find vinderen (den label med flest stemmer)
    // Vi laver først en liste over alle labels, der har fået stemmer.
    var allLabels = Object.keys(votes)

    // Start med at antage at første label er vinderen.
    var winner = allLabels[0]

    // Gå gennem alle labels med map og find den med flest stemmer.
    // Det er helt fint at første label bliver sammenlignet med sig selv.
    allLabels.map(currentLabel => {

        // Hvis currentLabel har flere stemmer end nuværende winner,
        // så bliver currentLabel den nye winner.
        if (votes[currentLabel] > votes[winner]) {
            winner = currentLabel
        }
    })

    console.log("Stemmer:", votes, "Vinder:", winner)

    // 8. Vis resultatet til brugeren
    var span = select('#prediction-text')
    span.html(winner)

    // VIGTIGT: Opdater grafen for at vise det nye punkt
    myChart.update()
}

// -------------------------------------------------------------
// GUI OPSÆTNING (Ekstra / Hjælpefunktioner)
// -------------------------------------------------------------

function setupControlSliders() {
    // 1) Find alle x- og y-værdier i datasættet.
    // Vi bruger dem til at beregne slidernes interval.
    var xValues = data.map(point => point.x)
    var yValues = data.map(point => point.y)

    // 2) Beregn mindste og største værdi på hver akse.
    var minX = Math.min(...xValues)
    var maxX = Math.max(...xValues)
    var minY = Math.min(...yValues)
    var maxY = Math.max(...yValues)

    // 3) Hent HTML-elementerne til x- og y-slider.
    var xSlider = select('#input-x')
    var ySlider = select('#input-y')

    // 4) Konfigurer x-slideren ud fra dataens min/max.
    xSlider.attribute('min', Math.floor(minX))
    xSlider.attribute('max', Math.ceil(maxX))
    xSlider.attribute('step', (maxX - minX) / 100)
    xSlider.value((minX + maxX) / 2)

    // 5) Konfigurer y-slideren ud fra dataens min/max.
    ySlider.attribute('min', Math.floor(minY))
    ySlider.attribute('max', Math.ceil(maxY))
    ySlider.attribute('step', (maxY - minY) / 100)
    ySlider.value((minY + maxY) / 2)

    // 6) Når x-slider flyttes, opdater teksten ved siden af slideren.
    xSlider.input(() => select('#val-x').html(xSlider.value()))

    // 7) Når y-slider flyttes, opdater teksten ved siden af slideren.
    ySlider.input(() => select('#val-y').html(ySlider.value()))

    // 8) Når k-slider flyttes, opdater visningen af k-værdien.
    select('#k-slider').input(() => select('#k-value').html(select('#k-slider').value()))

    // 9) Når brugeren trykker på knappen, kører vi klassificering.
    select('#predict-btn').mousePressed(classifyUnknown)

    // 10) Vis startværdier i UI med det samme.
    select('#val-x').html(xSlider.value())
    select('#val-y').html(ySlider.value())
}
