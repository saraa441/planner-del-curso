// ===============================
// CALENDARIO
// ===============================

// Fecha actual //
let fechaActual = new Date();

// Mes que estamos mostrando //
let mesMostrado = fechaActual.getMonth();

// Año que estamos mostrando //
let añoMostrado = fechaActual.getFullYear();

// Día seleccionado //
let diaSeleccionado = null;

// Elemento que estamos editando //
let elementoEditando = null;

// Datos guardados de cada mes //
let datosCalendario = {};

// Días que están tachados //
let diasTachados = {};


// Guardar los datos del calendario //
function guardarCalendario() {

    localStorage.setItem(
        "datosCalendario",
        JSON.stringify(datosCalendario)
    );

    localStorage.setItem(
        "diasTachados",
        JSON.stringify(diasTachados)
    );
}


// Cargar los datos guardados //
let datosGuardadosCalendario =
    localStorage.getItem("datosCalendario");

if (datosGuardadosCalendario) {

    try {

        datosCalendario =
            JSON.parse(datosGuardadosCalendario);

    } catch (error) {

        console.log(
            "No se pudieron cargar los datos guardados."
        );

        datosCalendario = {};
    }
}


// Cargar los días tachados //
let diasTachadosGuardados =
    localStorage.getItem("diasTachados");

if (diasTachadosGuardados) {

    diasTachados =
        JSON.parse(diasTachadosGuardados);
}


// Obtener los datos del día seleccionado //
function obtenerDatosDia(dia) {

    let clave =
        añoMostrado +
        "-" +
        mesMostrado +
        "-" +
        dia;

    if (datosCalendario[clave]) {

        return datosCalendario[clave];
    }

    return [];
}


// ===============================
// ELEMENTOS DEL CALENDARIO
// ===============================

// Nombre de los meses //
const nombresMeses = [

    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];


// Zona donde aparecerá el nombre del mes //
const mesActual =
    document.getElementById("mesActual");


// Botones para cambiar de mes //
const btnMesAnterior =
    document.getElementById("btnMesAnterior");

const btnMesSiguiente =
    document.getElementById("btnMesSiguiente");


// Días de la semana //
const diasSemana =
    document.getElementById("diasSemana");


// Nombres de los días de la semana //
const nombresDias = [

    "L",
    "M",
    "X",
    "J",
    "V",
    "S",
    "D"
];


// Mostrar los días de la semana //
for (
    let i = 0;
    i < nombresDias.length;
    i++
) {

    let diaSemana =
        document.createElement("div");

    diaSemana.textContent =
        nombresDias[i];

    diasSemana.appendChild(
        diaSemana
    );
}


// Zona donde aparecerán los días del mes //
const diasCalendario =
    document.getElementById("diasCalendario");


// Ventana que aparece al pulsar un día //
const ventanaDia =
    document.getElementById("ventanaDia");

console.log(
    "Ventana del día:",
    ventanaDia
);


// Título de la ventana del día //
const tituloDia =
    document.getElementById("tituloDia");


// Lista de cosas del día //
const listaDia =
    document.getElementById("listaDia");


// Botón para añadir algo al día //
const btnAñadirDia =
    document.getElementById("btnAñadirDia");


// Formulario para añadir un elemento //
const formularioDia =
    document.getElementById("formularioDia");


// Campo de texto del formulario //
const txtElementoDia =
    document.getElementById("txtElementoDia");


// Selector del color del elemento //
const colorElementoDia =
    document.getElementById("colorElementoDia");


// Hora de inicio del elemento //
const horaInicioElemento =
    document.getElementById("horaInicioElemento");


// Hora de fin del elemento //
const horaFinElemento =
    document.getElementById("horaFinElemento");


// Botón que abre el menú de emojis //
const btnEmoji =
    document.getElementById("btnEmoji");


// Menú de emojis //
const menuEmojis =
    document.getElementById("menuEmojis");


// Botón para guardar el elemento //
const btnGuardarElemento =
    document.getElementById("btnGuardarElemento");


// Botón para cancelar //
const btnCancelarElemento =
    document.getElementById("btnCancelarElemento");


// Botón para cerrar la ventana del día //
const btnCerrarDia =
    document.getElementById("btnCerrarDia");


// ===============================
// EMOJIS
// ===============================

// Abrir y cerrar el menú de emojis //
btnEmoji.onclick = function() {

    if (
        menuEmojis.style.display === "block"
    ) {

        menuEmojis.style.display = "none";

    } else {

        menuEmojis.style.display = "block";
    }
};


// Seleccionar un emoji //
const botonesEmoji =
    menuEmojis.querySelectorAll("button");


for (
    let i = 0;
    i < botonesEmoji.length;
    i++
) {

    botonesEmoji[i].onclick =
        function() {

            txtElementoDia.value =
                botonesEmoji[i].textContent +
                " " +
                txtElementoDia.value;

            menuEmojis.style.display =
                "none";
        };
}


// ===============================
// MOSTRAR ELEMENTOS DEL DÍA
// ===============================

