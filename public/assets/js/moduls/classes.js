class Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        this.nom = nom;
        this.longitud = longitud;
        this.orientacio = orientacio;
        this.posicio = [];
        this.vides = vides;
        this.enfonsat = enfonsat;
    }
    
    // Método para eliminar vidas del barco
    eliminarVida(posicio, nomJugador) {
        this.vides--;
        var puntuacioJug = document.getElementById("punt_jug");
        var puntuacioMaq = document.getElementById("punt_maq");
        this.posicio.splice(this.posicio.indexOf(posicio), 1);
        if (this.vides == 0) { 
            this.enfonsat = true;
            nomJugador.incrementarPuntuacio();
            if (nomJugador.nombre == "jugador") {
                puntuacioJug.innerHTML = nomJugador.puntuacion;
                alert("El jugador ha hundido un "+this.constructor.name);
            } else if (nomJugador.nombre == "maquina") {
                puntuacioMaq.innerHTML = nomJugador.puntuacion;
                alert("La máquina ha hundido un "+this.constructor.name);
            }
        }
    }
    
    // Método para calcular cuánto espacio ocupa el barco (para CSS)
    espaiOcupat() {
        return this.longitud * 100 + "%";
    }
    
    // Método para resetear la posición del barco en el mapa
    resetPosicio(map) {
        let posicionVieja = this.posicio;
        let espacio = this.longitud;

        if (posicionVieja[0] !== undefined) {
            for (let i = 0; i < espacio; i++) {
                let col = parseInt(posicionVieja[0].charAt(1)) + i;
                let colString = col < 10 ? + col : col.toString();
                let pos2 = "";

                if (this.orientacio === "horizontal") {
                    pos2 = posicionVieja[0].charAt(0) + colString;
                } else if (this.orientacio === "vertical") {
                    pos2 = String.fromCharCode(posicionVieja[0].charCodeAt(0) + i) + posicionVieja[0].substring(1);
                }
                map.set(pos2, 0);
                for (let j = -1; j < 2; j++) {
                    for (let k = -1; k < 2; k++) {
                        let col = parseInt(pos2.charAt(1)) + j;
                        let colString = col < 10 ? col : col.toString();
                        let fil = pos2.charAt(0).charCodeAt(0) + k;
                        let pos3 = "";
                        if (fil >= 65 && fil <= 74 && col >= 1 && col <= 10) {
                            pos3 = String.fromCharCode(fil) + colString;
                            if (map.get(pos3) !== 1) {
                                map.set(pos3, 0);
                            }
                        }
                    }
                }
            }
            
        }
    }
    
    // Método para ocupar la posición del barco en el mapa
    ocuparPosicio(pos, map) {
        let espacio = this.longitud;
        let pos2 = "";
        this.posicio = [];
    
        for (let i = 0; i < espacio; i++) {
          let col = parseInt(pos[0].charAt(1)) + i;
          let filaActual = pos[0][0].charCodeAt(0) + i; // Convertir la fila actual a código ASCII
    
          let colActual = parseInt(pos[0].slice(1)); // Obtener la columna actual como número entero
    
          if (this.orientacio === "horizontal") {
            pos2 = pos[0].charAt(0) + (col < 10 ? col : "10"); // Generar la posición del barcpara orientación horizontal
          } else if (this.orientacio === "vertical") {
            pos2 = String.fromCharCode(filaActual) + pos[0].slice(1); // Generar la posición para orientación vertical
          }
    
          this.posicio.push(pos2);
          map.set(pos2, 1);
    
          if (this.orientacio === "horizontal") {
            // Colocar valor 2 en las posiciones adyacentes
            for (let j = -1; j <= 1; j++) {
              for (let k = -1; k <= 1; k++) {
                if (!(j === 0 && k === 0)) { // Evitar la posición actual
                  let fila = String.fromCharCode(pos2.charCodeAt(0) + j);
                  let nuevaCol = col + k;
                  let nuevaPos = fila + (nuevaCol < 10 ? nuevaCol : "10"); // Ajustamos aquí para manejar la columna 10
                  if (map.has(nuevaPos) && map.get(nuevaPos) !== 1) {
                    map.set(nuevaPos, 2);
                  }
                }
              }
            }
          } else if (this.orientacio === "vertical") {
            // Colocar valor 2 en las posiciones adyacentes
            for (let j = -1; j <= 1; j++) {
              for (let k = -1; k <= 1; k++) {
                if (j !== 0 || k !== 0) { // Evitar la posición actual
                  let nuevaFila = filaActual + j;
                  let nuevaCol = colActual + k;
                  // Verificar si la posición está dentro del mapa
                  if (nuevaFila >= "A".charCodeAt(0) && nuevaFila <= "J".charCodeAt(0) && nuevaCol >= 1 && nuevaCol <= 10) {
                    let nuevaPos = String.fromCharCode(nuevaFila) + (nuevaCol < 10 ? nuevaCol : "10");
                    if (map.get(nuevaPos) !== 1) {
                      map.set(nuevaPos, 2);
                    }
                  }
                }
              }
            }
          }
        }
    
        // Imprimir el estado del mapa
        // console.log("   1  2  3  4  5  6  7  8  9 10");
        // for (let fila = "A".charCodeAt(); fila <= "J".charCodeAt(); fila++) {
        //   let filaOutput = String.fromCharCode(fila) + "  ";
        //   for (let col = 1; col <= 10; col++) {
        //     let pos = String.fromCharCode(fila) + (col < 10 ? col : "10"); // Ajustamos aquí para manejar la columna 10
        //     filaOutput += map.get(pos) + "  ";
        //   }
        //   console.log(filaOutput);
        // }
      }


}


class Submari extends Vaixell {
    constructor(nom, longitud, orientacio, posicio, vides, enfonsat) {
        super(nom, longitud, orientacio, posicio, vides, enfonsat);
        this.nom = "Submari";
        this.longitud = 1;
        this.vides = 1;
        this.enfonsat = false;
        this.orientacio = "vertical";
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