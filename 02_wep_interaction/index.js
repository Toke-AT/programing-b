var currentPage = '#page1'

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt')

    //Buttons
    var theButton =select('#theButton')
    //sæt event listener up on button
    theButton.mousePressed(()=>{
        if( confirm('er du sikker?')){
            theButton.html('i was clicked')
        }else{
            theButton.html('i dont know who i am')
        }
    })


    //drop downs
    var theDropdown = select('#theDropdown')
    //event listener changed
    theDropdown.changed(()=>{
        select('#page2').style('background-color', theDropdown.value())
    })


    //input field
    var theInput = select('#theInput')
    var theInputButton = select('#theInputButton')
    var theInputTitle = select('#theInputTitle')
    theInputButton.mousePressed(()=>{
        var title = theInput.value()
        theInput.hide()
        theInputButton.hide()
        theInputTitle.html(title)
    })



    





    //Sæt menu op
    //hent alle sider som array
    var allPages=selectAll('.page')
    //run list one by one
    allPages.map(
        (page)=>{
            //made new a tag element
            var menuItem=createElement('a')
            //set a tag as html title
            menuItem.html(page.attribute('title'))
            // set event lisener
            menuItem.mousePressed(
                ()=>shiftPage('#'+page.attribute('id'))
            )
            //set a tag as sidebar
            select('.sidebar').child(menuItem)
        }
    )

}


function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}