// ===============================
// CALCULADORA
// ===============================


// ===============================
// CREAR DIVISIONES Y SUBDIVISIONES
// ===============================

let elemento =
    document.getElementById(
        "txtDivisionNota"
    );


let subapartado =
    document.getElementById(
        "txtSubapartado"
    );


subapartado.oninput =
    añadirSubapartado;


function añadirSubapartado(evento) {

    if (
        evento.target.value.length === 1
    ) {

        let fila =
            document.createElement("div");


        fila.className =
            "filaSubapartado";


        let nuevoSubapartado =
            document.createElement("input");


        nuevoSubapartado.type =
            "text";


        nuevoSubapartado.className =
            "subapartadoNota";


        let nuevoPorcentaje =
            document.createElement("input");


        nuevoPorcentaje.type =
            "number";


        nuevoPorcentaje.min =
            "0";


        nuevoPorcentaje.max =
            "100";


        fila.appendChild(
            nuevoSubapartado
        );


        fila.appendChild(
            nuevoPorcentaje
        );


        document.getElementById(
            "listaSubapartados"
        ).appendChild(
            fila
        );


        nuevoSubapartado.oninput =
            añadirSubapartado;
    }
}


// ===============================
// GUARDAR DIVISIONES,
// SUBDIVISIONES Y ASIGNATURAS
// ===============================

let divisionesGuardadas = [];

let subapartadosGuardados = [];

let asignaturasGuardadas = [];


let pantallaConfiguracion =
    document.getElementById(
        "pantallaConfiguracion"
    );


let pantallaCalculo =
    document.getElementById(
        "pantallaCalculo"
    );


let datosAsignaturasGuardados =
    localStorage.getItem(
        "asignaturasGuardadas"
    );


if (
    datosAsignaturasGuardados !== null
) {

    asignaturasGuardadas =
        JSON.parse(
            datosAsignaturasGuardados
        );
}


// ===============================
// LISTA DE DIVISIONES
// ===============================

function actualizarListaDivisiones() {

    let lista =
        document.getElementById(
            "divisionesGuardadas"
        );


    lista.innerHTML =
        "";


    for (
        let i = 0;
        i < divisionesGuardadas.length;
        i++
    ) {

        let division =
            document.createElement("div");


        division.innerHTML =
            "<strong>" +
            divisionesGuardadas[i].nombre +
            "</strong> - " +
            divisionesGuardadas[i].porcentaje +
            "%";


        lista.appendChild(
            division
        );


        // Subapartados //
        for (
            let j = 0;
            j <
            divisionesGuardadas[i].subapartados.length;
            j++
        ) {

            let subapartado =
                document.createElement("div");


            subapartado.innerHTML =
                "&nbsp;&nbsp;&nbsp;• " +
                divisionesGuardadas[i].subapartados[j].nombre +
                " - " +
                divisionesGuardadas[i].subapartados[j].porcentaje +
                "%";


            lista.appendChild(
                subapartado
            );
        }
    }
}


// ===============================
// LISTA DE ASIGNATURAS
// ===============================

function actualizarListaAsignaturasCalculadora() {

    let lista =
        document.getElementById(
            "asignaturasGuardadas"
        );


    lista.innerHTML =
        "";


    for (
        let i = 0;
        i < asignaturasGuardadas.length;
        i++
    ) {

        let fila =
            document.createElement("div");


        fila.className =
            "filaAsignatura";


        fila.innerHTML =
            "<strong>" +
            asignaturasGuardadas[i].nombre +
            "</strong>";


        let botonEliminar =
            document.createElement("button");


        botonEliminar.textContent =
            "❌";


        botonEliminar.className =
            "btnEliminar";


        botonEliminar.onclick =
            function() {

                eliminarAsignaturaCalculadora(i);
            };


        fila.appendChild(
            botonEliminar
        );


        lista.appendChild(
            fila
        );
    }
}


// ===============================
// SELECTOR DE ASIGNATURAS
// ===============================

