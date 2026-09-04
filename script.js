// Botón del plan de estudio //
const boton1 = document.getElementById("btnEstudio");

// Botón de la calculadora //
const boton3 = document.getElementById("btnCalculadora");

// Titulo principal //
const titulo = document.getElementById("titulo");

// Menú principal //
const menu = document.getElementById("menuPrincipal");

// Plan de estudio //
const planEstudio = document.getElementById("planEstudio");

// Calculadora //
const Calculadora = document.getElementById("Calculadora");

// Botón de inicio //
const btnInicioEstudio = document.getElementById("btnInicioEstudio");
const btnInicioCalculadora = document.getElementById("btnInicioCalculadora");

// Botón de configuración //
const btnConfiguracionInicio = document.getElementById("btnConfiguracionInicio");
const btnConfiguracionEstudio = document.getElementById("btnConfiguracionEstudio");
const btnConfiguracionCalculadora = document.getElementById("btnConfiguracionCalculadora");

// Configuración //
const configuracion = document.getElementById("configuracion");

// ===============================
// PLAN DE ESTUDIO
// ===============================

// ===============================
// ASIGNATURAS
// ===============================

const txtAsignatura = document.getElementById("txtAsignatura");
const chkImportante = document.getElementById("chkImportante");
const chkMasTiempo = document.getElementById("chkMasTiempo");
const btnAñadirAsignatura = document.getElementById("btnAñadirAsignatura");
const listaAsignaturas = document.getElementById("listaAsignaturas");
let asignaturas = [];

// Crear la función para actualizar las asignaturas //
function actualizarListaAsignaturas() {

	listaAsignaturas.innerHTML = "";

	for (let i = 0; i < asignaturas.length; i++) {
		listaAsignaturas.innerHTML = listaAsignaturas.innerHTML + "<div class='filaLista'>" + asignaturas[i].nombre + "<button class=btnEliminar onclick='eliminarAsignatura(" + i + ")'>✖</button></div>";
	}
}

// Crear la función para eliminar asignaturas //
function eliminarAsignatura(i) {

	asignaturas.splice(i, 1);

	actualizarListaAsignaturas();

	localStorage.setItem(
		"asignaturas",
		JSON.stringify(asignaturas)
	);
}


// Función para añadir asignaturas //
function añadirAsignatura() {

	if (txtAsignatura.value === "") {

		alert(
			"Es necesario escribir una asignatura para continuar"
		);

	}
	else {

		asignaturas.push({
			nombre: txtAsignatura.value,
			importante: chkImportante.checked,
			masTiempo: chkMasTiempo.checked
		});

		chkImportante.checked = false;
		chkMasTiempo.checked = false;
		txtAsignatura.value = "";

		actualizarListaAsignaturas();

		localStorage.setItem(
			"asignaturas",
			JSON.stringify(asignaturas)
		);

		let ahora = new Date();
		let caducidad = new Date(ahora);

		caducidad.setHours(2, 0, 0, 0);

		if (ahora >= caducidad) {

			caducidad.setDate(
				caducidad.getDate() + 1
			);
		}

		localStorage.setItem(
			"caducidadAsignaturas",
			caducidad.toISOString()
		);
	}
}


// Se hace que al pulsar Enter se añada la asignatura //
function comprobarEnterAsignatura(event) {

	if (event.key == "Enter") {
		añadirAsignatura();
	}
}



// ===============================
// TAREAS
// ===============================

const txtTarea = document.getElementById("txtTarea");
const txtDuracionTarea = document.getElementById("txtDuracionTarea");
const btnAñadirTarea = document.getElementById("btnAñadirTarea");
const listaTareas = document.getElementById("listaTareas");
let tareas = [];

// Crear la función para actualizar las tareas //
function actualizarListaTareas() {

	listaTareas.innerHTML = "";

	for (let j = 0; j < tareas.length; j++) {

		listaTareas.innerHTML =	listaTareas.innerHTML +	"<div class='filaLista'>" +	tareas[j].nombre + "<button class=btnEliminar onclick='eliminarTarea(" + j + ")'>✖</button></div>";
	}
}

// Crear la función para eliminar tareas //
function eliminarTarea(j) {

	tareas.splice(j, 1);

	actualizarListaTareas();

	localStorage.setItem(
		"tareas",
		JSON.stringify(tareas)
	);
}


// Crear la función para añadir tareas //
function añadirTarea() {

	if (
		txtTarea.value === "" || txtDuracionTarea.value === ""
	) {

		alert(
			"Es necesario escribir una tarea y una duración para continuar"
		);

		return;
	}

	tareas.push({
		nombre: txtTarea.value,
		duracion: Number(txtDuracionTarea.value)
	});

	actualizarListaTareas();

	localStorage.setItem(
		"tareas",
		JSON.stringify(tareas)
	);

	txtTarea.value = "";
	txtDuracionTarea.value = "";

	let ahora = new Date();
	let caducidad = new Date(ahora);

	caducidad.setHours(2, 0, 0, 0);

	if (ahora >= caducidad) {

		caducidad.setDate(
			caducidad.getDate() + 1
		);
	}

	localStorage.setItem(
		"caducidadTareas",
		caducidad.toISOString()
	);
}


// Se hace que al pulsar Enter se añada la tarea //
function comprobarEnterTarea(event) {

	if (event.key == "Enter") {

		añadirTarea();
	}
}

// ===============================
// EXÁMENES
// ===============================

const txtExamen = document.getElementById("txtExamen");
const txtFecha = document.getElementById("txtFecha");
const btnAñadirExamen = document.getElementById("btnAñadirExamen");
const listaExamenes = document.getElementById("listaExamenes");
let examenes = [];

// Crear la función para actualizar los exámenes //
function actualizarListaExamenes() {

	examenes.sort(function(a, b) {

		return a.fecha.localeCompare(b.fecha);
	});

	listaExamenes.innerHTML = "";

	for (let k = 0; k < examenes.length; k++) {

		let partes =
			examenes[k].fecha.split("-");

		let fechaBonita =
			partes[2] +
			"/" +
			partes[1] +
			"/" +
			partes[0];

		listaExamenes.innerHTML = listaExamenes.innerHTML +	"<div class='filaLista'>" +	examenes[k].asignatura + " - " + fechaBonita + "<button class=btnEliminar onclick='eliminarExamen(" + k + ")'>✖</button></div>";
	}
}


// Crear la función para eliminar exámenes //
function eliminarExamen(k) {

	examenes.splice(k, 1);

	actualizarListaExamenes();

	localStorage.setItem(
		"examenes",
		JSON.stringify(examenes)
	);
}


// Crear la función para añadir exámenes //
function añadirExamen() {

	if (
		txtExamen.value === "" || txtFecha.value === ""
	) {

		alert(
			"Es necesario escribir una asignatura y una fecha para continuar"
		);

		return;
	}

	let fechaExamen = new Date(txtFecha.value);
	let hoy = new Date();
	hoy.setHours(0, 0, 0, 0);
	if (fechaExamen < hoy) {

		alert(
			"La fecha del examen no puede ser anterior a hoy."
		);

		return;
	}

	examenes.push({
		asignatura: txtExamen.value,
		fecha: txtFecha.value
	});

	actualizarListaExamenes();

	localStorage.setItem(
		"examenes",
		JSON.stringify(examenes)
	);

	txtExamen.value = "";
	txtFecha.value = "";
}


