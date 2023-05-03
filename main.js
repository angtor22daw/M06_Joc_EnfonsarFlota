import { crearTabla, crearTaula2 } from "./taules.js";
import { Submari, Destructor, Cuirassat, Creuer, PortaAvions } from "./classes.js";

var cambio = false;
var map = new Map();

for (var X = 1; X < 11; X++) {
    for (var Y = 1; Y < 11; Y++) {
        var key = String.fromCharCode(64 + X) + Y;
        map.set(key, 0);
    }
}
// console.log([...map]);

// Instanciar mapIA
var mapIA = new Map();

function Jugador(nombre) {
    this.nombre = nombre;
    this.puntuacion = 0;
}

Jugador.prototype.incrementarPuntuacio = function () {
    this.puntuacion++;
};

var jugador = new Jugador("jugador");
var maquina = new Jugador("maquina");

var vEnfonsatsIA = {};
// Instanciar vaixells de la IA
var Submari1IA = new Submari();
var Submari2IA = new Submari();
var Destructor1IA = new Destructor();
Destructor1IA._orientacio = "horizontal";
var Destructor2IA = new Destructor();
Destructor2IA._orientacio = "vertical";
var Cuirassat1IA = new Cuirassat();
var Creuer1IA = new Creuer();
var PortaAvions1IA = new PortaAvions();

// Instanciar vaixells del jugador
var Submari1 = new Submari();
var Submari2 = new Submari();

var Destructor1 = new Destructor();
Destructor1._orientacio = "horizontal";
var Destructor2 = new Destructor();
Destructor2._orientacio = "vertical";

var Cuirassat1 = new Cuirassat();
var Creuer1 = new Creuer();
var PortaAvions1 = new PortaAvions();


// Array de vaixells per generar posicions aleatories
var vaixellsIA = [
    { vaixell: Submari1IA, altura: 1, amplada: 1 },
    { vaixell: Submari2IA, altura: 1, amplada: 1 },
    { vaixell: Destructor1IA, altura: 1, amplada: 2 },
    { vaixell: Destructor2IA, altura: 2, amplada: 1 },
    { vaixell: Creuer1IA, altura: 1, amplada: 3 },
    { vaixell: Cuirassat1IA, altura: 4, amplada: 1 },
    { vaixell: PortaAvions1IA, altura: 5, amplada: 1 },
];

// Array comptador de vaixells enfonsats
var vEnfonsatsJugador1 = [Submari1IA.enfonsat, Submari2IA.enfonsat, Destructor1IA.enfonsat, Destructor2IA.enfonsat, Cuirassat1IA.enfonsat, Creuer1IA.enfonsat, PortaAvions1IA.enfonsat];
var vEnfonsatsIA = [Submari1.enfonsat, Submari2.enfonsat, Destructor1.enfonsat, Destructor2.enfonsat, Cuirassat1.enfonsat, Creuer1.enfonsat, PortaAvions1.enfonsat];

var pilaMovimentsJugador = new Array();
var pilaMovimentsIA = new Array();

let titolJug = document.getElementById("titolJug").textContent.replace(/(^|\s)[a-z]/g, function(letra) {
    return letra.toUpperCase();
  });
  
let titolMaq = document.getElementById("titolMaq").textContent.replace(/(^|\s)[a-z]/g, function(letra) {
    return letra.toUpperCase();
  });

document.getElementById("titolJug").textContent = titolJug;
document.getElementById("titolMaq").textContent = titolMaq;