function actualizarSelectorAsignaturas() {

    let selector =
        document.getElementById(
            "selectAsignatura"
        );


    selector.innerHTML = `
        <option value="">Selecciona una asignatura</option>
    `;


    for (
        let i = 0;
        i < asignaturasGuardadas.length;
        i++
    ) {

        let opcion =
            document.createElement("option");


        opcion.value =
            i;


        opcion.textContent =
            asignaturasGuardadas[i].nombre;


        selector.appendChild(
            opcion
        );
    }
}


// ===============================
// MOSTRAR ELEMENTOS
// ===============================

function mostrarElementosAsignatura() {

    let selector =
        document.getElementById(
            "selectAsignatura"
        );


    let zonaElementos =
        document.getElementById(
            "elementosAsignatura"
        );


    zonaElementos.innerHTML =
        "";


    if (
        selector.value === ""
    ) {

        return;
    }


    let indiceAsignatura =
        Number(
            selector.value
        );


    let asignatura =
        asignaturasGuardadas[
            indiceAsignatura
        ];


    console.log(
        asignatura
    );


    // Toda la asignatura //
    let filaTodaAsignatura =
        document.createElement("div");


    let casillaTodaAsignatura =
        document.createElement("input");


    casillaTodaAsignatura.type =
        "checkbox";


    casillaTodaAsignatura.id =
        "chkTodaAsignatura";


    let etiquetaTodaAsignatura =
        document.createElement("label");


    etiquetaTodaAsignatura.textContent =
        "Toda la asignatura";


    filaTodaAsignatura.appendChild(
        casillaTodaAsignatura
    );


    filaTodaAsignatura.appendChild(
        etiquetaTodaAsignatura
    );


    zonaElementos.appendChild(
        filaTodaAsignatura
    );


    // Divisiones //
    for (
        let i = 0;
        i < asignatura.divisiones.length;
        i++
    ) {

        let division =
            asignatura.divisiones[i];


        let fila =
            document.createElement("div");


        let casilla =
            document.createElement("input");


        casilla.type =
            "checkbox";


        casilla.value =
            i;


        casilla.className =
            "checkboxElemento";


        casilla.onchange =
            function() {

                if (
                    division.subapartados.length ===
                    0
                ) {

                    return;
                }


                let casillasSubapartados =
                    zonaElementos.querySelectorAll(
                        ".checkboxSubapartado"
                    );


                for (
                    let j = 0;
                    j < casillasSubapartados.length;
                    j++
                ) {

                    let subapartado =
                        casillasSubapartados[j];


                    if (
                        Number(
                            subapartado.dataset.division
                        ) === i
                    ) {

                        subapartado.checked =
                            casilla.checked;
                    }
                }
            };


        let etiqueta =
            document.createElement("label");


        etiqueta.textContent =
            division.nombre +
            " - " +
            division.porcentaje +
            "%";


        fila.appendChild(
            casilla
        );


        fila.appendChild(
            etiqueta
        );


        zonaElementos.appendChild(
            fila
        );


        // ===============================
        // ZONA DE NOTAS
        // ===============================

        if (
            division.subapartados.length ===
            0
        ) {

            let zonaNotas =
                document.createElement("div");


            zonaNotas.className =
                "zonaNotas";


            zonaNotas.dataset.division =
                i;


            zonaNotas.dataset.asignatura =
                indiceAsignatura;


            let nota =
                document.createElement("input");


            nota.type =
                "text";


            nota.className =
                "notaElemento";


            nota.placeholder =
                "Nota";


            zonaNotas.appendChild(
                nota
            );


            zonaElementos.appendChild(
                zonaNotas
            );


            nota.oninput =
                añadirNota;


            nota.onblur =
                function() {

                    if (
                        !comprobarNota(
                            nota.value
                        )
                    ) {

                        alert(
                            "La nota introducida no es válida."
                        );
                    }
                };
        }


        // ===============================
        // SUBAPARTADOS
        // ===============================

        for (
            let j = 0;
            j < division.subapartados.length;
            j++
        ) {

            let subapartado =
                division.subapartados[j];


            let filaSubapartado =
                document.createElement("div");


            filaSubapartado.style.marginLeft =
                "25px";


            let casillaSubapartado =
                document.createElement("input");


            casillaSubapartado.type =
                "checkbox";


            casillaSubapartado.className =
                "checkboxSubapartado";


            casillaSubapartado.value =
                j;


            casillaSubapartado.dataset.division =
                i;


            let etiquetaSubapartado =
                document.createElement("label");


            etiquetaSubapartado.textContent =
                "• " +
                subapartado.nombre +
                " - " +
                subapartado.porcentaje +
                "%";


            filaSubapartado.appendChild(
                casillaSubapartado
            );


            filaSubapartado.appendChild(
                etiquetaSubapartado
            );


            zonaElementos.appendChild(
                filaSubapartado
            );


            // Zona de notas //
            let zonaNotasSubapartado =
                document.createElement("div");


            zonaNotasSubapartado.className =
                "zonaNotas";


            zonaNotasSubapartado.style.marginLeft =
                "50px";


            zonaNotasSubapartado.dataset.division =
                i;


            zonaNotasSubapartado.dataset.subapartado =
                j;


            zonaNotasSubapartado.dataset.asignatura =
                indiceAsignatura;


            let notaSubapartado =
                document.createElement("input");


            notaSubapartado.type =
                "text";


            notaSubapartado.className =
                "notaElemento";


            notaSubapartado.placeholder =
                "Nota";


            notaSubapartado.oninput =
                añadirNota;


            notaSubapartado.onblur =
                function() {

                    if (
                        !comprobarNota(
                            notaSubapartado.value
                        )
                    ) {

                        alert(
                            "La nota introducida no es válida."
                        );
                    }
                };


            zonaNotasSubapartado.appendChild(
                notaSubapartado
            );


            zonaElementos.appendChild(
                zonaNotasSubapartado
            );
        }
    }


    // Seleccionar toda la asignatura //
    casillaTodaAsignatura.onchange =
        function() {

            let casillasElementos =
                document.querySelectorAll(
                    ".checkboxElemento"
                );


            let casillasSubapartados =
                document.querySelectorAll(
                    ".checkboxSubapartado"
                );


            for (
                let i = 0;
                i < casillasElementos.length;
                i++
            ) {

                casillasElementos[i].checked =
                    casillaTodaAsignatura.checked;
            }


            for (
                let i = 0;
                i < casillasSubapartados.length;
                i++
            ) {

                casillasSubapartados[i].checked =
                    casillaTodaAsignatura.checked;
            }
        };
}


