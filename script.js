var dino = document.querySelector('.dino');
const background = document.querySelector('#background');
let isJumping = false;
let position = 0;
const gravity = 2.5;
let jumpForce = 25;
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
    position = 0;
    jumpForce = 25;

    let upInterval = setInterval(() => {
       
        position += jumpForce;
        dino.style.bottom = position + 'px';

        jumpForce -= gravity;

        if (position <= 0) {
            isJumping = false;
            clearInterval(upInterval);
        }

    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 950;
    let randomTime = Math.random() * (3000 - 750) + 750;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < 20) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 70 && position < 70) {
            //Game over
            clearInterval(leftInterval);
            background.removeChild(cactus);
            stopGame = true;
            gameOver();
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 30);

    setTimeout(createCactus, randomTime); 
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
    document.querySelector(".pontuacao").style.display = 'none';  
    document.querySelector("#gameOver").style.display = 'block';  
    document.querySelector("#gameOver").innerHTML = 'Game Over </br> Pontuação: ' + pontos; 
    document.querySelector("#jogar").style.display = 'none';  
    document.querySelector("#mostrarDinos").style.display = 'none';  
    document.querySelector("#sobre").style.display = 'none';  
    document.querySelector("#reiniciar").style.display = 'hidden';  
    document.querySelector(".menu").style.display = 'flex';  
    document.querySelector("#removeCactus").style.display = 'hidden';  
    document.querySelector("#background").style.display = 'none';  
    document.querySelector(".atualizar").style.display = 'block'; 
    document.querySelector(".animation").style.display = 'block'; 
}

function atualizar() {
    document.location.reload(true);
}

function mostrarDinos() {
    document.querySelector(".menu").style.display = 'none';  
    document.querySelector(".menu-dino").style.display = 'flex';  
    document.querySelector("#voltar-dino").style.display = 'block';  
}

function escolherDino(dino, id) {
    document.querySelector(".dino").style.background = "url('sprites/dino-" + id + ".gif')";
    document.querySelector(".dino").style.backgroundSize = "100%";  
}

function mostrarSobre() {
    removeItens();
    document.querySelector("#linkedIn").style.display = 'block';  
    document.querySelector("#gitHub").style.display = 'block';  
    document.querySelector(".voltar").style.display = 'block';  
}

function mostrarMenu() {
    removeItens();
    document.querySelector(".menu").style.display = 'flex';  
    document.querySelector("#jogar").style.display = 'block';  
    document.querySelector("#mostrarDinos").style.display = 'block';  
    document.querySelector("#sobre").style.display = 'block';  
}

function removeItens() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(element => { element.style.display = 'none'; });
    document.querySelector(".menu-dino").style.display = 'none';  
}

document.querySelector(".pontuacao").innerHTML = "Pontuação: 0";
document.addEventListener('keyup', handKeyUp);