// Se hace que al pulsar Enter se añada el examen //
function comprobarEnterExamen(event) {

	if (event.key == "Enter") {

		añadirExamen();
	}
}



// ==========================================
// CREAR PLAN
// ==========================================

const txtHoraInicio = document.getElementById("txtHoraInicio");
const txtHoraFin = document.getElementById("txtHoraFin");
const btnCrearPlan = document.getElementById("btnCrearPlan");
const txtDuracionDescanso = document.getElementById("txtDuracionDescanso");
const txtDuracionEstudio = document.getElementById("txtDuracionEstudio");
const chkTareasComoDescanso = document.getElementById("chkTareasComoDescanso");

// Función que crea el plan //
function crearPlan() {

	// ==========================================
	// COMPROBAR DATOS
	// ==========================================

	if (
		txtHoraInicio.value === "" || txtHoraFin.value === "" || txtDuracionDescanso.value === "" || txtDuracionEstudio.value === ""
	) {

		alert(
			"Debes introducir una hora de inicio, una hora de fin y las duraciones"
		);

		return;
	}

	if (
		txtHoraFin.value <= txtHoraInicio.value
	) {

		alert(
			"La hora de fin debe ser posterior a la hora de inicio"
		);

		return;
	}

	let duracionDescanso = Number(txtDuracionDescanso.value);

	let duracionEstudio = Number(txtDuracionEstudio.value);

	if (
		duracionDescanso <= 0 || duracionEstudio <= 0
	) {

		alert(
			"La duración del descanso y el estudio debe ser superior a 0"
		);

		return;
	}


	// ==========================================
	// CALCULAR TIEMPO DISPONIBLE
	// ==========================================

	let horaInicio = txtHoraInicio.value.split(":");

	let horaFin = txtHoraFin.value.split(":");

	let inicioMinutos =	Number(horaInicio[0]) * 60 + Number(horaInicio[1]);

	let finMinutos = Number(horaFin[0]) * 60 + Number(horaFin[1]);

	let tiempoDisponible = finMinutos -	inicioMinutos;

	if (
		duracionDescanso >= tiempoDisponible
	) {

		alert(
			"La duración del descanso debe ser inferior al tiempo disponible."
		);

		return;
	}

	// ==========================================
	// GUARDAR DATOS
	// ==========================================

	localStorage.setItem(
		"HoraInicio",
		txtHoraInicio.value
	);

	localStorage.setItem(
		"HoraFin",
		txtHoraFin.value
	);

	localStorage.setItem(
		"duracionDescanso",
		txtDuracionDescanso.value
	);

	localStorage.setItem(
		"duracionEstudio",
		txtDuracionEstudio.value
	);

	// ==========================================
	// ASIGNATURAS DEL PLAN
	// ==========================================

	let asignaturasPlan = asignaturas.map(function(asignatura) {

			return {
				nombre: asignatura.nombre,
				importante: asignatura.importante,
				masTiempo: asignatura.masTiempo
			};
		});

	let hoy = new Date();

	hoy.setHours(0, 0, 0, 0);


	// ==========================================
	// FUNCIÓN PARA CALCULAR PRIORIDAD DE EXAMEN
	// ==========================================

	function calcularPrioridadExamen(nombreAsignatura) {

		let prioridadMayor = 0;

		for (let examen of examenes) {

			if (examen.asignatura === nombreAsignatura) {

				let fechaExamen =
					new Date(examen.fecha);

				fechaExamen.setHours(0,	0, 0, 0);

				let diferenciaTiempo = fechaExamen - hoy;

				let diasRestantes =	Math.ceil(diferenciaTiempo /(1000 * 60 * 60 * 24));

				let prioridadExamen;

				if (
					diasRestantes <= 7
				) {

					prioridadExamen = 4;

				}
				else if (
					diasRestantes <= 14
				) {

					prioridadExamen = 3;

				}
				else if (
					diasRestantes <= 21
				) {

					prioridadExamen = 2;

				}
				else {

					prioridadExamen = 1;
				}

				if (
					prioridadExamen >
					prioridadMayor
				) {

					prioridadMayor =
						prioridadExamen;
				}
			}
		}

		return prioridadMayor;
	}


	// ==========================================
	// AÑADIR ASIGNATURAS CON EXÁMENES PRIORITARIOS
	// ==========================================

	for (
		let examen of examenes
	) {

		let prioridad =
			calcularPrioridadExamen(
				examen.asignatura
			);

		if (
			prioridad >= 3
		) {

			let existe =
				asignaturasPlan.some(
					asignatura =>
					asignatura.nombre ===
					examen.asignatura
				);

			if (!existe) {

				asignaturasPlan.push({

					nombre:
						examen.asignatura,

					importante:
						false,

					masTiempo:
						false
				});
			}
		}
	}


	// ==========================================
	// CALCULAR BLOQUES NECESARIOS
	// ==========================================

	for (
		let asignatura of asignaturasPlan
	) {

		let bloques = 1;

		if (
			asignatura.masTiempo
		) {

			bloques++;
		}

		let prioridad =
			calcularPrioridadExamen(
				asignatura.nombre
			);

		if (
			prioridad === 4
		) {

			bloques += 2;

		}
		else if (
			prioridad === 3
		) {

			bloques++;
		}

		asignatura.bloques =
			bloques;

		asignatura.prioridadExamen =
			prioridad;
	}


	// ==========================================
	// BLOQUES DISPONIBLES
	// ==========================================

	let bloquesDisponibles =
		Math.floor(
			(
				tiempoDisponible +
				duracionDescanso
			) /
			(
				duracionEstudio +
				duracionDescanso
			)
		);


	// ==========================================
	// CALCULAR BLOQUES TENIENDO EN CUENTA
	// EL TIEMPO DE LAS TAREAS
	// ==========================================

	if (
		chkTareasComoDescanso.checked === false &&
		tareas.length > 0
	) {

		let bloquesConTareas = 0;

		for (
			let n = 1;
			n <= bloquesDisponibles;
			n++
		) {

			let tareasQueSePuedenColocar =
				Math.min(
					tareas.length,
					n
				);

			let tiempoTareasParaN = 0;

			for (
				let t = 0;
				t < tareasQueSePuedenColocar;
				t++
			) {

				tiempoTareasParaN +=
					Number(tareas[t].duracion);
			}

			let tiempoNecesario =
				(
					n *
					duracionEstudio
				) +
				(
					(n - 1) *
					duracionDescanso
				) +
				tiempoTareasParaN;

			if (
				tiempoNecesario <=
				tiempoDisponible
			) {

				bloquesConTareas = n;

			}
			else {

				break;
			}
		}

		bloquesDisponibles =
			bloquesConTareas;
	}


	let bloquesTotales =
		bloquesDisponibles;


	// ==========================================
	// PREPARAR BLOQUES
	// ==========================================

	for (
		let asignatura of asignaturasPlan
	) {

		asignatura.bloquesAsignados = 0;

		asignatura.bloquesUtilizados = 0;
	}


	// ==========================================
	// BLOQUE MÍNIMO
	// ==========================================

	for (
		let asignatura of asignaturasPlan
	) {

		if (
			bloquesDisponibles > 0
		) {

			asignatura.bloquesAsignados = 1;

			bloquesDisponibles--;
		}
	}


	// ==========================================
	// REPARTO DE BLOQUES RESTANTES
	// ==========================================

	while (
		bloquesDisponibles > 0
	) {

		let asignaturaPrioritaria = null;

		let prioridadMayor = -1;

		let importanteMayor = false;

		let porcentajeMayor = Infinity;

		for (
			let asignatura of asignaturasPlan
		) {

			if (
				asignatura.bloquesAsignados >=
				asignatura.bloques
			) {

				continue;
			}

			let porcentajeAsignado =
				asignatura.bloquesAsignados /
				asignatura.bloques;

			if (
				asignatura.prioridadExamen >
				prioridadMayor
			) {

				asignaturaPrioritaria =
					asignatura;

				prioridadMayor =
					asignatura.prioridadExamen;

				importanteMayor =
					asignatura.importante;

				porcentajeMayor =
					porcentajeAsignado;

			}
			else if (
				asignatura.prioridadExamen ===
				prioridadMayor
			) {

				if (
					asignatura.importante === true &&
					importanteMayor === false
				) {

					asignaturaPrioritaria =
						asignatura;

					importanteMayor = true;

					porcentajeMayor =
						porcentajeAsignado;

				}
				else if (
					asignatura.importante ===
					importanteMayor &&
					porcentajeAsignado <
					porcentajeMayor
				) {

					asignaturaPrioritaria =
						asignatura;

					porcentajeMayor =
						porcentajeAsignado;
				}
			}
		}

		if (
			asignaturaPrioritaria === null
		) {

			prioridadMayor = -1;

			importanteMayor = false;

			porcentajeMayor = Infinity;

			for (
				let asignatura of asignaturasPlan
			) {

				let porcentajeAsignado =
					asignatura.bloquesAsignados /
					asignatura.bloques;

				if (
					asignatura.prioridadExamen >
					prioridadMayor
				) {

					asignaturaPrioritaria =
						asignatura;

					prioridadMayor =
						asignatura.prioridadExamen;

					importanteMayor =
						asignatura.importante;

					porcentajeMayor =
						porcentajeAsignado;

				}
				else if (
					asignatura.prioridadExamen ===
					prioridadMayor
				) {

					if (
						asignatura.importante === true &&
						importanteMayor === false
					) {

						asignaturaPrioritaria =
							asignatura;

						importanteMayor = true;

						porcentajeMayor =
							porcentajeAsignado;

					}
					else if (
						asignatura.importante ===
						importanteMayor &&
						porcentajeAsignado <
						porcentajeMayor
					) {

						asignaturaPrioritaria =
							asignatura;

						porcentajeMayor =
							porcentajeAsignado;
					}
				}
			}
		}

		if (
			asignaturaPrioritaria === null
		) {

			break;
		}

		asignaturaPrioritaria.bloquesAsignados++;

		bloquesDisponibles--;
	}


	// ==========================================
	// ORDENAR LAS ASIGNATURAS
	// ==========================================

	asignaturasPlan.sort(function(a, b) {

		if (
			a.prioridadExamen >= 2 ||
			b.prioridadExamen >= 2
		) {

			if (
				b.prioridadExamen !==
				a.prioridadExamen
			) {

				return (
					b.prioridadExamen -
					a.prioridadExamen
				);
			}
		}

		if (
			a.importante !==
			b.importante
		) {

			if (
				a.importante
			) {

				return -1;
			}

			return 1;
		}

		if (
			b.prioridadExamen !==
			a.prioridadExamen
		) {

			return (
				b.prioridadExamen -
				a.prioridadExamen
			);
		}

		return 0;
	});


	// ==========================================
	// CREAR HORARIO
	// ==========================================

	let horario = [];

	let j = 0;

	let k = 0;

	let horaActual = inicioMinutos;


	// ==========================================
	// CREAR LOS BLOQUES DE ESTUDIO
	// ==========================================

	for (
		let i = 0;
		i < bloquesTotales;
		i++
	) {

		let asignaturaElegida = null;

		for (
			let asignatura of asignaturasPlan
		) {

			if (
				asignatura.bloquesUtilizados <
				asignatura.bloquesAsignados
			) {

				asignaturaElegida =
					asignatura;

				break;
			}
		}

		if (
			asignaturaElegida === null
		) {

			break;
		}

		if (
			horaActual +
			duracionEstudio >
			finMinutos
		) {

			break;
		}


		// Añadir bloque de estudio //
		horario.push({

			tipo: "estudio",

			asignatura:
				asignaturaElegida.nombre,

			duracion:
				duracionEstudio
		});

		asignaturaElegida.bloquesUtilizados++;

		horaActual += duracionEstudio;


		// Mover la asignatura al final //
		if (
			asignaturaElegida.bloquesUtilizados <
			asignaturaElegida.bloquesAsignados
		) {

			let posicion =
				asignaturasPlan.indexOf(
					asignaturaElegida
				);

			asignaturasPlan.splice(
				posicion,
				1
			);

			asignaturasPlan.push(
				asignaturaElegida
			);
		}


		// ==========================================
		// AÑADIR DESCANSO O TAREA
		// ==========================================

		if (
			i < bloquesTotales - 1
		) {

			if (
				chkTareasComoDescanso.checked
			) {

				if (
					j < tareas.length
				) {

					let duracionTarea =
						Number(tareas[j].duracion);

					if (
						horaActual +
						duracionTarea >
						finMinutos
					) {

						break;
					}

					horario.push({

						tipo: "tarea",

						tarea:
							tareas[j].nombre,

						duracion:
							duracionTarea
					});

					horaActual +=
						duracionTarea;

					j++;

				}
				else {

					if (
						horaActual +
						duracionDescanso >
						finMinutos
					) {

						break;
					}

					horario.push({

						tipo: "descanso",

						duracion:
							duracionDescanso
					});

					horaActual +=
						duracionDescanso;
				}

			}
			else {

				if (
					horaActual +
					duracionDescanso >
					finMinutos
				) {

					break;
				}

				horario.push({

					tipo: "descanso",

					duracion:
						duracionDescanso
				});

				horaActual +=
					duracionDescanso;
			}


			// ==========================================
			// AÑADIR TAREAS COMO BLOQUES NORMALES
			// ==========================================

			if (
				chkTareasComoDescanso.checked === false &&
				tareas.length > 0 &&
				k < tareas.length
			) {

				let duracionTarea =
					Number(tareas[k].duracion);


				// Solo añadimos la tarea si después
				// todavía cabe el siguiente estudio //
				if (
					horaActual +
					duracionTarea +
					duracionEstudio <=
					finMinutos
				) {

					horario.push({

						tipo: "tarea",

						tarea:
							tareas[k].nombre,

						duracion:
							duracionTarea
					});

					horaActual +=
						duracionTarea;

					k++;
				}
			}
		}
	}


	// ==========================================
	// AÑADIR LA ÚLTIMA TAREA SI QUEDA TIEMPO
	// ==========================================

	if (
		chkTareasComoDescanso.checked === false &&
		k < tareas.length
	) {

		let duracionTarea =
			Number(tareas[k].duracion);

		if (
			horaActual +
			duracionTarea <=
			finMinutos
		) {

			horario.push({

				tipo: "tarea",

				tarea:
					tareas[k].nombre,

				duracion:
					duracionTarea
			});

			horaActual +=
				duracionTarea;

			k++;
		}
	}


	// ==========================================
	// GUARDAR HORARIO
	// ==========================================

	localStorage.setItem(
		"horario",
		JSON.stringify(horario)
	);

	window.open(
		"horario.html",
		"_blank"
	);
}


