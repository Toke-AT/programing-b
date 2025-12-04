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

function mouseMoved(){
    //P5 giver os variabler om musen og vinduet: 
    //console.log('P5 mus: ', mouseX, mouseY, windowWidth, windowHeight)
    //selectAll vælger alle elementer med en klasse - .map() looper igennem dem
    selectAll('.parallaxMouse').map( div => {
        const speed = div.attribute('data-speed')
        div.style('transform', `translate(${(mouseX - windowWidth/2) * speed }px, ${(mouseY - windowHeight/2) * speed}px)`)
    })
}

/*document.addEventListener('mousemove', (e)=>{
    mouseX = e.clientX
    mouseY = e.clientY
    //console.log(mouseX, mouseY)

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight

    document.querySelectorAll('.parallaxMouse').forEach( (elem) => {
        const speed = elem.getAttribute('data-speed')
        elem.style.transform = `translate(${(mouseX - screenWidth/2) * speed }px, ${(mouseY - screenHeight/2) * speed}px)`
    } )

})*/