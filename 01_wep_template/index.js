var currentPage = '#page5'

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt')
    //Sæt event listeners op på menu
    var allMenuItems=selectAll('.sidebar a')
    allMenuItems.map(
        function(item){
            item.mousePressed(
                function(){
                    shiftPage(item.attribute('action'))
                }
            )
        }
    )
}


function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}