// ==========================================
// BOTÓN DE CONFIGURACIÓN
// ==========================================

function abrirConfiguracion() {
	
	if (
		configuracion.style.display === "none"
	) {
		configuracion.style.display = "block";
	}
	else {
		configuracion.style.display = "none";
	}
}


btnConfiguracionInicio.onclick = abrirConfiguracion;
btnConfiguracionEstudio.onclick = abrirConfiguracion;
btnConfiguracionCalculadora.onclick = abrirConfiguracion;


// ==========================================
// CERRAR CONFIGURACIÓN AL HACER CLICK FUERA
// ==========================================

document.addEventListener("click", function(event) {

	if (
		configuracion.style.display === "block" &&
		!configuracion.contains(event.target) &&
		event.target !== btnConfiguracionInicio &&
		event.target !== btnConfiguracionEstudio &&
		event.target !== btnConfiguracionCalculadora
	) {

		configuracion.style.display = "none";
	}
});


// ==========================================
// BOTONES DEL MENÚ
// ==========================================

boton1.onclick = function() {

	menu.style.display = "none";

	planEstudio.style.display = "block";
};


boton3.onclick = function() {

	menu.style.display = "none";

	Calculadora.style.display = "block";
};


// ==========================================
// BOTONES PARA VOLVER AL INICIO
// ==========================================

