var dino = document.querySelector('.dino');
const background = document.querySelector('#background');
let isJumping = false;
let position = 0;
stopGame = false;
pontos = 0;

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
                    position -= 13;
                    dino.style.bottom = position + 'px';
                } 
            }, 20);
        } else {
            //Subindo
            position += 13;
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
        if (cactusPosition < -70) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 70 && position < 70) {
            //Game over
            clearInterval(leftInterval);
            background.removeChild(cactus);
            stopGame = true;
            dino.classList.remove("dino");
            document.querySelector(".pontuacao").style.display = 'none';  
            document.querySelector("#gameOver").style.display = 'block';  
            document.querySelector("#gameOver").innerHTML = 'Game Over </br> Pontruação: ' + pontos; 
            gameOver();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    if (stopGame == false) {
        setTimeout(createCactus, randomTime);
    }
}

function pontuacao() { 
    let pontosInterval = setInterval(() => {
        if (!stopGame) {
            pontos += 1;
        }
        document.querySelector(".pontuacao").innerHTML = "Pontuação: " + pontos;
    }, 250);
}

function reiniciar() {
    document.location.reload(true);
}

function jogar() {
    document.querySelector(".menu").style.display = 'none';
    createCactus();
    pontuacao();
}

function gameOver() {
    document.querySelector("#jogar").style.display = 'none';  
    document.querySelector("#escolherDino").style.display = 'none';  
    document.querySelector("#sobre").style.display = 'none';  
    document.querySelector("#reiniciar").style.display = 'block';  
    document.querySelector(".menu").style.display = 'block';  
    document.querySelector("#removeCactus").style.display = 'block';  
}

function escolherDino() {

}

function mostrarSobre() {
    document.querySelector("#jogar").style.display = 'none';  
    document.querySelector("#escolherDino").style.display = 'none';  
    document.querySelector("#sobre").style.display = 'none';  
    document.querySelector("#linkedIn").style.display = 'block';  
    document.querySelector("#sprites").style.display = 'block';  
    document.querySelector("#voltar").style.display = 'block';  
}

document.querySelector(".pontuacao").innerHTML = "Pontuação: 0";
document.addEventListener('keyup', handKeyUp);