const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
stopGame = false;
scoreGame = 0;

function handKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                } 
            }, 20);
        } else {
            //Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game over
            clearInterval(leftInterval);
            background.removeChild(cactus);
           // document.querySelector(".box").style.display = 'block';  
           // document.querySelector(".text").innerHTML = 'Game Over </br> Score: ' + scoreGame;      
            //stopGame = true;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime)
}

function score() { 
    let pontosInterval = setInterval(() => {
        if (!stopGame) {
            scoreGame += 1;
        }
        document.querySelector(".score").innerHTML = "Score: " + scoreGame;
    }, 100);
}

function reload() {
    document.location.reload(true);
}

score();
createCactus();
document.addEventListener('keyup', handKeyUp);