// ===============================
// NOTAS
// ===============================

function añadirNota(evento) {

    if (
        evento.target.value.length === 1
    ) {

        let zonaNotas =
            evento.target.parentElement;


        let nuevaNota =
            document.createElement("input");


        nuevaNota.type =
            "text";


        nuevaNota.className =
            "notaElemento";


        nuevaNota.placeholder =
            "Nota";


        zonaNotas.appendChild(
            nuevaNota
        );


        nuevaNota.oninput =
            añadirNota;
    }
}


function comprobarNota(valor) {

    valor =
        valor.trim();


    if (
        valor === ""
    ) {

        return true;
    }


    valor =
        valor.replace(
            ",",
            "."
        );


    let numero =
        Number(valor);


    if (
        isNaN(numero)
    ) {

        return false;
    }


    if (
        numero < 0 ||
        numero > 10
    ) {

        return false;
    }


    return true;
}


function comprobarTodasLasNotas() {

    let notas =
        document.querySelectorAll(
            ".notaElemento"
        );


    for (
        let i = 0;
        i < notas.length;
        i++
    ) {

        if (
            !comprobarNota(
                notas[i].value
            )
        ) {

            return false;
        }
    }


    return true;
}


function recogerNotas(elemento) {

    let notas =
        elemento.querySelectorAll(
            ".notaElemento"
        );


    let notasValidas =
        [];


    for (
        let i = 0;
        i < notas.length;
        i++
    ) {

        if (
            notas[i].value.trim() !== ""
        ) {

            let valor =
                notas[i].value.replace(
                    ",",
                    "."
                );


            notasValidas.push(
                Number(valor)
            );
        }
    }


    return notasValidas;
}


