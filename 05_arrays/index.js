var currentPage = '#page3'
var capture 


function preload(){
    
}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    //array with square brackets
    var klassen2T = ["balder","asta","viggo","toke","tobias","selma","bertram","victor"]

    //how many elements
    console.log(klassen2T.length,"elements in list")
    //how to use element
    console.log(klassen2T[0],'first in list')
    //how to add new elements
    klassen2T.push("amadeus")
    klassen2T.push("john")
    klassen2T.push("mollie")
    klassen2T.push("lisbet")
    klassen2T.push("silads")
    klassen2T.push("milads")
    klassen2T.push("nikolai")
    klassen2T.push("mads")
    klassen2T.push("sebastian")
    klassen2T.push("asbjørn")
    klassen2T.push("floki")
    klassen2T.push("gilbert")
    klassen2T.push("ludvig")
    
    
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
