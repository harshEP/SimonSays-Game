let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "purple"];
let started = false;
let level = 0;
let highestScore = 0; // Store the highest score

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence at the start of each level
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randombutton = document.querySelector(`.${randomColor}`);

    // Push the new random color to the game sequence
    gameSeq.push(randomColor);
    console.log("Game sequence: ", gameSeq);
    gameFlash(randombutton);
}

function checkAns() {
    let currentLevel = userSeq.length - 1;

    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        console.log("Correct input");

        // If the user has completed the sequence for the current level
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Level up after a short delay
        }
    } else {
        // Update the highest score if the current score (level) is higher
        if (level > highestScore) {
            highestScore = level;
        }
        
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. <br> Highest Score: <b>${highestScore}</b> <br> Press any key to start again.`;
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    // Check user's current sequence after each button press
    checkAns();
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

let allButtons = document.querySelectorAll(".btn");
for (let btn of allButtons) {
    btn.addEventListener("click", btnPress);
}
