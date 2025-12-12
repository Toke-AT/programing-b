var currentPage = '#page1'

function preload(){
}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    //Vi opretter et array med firkantede paranteser
    var klassen2T = ["Balder", "Asta", "Viggo", "Bertram", "Tobias", "Selma", "Toke", "Victor"]

    //Hvor mange elementer?
    console.log(klassen2T.length, " elementer i listen")
    //Sådan bruger vi et element:
    console.log(klassen2T[0], ' er den første i listen') 
    //Sådan lægger vi nye elementer til 
    klassen2T.push("Mollie")
    klassen2T.push("Nikolaj")
    klassen2T.push("Mads")
    klassen2T.push("Lisbet")
    klassen2T.push("Asbjørn")
    klassen2T.push("Gilbert")
    klassen2T.push("Ludvig")
    klassen2T.push("John")
    klassen2T.push("Silas")
    klassen2T.push("Milas")
    klassen2T.push("Sebastian")
    klassen2T.push("Flóki")
    klassen2T.push("Amadeus")

    console.log(klassen2T, klassen2T.length)

    //Sådan looper vi igennem et array:
    klassen2T.map((e)=>{
        console.log('Denne person i klassen hedder ' + e)
    })

    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
