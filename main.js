window.onload = () => {
    crearTabla();
}
function crearTabla() {
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

    // Agregamos la tabla al div
    var divTabla = document.getElementById("mydiv");
    divTabla.appendChild(table);
}