btnInicioEstudio.onclick = function() {

	planEstudio.style.display = "none";

	menu.style.display = "block";
};


btnInicioCalculadora.onclick = function() {

	Calculadora.style.display = "none";

	menu.style.display = "block";
};


// ==========================================
// BOTONES DE AÑADIR
// ==========================================

btnAñadirAsignatura.onclick =
	añadirAsignatura;

btnAñadirTarea.onclick =
	añadirTarea;

btnAñadirExamen.onclick =
	añadirExamen;

btnCrearPlan.onclick =
	crearPlan;


// ==========================================
// BOTONES DE INFORMACIÓN
// ==========================================

const botonesInfo =
	document.querySelectorAll(".btnInfo");


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

			}
			else {

				info.style.display =
					"block";
			}
		}
	);
}


// ==========================================
// CONFIGURACIÓN
// ==========================================

document.getElementById("colorFondo").addEventListener("input", function(){

	document.body.style.backgroundColor =
		colorFondo.value;

	localStorage.setItem(
		"colorFondo",
		colorFondo.value
	);
});


document.getElementById("colorBotones").addEventListener("input", function(){

	let botones =
		document.querySelectorAll("button");

	botones.forEach(function(boton){

		boton.style.backgroundColor =
			colorBotones.value;
	});

	localStorage.setItem(
		"colorBotones",
		colorBotones.value
	);
});


document.getElementById("tipoLetra").addEventListener("change", function(){

	document.body.style.fontFamily =
		tipoLetra.value;

	localStorage.setItem(
		"tipoLetra",
		tipoLetra.value
	);
});


const selectorTamanoLetra =
	document.getElementById("tamanoLetra");


selectorTamanoLetra.addEventListener("change", function(){

	console.log(
		selectorTamanoLetra.value
	);

	if(
		selectorTamanoLetra.value === "Pequeño"
	){

		document.body.style.fontSize =
			"14px";
	}

	if(
		selectorTamanoLetra.value === "Normal"
	){

		document.body.style.fontSize =
			"16px";
	}

	if(
		selectorTamanoLetra.value === "Grande"
	){

		document.body.style.fontSize =
			"20px";
	}

	if(
		selectorTamanoLetra.value === "Muy grande"
	){

		document.body.style.fontSize =
			"24px";
	}

	localStorage.setItem(
		"tamanoLetra",
		selectorTamanoLetra.value
	);
});


const selectorEstiloEsquinas =
	document.getElementById("estiloEsquinas");


selectorEstiloEsquinas.addEventListener("change", function(){

	if(
		selectorEstiloEsquinas.value === "Sin redondeo"
	){

		document.querySelectorAll(
			"button, section, .menu"
		).forEach(function(elemento){

			elemento.style.borderRadius =
				"0px";
		});
	}

	if(
		selectorEstiloEsquinas.value === "Poco redondeadas"
	){

		document.querySelectorAll(
			"button, section, .menu"
		).forEach(function(elemento){

			elemento.style.borderRadius =
				"5px";
		});
	}

	if(
		selectorEstiloEsquinas.value === "Redondeadas"
	){

		document.querySelectorAll(
			"button, section, .menu"
		).forEach(function(elemento){

			elemento.style.borderRadius =
				"10px";
		});
	}

	if(
		selectorEstiloEsquinas.value === "Muy redondeadas"
	){

		document.querySelectorAll(
			"button, section, .menu"
		).forEach(function(elemento){

			elemento.style.borderRadius =
				"20px";
		});
	}

	localStorage.setItem(
		"estiloEsquinas",
		selectorEstiloEsquinas.value
	);
});


const selectorColorCuadros =
	document.getElementById("colorCuadros");


selectorColorCuadros.addEventListener("input", function(){

	document.querySelectorAll(
		"section, .menu"
	).forEach(function(elemento){

		elemento.style.backgroundColor =
			selectorColorCuadros.value;
	});

	localStorage.setItem(
		"colorCuadros",
		selectorColorCuadros.value
	);
});


const selectorColorEstudio =
	document.getElementById("colorEstudio");


selectorColorEstudio.addEventListener("input", function(){

	localStorage.setItem(
		"colorEstudio",
		selectorColorEstudio.value
	);
});


const selectorColorDescanso =
	document.getElementById("colorDescanso");


selectorColorDescanso.addEventListener("input", function(){

	localStorage.setItem(
		"colorDescanso",
		selectorColorDescanso.value
	);
});


const selectorColorTareas =
	document.getElementById("colorTareas");


selectorColorTareas.addEventListener("input", function(){

	localStorage.setItem(
		"colorTareas",
		selectorColorTareas.value
	);
});


// ==========================================
// GUARDAR ELECCIÓN DE TAREAS COMO DESCANSO
// ==========================================

chkTareasComoDescanso.onchange =
	function() {

		localStorage.setItem(
			"tareasComoDescanso",
			chkTareasComoDescanso.checked
		);
	};


// ==========================================
// RECUPERAR ELECCIÓN DE TAREAS COMO DESCANSO
// ==========================================

if (
	localStorage.getItem(
		"tareasComoDescanso"
	) !== null
) {

	chkTareasComoDescanso.checked =
		localStorage.getItem(
			"tareasComoDescanso"
		) === "true";
}


// ==========================================
// RECUPERAR EXÁMENES
// ==========================================

if (
	localStorage.getItem(
		"examenes"
	) !== null
) {

	examenes =
		JSON.parse(
			localStorage.getItem(
				"examenes"
			)
		);

	let hoy = new Date();

	hoy.setHours(
		0,
		0,
		0,
		0
	);

	examenes =
		examenes.filter(
			function(examen) {

				let fechaExamen =
					new Date(
						examen.fecha
					);

				fechaExamen.setHours(
					0,
					0,
					0,
					0
				);

				return (
					fechaExamen >= hoy
				);
			}
		);

	localStorage.setItem(
		"examenes",
		JSON.stringify(examenes)
	);

	actualizarListaExamenes();
}