window.onload = () => {
    crearTabla();
    crearTaula2();

    var tds = document.querySelectorAll('td');
    [].forEach.call(tds, function (item) {
        item.addEventListener('dragover', gestionarSobreDrag, false);
        item.addEventListener('drop', gestionarDrop, false);

    });

    var imatges = document.querySelectorAll('img');
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
    });

    function gestionarSobreDrag(ev) {
        ev.preventDefault();
        if (ev.target.parentNode.parentNode.id === "taula2") {
            ev.dataTransfer.dropEffect = "none";
        }
    }

    function gestionarIniciDrag(ev) {
        ev.dataTransfer.setData("imatge", ev.target.id);
    }

    function gestionarDrop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("imatge");
        // console.log("ID imagen: " + data);
        // if que detecta que solo puedas arrastrar a la tabla 1 y que no permita a posiciones ocupadas del map
        if (ev.target.parentNode.parentNode.id === "taula1" && map.get(ev.target.id) === 0) {
            // console log id del input al cual hemos arrastrado la imagen
            console.log("ID Input Inicial: " + ev.target.id);

            ev.target.appendChild(document.getElementById(data));

            switch (data) {
                case "v1":
                    Destructor1.resetPosicio(map);
                    // posicion nueva
                    Destructor1.posicio[0] = ev.target.id;
                    // espacio ocupado por el barco (de la imagen)
                    document.getElementById(data).style.width = Destructor1.espaiOcupat();
                    // espacio ocupado en map
                    var pos = [];
                    pos[0] = ev.target.id;
                    //ocupar espacio en map
                    Destructor1.ocuparPosicio(pos, map);
                    // despues de mover la imagen quitamos los elementos del div
                    var divIMG1 = document.getElementById("divIMG1");
                    while (divIMG1.firstChild) {
                        divIMG1.removeChild(divIMG1.firstChild);
                    }
                    const imgV1Oculta = document.createElement("img");
                    imgV1Oculta.src = "imatges/prueba2.png";
                    imgV1Oculta.id = "fondo";
                    imgV1Oculta.style.width = "100%";
                    imgV1Oculta.draggable = false;
                    imgV1Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG1").appendChild(imgV1Oculta);
                    // console log de destructor1.posicio
                    console.log(Destructor1.posicio);
                    break;
                case "v2":
                    Creuer1.resetPosicio(map);
                    Creuer1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Creuer1.espaiOcupat();
                    var pos = [];
                    pos[0] = ev.target.id;
                    Creuer1.ocuparPosicio(pos, map);
                    var divIMG2 = document.getElementById("divIMG2");
                    while (divIMG2.firstChild) {
                        divIMG2.removeChild(divIMG2.firstChild);
                    }
                    const imgV2Oculta = document.createElement("img");
                    imgV2Oculta.src = "imatges/creuer.png";
                    imgV2Oculta.id = "fondo";
                    imgV2Oculta.style.width = "100%";
                    imgV2Oculta.draggable = false;
                    imgV2Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG2").appendChild(imgV2Oculta);
                    break;
                case "v3":
                    Cuirassat1.resetPosicio(map);
                    Cuirassat1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = Cuirassat1.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");
                    var pos = [];
                    pos[0] = ev.target.id;
                    Cuirassat1.ocuparPosicio(pos, map);
                    var divIMG3 = document.getElementById("divIMG3");
                    while (divIMG3.firstChild) {
                        divIMG3.removeChild(divIMG3.firstChild);
                    }
                    const imgV3Oculta = document.createElement("img");
                    imgV3Oculta.src = "imatges/cuirassat.png";
                    imgV3Oculta.id = "fondo";
                    imgV3Oculta.style.width = "100%";
                    imgV3Oculta.draggable = false;
                    imgV3Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG3").appendChild(imgV3Oculta);
                    break;
                case "v4":
                    PortaAvions1.resetPosicio(map);
                    PortaAvions1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = PortaAvions1.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");
                    var pos = [];
                    pos[0] = ev.target.id;
                    PortaAvions1.ocuparPosicio(pos, map);
                    var divIMG4 = document.getElementById("divIMG4");
                    while (divIMG4.firstChild) {
                        divIMG4.removeChild(divIMG4.firstChild);
                    }
                    const imgV4Oculta = document.createElement("img");
                    imgV4Oculta.src = "imatges/portaavions.png";
                    imgV4Oculta.id = "fondo";
                    imgV4Oculta.style.width = "100%";
                    imgV4Oculta.draggable = false;
                    imgV4Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG4").appendChild(imgV4Oculta);
                    break;
                case "v5":
                    Submari1.resetPosicio(map);
                    Submari1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Submari1.espaiOcupat();
                    var pos = [];
                    pos[0] = ev.target.id;
                    Submari1.ocuparPosicio(pos, map);
                    var divIMG5 = document.getElementById("divIMG5");
                    while (divIMG5.firstChild) {
                        divIMG5.removeChild(divIMG5.firstChild);
                    }
                    const imgV5Oculta = document.createElement("img");
                    imgV5Oculta.src = "imatges/submari1.png";
                    imgV5Oculta.id = "fondo";
                    imgV5Oculta.style.width = "100%";
                    imgV5Oculta.draggable = false;
                    imgV5Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG5").appendChild(imgV5Oculta);
                    break;
                case "v6":
                    Submari2.resetPosicio(map);
                    Submari2.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Submari2.espaiOcupat();
                    var pos = [];
                    pos[0] = ev.target.id;
                    Submari2.ocuparPosicio(pos, map);
                    var divIMG6 = document.getElementById("divIMG6");
                    while (divIMG6.firstChild) {
                        divIMG6.removeChild(divIMG6.firstChild);
                    }
                    const imgV6Oculta = document.createElement("img");
                    imgV6Oculta.src = "imatges/submari2.png";
                    imgV6Oculta.id = "fondo";
                    imgV6Oculta.style.width = "100%";
                    imgV6Oculta.draggable = false;
                    imgV6Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG6").appendChild(imgV6Oculta);
                    break;
                case "v7":
                    Destructor2.resetPosicio(map);
                    Destructor2.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = Destructor2.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");
                    var pos = [];
                    pos[0] = ev.target.id;
                    Destructor2.ocuparPosicio(pos, map);
                    var divIMG7 = document.getElementById("divIMG7");
                    while (divIMG7.firstChild) {
                        divIMG7.removeChild(divIMG7.firstChild);
                    }
                    const imgV7Oculta = document.createElement("img");
                    imgV7Oculta.src = "imatges/destructor2.png";
                    imgV7Oculta.id = "fondo";
                    imgV7Oculta.style.width = "100%";
                    imgV7Oculta.draggable = false;
                    imgV7Oculta.style.opacity = "0.5";
                    document.getElementById("divIMG7").appendChild(imgV7Oculta);
                    break;
                default:
                    break;
            }
            // }
            let vaixellsColocats = document.querySelectorAll('[id="fondo"]');
            if (vaixellsColocats.length == 7) {
                document.getElementById("info").style.display = "block";
                document.getElementById("començar").style.display = "flex";
                // document.getElementById("puntuacions").style.display = "flex";
                // document.getElementById("ultimsMoviments").style.display = "flex";
            }
        } else {
            console.log("No se puede colocar el barco en esta posición");
        }

    }

    jugar();
}

