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
        console.log("item: " + item);
    });
    // console.log("Número de imágenes: " + imatges);
    // printar imagenes
    for (var i = 0; i < imatges.length; i++) {
        console.log(imatges[i]);
    }


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
        console.log("data: " + data);
        if (ev.target.parentNode.parentNode.id === "taula1" && this.childNodes.length < 1) {
            if (numClones <= 1) {
                // movemos la imagen
                ev.target.appendChild(document.getElementById(data));

                // switch case v1, v2, v3, v4 sobre data
                switch (data) {
                    case "v1":
                        // despues de mover la imagen quitamos los elementos del div
                        var divIMG1 = document.getElementById("divIMG1");
                        while (divIMG1.firstChild) {
                            divIMG1.removeChild(divIMG1.firstChild);
                        }

                        console.log("Número de hijos: " + document.getElementById("divIMG1").childNodes.length);
                        if (document.getElementById("divIMG1").childNodes.length < 1) {
                            console.log("No tiene hijos");
                            const imgV1Oculta = document.createElement("img");
                            imgV1Oculta.src = "imatges/barco1.jpg";
                            imgV1Oculta.id = "fondo";
                            imgV1Oculta.style.width = "100px";
                            imgV1Oculta.draggable = false;
                            imgV1Oculta.style.opacity = "0.5";

                            document.getElementById("divIMG1").appendChild(imgV1Oculta);

                        }
                        break;
                    case "v2":
                        var divIMG2 = document.getElementById("divIMG2");
                        while (divIMG2.firstChild) {
                            divIMG2.removeChild(divIMG2.firstChild);
                        }

                        console.log("Número de hijos: " + document.getElementById("divIMG2").childNodes.length);
                        if (document.getElementById("divIMG2").childNodes.length < 1) {
                            console.log("No tiene hijos");
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

