import { crearTabla, crearTaula2 } from "./moduls/taules.js";
import { Submari, Destructor, Cuirassat, Creuer, PortaAvions } from "./moduls/classes.js";

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
// var vEnfonsatsJugador1 = [Submari1IA.enfonsat, Submari2IA.enfonsat, Destructor1IA.enfonsat, Destructor2IA.enfonsat, Cuirassat1IA.enfonsat, Creuer1IA.enfonsat, PortaAvions1IA.enfonsat];
// var vEnfonsatsIA = [Submari1.enfonsat, Submari2.enfonsat, Destructor1.enfonsat, Destructor2.enfonsat, Cuirassat1.enfonsat, Creuer1.enfonsat, PortaAvions1.enfonsat];

var pilaMovimentsJugador = new Array();
var pilaMovimentsIA = new Array();

let arrayVaixellsColocats = [];
window.onload = () => {
    // Crear taules
    crearTabla();
    crearTaula2();

    // document.getElementById('reiniciar').addEventListener('click', resetearEstructura);
    // Drag and Drop
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

    // function resetearEstructura() {
    //     var taulerVaixellsReset = `
    //         <div id="divIMG1">
    //             <img src="assets/imatges/destructor1.png" alt="Vaixell1" id="destructor1" draggable="true">
    //         </div>
    //         <div id="divIMG2">
    //             <img src="assets/imatges/creuer.png" alt="Vaixell2" id="creuer" draggable="true">
    //         </div>
    //         <div id="divIMG3">
    //             <img src="assets/imatges/cuirassat.png" alt="Vaixell3" id="cuirassat" draggable="true">
    //         </div>
    //         <div id="divIMG4">
    //             <img src="assets/imatges/portaavions.png" alt="Vaixell4" id="portaavions" draggable="true">
    //         </div>
    //         <div id="divIMG5">
    //             <img src="assets/imatges/submari1.png" alt="Vaixell5" id="submari1" draggable="true">
    //         </div>
    //         <div id="divIMG6">
    //             <img src="assets/imatges/submari2.png" alt="Vaixell6" id="submari2" draggable="true">
    //         </div>
    //         <div id="divIMG7">
    //             <img src="assets/imatges/destructor2.png" alt="Vaixell7" id="destructor2" draggable="true">
    //         </div>`;
    //     var taulerVaixellsReset = document.getElementById('vtaula1').innerHTML;
    //     // Elimina el destructor1 si existe
    //     if(document.getElementById("destructor1")){
    //         document.getElementById("destructor1").remove();
    //     }
    //     if(document.getElementById("creuer")){
    //         document.getElementById("creuer").remove();
    //     }
    //     if(document.getElementById("cuirassat")){
    //         document.getElementById("cuirassat").remove();
    //     }
    //     if(document.getElementById("portaavions")){
    //         document.getElementById("portaavions").remove();
    //     }
    //     if(document.getElementById("submari1")){
    //         document.getElementById("submari1").remove();
    //     }
    //     if(document.getElementById("submari2")){
    //         document.getElementById("submari2").remove();
    //     }
    //     if(document.getElementById("destructor2")){
    //         document.getElementById("destructor2").remove();
    //     }

    //     // Restaura la estructura inicial
    //     document.getElementById('vtaula1').innerHTML = taulerVaixellsReset;

    //     // Reinicia las variables de vaixells

    //     // Submari1 = null;
    //     // Submari1 = new Submari();
    //     // Submari2 = null;
    //     // Submari2 = new Submari();
    //     // Destructor1 = null;
    //     // Destructor1 = new Destructor();
    //     // Destructor1._orientacio = "horizontal";
    //     // Destructor2 = null;
    //     // Destructor2 = new Destructor();
    //     // Destructor2._orientacio = "vertical";
    //     // Cuirassat1 = null
    //     // Cuirassat1 = new Cuirassat();
    //     // Creuer1 = null;

    //     // Creuer1 = new Creuer();
    //     // PortaAvions1 = null;
    //     // PortaAvions1 = new PortaAvions();

    //     // Reinicia otras variables según sea necesario

    //     // Reinicia el mapa

    //     for (var X = 1; X < 11; X++) {
    //         for (var Y = 1; Y < 11; Y++) {
    //             var key = String.fromCharCode(64 + X) + Y;
    //             map.set(key, 0);
    //         }
    //     }
    //     var imatges = document.querySelectorAll('img');
    //     [].forEach.call(imatges, function (item) {
    //         item.addEventListener('dragstart', gestionarIniciDrag, false);
    //     });

    // }

    function gestionarDrop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("imatge");
        console.log("ID imagen: " + data);
        // Només arrosegar a la taula1 amb caselles = 0
        if (ev.target.parentNode.parentNode.id === "taula1" && map.get(ev.target.id) === 0 && comprovarPosicioDisponible(ev.target.id, data, ev)) {
            // console log id del input al cual hemos arrastrado la imagen
            console.log("ID Input Inicial: " + ev.target.id);

            ev.target.appendChild(document.getElementById(data));

            document.getElementById(data).draggable = false;

            // Casella ocupada dins del map
            var pos = [];
            pos[0] = ev.target.id;

            switch (data) {
                case "destructor1":
                    // posicion nueva
                    Destructor1.posicio[0] = ev.target.id;
                    // espacio ocupado por el barco (de la imagen)
                    document.getElementById(data).style.width = Destructor1.espaiOcupat();
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoHorizontal");

                    //ocupar espacio en map
                    Destructor1.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    // despues de mover la imagen quitamos los elementos del div
                    var divIMG1 = document.getElementById("divIMG1");
                    while (divIMG1.firstChild) {
                        divIMG1.removeChild(divIMG1.firstChild);
                    }

                    const imgV1Oculta = document.createElement("img");
                    Object.assign(imgV1Oculta, {
                        src: "assets/imatges/destructor1.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG1").appendChild(imgV1Oculta);

                    console.log(Destructor1.posicio);
                    break;
                case "creuer":
                    Creuer1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Creuer1.espaiOcupat();
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoHorizontal");

                    Creuer1.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG2 = document.getElementById("divIMG2");
                    while (divIMG2.firstChild) {
                        divIMG2.removeChild(divIMG2.firstChild);
                    }
                    const imgV2Oculta = document.createElement("img");
                    Object.assign(imgV2Oculta, {
                        src: "assets/imatges/creuer.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG2").appendChild(imgV2Oculta);
                    break;
                case "cuirassat":
                    Cuirassat1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = Cuirassat1.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");

                    Cuirassat1.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG3 = document.getElementById("divIMG3");
                    while (divIMG3.firstChild) {
                        divIMG3.removeChild(divIMG3.firstChild);
                    }
                    const imgV3Oculta = document.createElement("img");
                    Object.assign(imgV3Oculta, {
                        src: "assets/imatges/cuirassat.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG3").appendChild(imgV3Oculta);
                    console.log(Cuirassat1.posicio);
                    break;
                case "portaavions":
                    PortaAvions1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = PortaAvions1.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");

                    PortaAvions1.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG4 = document.getElementById("divIMG4");
                    while (divIMG4.firstChild) {
                        divIMG4.removeChild(divIMG4.firstChild);
                    }
                    const imgV4Oculta = document.createElement("img");
                    Object.assign(imgV4Oculta, {
                        src: "assets/imatges/portaavions.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG4").appendChild(imgV4Oculta);
                    break;
                case "submari1":
                    Submari1.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Submari1.espaiOcupat();
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoHorizontal");

                    Submari1.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG5 = document.getElementById("divIMG5");
                    while (divIMG5.firstChild) {
                        divIMG5.removeChild(divIMG5.firstChild);
                    }
                    const imgV5Oculta = document.createElement("img");
                    Object.assign(imgV5Oculta, {
                        src: "assets/imatges/submari1.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG5").appendChild(imgV5Oculta);
                    break;
                case "submari2":
                    Submari2.posicio[0] = ev.target.id;
                    document.getElementById(data).style.width = Submari2.espaiOcupat();
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoHorizontal");

                    Submari2.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG6 = document.getElementById("divIMG6");
                    while (divIMG6.firstChild) {
                        divIMG6.removeChild(divIMG6.firstChild);
                    }
                    const imgV6Oculta = document.createElement("img");
                    imgV6Oculta.src = "assets/imatges/submari2.png";
                    Object.assign(imgV6Oculta, {
                        src: "assets/imatges/submari2.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG6").appendChild(imgV6Oculta);
                    break;
                case "destructor2":
                    Destructor2.posicio[0] = ev.target.id;
                    document.getElementById(data).style.height = Destructor2.espaiOcupat();
                    document.getElementById(data).style.width = "90%";
                    document.getElementById(data).parentNode.classList.add("tdPadre");
                    document.getElementById(data).classList.add("elementoVertical");

                    Destructor2.ocuparPosicio(pos, map, arrayVaixellsColocats);
                    var divIMG7 = document.getElementById("divIMG7");
                    while (divIMG7.firstChild) {
                        divIMG7.removeChild(divIMG7.firstChild);
                    }
                    const imgV7Oculta = document.createElement("img");
                    Object.assign(imgV7Oculta, {
                        src: "assets/imatges/destructor2.png",
                        classList: "fons",
                        draggable: false
                    });
                    document.getElementById("divIMG7").appendChild(imgV7Oculta);
                    break;
                default:
                    break;
            }

            // Detector de tots el vaixells colocats (activar botó començar)
            let vaixellsColocats = document.querySelectorAll('[class="fons"]');
            if (vaixellsColocats.length == 7) {
                document.getElementById("info").style.display = "block";
                document.getElementById("començar").style.display = "flex";
            }
        } else {
            console.log("No se puede colocar el barco en esta posición");
        }

    }

    // Funció que comença el joc
    var vEnfonsatsJugador1 = [];
    var vEnfonsatsIA = [];

    var contadorJug1 = 0;
    var contadorIA = 0;

    let turno = 1;
    // Set de eleccions de la IA
    var setEleccionsIA = new Set();
    const audioImp = document.getElementById("audioImp");
    const audioAgua = document.getElementById("audioAgua");

    // Funció que inicia el joc
    var jugar = () => {
        // console.log("JUGAR" + vEnfonsatsJugador1);
        var taulaClicable = document.getElementById("divTaula2");
        taulaClicable.addEventListener("click", (evento) => {
            if (evento.target.tagName !== 'TD') {
                return;
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

                if (posicion == "A0" || posicion == "B0" || posicion == "C0" || posicion == "D0" || posicion == "E0" || posicion == "F0" || posicion == "G0" || posicion == "H0" || posicion == "I0" || posicion == "J0" || posicion == "K0" || posicion == "@0" || posicion == "@1" || posicion == "@2" || posicion == "@3" || posicion == "@4" || posicion == "@5" || posicion == "@6" || posicion == "@7" || posicion == "@8" || posicion == "@9" || posicion == "@10") {
                    // que no cuenta el ultimo movimiento
                    pilaMovimentsJugador.pop();
                }
                else {
                    document.getElementById("ultimMovimentJug").innerHTML = pilaMovimentsJugador.shift();
                }

                if (fila == 0 || columna == 0) {
                    console.log(`La posición ${posicion} está fuera de los límites de la tabla`);
                    return false;
                }

                if (turno === 1) {
                    const valor = mapIA.get(posicion);

                    if (valor === 1) {

                        for (let indexVaixell in vEnfonsatsPerJugador) {
                            let vaixell = vEnfonsatsPerJugador[indexVaixell];
                            let posicionArray = vaixell.posicio;
                            for (let i = 0; i < posicionArray.length; i++) {
                                if (posicionArray[i] === posicion) {
                                    // API AUDIO
                                    // const audioImp = document.getElementById("audioImp");
                                    audioImp.play();

                                    // console.log(`La posición ${posicion} ya está ocupada por un barco`);

                                    var explosionElement =  document.createElement("div"); 
                                    explosionElement.classList.add("explosion");
                                    celda.classList.add("clicked");
                                    celda.appendChild(explosionElement);

                                    // console.log(`El barco ${indexVaixell} tiene la posición ${casellaID} en su array de posiciones.`);
                                    vaixell.eliminarVida(posicion, jugador);
                                    vEnfonsatsJugador1 = [Submari1IA.enfonsat, Submari2IA.enfonsat, Destructor1IA.enfonsat, Destructor2IA.enfonsat, Cuirassat1IA.enfonsat, Creuer1IA.enfonsat, PortaAvions1IA.enfonsat];
                                    contadorJug1 = vEnfonsatsJugador1.filter(value => value == true).length;
                                    // console.log(contadorJug1);

                                    if (contadorJug1 == 7) {
                                        alert("¡ENHORABONA, has guanyat a la màquina!");
                                        cambio = false;
                                    }

                                }
                            }
                        }
                    } else {
                        // API AUDIO
                        audioAgua.play();
                        // console.log(`La posición ${posicion} está libre`);
                        // celda.style.backgroundColor = "blue";
                        var aguaElement =  document.createElement("div");
                        aguaElement.classList.add("agua");
                        celda.classList.add("clicked");
                        celda.appendChild(aguaElement);

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
        });
    }
    // Funció de generació de posicions random de la IA
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
            // API AUDIO

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

                        var explosionElement = document.createElement("div");
                        explosionElement.classList.add("explosion");

                        tdAleatori.appendChild(explosionElement);

                        // console.log(`El barco ${indexVaixell} tiene la posición ${casellaID} en su array de posiciones.`);
                        vaixell.eliminarVida(casellaID, maquina);

                        if (contadorIA == 7) {
                            alert("Has perdut... La IA s'ha emportat la victoria");
                            cambio = false;
                        }

                        vEnfonsatsIA = [Submari1.enfonsat, Submari2.enfonsat, Destructor1.enfonsat, Destructor2.enfonsat, Cuirassat1.enfonsat, Creuer1.enfonsat, PortaAvions1.enfonsat];
                        contadorIA = vEnfonsatsIA.filter(value => value == true).length;

                    }
                }
            }
            setTimeout(function () {
                clicAleatorio();
            }, 1000);
        } else {
            // API AUDIO
            const audioAgua = document.getElementById("audioAgua");
            audioAgua.play();
            // console.log(`IA: La posición ${casellaID} está libre`);
            var aguaElement =  document.createElement("div");
            aguaElement.classList.add("agua");
            tdAleatori.appendChild(aguaElement);

            tabla.classList.add("disabled");
            turno = 1;
            const tablaTurno = document.getElementById(`divTaula${turno}`);
            tablaTurno.classList.remove("disabled");
        }
    }

    jugar();
}

// Funció per comprovar si podem colocar un vaixell a la determinada casella
// Retorna true si es pot
// Retorna false si no permet colocar el vaixell
function comprovarPosicioDisponible(posicioInicial, idVaixell, ev) {

    let vaixells = {
        "destructor1": {
            vaixell: Destructor1,
        },
        "creuer": {
            vaixell: Creuer1,
        },
        "cuirassat": {
            vaixell: Cuirassat1,
        },
        "portaavions": {
            vaixell: PortaAvions1,
        },
        "submari1": {
            vaixell: Submari1,
        },
        "submari2": {
            vaixell: Submari2,
        },
        "destructor2": {
            vaixell: Destructor2,
        }
    };

    let vaixellSeleccionat = vaixells[idVaixell];

    for (let i = 0; i < vaixellSeleccionat.vaixell.longitud; i++) {
        let pos2 = "";
        let fila = parseInt(posicioInicial.substring(1)) + i;
        let columna = posicioInicial.charCodeAt(0) - 'A'.charCodeAt(0) + i + 1;

        let filaString = fila < 10 ? fila : fila.toString();

        if (vaixellSeleccionat.vaixell.orientacio === "horizontal") {
            pos2 = posicioInicial.charAt(0) + filaString;
            if (fila > 10) {
                return false;
            }
        } else if (vaixellSeleccionat.vaixell.orientacio === "vertical") {
            pos2 = String.fromCharCode(posicioInicial.charCodeAt(0) + i) + posicioInicial.substring(1);
            if (columna > 10) {
                return false;
            }
        }
        if (map.get(pos2) === 1 || map.get(pos2) === 2) {
            return false;
        }
    }

    return true;
}

// Funció previa a començar a jugar
var començarJoc = () => {
    // Ocultar el menú/boto i dades de la partida
    document.getElementById("vaixells").style.display = "none";
    document.getElementById("començar").style.display = "none";
    document.getElementById("puntuacions").style.display = "flex";
    document.getElementById("ultimsMoviments").style.display = "flex";

    const imgs = document.querySelectorAll('img');
    imgs.forEach(imagen => {
        imagen.draggable = false;
    });

    // Localstorage per guardar el mapa del jugador
    localStorage.clear();
    localStorage.setItem("mapJugador", JSON.stringify([...map]));
    taulerIA();

    cambio = true;
}

document.getElementById("començar").addEventListener("click", començarJoc);

// Funció que crea el posicionament dels vaixells de la IA
// El map ocupa la variable mapIA
var taulerIA = () => {
    // Funció dinamica per generar numeros aleatoris
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

                for (let i = X - 1; i < X + altura + 1; i++) {
                    for (let j = Y - 1; j < Y + amplada + 1; j++) {
                        const key = String.fromCharCode(64 + i) + j;
                        if (mapIA.get(key) === 1) {
                            free = false;
                            break;
                        }
                    }
                    if (!free) {
                        break;
                    }
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


let index = 0;

