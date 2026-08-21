

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    noCanvas()
    // Brug funktionerne fra dit personlige API her.
    showToast('SELMA ER FUCKING NICE', 500)
    startTimer()
    setTimeout(()=>{
            stopTimer()
            
        }, 4000)
    
}