function comprobarHayNotas(elemento) {

    let notas =
        recogerNotas(elemento);


    if (
        notas.length === 0
    ) {

        return false;
    }


    return true;
}


function calcularMedia(notas) {

    let suma =
        0;


    for (
        let i = 0;
        i < notas.length;
        i++
    ) {

        suma +=
            notas[i];
    }


    let media =
        suma /
        notas.length;


    return media.toFixed(2);
}


// ===============================
// MEDIAS DE SUBAPARTADOS
// ===============================

function calcularMediaPonderadaSubapartados(
    division,
    indiceAsignatura,
    indiceDivision
) {

    let suma =
        0;


    for (
        let i = 0;
        i < division.subapartados.length;
        i++
    ) {

        let subapartado =
            division.subapartados[i];


        let zonaNotas =
            document.querySelector(
                "[data-asignatura='" +
                indiceAsignatura +
                "'][data-division='" +
                indiceDivision +
                "'][data-subapartado='" +
                i +
                "']"
            );


        if (
            zonaNotas === null
        ) {

            continue;
        }


        let notas =
            recogerNotas(
                zonaNotas
            );


        if (
            notas.length === 0
        ) {

            continue;
        }


        let media =
            Number(
                calcularMedia(notas)
            );


        let porcentaje =
            Number(
                subapartado.porcentaje
            );


        suma +=
            media *
            porcentaje /
            100;
    }


    return suma.toFixed(2);
}


function obtenerMediasSubapartados(
    division,
    indiceAsignatura,
    indiceDivision
) {

    let medias =
        [];


    for (
        let i = 0;
        i < division.subapartados.length;
        i++
    ) {

        let subapartado =
            division.subapartados[i];


        let zonaNotas =
            document.querySelector(
                "[data-asignatura='" +
                indiceAsignatura +
                "'][data-division='" +
                indiceDivision +
                "'][data-subapartado='" +
                i +
                "']"
            );


        if (
            zonaNotas === null
        ) {

            continue;
        }


        let notas =
            recogerNotas(
                zonaNotas
            );


        if (
            notas.length === 0
        ) {

            continue;
        }


        let media =
            calcularMedia(
                notas
            );


        medias.push({

            nombre:
                subapartado.nombre,

            porcentaje:
                subapartado.porcentaje,

            media:
                media
        });
    }


    return medias;
}


// ===============================
// MEDIA FINAL DE ELEMENTO
// ===============================

function calcularMediaFinalElemento(
    division,
    indiceAsignatura,
    indiceDivision
) {

    // Sin subapartados //
    if (
        division.subapartados.length ===
        0
    ) {

        let zonaNotas =
            document.querySelector(
                "[data-asignatura='" +
                indiceAsignatura +
                "'][data-division='" +
                indiceDivision +
                "']"
            );


        if (
            zonaNotas === null
        ) {

            return null;
        }


        let notas =
            recogerNotas(
                zonaNotas
            );


        if (
            notas.length === 0
        ) {

            return null;
        }


        return calcularMedia(
            notas
        );
    }


    // Con subapartados //
    return calcularMediaPonderadaSubapartados(
        division,
        indiceAsignatura,
        indiceDivision
    );
}


// ===============================
// ELIMINAR ASIGNATURA
// ===============================

function eliminarAsignaturaCalculadora(indice) {

    asignaturasGuardadas.splice(
        indice,
        1
    );


    localStorage.setItem(
        "asignaturasGuardadas",
        JSON.stringify(
            asignaturasGuardadas
        )
    );


    actualizarListaAsignaturasCalculadora();

    actualizarSelectorAsignaturas();
}


// ===============================
// GUARDAR ASIGNATURA
// ===============================

function guardarAsignatura() {

    let nombreAsignatura =
        document.getElementById(
            "txtAsignaturaConfiguracion"
        ).value.trim();


    let asignatura = {

        nombre:
            nombreAsignatura,

        divisiones:
            divisionesGuardadas
    };


    if (
        !comprobarPorcentajes(
            asignatura.divisiones,
            "elementos"
        )
    ) {

        return;
    }


    asignaturasGuardadas.push(
        asignatura
    );


    localStorage.setItem(
        "asignaturasGuardadas",
        JSON.stringify(
            asignaturasGuardadas
        )
    );


    divisionesGuardadas =
        [];


    actualizarListaDivisiones();

    actualizarListaAsignaturasCalculadora();

    actualizarSelectorAsignaturas();


    console.log(
        "Asignatura guardada:",
        asignatura
    );


    document.getElementById(
        "txtAsignaturaConfiguracion"
    ).value =
        "";
}