// ==========================================
// RECUPERAR ASIGNATURAS
// ==========================================

if (
	localStorage.getItem(
		"asignaturas"
	) !== null
) {

	let ahora = new Date();

	let caducidad =
		new Date(
			localStorage.getItem(
				"caducidadAsignaturas"
			)
		);

	if (
		ahora > caducidad
	) {

		asignaturas = [];

		localStorage.removeItem(
			"asignaturas"
		);

		localStorage.removeItem(
			"caducidadAsignaturas"
		);

		actualizarListaAsignaturas();

	}
	else {

		asignaturas =
			JSON.parse(
				localStorage.getItem(
					"asignaturas"
				)
			);

		actualizarListaAsignaturas();
	}
}


// ==========================================
// RECUPERAR TAREAS
// ==========================================

if (
	localStorage.getItem(
		"tareas"
	) !== null
) {

	let ahora = new Date();

	let caducidad =
		new Date(
			localStorage.getItem(
				"caducidadTareas"
			)
		);

	if (
		ahora > caducidad
	) {

		tareas = [];

		localStorage.removeItem(
			"tareas"
		);

		localStorage.removeItem(
			"caducidadTareas"
		);

		actualizarListaTareas();

	}
	else {

		tareas =
			JSON.parse(
				localStorage.getItem(
					"tareas"
				)
			);

		actualizarListaTareas();
	}
}


// ==========================================
// RECUPERAR HORAS Y DURACIONES
// ==========================================

if (
	localStorage.getItem(
		"HoraInicio"
	) !== null
) {

	txtHoraInicio.value =
		localStorage.getItem(
			"HoraInicio"
		);
}


if (
	localStorage.getItem(
		"HoraFin"
	) !== null
) {

	txtHoraFin.value =
		localStorage.getItem(
			"HoraFin"
		);
}


if (
	localStorage.getItem(
		"duracionDescanso"
	) !== null
) {

	txtDuracionDescanso.value =
		localStorage.getItem(
			"duracionDescanso"
		);
}


if (
	localStorage.getItem(
		"duracionEstudio"
	) !== null
) {

	txtDuracionEstudio.value =
		localStorage.getItem(
			"duracionEstudio"
		);
}


// ==========================================
// RECUPERAR CONFIGURACIÓN
// ==========================================

let colorFondoGuardado =
	localStorage.getItem("colorFondo");


if(
	colorFondoGuardado !== null
){

	document.body.style.backgroundColor =
		colorFondoGuardado;

	colorFondo.value =
		colorFondoGuardado;
}


let colorBotonesGuardado =
	localStorage.getItem("colorBotones");


if(
	colorBotonesGuardado !== null
){

	let botones =
		document.querySelectorAll("button");

	botones.forEach(function(boton){

		boton.style.backgroundColor =
			colorBotonesGuardado;
	});

	colorBotones.value =
		colorBotonesGuardado;
}


let tipoLetraGuardado =
	localStorage.getItem("tipoLetra");


if(
	tipoLetraGuardado !== null
){

	document.body.style.fontFamily =
		tipoLetraGuardado;

	tipoLetra.value =
		tipoLetraGuardado;
}


let tamanoLetraGuardado =
	localStorage.getItem("tamanoLetra");


if(
	tamanoLetraGuardado !== null
){

	if(
		tamanoLetraGuardado === "Pequeño"
	){

		document.body.style.fontSize =
			"14px";
	}

	if(
		tamanoLetraGuardado === "Normal"
	){

		document.body.style.fontSize =
			"16px";
	}

	if(
		tamanoLetraGuardado === "Grande"
	){

		document.body.style.fontSize =
			"20px";
	}

	if(
		tamanoLetraGuardado === "Muy grande"
	){

		document.body.style.fontSize =
			"24px";
	}

	tamanoLetra.value =
		tamanoLetraGuardado;
}


let estiloEsquinasGuardado =
	localStorage.getItem("estiloEsquinas");


if(
	estiloEsquinasGuardado !== null
){

	let elementos =
		document.querySelectorAll(
			"button, section, .menu"
		);

	if(
		estiloEsquinasGuardado === "Sin redondeo"
	){

		elementos.forEach(function(elemento){

			elemento.style.borderRadius =
				"0px";
		});
	}

	if(
		estiloEsquinasGuardado === "Poco redondeadas"
	){

		elementos.forEach(function(elemento){

			elemento.style.borderRadius =
				"5px";
		});
	}

	if(
		estiloEsquinasGuardado === "Redondeadas"
	){

		elementos.forEach(function(elemento){

			elemento.style.borderRadius =
				"10px";
		});
	}

	if(
		estiloEsquinasGuardado === "Muy redondeadas"
	){

		elementos.forEach(function(elemento){

			elemento.style.borderRadius =
				"20px";
		});
	}

	selectorEstiloEsquinas.value =
		estiloEsquinasGuardado;
}


let colorCuadrosGuardado =
	localStorage.getItem("colorCuadros");


if(
	colorCuadrosGuardado !== null
){

	document.querySelectorAll(
		"section, .menu"
	).forEach(function(elemento){

		elemento.style.backgroundColor =
			colorCuadrosGuardado;
	});

	colorCuadros.value =
		colorCuadrosGuardado;
}

// ===============================
// CALCULADORA
// ===============================

// ===============================
// CREAR DIVISIONES Y SUBDIVISIONES
// ===============================

let elemento = document.getElementById("txtDivisionNota");

let subapartado = document.getElementById("txtSubapartado");
subapartado.oninput = añadirSubapartado;

function añadirSubapartado(evento) {   
    if (evento.target.value.length === 1) {
        
        let fila = document.createElement("div");
        fila.className = "filaSubapartado";
        
        let nuevoSubapartado = document.createElement("input");
        nuevoSubapartado.type = "text";
        nuevoSubapartado.className = "subapartadoNota";
        
        let nuevoPorcentaje = document.createElement("input");
        nuevoPorcentaje.type = "number";
        nuevoPorcentaje.min = "0";
        nuevoPorcentaje.max = "100";
        
        fila.appendChild(nuevoSubapartado);
        fila.appendChild(nuevoPorcentaje);        
        document.getElementById("listaSubapartados").appendChild(fila);        
        nuevoSubapartado.oninput = añadirSubapartado;
    }
}

// ===============================
// GUARDAR DIVISONES SUBDIVISIONES Y ASIGNATURAS
// ===============================

let divisionesGuardadas = [];
let subapartadosGuardados = [];
let asignaturasGuardadas = [];
let pantallaConfiguracion = document.getElementById("pantallaConfiguracion");
let pantallaCalculo = document.getElementById("pantallaCalculo");
let datosGuardados = localStorage.getItem("asignaturasGuardadas");

if (datosGuardados !== null) {
    asignaturasGuardadas = JSON.parse(datosGuardados);
}

actualizarListaAsignaturas();
actualizarSelectorAsignaturas();

