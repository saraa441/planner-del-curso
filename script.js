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


// ===============================
// ASIGNATURAS
// ===============================

const txtAsignatura = document.getElementById("txtAsignatura");

const chkImportante = document.getElementById("chkImportante");

const chkMasTiempo = document.getElementById("chkMasTiempo");

const btnAñadirAsignatura =
	document.getElementById("btnAñadirAsignatura");

const listaAsignaturas =
	document.getElementById("listaAsignaturas");

let asignaturas = [];


// Crear la función para actualizar las asignaturas //
function actualizarListaAsignaturas() {

	listaAsignaturas.innerHTML = "";

	for (let i = 0; i < asignaturas.length; i++) {

		listaAsignaturas.innerHTML =
			listaAsignaturas.innerHTML +
			"<div class='filaLista'>" +
			asignaturas[i].nombre +
			"<button class=btnEliminar onclick='eliminarAsignatura(" +
			i +
			")'>✖</button></div>";
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

		listaTareas.innerHTML =
			listaTareas.innerHTML +
			"<div class='filaLista'>" +
			tareas[j].nombre +
			"<button class=btnEliminar onclick='eliminarTarea(" +
			j +
			")'>✖</button></div>";
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
		txtTarea.value === "" ||
		txtDuracionTarea.value === ""
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

const txtExamen =
	document.getElementById("txtExamen");

const txtFecha =
	document.getElementById("txtFecha");

const btnAñadirExamen =
	document.getElementById("btnAñadirExamen");

const listaExamenes =
	document.getElementById("listaExamenes");

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

		listaExamenes.innerHTML =
			listaExamenes.innerHTML +
			"<div class='filaLista'>" +
			examenes[k].asignatura +
			" - " +
			fechaBonita +
			"<button class=btnEliminar onclick='eliminarExamen(" +
			k +
			")'>✖</button></div>";
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
		txtExamen.value === "" ||
		txtFecha.value === ""
	) {

		alert(
			"Es necesario escribir una asignatura y una fecha para continuar"
		);

		return;
	}

	let fechaExamen =
		new Date(txtFecha.value);

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

const txtHoraInicio =
	document.getElementById("txtHoraInicio");

const txtHoraFin =
	document.getElementById("txtHoraFin");

const btnCrearPlan =
	document.getElementById("btnCrearPlan");

const txtDuracionDescanso =
	document.getElementById("txtDuracionDescanso");

const txtDuracionEstudio =
	document.getElementById("txtDuracionEstudio");

const chkTareasComoDescanso =
	document.getElementById("chkTareasComoDescanso");


// Función que crea el plan //
function crearPlan() {

	// ==========================================
	// COMPROBAR DATOS
	// ==========================================

	if (
		txtHoraInicio.value === "" ||
		txtHoraFin.value === "" ||
		txtDuracionDescanso.value === "" ||
		txtDuracionEstudio.value === ""
	) {

		alert(
			"Debes introducir una hora de inicio, una hora de fin y las duraciones"
		);

		return;
	}

	if (
		txtHoraFin.value <=
		txtHoraInicio.value
	) {

		alert(
			"La hora de fin debe ser posterior a la hora de inicio"
		);

		return;
	}

	let duracionDescanso =
		Number(txtDuracionDescanso.value);

	let duracionEstudio =
		Number(txtDuracionEstudio.value);

	if (
		duracionDescanso <= 0 ||
		duracionEstudio <= 0
	) {

		alert(
			"La duración del descanso y el estudio debe ser superior a 0"
		);

		return;
	}


	// ==========================================
	// CALCULAR TIEMPO DISPONIBLE
	// ==========================================

	let horaInicio =
		txtHoraInicio.value.split(":");

	let horaFin =
		txtHoraFin.value.split(":");

	let inicioMinutos =
		Number(horaInicio[0]) * 60 +
		Number(horaInicio[1]);

	let finMinutos =
		Number(horaFin[0]) * 60 +
		Number(horaFin[1]);

	let tiempoDisponible =
		finMinutos -
		inicioMinutos;

	if (
		duracionDescanso >=
		tiempoDisponible
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

	let asignaturasPlan =
		asignaturas.map(function(asignatura) {

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

	function calcularPrioridadExamen(
		nombreAsignatura
	) {

		let prioridadMayor = 0;

		for (
			let examen of examenes
		) {

			if (
				examen.asignatura ===
				nombreAsignatura
			) {

				let fechaExamen =
					new Date(examen.fecha);

				fechaExamen.setHours(
					0,
					0,
					0,
					0
				);

				let diferenciaTiempo =
					fechaExamen - hoy;

				let diasRestantes =
					Math.ceil(
						diferenciaTiempo /
						(1000 * 60 * 60 * 24)
					);

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
	document.body.style.backgroundColor = colorFondo.value;
	localStorage.setItem("colorFondo", colorFondo.value);
});

document.getElementById("colorBotones").addEventListener("input", function(){
    let botones = document.querySelectorAll("button");
    botones.forEach(function(boton){
        boton.style.backgroundColor = colorBotones.value;
    });
	localStorage.setItem("colorBotones", colorBotones.value);
});

document.getElementById("tipoLetra").addEventListener("change", function(){
    document.body.style.fontFamily = tipoLetra.value;
	localStorage.setItem("tipoLetra", tipoLetra.value);
});

const selectorTamanoLetra = document.getElementById("tamanoLetra");
selectorTamanoLetra.addEventListener("change", function(){
    console.log(selectorTamanoLetra.value);
	if(selectorTamanoLetra.value === "Pequeño"){
        document.body.style.fontSize = "14px";
    }
    if(selectorTamanoLetra.value === "Normal"){
        document.body.style.fontSize = "16px";
    }
    if(selectorTamanoLetra.value === "Grande"){
        document.body.style.fontSize = "20px";
    }
    if(selectorTamanoLetra.value === "Muy grande"){
        document.body.style.fontSize = "24px";
    }
	localStorage.setItem("tamanoLetra", selectorTamanoLetra.value);
});

const selectorEstiloEsquinas = document.getElementById("estiloEsquinas");
selectorEstiloEsquinas.addEventListener("change", function(){
    if(selectorEstiloEsquinas.value === "Sin redondeo"){
        document.querySelectorAll("button, section, .menu").forEach(function(elemento){
            elemento.style.borderRadius = "0px";
       });
    }
    if(selectorEstiloEsquinas.value === "Poco redondeadas"){
        document.querySelectorAll("button, section, .menu").forEach(function(elemento){
            elemento.style.borderRadius = "5px";
        });
    }
    if(selectorEstiloEsquinas.value === "Redondeadas"){
        document.querySelectorAll("button, section, .menu").forEach(function(elemento){
            elemento.style.borderRadius = "10px";
        });
    }
    if(selectorEstiloEsquinas.value === "Muy redondeadas"){
        document.querySelectorAll("button, section, .menu").forEach(function(elemento){
            elemento.style.borderRadius = "20px";
        });
    }
	localStorage.setItem("estiloEsquinas", selectorEstiloEsquinas.value);
});

const selectorColorCuadros = document.getElementById("colorCuadros");
selectorColorCuadros.addEventListener("input", function(){
    document.querySelectorAll("section, .menu").forEach(function(elemento){
        elemento.style.backgroundColor = selectorColorCuadros.value;
    });
	localStorage.setItem("colorCuadros", selectorColorCuadros.value);
});

const selectorColorEstudio = document.getElementById("colorEstudio");
selectorColorEstudio.addEventListener("input", function(){
    localStorage.setItem("colorEstudio", selectorColorEstudio.value);
});

const selectorColorDescanso = document.getElementById("colorDescanso");
selectorColorDescanso.addEventListener("input", function(){
    localStorage.setItem("colorDescanso", selectorColorDescanso.value);
});

const selectorColorTareas = document.getElementById("colorTareas");
selectorColorTareas.addEventListener("input", function(){
    localStorage.setItem("colorTareas", selectorColorTareas.value);
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

let colorFondoGuardado = localStorage.getItem("colorFondo");
if(colorFondoGuardado !== null){
    document.body.style.backgroundColor = colorFondoGuardado;
    colorFondo.value = colorFondoGuardado;
}

let colorBotonesGuardado = localStorage.getItem("colorBotones");
if(colorBotonesGuardado !== null){
    let botones = document.querySelectorAll("button");
    botones.forEach(function(boton){
        boton.style.backgroundColor = colorBotonesGuardado;
    });
    colorBotones.value = colorBotonesGuardado;
}

let tipoLetraGuardado = localStorage.getItem("tipoLetra");
if(tipoLetraGuardado !== null){
    document.body.style.fontFamily = tipoLetraGuardado;
    tipoLetra.value = tipoLetraGuardado;
}

let tamanoLetraGuardado = localStorage.getItem("tamanoLetra");
if(tamanoLetraGuardado !== null){
    if(tamanoLetraGuardado === "Pequeño"){
        document.body.style.fontSize = "14px";
    }
    if(tamanoLetraGuardado === "Normal"){
        document.body.style.fontSize = "16px";
    }
    if(tamanoLetraGuardado === "Grande"){
        document.body.style.fontSize = "20px";
    }
    if(tamanoLetraGuardado === "Muy grande"){
        document.body.style.fontSize = "24px";
    }
    tamanoLetra.value = tamanoLetraGuardado;
}

let estiloEsquinasGuardado = localStorage.getItem("estiloEsquinas");
if(estiloEsquinasGuardado !== null){
    let elementos = document.querySelectorAll("button, section, .menu");
    if(estiloEsquinasGuardado === "Sin redondeo"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "0px";
        });
    }
    if(estiloEsquinasGuardado === "Poco redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "5px";
        });
    }
    if(estiloEsquinasGuardado === "Redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "10px";
        });
    }
    if(estiloEsquinasGuardado === "Muy redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "20px";
        });
    }
    selectorEstiloEsquinas.value = estiloEsquinasGuardado;
}

let colorCuadrosGuardado = localStorage.getItem("colorCuadros");
if(colorCuadrosGuardado !== null){
    document.querySelectorAll("section, .menu").forEach(function(elemento){
        elemento.style.backgroundColor = colorCuadrosGuardado;
    });
    colorCuadros.value = colorCuadrosGuardado;
}