var currentPage = '#page1'

//P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    console.log('P5 setup kaldt')

    //Buttons
    var theButton = select('#theButton')
    //sæt event listener up on button
    theButton.mousePressed(() => {
        if (confirm('er du sikker?')) {
            theButton.html('i was clicked')
        } else {
            theButton.html('i dont know who i am')
        }
    })


    //drop downs
    var theDropdown = select('#theDropdown')
    //event listener changed
    theDropdown.changed(() => {
        select('#page1').style('background-color', theDropdown.value())
        select('#page2').style('background-color', theDropdown.value())
        select('#page3').style('background-color', theDropdown.value())
        select('#page4').style('background-color', theDropdown.value())
        select('#page5').style('background-color', theDropdown.value())
        select('#page6').style('background-color', theDropdown.value())


    })


    //input field
    var theInput = select('#theInput')
    var theInputButton = select('#theInputButton')
    var theInputTitle = select('#theInputTitle')
    theInputButton.mousePressed(() => {
        var title = theInput.value()
        theInput.hide()
        theInputButton.hide()
        theInputTitle.html(title)
    })


    var ck1 = select('#ck1')
    ck1.mousePressed(() => {
        if (confirm('er du sikker?')) {
            shiftPage('#page5')

        } else {
            alert('stanley was unsure')
        }
    })

    var buttonc1 = select('#buttonc1')
    var buttonc2 = select('#buttonc2')
    var buttonc3 = select('#buttonc3')
    //sæt event listener up on button
    buttonc1.mousePressed(() => {
        if (confirm('are you sure stanley?')) {
            shiftPage('#page6')
        } else {
            buttonc1.html('stanley was not sure. instead stanley used his time thinking about why donuts have holes.')
        }
    })
    buttonc2.mousePressed(() => {
        if (confirm('are you sure stanley?')) {
            shiftPage('#page4')
        } else {
            buttonc2.html('stanley was not sure. instead stanley used his time thinking about what might happen if he just did, what the narrator wanted for once. Right stanley?')
        }
    })
    buttonc3.mousePressed(() => {
        if (confirm('stanley stood still, so still infact that the world moved without stanley. who now felt he was 5 years older.')) {

        }
    })





    //Sæt menu op
    //hent alle sider som array
    var allPages = selectAll('.page')
    //run list one by one
    allPages.map(
        (page) => {
            //made new a tag element
            var menuItem = createElement('a')
            //set a tag as html title
            menuItem.html(page.attribute('title'))
            // set event lisener
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
            )
            //set a tag as sidebar
            select('.sidebar').child(menuItem)
        }
    )

}




function shiftPage(newPage) {
    if (newPage == '#page5') {
        var buttonc1 = select('#buttonc1')
        var buttonc2 = select('#buttonc2')
        var buttonc3 = select('#buttonc3')
        buttonc1.html('walk in');
        buttonc2.html('close door');
        buttonc3.html('stand still');
    }
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}