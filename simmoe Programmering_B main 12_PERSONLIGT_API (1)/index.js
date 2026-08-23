
var currentPage = "#page1"
var elev =["Selma","Silas","Toke","Viggo","Balder"]
//P5 setup() bliver kaldt EN gang fÃ¸r siden vises 
function setup(){
    noCanvas()
    // Brug funktionerne fra dit personlige API her.
    showToast('Opgaven skal afleveres senest kl. 22', 5000, "notify")
         select("#btn1").mousePressed(()=>{
            createList(elev, "elevbox", "elevcss")
        })
        select("#btn2").mousePressed(()=>{
        var randomElev = randomFrom(elev)
        select("#randomElevBox").html(randomElev)
        shiftPage("#page2")
        })
        select("#backBtn2").mousePressed(()=>{
            shiftPage("#page1")
        })

       
        select("#timerBtn").mousePressed(()=>{  
        shiftPage("#page3")
        var seconds = Number(select("#timerInput").value()) 
        startTimer(seconds, "timer")  
        })
        
}