function guardarDivisionesYSubapartados() {

    // GUARDAR SUBAPARTADOS

    subapartadosGuardados = [];

    let filasSubapartados = document.getElementsByClassName("filaSubapartado");

    for (let i = 0; i < filasSubapartados.length; i++) {

        let nombre = filasSubapartados[i].querySelector(".subapartadoNota").value.trim();
        let porcentaje = filasSubapartados[i].querySelector("input[type='number']").value;

        if (nombre !== "") {
            subapartadosGuardados.push({
                nombre: nombre,
                porcentaje: porcentaje
            });
        }
    }


    // COMPROBAR PORCENTAJES DE LOS SUBAPARTADOS

    if (subapartadosGuardados.length > 0) {

        if (!comprobarPorcentajes(subapartadosGuardados, "subapartados")) {
            return;
        }
    }


    // GUARDAR DIVISIÓN

    let filasDivisiones = document.getElementsByClassName("filaDivision");

    let nombre = filasDivisiones[0].querySelector(".divisionNota").value.trim();
    let porcentaje = filasDivisiones[0].querySelector("input[type='number']").value;

    if (nombre === "") {
        return;
    }

    divisionesGuardadas.push({
        nombre: nombre,
        porcentaje: porcentaje,
        subapartados: subapartadosGuardados
    });


    // MOSTRAR EN CONSOLA

    console.log("Divisiones guardadas:", divisionesGuardadas);


    // ACTUALIZAR LISTA

    actualizarListaDivisiones();


    // VACIAR LAS ZONAS DE INTRODUCCIÓN

    document.getElementById("listaDivisiones").innerHTML = `
        <div class="filaDivision">
            <input type="text" class="divisionNota">
            <input type="number" min="0" max="100">
        </div>
    `;

    document.getElementById("listaSubapartados").innerHTML = `
        <div class="filaSubapartado">
            <input type="text" class="subapartadoNota">
            <input type="number" min="0" max="100">
        </div>
    `;


    // VOLVER A ACTIVAR LA CREACIÓN AUTOMÁTICA DE CAMPOS

    document.querySelector(".subapartadoNota").oninput = añadirSubapartado;
}

// LISTA DE DIVISIONES 

function actualizarListaDivisiones() {

    let lista = document.getElementById("divisionesGuardadas");

    lista.innerHTML = "";

    for (let i = 0; i < divisionesGuardadas.length; i++) {

        let division = document.createElement("div");

        division.innerHTML = 
            "<strong>" + divisionesGuardadas[i].nombre + "</strong> - " +
            divisionesGuardadas[i].porcentaje + "%";

        lista.appendChild(division);


        // MOSTRAR SUBAPARTADOS

        for (let j = 0; j < divisionesGuardadas[i].subapartados.length; j++) {

            let subapartado = document.createElement("div");

            subapartado.innerHTML =
                "&nbsp;&nbsp;&nbsp;• " +
                divisionesGuardadas[i].subapartados[j].nombre + " - " +
                divisionesGuardadas[i].subapartados[j].porcentaje + "%";

            lista.appendChild(subapartado);
        }
    }
}

function actualizarListaAsignaturas() {

    let lista = document.getElementById("asignaturasGuardadas");

    lista.innerHTML = "";

    for (let i = 0; i < asignaturasGuardadas.length; i++) {

        let fila = document.createElement("div");

        fila.className = "filaAsignatura";

        fila.innerHTML = "<strong>" + asignaturasGuardadas[i].nombre + "</strong>";

        let botonEliminar = document.createElement("button");

		botonEliminar.textContent = "❌";
		botonEliminar.className = "btnEliminar";

        botonEliminar.onclick = function() {
            eliminarAsignatura(i);
        };

        fila.appendChild(botonEliminar);

        lista.appendChild(fila);
    }
}

// ACTUALIZAR SELECTOR DE ASIGNATURAS

function actualizarSelectorAsignaturas() {

    let selector = document.getElementById("selectAsignatura");

    selector.innerHTML = `
        <option value="">Selecciona una asignatura</option>
    `;

    for (let i = 0; i < asignaturasGuardadas.length; i++) {

        let opcion = document.createElement("option");

        opcion.value = i;
        opcion.textContent = asignaturasGuardadas[i].nombre;

        selector.appendChild(opcion);
    }
}

// MOSTRAR ELEMENTOS DE LA ASIGNATURA SELECCIONADA

function mostrarElementosAsignatura() {

    let selector = document.getElementById("selectAsignatura");
    let zonaElementos = document.getElementById("elementosAsignatura");

    zonaElementos.innerHTML = "";

    if (selector.value === "") {
        return;
    }

    let indiceAsignatura = Number(selector.value);
    let asignatura = asignaturasGuardadas[indiceAsignatura];
	console.log(asignatura);
	
	let filaTodaAsignatura = document.createElement("div");

	let casillaTodaAsignatura = document.createElement("input");
	casillaTodaAsignatura.type = "checkbox";
	casillaTodaAsignatura.id = "chkTodaAsignatura";

	let etiquetaTodaAsignatura = document.createElement("label");
	etiquetaTodaAsignatura.textContent = "Toda la asignatura";

	filaTodaAsignatura.appendChild(casillaTodaAsignatura);
	filaTodaAsignatura.appendChild(etiquetaTodaAsignatura);

	zonaElementos.appendChild(filaTodaAsignatura);

    for (let i = 0; i < asignatura.divisiones.length; i++) {

        let division = asignatura.divisiones[i];

        let fila = document.createElement("div");

        let casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.value = i;
        casilla.className = "checkboxElemento";
		
		casilla.onchange = function() {

			if (division.subapartados.length === 0) {
				return;
			}

			let casillasSubapartados = zonaElementos.querySelectorAll(
				".checkboxSubapartado"
			);

			for (let j = 0; j < casillasSubapartados.length; j++) {

				let subapartado = casillasSubapartados[j];

				if (Number(subapartado.dataset.division) === i) {
					subapartado.checked = casilla.checked;
				}
			}
		};

        let etiqueta = document.createElement("label");
        etiqueta.textContent = division.nombre + " - " + division.porcentaje + "%";

        fila.appendChild(casilla);
        fila.appendChild(etiqueta);

        zonaElementos.appendChild(fila);
		
		// ZONA DE NOTAS DEL ELEMENTO
		// Solo aparece si el elemento NO tiene subapartados
		if (division.subapartados.length === 0) {

			let zonaNotas = document.createElement("div");
			zonaNotas.className = "zonaNotas";
			zonaNotas.dataset.division = i;
			zonaNotas.dataset.asignatura = indiceAsignatura;

			let nota = document.createElement("input");
			nota.type = "text";
			nota.className = "notaElemento";
			nota.placeholder = "Nota";

			zonaNotas.appendChild(nota);
			zonaElementos.appendChild(zonaNotas);

			nota.oninput = añadirNota;

			nota.onblur = function() {
				if (!comprobarNota(nota.value)) {
					alert("La nota introducida no es válida.");
				}
			};
		}
	
		// MOSTRAR SUBAPARTADOS

		for (let j = 0; j < division.subapartados.length; j++) {

			let subapartado = division.subapartados[j];

			let filaSubapartado = document.createElement("div");

			filaSubapartado.style.marginLeft = "25px";

			let casillaSubapartado = document.createElement("input");
			casillaSubapartado.type = "checkbox";
			casillaSubapartado.className = "checkboxSubapartado";
			casillaSubapartado.value = j;
			casillaSubapartado.dataset.division = i;

			let etiquetaSubapartado = document.createElement("label");
			etiquetaSubapartado.textContent =
				"• " + subapartado.nombre + " - " +
				subapartado.porcentaje + "%";

			filaSubapartado.appendChild(casillaSubapartado);
			filaSubapartado.appendChild(etiquetaSubapartado);

			zonaElementos.appendChild(filaSubapartado);

			// ZONA DE NOTAS DEL SUBAPARTADO

			let zonaNotasSubapartado = document.createElement("div");
			zonaNotasSubapartado.className = "zonaNotas";
			zonaNotasSubapartado.style.marginLeft = "50px";

			// Guardamos qué división y qué subapartado es
			zonaNotasSubapartado.dataset.division = i;
			zonaNotasSubapartado.dataset.subapartado = j;
			zonaNotasSubapartado.dataset.asignatura = indiceAsignatura;

			let notaSubapartado = document.createElement("input");
			notaSubapartado.type = "text";
			notaSubapartado.className = "notaElemento";
			notaSubapartado.placeholder = "Nota";
			
			notaSubapartado.oninput = añadirNota;

			notaSubapartado.onblur = function() {

				if (!comprobarNota(notaSubapartado.value)) {
					alert("La nota introducida no es válida.");
				}

			};

			zonaNotasSubapartado.appendChild(notaSubapartado);
			zonaElementos.appendChild(zonaNotasSubapartado);
		}
    }
	
	// SELECCIONAR TODA LA ASIGNATURA
	casillaTodaAsignatura.onchange = function() {

		let casillasElementos = document.querySelectorAll(".checkboxElemento");
		let casillasSubapartados = document.querySelectorAll(".checkboxSubapartado");

		// Seleccionar o deseleccionar todos los elementos
		for (let i = 0; i < casillasElementos.length; i++) {
			casillasElementos[i].checked = casillaTodaAsignatura.checked;
		}

		// Seleccionar o deseleccionar todos los subapartados
		for (let i = 0; i < casillasSubapartados.length; i++) {
			casillasSubapartados[i].checked = casillaTodaAsignatura.checked;
		}
	};
}

