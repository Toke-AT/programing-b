var currentPage = '#page3'

var mouseX = 0
var mouseY = 0

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    
    
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

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    //console.log(mouseX, mouseY)
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight

    document.querySelectorAll(".parallax-mouse").forEach((element) => {
        element.style.transform = `translate(${mouseX - screenWidth/2 }px, ${mouseY - screenHeight/2 }px)`
        
    })
})