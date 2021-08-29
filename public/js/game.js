let x = document.querySelector(".user-tool");

// box dan header info
let vs = document.getElementById("versus");
let box = document.getElementById('box');


function resultObject() {
    box.classList.add('winBox'),
        vs.setAttribute("style", "font-size:36px; color:white;");

}
// show box kalah ato menang
function win() {
    console.log("Player 1 Win");
    resultObject();
    vs.innerText = "Player 1 WIN"

}

function lose() {
    console.log("COM WIN");
    resultObject();
    vs.innerText = "COM WIN"
}

function draw() {
    console.log("Draw");
    resultObject();
    vs.innerText = "Draw"
}


// ini kom
let comBatu = document.getElementById('comBatu');
let comKertas = document.getElementById('comKertas');
let comGunting = document.getElementById('comGunting');

function comAcak() {
    let pilih = ['Batu', 'Gunting', 'Kertas'];
    let pilihAcak = Math.floor(Math.random() * 3);
    return pilih[pilihAcak];

}

// disini di suit nya
function suitDisini(player) {

    const com = comAcak();
    console.log("Player Memilih => " + player);
    console.log("Com Memilih => " + com);

    if (player == com) {
        draw();
    } else if (player == 'Batu' && com == 'Gunting') {
        win();
    } else if (player == 'Gunting' && com == 'Kertas') {
        win();
    } else if (player == 'Kertas' && com == 'Batu') {
        win();
    } else {
        lose();
    }

    switch (com) {
        case "Batu":
            comBatu.classList.add('pilih');
            break;
        case "Gunting":
            comGunting.classList.add('pilih');
            break;
        case "Kertas":
            comKertas.classList.add('pilih');
    }
}


let addElement = [...document.getElementsByClassName("clear")];

function play() {
    let playerBatu = document.getElementById('playerBatu');
    playerBatu.addEventListener('click', function() {
        this.classList.add('pilih');
        suitDisini("Batu");
        addElement.forEach(removeCursor => {
            removeCursor.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })

    })


    let playerKertas = document.getElementById('playerKertas');
    playerKertas.addEventListener('click', function() {
        this.classList.add('pilih');
        suitDisini("Kertas");
        addElement.forEach(removeCursor => {
            removeCursor.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })
    })

    let playerGunting = document.getElementById('playerGunting');
    playerGunting.addEventListener('click', function() {
        this.classList.add('pilih');
        suitDisini("Gunting");
        addElement.forEach(removeCursor => {
            removeCursor.setAttribute("style", "cursor: not-allowed;pointer-events: none;");
        })
    })


}

play();



// Refresh
let refresh = document.getElementById("refresh");
let button = document.querySelector('button');
refresh.addEventListener('click', function() {
    //window.location.reload();

    addElement.forEach(removeCursor => {
        removeCursor.classList.remove('pilih')
    });
    addElement.forEach(removeCursor => {
        removeCursor.removeAttribute("style", "cursor: not-allowed;pointer-events: none;")

    })
    box.classList.remove('winBox');
    box.classList.remove('drawBox');
    vs.removeAttribute("style", "color: ''; font-size:'' ")

    vs.style.marginTop = null
    vs.style.fontSize = null
    vs.innerText = "VS"
    button.disabled = false;
})