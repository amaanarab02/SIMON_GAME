// SIMON GAME

let userseq = [];
let gameseq = [];
let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on click anywhere
document.addEventListener("click", function(event){
    // Only start if game is not started AND click is NOT on a button
    if(!started && !event.target.classList.contains("btn")){
        started = true;
        levelup();
    }
});


function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(() => btn.classList.remove("gameflash"), 200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 350);
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    gameFlash(randBtn);
}
function checkseq(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length === gameseq.length){
            setTimeout(levelup, 300);
        }
    } else {
        // Show GAME OVER and score
        h2.innerHTML = `
            <span style="color: red; font-size: 1.5rem; font-weight: bold;">
                GAME OVER!
            </span>
            <br>
            <span style="color: yellow; font-size: 1.2rem;">
                Your score: ${level}
            </span>
            <br>
            <span style="font-size: 1rem; color: wheat;">
                Click anywhere to restart
            </span>
        `;
        // Flash body background
        document.querySelector("body").style.backgroundColor = "#d4ff0032";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#011F3F";
        }, 200);

        reset(); // Reset variables so game can restart
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkseq(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset(){
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