// Mostrar los elementos del día //
function mostrarElementosDia() {

    listaDia.innerHTML = "";

    let datosDia =
        obtenerDatosDia(
            diaSeleccionado
        );

    if (
        datosDia.length === 0
    ) {

        listaDia.textContent =
            "No hay nada apuntado para este día.";

    } else {

        for (
            let i = 0;
            i < datosDia.length;
            i++
        ) {

            let elemento =
                document.createElement("div");


            elemento.textContent =
                datosDia[i].texto;


            if (
                datosDia[i].horaInicio &&
                datosDia[i].horaFin
            ) {

                elemento.textContent +=
                    " (" +
                    datosDia[i].horaInicio +
                    " - " +
                    datosDia[i].horaFin +
                    ")";

            } else if (
                datosDia[i].horaInicio
            ) {

                elemento.textContent +=
                    " (desde " +
                    datosDia[i].horaInicio +
                    ")";

            } else if (
                datosDia[i].horaFin
            ) {

                elemento.textContent +=
                    " (hasta " +
                    datosDia[i].horaFin +
                    ")";
            }


            elemento.style.backgroundColor =
                datosDia[i].color + "80";


            // Botón editar //
            let botonEditar =
                document.createElement("button");

            botonEditar.textContent =
                "Editar";


            botonEditar.onclick =
                function() {

                    elementoEditando = i;

                    txtElementoDia.value =
                        datosDia[i].texto;

                    colorElementoDia.value =
                        datosDia[i].color;

                    horaInicioElemento.value =
                        datosDia[i].horaInicio;

                    horaFinElemento.value =
                        datosDia[i].horaFin;

                    formularioDia.style.display =
                        "block";
                };


            // Botón eliminar //
            let botonEliminar =
                document.createElement("button");

            botonEliminar.textContent =
                "Eliminar";


            botonEliminar.onclick =
                function() {

                    let confirmar =
                        confirm(
                            "¿Estás segura de que quieres eliminar este elemento?"
                        );

                    if (confirmar) {

                        datosDia.splice(i, 1);

                        guardarCalendario();

                        mostrarElementosDia();

                        mostrarCalendario();
                    }
                };


            elemento.appendChild(
                botonEditar
            );

            elemento.appendChild(
                botonEliminar
            );

            listaDia.appendChild(
                elemento
            );
        }
    }
}


// ===============================
// BOTONES DE LA VENTANA DEL DÍA
// ===============================

// Botón Añadir abre el formulario //
btnAñadirDia.onclick =
    function() {

        formularioDia.style.display =
            "block";
    };


// Botón Cerrar cierra la ventana del día //
btnCerrarDia.onclick =
    function() {

        ventanaDia.style.display =
            "none";
    };


// Botón Cancelar cierra el formulario //
btnCancelarElemento.onclick =
    function() {

        formularioDia.style.display =
            "none";
    };


// ===============================
// GUARDAR ELEMENTO
// ===============================

// Botón Guardar //
btnGuardarElemento.onclick =
    function() {

        // Obtener los datos del formulario //
        let textoElemento =
            txtElementoDia.value;

        let colorElemento =
            colorElementoDia.value;

        let horaInicio =
            horaInicioElemento.value;

        let horaFin =
            horaFinElemento.value;


        // Obtener el emoji que haya dentro del texto //
        let emoji = "";


        // Crear el objeto del elemento //
        let elemento = {

            texto:
                textoElemento,

            color:
                colorElemento,

            horaInicio:
                horaInicio,

            horaFin:
                horaFin,

            emoji:
                emoji
        };


        // Crear la clave del día //
        let clave =
            añoMostrado +
            "-" +
            mesMostrado +
            "-" +
            diaSeleccionado;


        // Si el día todavía no tiene elementos //
        if (
            !datosCalendario[clave]
        ) {

            datosCalendario[clave] = [];
        }


        // Guardar el elemento //
        if (
            elementoEditando === null
        ) {

            datosCalendario[clave].push(
                elemento
            );

        } else {

            datosCalendario[clave][elementoEditando] =
                elemento;
        }


        // Guardar el calendario //
        guardarCalendario();


        // Ya no estamos editando //
        elementoEditando = null;


        // Actualizar la lista del día //
        mostrarElementosDia();


        // Actualizar las casillas //
        mostrarCalendario();


        console.log(
            "Elemento guardado:",
            elemento
        );


        // Limpiar el formulario //
        txtElementoDia.value = "";

        colorElementoDia.value =
            "#000000";

        horaInicioElemento.value = "";

        horaFinElemento.value = "";


        // Cerrar el formulario //
        formularioDia.style.display =
            "none";
    };


// ===============================
// MOSTRAR CALENDARIO
// ===============================