// ===============================
// GUARDAR DIVISIONES
// ===============================

function guardarDivisionesYSubapartados() {

    subapartadosGuardados =
        [];


    let filasSubapartados =
        document.getElementsByClassName(
            "filaSubapartado"
        );


    for (
        let i = 0;
        i < filasSubapartados.length;
        i++
    ) {

        let nombre =
            filasSubapartados[i]
                .querySelector(
                    ".subapartadoNota"
                )
                .value.trim();


        let porcentaje =
            filasSubapartados[i]
                .querySelector(
                    "input[type='number']"
                )
                .value;


        if (
            nombre !== ""
        ) {

            subapartadosGuardados.push({

                nombre:
                    nombre,

                porcentaje:
                    porcentaje
            });
        }
    }


    if (
        subapartadosGuardados.length >
        0
    ) {

        if (
            !comprobarPorcentajes(
                subapartadosGuardados,
                "subapartados"
            )
        ) {

            return;
        }
    }


    let filasDivisiones =
        document.getElementsByClassName(
            "filaDivision"
        );


    let nombre =
        filasDivisiones[0]
            .querySelector(
                ".divisionNota"
            )
            .value.trim();


    let porcentaje =
        filasDivisiones[0]
            .querySelector(
                "input[type='number']"
            )
            .value;


    if (
        nombre === ""
    ) {

        return;
    }


    divisionesGuardadas.push({

        nombre:
            nombre,

        porcentaje:
            porcentaje,

        subapartados:
            subapartadosGuardados
    });


    console.log(
        "Divisiones guardadas:",
        divisionesGuardadas
    );


    actualizarListaDivisiones();


    document.getElementById(
        "listaDivisiones"
    ).innerHTML = `
        <div class="filaDivision">
            <input type="text" class="divisionNota">
            <input type="number" min="0" max="100">
        </div>
    `;


    document.getElementById(
        "listaSubapartados"
    ).innerHTML = `
        <div class="filaSubapartado">
            <input type="text" class="subapartadoNota">
            <input type="number" min="0" max="100">
        </div>
    `;


    document.querySelector(
        ".subapartadoNota"
    ).oninput =
        añadirSubapartado;
}


// ===============================
// COMPROBAR PORCENTAJES
// ===============================

function comprobarPorcentajes(
    lista,
    tipo
) {

    let conPorcentaje =
        0;

    let sinPorcentaje =
        0;

    let suma =
        0;


    for (
        let i = 0;
        i < lista.length;
        i++
    ) {

        if (
            lista[i].porcentaje === ""
        ) {

            sinPorcentaje++;

        } else {

            conPorcentaje++;

            suma +=
                Number(
                    lista[i].porcentaje
                );
        }
    }


    if (
        conPorcentaje === 0
    ) {

        let continuar =
            confirm(
                "Ningún " +
                tipo +
                " tiene porcentaje. ¿Quieres repartirlos a partes iguales?"
            );


        if (
            continuar
        ) {

            let porcentajeIgual =
                100 /
                lista.length;


            for (
                let i = 0;
                i < lista.length;
                i++
            ) {

                lista[i].porcentaje =
                    porcentajeIgual;
            }


            return true;

        } else {

            return false;
        }
    }


    if (
        sinPorcentaje > 0
    ) {

        alert(
            "No puedes guardar porque faltan porcentajes en algunos " +
            tipo +
            "."
        );


        return false;
    }


    if (
        suma !== 100
    ) {

        alert(
            "Los porcentajes de los " +
            tipo +
            " deben sumar 100%. Actualmente suman " +
            suma +
            "%."
        );


        return false;
    }


    return true;
}


// ===============================
// ELEMENTOS SELECCIONADOS
// ===============================