let turno = 1;

var setEleccionsIA = new Set();

var clicAleatorio = () => {
    var vEnfonsatsPerIA = {
        vaix1: Submari1,
        vaix2: Submari2,
        vaix3: Destructor1,
        vaix4: Destructor2,
        vaix5: Cuirassat1,
        vaix6: Creuer1,
        vaix7: PortaAvions1,
    };

    let tabla = document.getElementById("divTaula1");

    if (tabla.classList.contains("disabled")) {
        return;
    }

    let casellaTD = tabla.getElementsByTagName("td");
    let tdAleatori;
    let fila;
    let columna;
    do {
        tdAleatori = casellaTD[Math.floor(Math.random() * casellaTD.length)];
        fila = tdAleatori.parentNode.rowIndex;

        columna = tdAleatori.cellIndex;

        if (fila == 0 || columna == 0 || setEleccionsIA.has(tdAleatori.id)) {
            tdAleatori = null;
        }
    } while (!tdAleatori);

    setEleccionsIA.add(tdAleatori.id);
    localStorage.setItem("setEleccionsIA", JSON.stringify([...setEleccionsIA]));
    pilaMovimentsIA.push(tdAleatori.id);
    document.getElementById("ultimMovimentIA").innerHTML = pilaMovimentsIA.pop();

    const casellaID = String.fromCharCode(64 + fila) + columna;

    const valor = map.get(casellaID);

    if (valor === 1) {
        const audioImp = document.getElementById("audioImp");
        audioImp.currentTime = 0;
        audioImp.play();
        // console.log(`IA: La posición ${casellaID} ya está ocupada por un barco`);
        tdAleatori.style.backgroundColor = "red";
        tdAleatori.classList.add("clicked");

        // console.log(vEnfonsatsPerIA);
        for (let indexVaixell in vEnfonsatsPerIA) {
            let vaixell = vEnfonsatsPerIA[indexVaixell];
            let posicionArray = vaixell.posicio;
            for (let i = 0; i < posicionArray.length; i++) {
                if (posicionArray[i] === casellaID) {
                    // console.log(`El barco ${indexVaixell} tiene la posición ${casellaID} en su array de posiciones.`);
                    vaixell.eliminarVida(casellaID, maquina);
                }
            }
        }
        setTimeout(function () {
            clicAleatorio();
        }, 1000);
    } else {
        const audioAgua = document.getElementById("audioAgua");
        audioAgua.play();
        // console.log(`IA: La posición ${casellaID} está libre`);
        tdAleatori.style.backgroundColor = "blue";
        tdAleatori.classList.add("clicked");
        tabla.classList.add("disabled");
        turno = 1;
        const tablaTurno = document.getElementById(`divTaula${turno}`);
        tablaTurno.classList.remove("disabled");
    }
}

