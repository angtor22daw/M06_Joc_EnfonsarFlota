var map = new Map();

for (var X = 1; X < 11; X++) {
    for (var Y = 1; Y < 11; Y++) {
        var key = String.fromCharCode(64 + X) + Y;
        map.set(key, 0);
    }
}
console.log([...map]);

// Instanciar mapIA
var mapIA = map;

window.onload = () => {
    crearTabla();
    crearTaula2();


    // Instanciar vaixells
    var Submari1 = new Submari();
    var Submari2 = new Submari();

    var Destructor1 = new Destructor();
    Destructor1._orientacio = "horizontal";
    var Destructor2 = new Destructor();
    Destructor2._orientacio = "vertical";

    var Cuirassat1 = new Cuirassat();
    var Creuer1 = new Creuer();
    var PortaAvions1 = new PortaAvions();

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
        } else {
            console.log("No se puede colocar el barco en esta posición");
        }
    }
}

function crearTabla() {
    // Creamos la tabla
    var table = document.createElement("table");
    // id
    table.id = "taula1";

    // Creamos las demás filas
    for (var tdColumna = 0; tdColumna < 11; tdColumna++) {
        // si es la primera columna, la enumeramos
        var fila = document.createElement("tr");
        if (tdColumna == 0) {
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = "";
            fila.appendChild(celdaNumerica);
        } else {
            // Primera columna con letras
            var letra = String.fromCharCode(64 + tdColumna);
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = letra;
            fila.appendChild(celdaNumerica);
        }

        // Creamos las demás celdas vacías
        for (var tdFila = 1; tdFila < 11; tdFila++) {
            if (tdColumna == 0) {
                var celdaVacia = document.createElement("td");
                celdaVacia.textContent = tdFila;
                fila.appendChild(celdaVacia);

            } else {
                var celdaVacia = document.createElement("td");
                celdaVacia.id = letra + tdFila;
                // console.log("celdaVacia.id: " + celdaVacia.id);
                fila.appendChild(celdaVacia);
            }
        }

        table.appendChild(fila);
    }

    var celda = table.rows[0].cells[0];
    celda.style.visibility = "hidden";

    // Agregamos la tabla al div
    var divTabla = document.getElementById("divTaula1");
    divTabla.appendChild(table);
}

function crearTaula2() {
    // Creamos la tabla
    var table = document.createElement("table");

    // Creamos las demás filas
    for (var tdColumna = 0; tdColumna < 11; tdColumna++) {
        // si es la primera columna, la enumeramos
        var fila = document.createElement("tr");
        if (tdColumna == 0) {
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = "";
            fila.appendChild(celdaNumerica);
        } else {
            var letra = String.fromCharCode(64 + tdColumna);
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = letra;
            fila.appendChild(celdaNumerica);
        }

        // Creamos las demás celdas vacías
        for (var tdFila = 1; tdFila < 11; tdFila++) {
            if (tdColumna == 0) {
                var celdaVacia = document.createElement("td");
                celdaVacia.textContent = tdFila;
                fila.appendChild(celdaVacia);

            } else {
                var celdaVacia = document.createElement("td");
                fila.appendChild(celdaVacia);
            }
        }

        table.appendChild(fila);
    }

    var celda = table.rows[0].cells[0];
    celda.style.visibility = "hidden";

    // Agregamos la tabla al div
    var divTabla = document.getElementById("divTaula2");
    divTabla.appendChild(table);
}

function començarJoc() {
    taulerIA();

}

// console.log(createMap());