function obtenerElementosSeleccionados() {

    let casillas =
        document.querySelectorAll(
            ".checkboxElemento"
        );


    let elementosSeleccionados =
        [];


    for (
        let i = 0;
        i < casillas.length;
        i++
    ) {

        if (
            casillas[i].checked
        ) {

            elementosSeleccionados.push(
                Number(
                    casillas[i].value
                )
            );
        }
    }


    return elementosSeleccionados;
}


function calcularElementosSeleccionados() {

    let selector =
        document.getElementById(
            "selectAsignatura"
        );


    if (
        selector.value === ""
    ) {

        return [];
    }


    let indiceAsignatura =
        Number(
            selector.value
        );


    let asignatura =
        asignaturasGuardadas[
            indiceAsignatura
        ];


    let elementosSeleccionados =
        obtenerElementosSeleccionados();


    let resultados =
        [];


    for (
        let i = 0;
        i < elementosSeleccionados.length;
        i++
    ) {

        let indiceDivision =
            elementosSeleccionados[i];


        let division =
            asignatura.divisiones[
                indiceDivision
            ];


        let media =
            calcularMediaFinalElemento(
                division,
                indiceAsignatura,
                indiceDivision
            );


        if (
            media !== null
        ) {

            resultados.push({

                nombre:
                    division.nombre,

                porcentaje:
                    division.porcentaje,

                media:
                    media
            });
        }
    }


    return resultados;
}


// ===============================
// RESULTADO CONJUNTO
// ===============================

function calcularResultadoConjunto() {

    let resultados =
        calcularElementosSeleccionados();


    if (
        resultados.length === 0
    ) {

        alert(
            "Selecciona al menos un elemento con notas."
        );

        return;
    }


    let suma =
        0;


    for (
        let i = 0;
        i < resultados.length;
        i++
    ) {

        let media =
            Number(
                resultados[i].media
            );


        let porcentaje =
            Number(
                resultados[i].porcentaje
            );


        suma +=
            media *
            porcentaje /
            100;
    }


    return suma.toFixed(2);
}


// ===============================
// MOSTRAR RESULTADOS
// ===============================

function mostrarResultadosElementos(
    resultados
) {

    let zonaResultado =
        document.getElementById(
            "resultadoCalculadora"
        );


    zonaResultado.innerHTML =
        "";


    let titulo =
        document.createElement("h3");


    titulo.textContent =
        "Resultados";


    zonaResultado.appendChild(
        titulo
    );


    for (
        let i = 0;
        i < resultados.length;
        i++
    ) {

        let resultado =
            document.createElement("p");


        resultado.textContent =
            resultados[i].nombre +
            ": " +
            resultados[i].media.replace(
                ".",
                ","
            );


        zonaResultado.appendChild(
            resultado
        );
    }
}


// ===============================
// PROCEDIMIENTO
// ===============================