function añadirNota(evento) {

    if (evento.target.value.length === 1) {

        let zonaNotas = evento.target.parentElement;

        let nuevaNota = document.createElement("input");
        nuevaNota.type = "text";
        nuevaNota.className = "notaElemento";
        nuevaNota.placeholder = "Nota";

        zonaNotas.appendChild(nuevaNota);

        nuevaNota.oninput = añadirNota;
    }
}

function comprobarNota(valor) {

    valor = valor.trim();

    // Si está vacía, se permite
    if (valor === "") {
        return true;
    }

    // Cambiar coma por punto
    valor = valor.replace(",", ".");

    // Comprobar que es un número
    let numero = Number(valor);

    if (isNaN(numero)) {
        return false;
    }

    // Comprobar que está entre 0 y 10
    if (numero < 0 || numero > 10) {
        return false;
    }

    return true;
}

function comprobarTodasLasNotas() {

    let notas = document.querySelectorAll(".notaElemento");

    for (let i = 0; i < notas.length; i++) {

        if (!comprobarNota(notas[i].value)) {
            return false;
        }
    }

    return true;
}


function recogerNotas(elemento) {

    let notas = elemento.querySelectorAll(".notaElemento");

    let notasValidas = [];

    for (let i = 0; i < notas.length; i++) {

        if (notas[i].value.trim() !== "") {

            let valor = notas[i].value.replace(",", ".");

            notasValidas.push(Number(valor));
        }
    }

    return notasValidas;
}

function comprobarHayNotas(elemento) {

    let notas = recogerNotas(elemento);

    if (notas.length === 0) {
        return false;
    }

    return true;
}

function calcularMedia(notas) {

    let suma = 0;

    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }

    let media = suma / notas.length;

    return media.toFixed(2);
}

function calcularMediaPonderadaSubapartados(division, indiceAsignatura, indiceDivision) {

    let suma = 0;

    for (let i = 0; i < division.subapartados.length; i++) {

        let subapartado = division.subapartados[i];

        let zonaNotas = document.querySelector(
            "[data-asignatura='" + indiceAsignatura + "'][data-division='" + indiceDivision + "'][data-subapartado='" + i + "']"
        );

        if (zonaNotas === null) {
            continue;
        }

        let notas = recogerNotas(zonaNotas);

        if (notas.length === 0) {
            continue;
        }

        let media = Number(calcularMedia(notas));

        let porcentaje = Number(subapartado.porcentaje);

        suma += media * porcentaje / 100;
    }

    return suma.toFixed(2);
}

function obtenerMediasSubapartados(division, indiceAsignatura, indiceDivision) {

    let medias = [];

    for (let i = 0; i < division.subapartados.length; i++) {

        let subapartado = division.subapartados[i];

        let zonaNotas = document.querySelector(
            "[data-asignatura='" + indiceAsignatura + "'][data-division='" + indiceDivision + "'][data-subapartado='" + i + "']"
        );

        if (zonaNotas === null) {
            continue;
        }

        let notas = recogerNotas(zonaNotas);

        if (notas.length === 0) {
            continue;
        }

        let media = calcularMedia(notas);

        medias.push({
            nombre: subapartado.nombre,
            porcentaje: subapartado.porcentaje,
            media: media
        });
    }

    return medias;
}

function calcularMediaFinalElemento(division, indiceAsignatura, indiceDivision) {

    // Si el elemento no tiene subapartados
    if (division.subapartados.length === 0) {

        let zonaNotas = document.querySelector(
            "[data-asignatura='" + indiceAsignatura + "'][data-division='" + indiceDivision + "']"
        );

        if (zonaNotas === null) {
            return null;
        }

        let notas = recogerNotas(zonaNotas);

        if (notas.length === 0) {
            return null;
        }

        return calcularMedia(notas);
    }

    // Si el elemento tiene subapartados
    return calcularMediaPonderadaSubapartados(
        division,
        indiceAsignatura,
        indiceDivision
    );
}

// DETECTAR CAMBIO DE ASIGNATURA

document.getElementById("selectAsignatura").onchange = mostrarElementosAsignatura;

function eliminarAsignatura(indice) {

    asignaturasGuardadas.splice(indice, 1);

    localStorage.setItem(
        "asignaturasGuardadas",
        JSON.stringify(asignaturasGuardadas)
    );

    actualizarListaAsignaturas();
}

function guardarAsignatura() {
	
	let nombreAsignatura = document.getElementById("txtAsignaturaConfiguracion").value.trim();

	let asignatura = {
		nombre: nombreAsignatura,
		divisiones: divisionesGuardadas
	};
	
	if (!comprobarPorcentajes(asignatura.divisiones, "elementos")) {
		return;
	}
	
	asignaturasGuardadas.push(asignatura);

	localStorage.setItem("asignaturasGuardadas", JSON.stringify(asignaturasGuardadas));

	divisionesGuardadas = [];

	actualizarListaDivisiones();
	actualizarListaAsignaturas();
	actualizarSelectorAsignaturas();

	console.log("Asignatura guardada:", asignatura);
	
	document.getElementById("txtAsignaturaConfiguracion").value = "";
}

// BOTÓN AÑADIR DIVISIONES Y SUBAPARTADOS

document.getElementById("btnAñadirDivisiones").onclick = guardarDivisionesYSubapartados;
document.getElementById("btnAñadirAsignaturas").onclick = guardarAsignatura;

// BOTÓN INICIAR CALCULADORA

document.getElementById("btnIniciar").onclick = function() {

    pantallaConfiguracion.style.display = "none";
    pantallaCalculo.style.display = "block";

};

