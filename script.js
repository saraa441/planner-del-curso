// ===============================
// CÓDIGO GENERAL
// ===============================


// ===============================
// ELEMENTOS PRINCIPALES
// ===============================

// Botón del plan de estudio //
const boton1 =
    document.getElementById(
        "btnEstudio"
    );


// Botón de la calculadora //
const boton3 =
    document.getElementById(
        "btnCalculadora"
    );


// Botón del calendario //
const botonCalendario =
    document.getElementById(
        "btnCalendario"
    );


// Título principal //
const titulo =
    document.getElementById(
        "titulo"
    );


// Menú principal //
const menu =
    document.getElementById(
        "menuPrincipal"
    );


// Plan de estudio //
const planEstudio =
    document.getElementById(
        "planEstudio"
    );


// Calculadora //
const Calculadora =
    document.getElementById(
        "Calculadora"
    );


// Calendario //
const Calendario =
    document.getElementById(
        "Calendario"
    );


// Ocultar calendario al cargar //
Calendario.style.display =
    "none";


// ===============================
// BOTONES DE INICIO
// ===============================

const btnInicioEstudio =
    document.getElementById(
        "btnInicioEstudio"
    );


const btnInicioCalculadora =
    document.getElementById(
        "btnInicioCalculadora"
    );


const btnInicioCalendario =
    document.getElementById(
        "btnInicioCalendario"
    );


// ===============================
// CONFIGURACIÓN
// ===============================

const btnConfiguracionInicio =
    document.getElementById(
        "btnConfiguracionInicio"
    );


const btnInicioConfiguracion =
    document.getElementById(
        "btnInicioConfiguracion"
    );


const configuracion =
    document.getElementById(
        "configuracion"
    );


// Elementos de configuración //
const colorFondo =
    document.getElementById(
        "colorFondo"
    );


const colorBotones =
    document.getElementById(
        "colorBotones"
    );


const tipoLetra =
    document.getElementById(
        "tipoLetra"
    );


const tamanoLetra =
    document.getElementById(
        "tamanoLetra"
    );


const estiloEsquinas =
    document.getElementById(
        "estiloEsquinas"
    );


const colorCuadros =
    document.getElementById(
        "colorCuadros"
    );


const colorEstudio =
    document.getElementById(
        "colorEstudio"
    );


const colorDescanso =
    document.getElementById(
        "colorDescanso"
    );


const colorTareas =
    document.getElementById(
        "colorTareas"
    );


// ===============================
// ABRIR CONFIGURACIÓN
// ===============================

function abrirConfiguracion() {

    configuracion.style.display =
        "block";
}


btnConfiguracionInicio.onclick =
    abrirConfiguracion;


if (btnInicioConfiguracion) {

    btnInicioConfiguracion.onclick =
        function() {

            configuracion.style.display =
                "none";
        };
}


// ===============================
// CERRAR CONFIGURACIÓN AL HACER CLICK FUERA
// ===============================

document.addEventListener(
    "click",
    function(event) {

        if (
            configuracion.style.display ===
            "block" &&

            !configuracion.contains(
                event.target
            ) &&

            event.target !==
            btnConfiguracionInicio
        ) {

            configuracion.style.display =
                "none";
        }
    }
);


// ===============================
// BOTONES DEL MENÚ
// ===============================

// Plan de estudio //
boton1.onclick =
    function() {

        menu.style.display =
            "none";

        planEstudio.style.display =
            "block";
    };


// Calculadora //
boton3.onclick =
    function() {

        menu.style.display =
            "none";

        Calculadora.style.display =
            "block";
    };


// Calendario //
botonCalendario.onclick =
    function() {

        menu.style.display =
            "none";

        Calendario.style.display =
            "block";
    };


// ===============================
// VOLVER AL INICIO
// ===============================

// Plan de estudio //
btnInicioEstudio.onclick =
    function() {

        planEstudio.style.display =
            "none";

        menu.style.display =
            "block";
    };


// Calculadora //
btnInicioCalculadora.onclick =
    function() {

        Calculadora.style.display =
            "none";

        menu.style.display =
            "block";
    };


