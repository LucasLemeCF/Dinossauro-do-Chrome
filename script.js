const dino = document.querySelector('.dino');

function handKeyUp(event) {
    if (event.keyCode === 32) {
        console.log("funcionou");
    }
}

document.addEventListener('keyup', handKeyUp);