var jugar = () => {
    var taulaClicable = document.getElementById("divTaula2");
        taulaClicable.addEventListener("click", (evento) => {
            if (cambio) {
                var vEnfonsatsJugador1 = [Submari1IA.enfonsat, Submari2IA.enfonsat, Destructor1IA.enfonsat, Destructor2IA.enfonsat, Cuirassat1IA.enfonsat, Creuer1IA.enfonsat, PortaAvions1IA.enfonsat];
                var vEnfonsatsIA = [Submari1.enfonsat, Submari2.enfonsat, Destructor1.enfonsat, Destructor2.enfonsat, Cuirassat1.enfonsat, Creuer1.enfonsat, PortaAvions1.enfonsat];

                var contadorJug1 = vEnfonsatsJugador1.filter(value => value == true).length;
                var contadorIA = vEnfonsatsIA.filter(value => value == true).length;

                if (contadorJug1 == 7) {
                    alert("¡ENHORABONA, has guanyat a la màquina!");
                    cambio = false;
                } else if (contadorIA == 7) {
                    alert("Has perdut... La IA s'ha emportat la victoria");
                    cambio = false;
                }
                if (cambio) {
                    var vEnfonsatsPerJugador = {
                        vaix1: Submari1IA,
                        vaix2: Submari2IA,
                        vaix3: Destructor1IA,
                        vaix4: Destructor2IA,
                        vaix5: Cuirassat1IA,
                        vaix6: Creuer1IA,
                        vaix7: PortaAvions1IA,
                    };

                    if (taulaClicable.classList.contains("disabled")) {
                        return;
                    }

                    const celda = evento.target;
                    if (celda.classList.contains("clicked")) {
                        return;
                    }

                    const fila = celda.parentNode.rowIndex;
                    const columna = celda.cellIndex;
                    const posicion = String.fromCharCode(64 + fila) + columna;

                    pilaMovimentsJugador.push(posicion);
                    document.getElementById("ultimMovimentJug").innerHTML = pilaMovimentsJugador.shift();

                    if (fila == 0 || columna == 0) {
                        console.log(`La posición ${posicion} está fuera de los límites de la tabla`);
                        return false;
                    }

                    if (turno === 1) {
                        const valor = mapIA.get(posicion);

                        if (valor === 1) {
                            const audioImp = document.getElementById("audioImp");
                            audioImp.play();

                            // console.log(`La posición ${posicion} ya está ocupada por un barco`);
                            celda.style.backgroundColor = "red";
                            celda.classList.add("clicked");

                            for (let indexVaixell in vEnfonsatsPerJugador) {
                                let vaixell = vEnfonsatsPerJugador[indexVaixell];
                                let posicionArray = vaixell.posicio;
                                for (let i = 0; i < posicionArray.length; i++) {
                                    if (posicionArray[i] === posicion) {
                                        // console.log(`El barco ${indexVaixell} tiene la posición ${casellaID} en su array de posiciones.`);
                                        vaixell.eliminarVida(posicion, jugador);
                                    }
                                }
                            }
                        } else {
                            const audioAgua = document.getElementById("audioAgua");
                            audioAgua.play();
                            // console.log(`La posición ${posicion} está libre`);
                            celda.style.backgroundColor = "blue";
                            celda.classList.add("clicked");
                            taulaClicable.classList.add("disabled");
                            turno = 2;
                            const tablaTurno = document.getElementById(`divTaula${turno}`);
                            tablaTurno.classList.remove("disabled");
                            setTimeout(function () {
                                clicAleatorio();
                            }, 1000);
                        }
                    }
                }
            }
        });
}

var començarJoc = () => {
    document.getElementById("vaixells").style.display = "none";
    document.getElementById("començar").style.display = "none";
    document.getElementById("puntuacions").style.display = "flex";
    document.getElementById("ultimsMoviments").style.display = "flex";

    localStorage.clear();
    localStorage.setItem("mapJugador", JSON.stringify([...map]));
    taulerIA();

    cambio = true;

}

document.getElementById("començar").addEventListener("click", començarJoc);


var taulerIA = () => {

    var numAleatori = new Function('min', 'max', 'return Math.floor(Math.random() * (max - min + 1)) + min;');


    for (const { vaixell, altura, amplada } of vaixellsIA) {
        let ocupado = false;
        while (!ocupado) {
            // Generamos una posición aleatoria
            const X = numAleatori(1, 11 - altura);
            const Y = numAleatori(1, 11 - amplada);

            // Comprobamos si la posición está libre
            let free = true;
            const pos = [];
            for (let i = X; i < X + altura; i++) {
                for (let j = Y; j < Y + amplada; j++) {
                    const key = String.fromCharCode(64 + i) + j;
                    if (mapIA.get(key) === 1) {
                        free = false;
                        break;
                    }
                    pos.push(key);
                }
                if (!free) {
                    break;
                }
            }

            // ocupamos la posicion en el map
            if (free) {
                vaixell.ocuparPosicio(pos, mapIA);
                ocupado = true;
            }
        }
        console.log(`Posiciones ocupadas por ${vaixell.constructor.name}: ${vaixell.posicio.join(", ")}}`);
    }
}