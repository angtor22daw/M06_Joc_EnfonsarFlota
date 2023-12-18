class Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        this.nom = nom;
        this.longitud = longitud;
        this.orientacio = orientacio;
        this.posicio = [];
        this.vides = vides;
        this.enfonsat = enfonsat;
    }
    // metode per enfosar vaixells
    eliminarVida(posicio, nomJugador) {
        // console.log(nomJugador.nombre);
        // console.log("vidas actuales: " + this.vides);
        this.vides--;
        var puntuacioJug = document.getElementById("punt_jug");
        var puntuacioMaq = document.getElementById("punt_maq");
        this.posicio.splice(this.posicio.indexOf(posicio), 1);
        if (this.vides == 0) { 
            this.enfonsat = true;
            nomJugador.incrementarPuntuacio();
            if (nomJugador.nombre == "jugador") {
                puntuacioJug.innerHTML  = nomJugador.puntuacion;
                alert("El jugador ha enfonsat un "+this.constructor.name);

            } else if (nomJugador.nombre == "maquina") {
                puntuacioMaq.innerHTML  = nomJugador.puntuacion;
                alert("La maquina ha enfonsat un "+this.constructor.name);
            }
        }
        // console.log("vidas despues: " + this.vides);
    }
    // metode per calcular quan ocupa el vaixell (per CSS)
    espaiOcupat() {
        return this.longitud * 100 + "%";
    }
    // reset del map (per poder moure els vaixells i que la posicio torni a 0)
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
    // ocupar posció del vaixell al map
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
    get posicio() {
        return this._posicio;
    }
    set posicio(posicio) {
        this._posicio = posicio;
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
    get posicio() {
        return this._posicio;
    }
    set posicio(posicio) {
        this._posicio = posicio;
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
    get posicio() {
        return this._posicio;
    }
    set posicio(posicio) {
        this._posicio = posicio;
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
    get posicio() {
        return this._posicio;
    }
    set posicio(posicio) {
        this._posicio = posicio;
    }
}

export { Vaixell, Submari, Destructor, Creuer, Cuirassat, PortaAvions };