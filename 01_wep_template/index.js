var currentPage = '#page5'

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt')
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