function mostrarProcedimiento() {

    let mostrar =
        document.getElementById(
            "chkProcedimiento"
        ).checked;


    if (
        !mostrar
    ) {

        return;
    }


    let zonaResultado =
        document.getElementById(
            "resultadoCalculadora"
        );


    let procedimiento =
        document.createElement("div");


    procedimiento.id =
        "procedimientoCalculadora";


    procedimiento.innerHTML =
        "<h3>Procedimiento</h3>";


    let selector =
        document.getElementById(
            "selectAsignatura"
        );


    if (
        selector.value === ""
    ) {

        return;
    }


    let indiceAsignatura =
        Number(
            selector.value
        );


    let asignatura =
        asignaturasGuardadas[
            indiceAsignatura
        ];


    let elementosSeleccionados =
        obtenerElementosSeleccionados();


    for (
        let i = 0;
        i < elementosSeleccionados.length;
        i++
    ) {

        let indiceDivision =
            elementosSeleccionados[i];


        let division =
            asignatura.divisiones[
                indiceDivision
            ];


        if (
            division.subapartados.length >
            0
        ) {

            let tituloDivision =
                document.createElement("p");


            tituloDivision.innerHTML =
                "<strong>" +
                division.nombre +
                "</strong>";


            procedimiento.appendChild(
                tituloDivision
            );


            let medias =
                obtenerMediasSubapartados(
                    division,
                    indiceAsignatura,
                    indiceDivision
                );


            for (
                let j = 0;
                j < medias.length;
                j++
            ) {

                let linea =
                    document.createElement("p");


                let media =
                    Number(
                        medias[j].media
                    );


                let porcentaje =
                    Number(
                        medias[j].porcentaje
                    );


                let resultado =
                    media *
                    porcentaje /
                    100;


                linea.textContent =
                    medias[j].nombre +
                    ": " +
                    media.toFixed(2).replace(
                        ".",
                        ","
                    ) +
                    " × " +
                    porcentaje +
                    "% = " +
                    resultado.toFixed(2).replace(
                        ".",
                        ","
                    );


                procedimiento.appendChild(
                    linea
                );
            }


            let sumaResultados =
                0;


            let textoSuma =
                "";


            for (
                let j = 0;
                j < medias.length;
                j++
            ) {

                let media =
                    Number(
                        medias[j].media
                    );


                let porcentaje =
                    Number(
                        medias[j].porcentaje
                    );


                let resultado =
                    media *
                    porcentaje /
                    100;


                sumaResultados +=
                    resultado;


                if (
                    j > 0
                ) {

                    textoSuma +=
                        " + ";
                }


                textoSuma +=
                    resultado
                        .toFixed(2)
                        .replace(
                            ".",
                            ","
                        );
            }


            let resultadoDivision =
                document.createElement("p");


            resultadoDivision.innerHTML =
                "<strong>" +
                textoSuma +
                " = " +
                sumaResultados
                    .toFixed(2)
                    .replace(
                        ".",
                        ","
                    ) +
                "</strong>";


            procedimiento.appendChild(
                resultadoDivision
            );
        }
    }


    zonaResultado.appendChild(
        procedimiento
    );
}


// ===============================
// RESULTADO FINAL
// ===============================

function mostrarResultadoFinal(
    resultadoFinal
) {

    let zonaResultado =
        document.getElementById(
            "resultadoCalculadora"
        );


    let resultado =
        document.createElement("p");


    resultado.innerHTML =
        "<strong>Nota final: " +
        resultadoFinal.replace(
            ".",
            ","
        ) +
        "</strong>";


    zonaResultado.appendChild(
        resultado
    );
}


// ===============================
// INICIALIZAR CALCULADORA
// ===============================

actualizarListaAsignaturasCalculadora();

actualizarSelectorAsignaturas();


// Cambio de asignatura //
document.getElementById(
    "selectAsignatura"
).onchange =
    mostrarElementosAsignatura;


// Añadir divisiones //
document.getElementById(
    "btnAñadirDivisiones"
).onclick =
    guardarDivisionesYSubapartados;


// Añadir asignaturas //
document.getElementById(
    "btnAñadirAsignaturas"
).onclick =
    guardarAsignatura;


// Iniciar calculadora //
document.getElementById(
    "btnIniciar"
).onclick =
    function() {

        pantallaConfiguracion.style.display =
            "none";

        pantallaCalculo.style.display =
            "block";
    };


// Volver a configuración //
document.getElementById(
    "btnVolverConfiguracion"
).onclick =
    function() {

        pantallaCalculo.style.display =
            "none";

        pantallaConfiguracion.style.display =
            "block";
    };


// Calcular //
document.getElementById(
    "btnCalcular"
).onclick =
    function() {

        if (
            !comprobarTodasLasNotas()
        ) {

            alert(
                "Hay una o más notas inválidas. Corrígelas antes de calcular."
            );

            return;
        }


        let resultados =
            calcularElementosSeleccionados();


        if (
            resultados.length === 0
        ) {

            alert(
                "Selecciona al menos un elemento."
            );

            return;
        }


        mostrarResultadosElementos(
            resultados
        );


        let resultadoFinal =
            calcularResultadoConjunto();


        if (
            resultadoFinal !== null
        ) {

            mostrarResultadoFinal(
                resultadoFinal
            );
        }


        mostrarProcedimiento();
    };