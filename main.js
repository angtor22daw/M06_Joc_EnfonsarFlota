window.onload = () => {
    crearTabla();
    crearTaula2();
    var map = new Map();

    // function createMap() {
    for (var X = 1; X < 11; X++) {
        for (var Y = 1; Y < 11; Y++) {
            var key = String.fromCharCode(64 + X) + Y;
            map.set(key, 0);
        }
    }
    console.log(map.get("A1"));
    console.log([...map]);
    //     return [...map];
    // }
    // console.log(createMap());

    // Instanciar vaixells
    var Submari1 = new Submari();
    var Submari2 = new Submari();

    var Destructor1 = new Destructor();
    Destructor1._orientacio = "horizontal";
    var destructor1Poscio = "A1";
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
                    //leer posicion
                    var posicionVieja = Destructor1.posicio;
                    console.log(posicionVieja);
                    // resetear posicion
                    var espacio = Destructor1.longitud;
                    if (posicionVieja[0] !== undefined) {
                        for (var i = 0; i < espacio; i++) {
                            if (Destructor1.orientacio === "horizontal") {
                                var pos2 = posicionVieja[0].charAt(0) + (parseInt(posicionVieja[0].charAt(1)) + i);
                            } else if (Destructor1.orientacio === "vertical") {
                                var pos2 = String.fromCharCode(posicionVieja[0].charCodeAt(0) + i) + posicionVieja[0].charAt(1);
                            }
                            map.set(pos2, 0);
                            console.log(pos2);
                        }
                    }
                    // posicion nueva
                    Destructor1.posicio[0] = ev.target.id;
                    // espacio ocupado por el barco (de la imagen)
                    document.getElementById(data).style.width = Destructor1.espaiOcupat();
                    // espacio ocupado en map
                    var pos = [];
                    pos[0] = ev.target.id;
                    // var espacio = Destructor1.longitud;

                    for (var i = 0; i < espacio; i++) {
                        if (Destructor1.orientacio === "horizontal") {
                            var pos2 = pos[0].charAt(0) + (parseInt(pos[0].charAt(1)) + i);
                        } else if (Destructor1.orientacio === "vertical") {
                            var pos2 = String.fromCharCode(pos[0].charCodeAt(0) + i) + pos[0].charAt(1);
                        }
                        map.set(pos2, 1);
                        console.log(pos2);
                    }

                    // despues de mover la imagen quitamos los elementos del div
                    var divIMG1 = document.getElementById("divIMG1");
                    while (divIMG1.firstChild) {
                        divIMG1.removeChild(divIMG1.firstChild);
                    }

                    const imgV1Oculta = document.createElement("img");
                    imgV1Oculta.src = "imatges/barco1.jpg";
                    imgV1Oculta.id = "fondo";
                    imgV1Oculta.style.width = "100px";

                    imgV1Oculta.draggable = false;
                    imgV1Oculta.style.opacity = "0.5";

                    document.getElementById("divIMG1").appendChild(imgV1Oculta);

                    break;
                case "v2":
                    document.getElementById(data).style.width = "300%";
                    var divIMG2 = document.getElementById("divIMG2");
                    while (divIMG2.firstChild) {
                        divIMG2.removeChild(divIMG2.firstChild);
                    }

                    if (document.getElementById("divIMG2").childNodes.length < 1) {
                        const imgV2Oculta = document.createElement("img");
                        imgV2Oculta.src = "imatges/barco2.jpg";
                        imgV2Oculta.id = "fondo";
                        imgV2Oculta.style.width = "100px";
                        imgV2Oculta.draggable = false;
                        imgV2Oculta.style.opacity = "0.5";

                        document.getElementById("divIMG2").appendChild(imgV2Oculta);

                    }
                    break;
                case "v3":

                    break;
                case "v4":

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

// console.log(createMap());

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

}

class Submari extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Submari";
        this.longitud = 1;
        this.vides = 1;
        this.enfonsat = false;
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
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
        this.posicio = posicio;
        this.vides = 3;
        this.enfonsat = false;
        this.orientacio = "horitzontal";
    }
    get longitud() {
        return this._longitud;
    }
    set longitud(longitud) {
        this._longitud = longitud;
    }
}

class Cuirassat extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Cuirassat";
        this.longitud = 4;
        this.posicio = posicio;
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
        this.posicio = posicio;
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
