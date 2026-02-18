//This script takes a csv file and clean the data into a javascript array 

var table 
//cleanData will hold the javascript objects we intend to use 
var cleanData = []

const csvFile = './assets/mental_health_workplace_survey.csv'
//vi vil kun bruge max tusind rækker - da vi skal tegne dem på skærmen 
const maxRows = 1000

function preload(){
    //loadTable er en p5 funktion der henter en tabel fra en fil 
    table = loadTable(csvFile, 'csv', 'header')
    console.log('Data tabel loaded', table)
}

//Kan jeg lave en algoritme som kan forusige folks jobtilfredshed ud fra deres 
//transporttid og søvntimer?
function setup(){
    console.log("Rå data kolonner: ", table.columns)
    var xValue = "CommuteTime"
    var yValue = "SleepHours"
    var labelValue = "JobSatisfaction"

    //table.rows er et array med alle data objekterne i
    //mpt returnerer et nyt array med de dimensioner vi gerne vil have  
    cleanData = table.rows.map( row => {
        var x = row.get(xValue)
        var y = row.get(yValue)
        var returnObj = {
            [xValue]: Number(x),
            [yValue]: Number(y)
        }
        if(labelValue){
            returnObj.label = Number(row.get(labelValue))
        }
        return returnObj
    })
    //Vi filtrerer så lige arrayet så vi er sikre på at alle de dimensioner vi skal bruge er udfyldt 
    cleanData = cleanData.filter( row => {
        //valid er true - hvis begge felter er et TAL
        var valid = !isNaN(row[xValue]) && !isNaN(row[yValue])
        //MEN vi skal også tjekke om label er noget HVIS vi har en label 
        if(labelValue && !row.label){
            valid = false
        } 
        return valid 
    })

    //bland data vilkårligt (p5 funktion der blander et array)
    cleanData = shuffle(cleanData)

    cleanData = cleanData.slice(0, maxRows)

    console.log('Så har vi renset data:', cleanData)

    select('#status').html(`Vi har nu renset data skåret det ned til max 1000 rækker - kig i konsollen! <3 ISVAFFEL`)
}