function taulerIA() {
    // Instanciar vaixells
    var Submari1IA = new Submari();
    var Submari2IA = new Submari();

    var Destructor1IA = new Destructor();
    Destructor1IA._orientacio = "horizontal";
    var Destructor2IA = new Destructor();
    Destructor2IA._orientacio = "vertical";

    var Cuirassat1IA = new Cuirassat();
    var Creuer1IA = new Creuer();
    var PortaAvions1IA = new PortaAvions();

    // Definir cuanto ocupa cada barco
    const vaixellsIA = [
        { vaixell: Submari1IA, altura: 1, amplada: 1 },
        { vaixell: Submari2IA, altura: 1, amplada: 1 },
        { vaixell: Destructor1IA, altura: 1, amplada: 2 },
        { vaixell: Destructor2IA, altura: 2, amplada: 1 },
        { vaixell: Creuer1IA, altura: 1, amplada: 3 },
        { vaixell: Cuirassat1IA, altura: 4, amplada: 1 },
        { vaixell: PortaAvions1IA, altura: 5, amplada: 1 },
    ];

    function numAleatori(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

class Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        this.nom = nom;
        this.longitud = longitud;
        this.orientacio = orientacio;
        this.posicio = [];
        this.vides = vides;
        this.enfonsat = enfonsat;
    }
    // metodo para comprobar si el barco esta hundido
    estaEnfonsat() {
        if (this.vides == 0) {
            this.enfonsat = true;
        }
    }

    estaTocat() {
        this.vides--;
    }

    espaiOcupat() {
        return this.longitud * 100 + "%";
    }
    // reset del mapa (para poder mover los barcos y que se resete la posicion)
    resetPosicio(map) {
        let posicionVieja = this.posicio;
        let espacio = this.longitud;
        let pos2 = "";
        if (posicionVieja[0] !== undefined) {
            for (let i = 0; i < espacio; i++) {
                if (this.orientacio === "horizontal") {
                    pos2 = posicionVieja[0].charAt(0) + (parseInt(posicionVieja[0].charAt(1)) + i);
                } else if (this.orientacio === "vertical") {
                    pos2 = String.fromCharCode(posicionVieja[0].charCodeAt(0) + i) + posicionVieja[0].charAt(1);
                }
                map.set(pos2, 0);
                // console.log(pos2);
            }
        }
    }

    ocuparPosicio(pos, map) {
        let espacio = this.longitud;
        let pos2 = "";
        this.posicio = [];
        for (let i = 0; i < espacio; i++) {
            if (this.orientacio === "horizontal") {
                pos2 = pos[0].charAt(0) + (parseInt(pos[0].charAt(1)) + i);
            } else if (this.orientacio === "vertical") {
                pos2 = String.fromCharCode(pos[0].charCodeAt(0) + i) + pos[0].charAt(1);
            }
            this.posicio.push(pos2);
            map.set(pos2, 1);
            // console.log(pos2);
        }
    }
}

class Submari extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Submari";
        this.longitud = 1;
        this.vides = 1;
        this.enfonsat = false;
        this.orientacio = "horizontal";
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
    get orientacio() {
        return this._orientacio;
    }
    set orientacio(orientacio) {
        this._orientacio = orientacio;
    }
}

class Destructor extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Destructor";
        this.longitud = 2;
        this.posicio = [];
        this.vides = 2;
        this.enfonsat = false;
        this.orientacio = orientacio;
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
    get orientacio() {
        return this._orientacio;
    }
    set orientacio(orientacio) {
        this._orientacio = orientacio;
    }
}

class Creuer extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Creuer";
        this.longitud = 3;
        this.posicio = [];
        this.vides = 3;
        this.enfonsat = false;
        this.orientacio = "horizontal";
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
    get orientacio() {
        return this._orientacio;
    }
    set orientacio(orientacio) {
        this._orientacio = orientacio;
    }
}

class Cuirassat extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Cuirassat";
        this.longitud = 4;
        this.posicio = [];
        this.vides = 4;
        this.enfonsat = false;
        this.orientacio = "vertical";
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
}

class PortaAvions extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "PortaAvions";
        this.longitud = 5;
        this.posicio = [];
        this.vides = 5;
        this.enfonsat = false;
        this.orientacio = "vertical";
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
}