// Calendario //
btnInicioCalendario.onclick =
    function() {

        Calendario.style.display =
            "none";

        menu.style.display =
            "block";
    };


// ===============================
// BOTONES DE INFORMACIÓN
// ===============================

const botonesInfo =
    document.querySelectorAll(
        ".btnInfo"
    );


for (
    let boton of botonesInfo
) {

    boton.addEventListener(
        "click",
        function() {

            let nombreInfo =
                boton.dataset.info;


            let info =
                document.getElementById(
                    nombreInfo
                );


            if (
                info.style.display ===
                "block"
            ) {

                info.style.display =
                    "none";

            } else {

                info.style.display =
                    "block";
            }
        }
    );
}


// ===============================
// CONFIGURACIÓN: COLOR DE FONDO
// ===============================

colorFondo.addEventListener(
    "input",
    function() {

        document.body.style.backgroundColor =
            colorFondo.value;


        localStorage.setItem(
            "colorFondo",
            colorFondo.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: COLOR DE BOTONES
// ===============================

colorBotones.addEventListener(
    "input",
    function() {

        let botones =
            document.querySelectorAll(
                "button"
            );


        botones.forEach(
            function(boton) {

                boton.style.backgroundColor =
                    colorBotones.value;
            }
        );


        localStorage.setItem(
            "colorBotones",
            colorBotones.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: TIPO DE LETRA
// ===============================

tipoLetra.addEventListener(
    "change",
    function() {

        document.body.style.fontFamily =
            tipoLetra.value;


        localStorage.setItem(
            "tipoLetra",
            tipoLetra.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: TAMAÑO DE LETRA
// ===============================

tamanoLetra.addEventListener(
    "change",
    function() {

        console.log(
            tamanoLetra.value
        );


        if (
            tamanoLetra.value ===
            "Pequeño"
        ) {

            document.body.style.fontSize =
                "14px";
        }


        if (
            tamanoLetra.value ===
            "Normal"
        ) {

            document.body.style.fontSize =
                "16px";
        }


        if (
            tamanoLetra.value ===
            "Grande"
        ) {

            document.body.style.fontSize =
                "20px";
        }


        if (
            tamanoLetra.value ===
            "Muy grande"
        ) {

            document.body.style.fontSize =
                "24px";
        }


        localStorage.setItem(
            "tamanoLetra",
            tamanoLetra.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: ESQUINAS
// ===============================

estiloEsquinas.addEventListener(
    "change",
    function() {

        if (
            estiloEsquinas.value ===
            "Sin redondeo"
        ) {

            document.querySelectorAll(
                "button, section, .menu"
            ).forEach(
                function(elemento) {

                    elemento.style.borderRadius =
                        "0px";
                }
            );
        }


        if (
            estiloEsquinas.value ===
            "Poco redondeadas"
        ) {

            document.querySelectorAll(
                "button, section, .menu"
            ).forEach(
                function(elemento) {

                    elemento.style.borderRadius =
                        "5px";
                }
            );
        }


        if (
            estiloEsquinas.value ===
            "Redondeadas"
        ) {

            document.querySelectorAll(
                "button, section, .menu"
            ).forEach(
                function(elemento) {

                    elemento.style.borderRadius =
                        "10px";
                }
            );
        }


        if (
            estiloEsquinas.value ===
            "Muy redondeadas"
        ) {

            document.querySelectorAll(
                "button, section, .menu"
            ).forEach(
                function(elemento) {

                    elemento.style.borderRadius =
                        "20px";
                }
            );
        }


        localStorage.setItem(
            "estiloEsquinas",
            estiloEsquinas.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: COLOR DE CUADROS
// ===============================

colorCuadros.addEventListener(
    "input",
    function() {

        document.querySelectorAll(
            "section, .menu"
        ).forEach(
            function(elemento) {

                elemento.style.backgroundColor =
                    colorCuadros.value;
            }
        );


        localStorage.setItem(
            "colorCuadros",
            colorCuadros.value
        );
    }
);


// ===============================
// CONFIGURACIÓN: COLORES DE ESTUDIO,
// DESCANSO Y TAREAS
// ===============================

colorEstudio.addEventListener(
    "input",
    function() {

        localStorage.setItem(
            "colorEstudio",
            colorEstudio.value
        );
    }
);


colorDescanso.addEventListener(
    "input",
    function() {

        localStorage.setItem(
            "colorDescanso",
            colorDescanso.value
        );
    }
);


colorTareas.addEventListener(
    "input",
    function() {

        localStorage.setItem(
            "colorTareas",
            colorTareas.value
        );
    }
);


// ===============================
// RECUPERAR CONFIGURACIÓN
// ===============================

// Color de fondo //
let colorFondoGuardado =
    localStorage.getItem(
        "colorFondo"
    );


if (
    colorFondoGuardado !== null
) {

    document.body.style.backgroundColor =
        colorFondoGuardado;


    colorFondo.value =
        colorFondoGuardado;
}


// Color de botones //
let colorBotonesGuardado =
    localStorage.getItem(
        "colorBotones"
    );


if (
    colorBotonesGuardado !== null
) {

    let botones =
        document.querySelectorAll(
            "button"
        );


    botones.forEach(
        function(boton) {

            boton.style.backgroundColor =
                colorBotonesGuardado;
        }
    );


    colorBotones.value =
        colorBotonesGuardado;
}


// Tipo de letra //
let tipoLetraGuardado =
    localStorage.getItem(
        "tipoLetra"
    );


if (
    tipoLetraGuardado !== null
) {

    document.body.style.fontFamily =
        tipoLetraGuardado;


    tipoLetra.value =
        tipoLetraGuardado;
}


// Tamaño de letra //
let tamanoLetraGuardado =
    localStorage.getItem(
        "tamanoLetra"
    );


if (
    tamanoLetraGuardado !== null
) {

    if (
        tamanoLetraGuardado ===
        "Pequeño"
    ) {

        document.body.style.fontSize =
            "14px";
    }


    if (
        tamanoLetraGuardado ===
        "Normal"
    ) {

        document.body.style.fontSize =
            "16px";
    }


    if (
        tamanoLetraGuardado ===
        "Grande"
    ) {

        document.body.style.fontSize =
            "20px";
    }


    if (
        tamanoLetraGuardado ===
        "Muy grande"
    ) {

        document.body.style.fontSize =
            "24px";
    }


    tamanoLetra.value =
        tamanoLetraGuardado;
}


// Estilo de esquinas //
let estiloEsquinasGuardado =
    localStorage.getItem(
        "estiloEsquinas"
    );


if (
    estiloEsquinasGuardado !== null
) {

    let elementos =
        document.querySelectorAll(
            "button, section, .menu"
        );


    if (
        estiloEsquinasGuardado ===
        "Sin redondeo"
    ) {

        elementos.forEach(
            function(elemento) {

                elemento.style.borderRadius =
                    "0px";
            }
        );
    }


    if (
        estiloEsquinasGuardado ===
        "Poco redondeadas"
    ) {

        elementos.forEach(
            function(elemento) {

                elemento.style.borderRadius =
                    "5px";
            }
        );
    }


    if (
        estiloEsquinasGuardado ===
        "Redondeadas"
    ) {

        elementos.forEach(
            function(elemento) {

                elemento.style.borderRadius =
                    "10px";
            }
        );
    }


    if (
        estiloEsquinasGuardado ===
        "Muy redondeadas"
    ) {

        elementos.forEach(
            function(elemento) {

                elemento.style.borderRadius =
                    "20px";
            }
        );
    }


    estiloEsquinas.value =
        estiloEsquinasGuardado;
}


// Color de cuadros //
let colorCuadrosGuardado =
    localStorage.getItem(
        "colorCuadros"
    );


if (
    colorCuadrosGuardado !== null
) {

    document.querySelectorAll(
        "section, .menu"
    ).forEach(
        function(elemento) {

            elemento.style.backgroundColor =
                colorCuadrosGuardado;
        }
    );


    colorCuadros.value =
        colorCuadrosGuardado;
}