function mostrarCalendario() {

    // Mostrar el nombre del mes y el año //
    mesActual.textContent =
        nombresMeses[mesMostrado] +
        " " +
        añoMostrado;


    // Borrar los días anteriores //
    diasCalendario.innerHTML = "";


    // Día de la semana en el que empieza el mes //
    let primerDia =
        new Date(
            añoMostrado,
            mesMostrado,
            1
        ).getDay();


    // Convertir domingo = 0 en domingo = 6 //
    primerDia =
        (primerDia + 6) % 7;


    // Número de días del mes //
    let numeroDias =
        new Date(
            añoMostrado,
            mesMostrado + 1,
            0
        ).getDate();


    // Crear espacios antes del día 1 //
    for (
        let i = 0;
        i < primerDia;
        i++
    ) {

        let espacioVacio =
            document.createElement("div");

        diasCalendario.appendChild(
            espacioVacio
        );
    }


    // Crear las casillas de los días //
    for (
        let dia = 1;
        dia <= numeroDias;
        dia++
    ) {

        let casillaDia =
            document.createElement("div");


        // Número del día //
        let numeroDia =
            document.createElement("div");

        numeroDia.textContent =
            dia;

        numeroDia.style.display =
            "inline-block";

        casillaDia.appendChild(
            numeroDia
        );


        // Botón para tachar //
        let botonTachar =
            document.createElement("button");

        botonTachar.textContent =
            "X";


        botonTachar.onclick =
            function(event) {

                event.stopPropagation();

                let claveDia =
                    añoMostrado +
                    "-" +
                    mesMostrado +
                    "-" +
                    dia;


                if (
                    diasTachados[claveDia]
                ) {

                    diasTachados[claveDia] =
                        false;

                    casillaDia.style.backgroundImage =
                        "";

                } else {

                    diasTachados[claveDia] =
                        true;

                    casillaDia.style.backgroundImage =
                        "linear-gradient(135deg, transparent 49%, red 49%, red 51%, transparent 51%)";
                }


                guardarCalendario();
            };


        botonTachar.style.fontSize =
            "10px";

        botonTachar.style.padding =
            "0";

        botonTachar.style.width =
            "18px";

        botonTachar.style.height =
            "18px";

        botonTachar.style.display =
            "inline-block";


        casillaDia.appendChild(
            botonTachar
        );


        // Comprobar si estaba tachado //
        let claveDia =
            añoMostrado +
            "-" +
            mesMostrado +
            "-" +
            dia;


        if (
            diasTachados[claveDia]
        ) {

            casillaDia.style.backgroundImage =
                "linear-gradient(135deg, transparent 48%, black 48%, black 52%, transparent 52%)";
        }


        // Obtener elementos del día //
        let clave =
            añoMostrado +
            "-" +
            mesMostrado +
            "-" +
            dia;

        let elementosDia =
            datosCalendario[clave];


        if (
            elementosDia
        ) {

            for (
                let i = 0;
                i < elementosDia.length;
                i++
            ) {

                let resumenElemento =
                    document.createElement("div");


                resumenElemento.textContent =
                    elementosDia[i].texto;


                if (
                    elementosDia[i].horaInicio &&
                    elementosDia[i].horaFin
                ) {

                    resumenElemento.textContent +=
                        " (" +
                        elementosDia[i].horaInicio +
                        " - " +
                        elementosDia[i].horaFin +
                        ")";

                } else if (
                    elementosDia[i].horaInicio
                ) {

                    resumenElemento.textContent +=
                        " (desde " +
                        elementosDia[i].horaInicio +
                        ")";

                } else if (
                    elementosDia[i].horaFin
                ) {

                    resumenElemento.textContent +=
                        " (hasta " +
                        elementosDia[i].horaFin +
                        ")";
                }


                resumenElemento.style.fontSize =
                    "9px";


                resumenElemento.style.backgroundColor =
                    elementosDia[i].color + "80";


                casillaDia.appendChild(
                    resumenElemento
                );
            }
        }


        // Hacer que la casilla se pueda pulsar //
        casillaDia.onclick =
            function() {

                diaSeleccionado =
                    dia;


                console.log(
                    "Has pulsado el día " +
                    diaSeleccionado
                );


                console.log(
                    "Intentando abrir la ventana"
                );


                tituloDia.textContent =
                    diaSeleccionado +
                    " de " +
                    nombresMeses[mesMostrado] +
                    " de " +
                    añoMostrado;


                mostrarElementosDia();


                ventanaDia.style.display =
                    "block";
            };


        diasCalendario.appendChild(
            casillaDia
        );
    }
}


// Mostrar el calendario al cargar //
mostrarCalendario();


// ===============================
// CAMBIAR DE MES
// ===============================

// Mes siguiente //
btnMesSiguiente.onclick =
    function() {

        mesMostrado++;


        if (
            mesMostrado > 11
        ) {

            mesMostrado = 0;

            añoMostrado++;
        }


        mostrarCalendario();
    };


// Mes anterior //
btnMesAnterior.onclick =
    function() {

        mesMostrado--;


        if (
            mesMostrado < 0
        ) {

            mesMostrado = 11;

            añoMostrado--;
        }


        mostrarCalendario();
    };