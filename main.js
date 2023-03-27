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
    var numClones = 0;
    function gestionarDrop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("imatge");
        if (ev.target.parentNode.parentNode.id === "taula1" && this.childNodes.length < 1) {
            if (numClones < 1) {
                ev.target.appendChild(document.getElementById(data).cloneNode(true));
                // ev.target.appendChild(document.getElementById(data));
                numClones++;

                console.log("Número de clones: " + numClones);
            } else {
                console.log("Solo se permite un clon.");
            }
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
        if(tdColumna == 0){
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = "";
            fila.appendChild(celdaNumerica);   
        }else{
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
        if(tdColumna == 0){
            var celdaNumerica = document.createElement("td");
            celdaNumerica.textContent = "";
            fila.appendChild(celdaNumerica);   
        }else{
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