// BOTÓN VOLVER A CONFIGURACIÓN

document.getElementById("btnVolverConfiguracion").onclick = function() {

    pantallaCalculo.style.display = "none";
    pantallaConfiguracion.style.display = "block";

};

// BOTÓN CALCULAR
document.getElementById("btnCalcular").onclick = function() {

    // COMPROBAR QUE TODAS LAS NOTAS SON VÁLIDAS
    if (!comprobarTodasLasNotas()) {

        alert("Hay una o más notas inválidas. Corrígelas antes de calcular.");

        return;
    }

    let resultados = calcularElementosSeleccionados();

    if (resultados.length === 0) {

        alert("Selecciona al menos un elemento.");

        return;
    }

    mostrarResultadosElementos(resultados);

    let resultadoFinal = calcularResultadoConjunto();

    if (resultadoFinal !== null) {

        mostrarResultadoFinal(resultadoFinal);
    }
	
	mostrarProcedimiento();
};

// ===============================
// COMPROBAR PORCENTAJES
// ===============================

function comprobarPorcentajes(lista, tipo) {

    let conPorcentaje = 0;
    let sinPorcentaje = 0;
    let suma = 0;

    // RECORRER LOS ELEMENTOS

    for (let i = 0; i < lista.length; i++) {

        if (lista[i].porcentaje === "") {
            sinPorcentaje++;
        } 
		else {
            conPorcentaje++;
            suma += Number(lista[i].porcentaje);
        }
    }

    // NINGUNO TIENE PORCENTAJE

    if (conPorcentaje === 0) {

        let continuar = confirm(
            "Ningún " + tipo + " tiene porcentaje. ¿Quieres repartirlos a partes iguales?"
        );

        if (continuar) {

            let porcentajeIgual = 100 / lista.length;

            for (let i = 0; i < lista.length; i++) {
                lista[i].porcentaje = porcentajeIgual;
            }

            return true;

        }
		else {

            return false;
        }
    }

    // ALGUNOS TIENEN PORCENTAJE Y OTROS NO

    if (sinPorcentaje > 0) {

        alert("No puedes guardar porque faltan porcentajes en algunos " + tipo + ".");
        return false;
    }

    // TODOS TIENEN PORCENTAJE, PERO NO SUMAN 100

    if (suma !== 100) {

        alert("Los porcentajes de los " + tipo + " deben sumar 100%. Actualmente suman " + suma + "%.");
        return false;
    }

    return true;
}

function obtenerElementosSeleccionados() {

    let casillas = document.querySelectorAll(".checkboxElemento");

    let elementosSeleccionados = [];

    for (let i = 0; i < casillas.length; i++) {

        if (casillas[i].checked) {
            elementosSeleccionados.push(Number(casillas[i].value));
        }
    }

    return elementosSeleccionados;
}

function calcularElementosSeleccionados() {

    let selector = document.getElementById("selectAsignatura");

    if (selector.value === "") {
        return [];
    }

    let indiceAsignatura = Number(selector.value);
    let asignatura = asignaturasGuardadas[indiceAsignatura];

    let elementosSeleccionados = obtenerElementosSeleccionados();

    let resultados = [];

    for (let i = 0; i < elementosSeleccionados.length; i++) {

        let indiceDivision = elementosSeleccionados[i];

        let division = asignatura.divisiones[indiceDivision];

        let media = calcularMediaFinalElemento(
			division,
			indiceAsignatura,
			indiceDivision
		);

		if (media !== null) {

			resultados.push({
				nombre: division.nombre,
				porcentaje: division.porcentaje,
				media: media
			});
		}
    }

    return resultados;
}

function calcularResultadoConjunto() {

    let resultados = calcularElementosSeleccionados();

	if (resultados.length === 0) {
		alert("Selecciona al menos un elemento con notas.");
		return;
	}

    let suma = 0;

    for (let i = 0; i < resultados.length; i++) {

        let media = Number(resultados[i].media);
        let porcentaje = Number(resultados[i].porcentaje);

        suma += media * porcentaje / 100;
    }

    return suma.toFixed(2);
}

function mostrarResultadosElementos(resultados) {

    let zonaResultado = document.getElementById("resultadoCalculadora");

    zonaResultado.innerHTML = "";

    let titulo = document.createElement("h3");
    titulo.textContent = "Resultados";
    zonaResultado.appendChild(titulo);

    for (let i = 0; i < resultados.length; i++) {

        let resultado = document.createElement("p");

        resultado.textContent =
			resultados[i].nombre + ": " +
			resultados[i].media.replace(".", ",");

        zonaResultado.appendChild(resultado);
    }
}

function mostrarProcedimiento() {

    let mostrar = document.getElementById("chkProcedimiento").checked;

    if (!mostrar) {
        return;
    }

    let zonaResultado = document.getElementById("resultadoCalculadora");

    let procedimiento = document.createElement("div");

    procedimiento.id = "procedimientoCalculadora";

    procedimiento.innerHTML = "<h3>Procedimiento</h3>";

    let selector = document.getElementById("selectAsignatura");

    if (selector.value === "") {
        return;
    }

    let indiceAsignatura = Number(selector.value);
    let asignatura = asignaturasGuardadas[indiceAsignatura];

    let elementosSeleccionados = obtenerElementosSeleccionados();

    for (let i = 0; i < elementosSeleccionados.length; i++) {

        let indiceDivision = elementosSeleccionados[i];
        let division = asignatura.divisiones[indiceDivision];

        if (division.subapartados.length > 0) {

            let tituloDivision = document.createElement("p");

            tituloDivision.innerHTML =
                "<strong>" + division.nombre + "</strong>";

            procedimiento.appendChild(tituloDivision);

            let medias = obtenerMediasSubapartados(
                division,
                indiceAsignatura,
                indiceDivision
            );

            for (let j = 0; j < medias.length; j++) {

                let linea = document.createElement("p");

				let media = Number(medias[j].media);
				let porcentaje = Number(medias[j].porcentaje);

				let resultado = media * porcentaje / 100;

				linea.textContent =
					medias[j].nombre + ": " +
					media.toFixed(2).replace(".", ",") +
					" × " +
					porcentaje + "% = " +
					resultado.toFixed(2).replace(".", ",");

				procedimiento.appendChild(linea);
            }
			
			let sumaResultados = 0;
			let textoSuma = "";

			for (let j = 0; j < medias.length; j++) {

				let media = Number(medias[j].media);
				let porcentaje = Number(medias[j].porcentaje);

				let resultado = media * porcentaje / 100;

				sumaResultados += resultado;

				if (j > 0) {
					textoSuma += " + ";
				}

				textoSuma += resultado.toFixed(2).replace(".", ",");
			}

			let resultadoDivision = document.createElement("p");

			resultadoDivision.innerHTML =
				"<strong>" +
				textoSuma +
				" = " +
				sumaResultados.toFixed(2).replace(".", ",") +
				"</strong>";

			procedimiento.appendChild(resultadoDivision);
        }
    }

    zonaResultado.appendChild(procedimiento);
}

function mostrarResultadoFinal(resultadoFinal) {

    let zonaResultado = document.getElementById("resultadoCalculadora");

    let resultado = document.createElement("p");

    resultado.innerHTML =
        "<strong>Nota final: " +
        resultadoFinal.replace(".", ",") +
        "</strong>";

    zonaResultado.appendChild(resultado);
}
