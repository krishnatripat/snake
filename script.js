let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('eat.mp3');
const gameover = new Audio('gameover.wav');
const movesound = new Audio('');
const musicsound = new Audio('');
let scor = document.getElementById('score');
let high = document.getElementById('high')
let speed = 8;
let lastPaintTime = 0;
let reset=document.querySelector(".reset")
let snakearr = [
    { x: 13, y: 12 }
]
food = { x: 13, y: 14 };
let score = 00;
// scor=score;
//function
let highscore=localStorage.getItem("high-score");
if(highscore===null)
{
    localStorage.setItem("high-score",0);
}
high.innerText = localStorage.getItem("high-score");
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

reset.addEventListener("click", function(){
    localStorage.setItem("high-score",0);
    high.innerText = localStorage.getItem("high-score");
});
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakearr)) {
        gameover.play();
        movesound.pause();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakearr = [{ x: 13, y: 15 }];
        score = 00;
        scor.innerText = score;
    }
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        scor.innerText = score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        if (parseInt(high.innerText) < score) {
            localStorage.setItem("high-score",score);
            high.innerText = localStorage.getItem("high-score");    
        }
    }
    //moving snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    movesound.play();
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    conatain.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        conatain.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    conatain.appendChild(foodElement);
}


//logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    // movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});