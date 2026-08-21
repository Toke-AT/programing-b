// Dine genbrugelige API-funktioner kommer her.


//Demands an HTML element with id="toast"
function showToast(txt, timeout=2000, type="notify"){
    var toast = select('#toast')
    toast.html(txt)
    toast.addClass(type)
    toast.addClass('toastShow')
    setTimeout(()=>{
        toast.removeClass(type)
        toast.removeClass('toastShow')
    }, timeout)
}

// timer API
var timerInterval = null
var seconds = 0
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++
        select('#timer').html(seconds + ' sek')
    }, 1000)
    console.log('timer started')
}

function stopTimer() {
    clearInterval(timerInterval)
    console.log('timer done')
}