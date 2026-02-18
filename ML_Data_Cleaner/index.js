// ------------------------------------------------------------------
// DATA CLEANER
// Dette script hjælper med at klargøre rodede CSV filer til ML brug.
// ------------------------------------------------------------------

let table
let cleanedData = []

// INDSTILLINGER
// 1. Skriv navnet på filen i assets mappen:
let filename = 'assets/work_from_home_burnout_dataset.csv'

// 2. Vælg maksimalt antal rækker (for at undgå at browseren bliver langsom)
let maxRows = 1000

// 3. Vælg hvilke kolonner du vil beholde (Se navne i konsollen!)
// Vi skal bruge to tal-dimensioner (x, y). 
// Kategori (label) er valgfri - sæt den til "" hvis du ikke skal bruge den.
let colX = 'breaks_taken'
let colY = 'sleep_hours'
let colLabel = 'burnout_risk'

function preload() {
    // Vi loader filen som CSV og siger at den har en header (overskrifter)
    table = loadTable(filename, 'csv', 'header')
}

function setup() {
    noCanvas() // Vi skal ikke tegne noget her
    
    // TRIN 1: Tjek rå data
    // Kig i konsollen for at se hvad kolonnerne hedder!
    console.log("------------------------------------------------")
    console.log("RÅ DATA KOLONNER:", table.columns)
    console.log("------------------------------------------------")

    if(colX == "" || colY==""){
        console.log('udfyld kolonnenavne først')
        return
    }
    // TRIN 2: Konverter og udvælg og rens data
    let processedData = table.rows.map(row => {
        // Vi henter værdierne ud fra de valgte kolonner
        let xVal = row.get(colX)
        let yVal = row.get(colY)

        let dataRow = {
            [colX]: Number(xVal),
            [colY]: Number(yVal)
        }

        // Hvis vi har valgt en label-kolonne, tager vi den med
        if (colLabel !== "") {
            dataRow.label = row.get(colLabel)
        }

        return dataRow
    })
    // Filteret fjerner rækker der er "ødelagte" (NaN = Not a Number)
    .filter(item => {
        let valid = !isNaN(item[colX]) && !isNaN(item[colY])
        // Hvis vi bruger labels, skal de også være gyldige (ikke tomme)
        if (colLabel !== "") {
            valid = valid && item.label !== ""
        }
        return valid
    })

    // Vi blander listen tilfældigt (shuffle er en p5 funktion)
    // Dette er vigtigt hvis data er sorteret, så vi får et repræsentativt udsnit
    processedData = shuffle(processedData)
    
    // Vi tager kun de første 'maxRows'
    cleanedData = processedData.slice(0, maxRows)

    // TRIN 3: Vis resultatet
    console.log(`FÆRDIG! Har fundet ${cleanedData.length} gyldige rækker.`)
    console.log("Her er dine rene data (Højreklik på objektet -> 'Copy Object' for at gemme):")
    console.log(cleanedData)

    // Giv besked på skærmen og lav download knap
    select('#status').html(`Klar! Processerede ${cleanedData.length} rækker.`)

}