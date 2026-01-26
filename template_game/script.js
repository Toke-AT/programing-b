//We select the gamecontainer from html - and save it in a var called game_container
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var time_display = document.querySelector('#time-display')
var timeout = 2000
var points = 0
var time_left = 10

//The function takes a asta div element as argument, and removes it from its parent container  
function killAsta(asta){
    game_container.removeChild(asta)
    points += 5
    points_display.textContent = points
    spawnAsta()
}

//The function takes a asta div element as argument, and removes it from its parent container  
function timeoutAsta(asta){
    if(game_container.contains(asta)){
        game_container.removeChild(asta)
        points -= 2
        points_display.textContent = points
        spawnAsta()
    }
}

//setInterval is a javascript function that runs a function every X milliseconds 
//in this case we use the function to make new image elements and put them inside the game_container
function spawnAsta(){
    //vi laver et img element i variablen new_asta
    var new_asta = document.createElement('img')
    var top = Math.random() * 90
    var left = Math.random() * 90
    new_asta.style = `left:${left}%; top:${top}%;`
    //we add a source to the new img 
    new_asta.src = './assets/asta.png'
    //we add a classname to it so we can style it 
    new_asta.className = 'asta'
    //We put the new img element inside the game containern
    game_container.appendChild(new_asta)
    //when we click the new img element, we call the killAsta function which removes it
    new_asta.addEventListener('click', ()=>killAsta(new_asta))
    setTimeout(()=>{timeoutAsta(new_asta)}, timeout)
}

setInterval(()=>{
    time_left -= 1
    time_display.textContent = time_left
    if(time_left == 0){
        confirm(`You got ${points} points.`)
        location.reload()
    }
}, 1000)

points_display.textContent = points
time_display.textContent = time_left
spawnAsta()

